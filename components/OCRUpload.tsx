
import React, { useState, useRef } from 'react';
import { aiService } from '../ai.service';
import { ContractTemplate } from '../types';

declare const pdfjsLib: any;
declare const mammoth: any;

type DocumentType = 'pdf-text' | 'pdf-scanned' | 'docx' | 'image';

export const OCRUpload = ({ onComplete, onCancel, t }: {
  onComplete: (t: ContractTemplate, openNow?: boolean) => void,
  onCancel: () => void,
  t: any
}) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [successTemplate, setSuccessTemplate] = useState<ContractTemplate | null>(null);
  const [customTitle, setCustomTitle] = useState('');
  const [detectedType, setDetectedType] = useState<DocumentType | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  /**
   * Extract text from PDF pages to determine if it's text-based or scanned
   */
  const extractPdfTextContent = async (pdf: any): Promise<{ pages: string[], hasText: boolean }> => {
    const pages: string[] = [];
    let totalTextLength = 0;

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ').trim();
      pages.push(pageText);
      totalTextLength += pageText.length;
    }

    // If average text per page is less than 50 characters, consider it scanned
    const avgTextPerPage = totalTextLength / pdf.numPages;
    return { pages, hasText: avgTextPerPage > 50 };
  };

  /**
   * Process Word document (.docx) using mammoth
   */
  const processWordDocument = async (file: File): Promise<{ title: string, html: string }> => {
    setStatus('Reading Word document...');
    setProgress(20);

    const arrayBuffer = await file.arrayBuffer();

    // Extract HTML with mammoth
    const result = await mammoth.convertToHtml({ arrayBuffer }, {
      styleMap: [
        "p[style-name='Heading 1'] => h1:fresh",
        "p[style-name='Heading 2'] => h2:fresh",
        "p[style-name='Heading 3'] => h3:fresh",
        "p[style-name='Title'] => h1.document-title:fresh",
        "b => strong",
        "i => em",
        "u => u"
      ]
    });

    const rawHtml = result.value;

    setStatus('Reconstructing document format...');
    setProgress(60);

    // Use AI to reconstruct with proper formatting and placeholders
    const formattedDoc = await aiService.reconstructTextDocument(rawHtml, 'docx', file.name);

    setProgress(90);
    return formattedDoc;
  };

  /**
   * Process PDF with embedded text (not scanned)
   */
  const processTextPdf = async (pdf: any, textPages: string[]): Promise<{ title: string, html: string }> => {
    const totalPages = pdf.numPages;

    setStatus('Processing text-based PDF...');
    setProgress(30);

    // Combine all text with page markers
    const pagesWithMarkers = textPages.map((text, idx) =>
      `<!-- PAGE ${idx + 1} -->\n${text}`
    ).join('\n\n');

    setStatus('Reconstructing document format...');
    setProgress(60);

    // Use AI to reconstruct formatting from plain text
    const formattedDoc = await aiService.reconstructTextDocument(pagesWithMarkers, 'pdf', `${totalPages} pages`);

    setProgress(90);
    return formattedDoc;
  };

  /**
   * Process scanned PDF using vision/OCR
   */
  const processScannedPdf = async (pdf: any): Promise<{ title: string, html: string }> => {
    const totalPages = pdf.numPages;
    const pageContents: string[] = [];

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      setStatus(`Scanning page ${pageNum} of ${totalPages} with AI vision...`);

      const page = await pdf.getPage(pageNum);
      // Use higher scale (2.5) for better OCR accuracy on scanned docs
      const viewport = page.getViewport({ scale: 2.5 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport: viewport }).promise;
      const imageBase64 = canvas.toDataURL('image/png', 1.0).split(',')[1];

      // Extract content using vision model
      const pageHtml = await aiService.extractPageContent(imageBase64, 'image/png', pageNum, totalPages);
      pageContents.push(pageHtml);

      setProgress(Math.floor(20 + (pageNum / totalPages) * 60));

      // Clean up canvas
      canvas.width = 0;
      canvas.height = 0;

      if (pageNum < totalPages) {
        await sleep(1500); // Longer delay for vision API
      }
    }

    setStatus('Assembling scanned document...');
    setProgress(85);

    return await aiService.assembleMultiPageDocument(pageContents, totalPages);
  };

  /**
   * Process image file using vision
   */
  const processImage = async (file: File): Promise<{ title: string, html: string }> => {
    setStatus('Analyzing image with AI vision...');
    setProgress(30);

    const base64 = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.readAsDataURL(file);
    });

    const pageHtml = await aiService.extractPageContent(base64, file.type, 1, 1);

    setProgress(80);
    return await aiService.assembleMultiPageDocument([pageHtml], 1);
  };

  const processFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setStatus('Analyzing document type...');
    setProgress(5);
    setDetectedType(null);

    try {
      let finalData: { title: string, html: string };
      const fileName = file.name.toLowerCase();

      // Handle Word documents (.docx)
      if (fileName.endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setDetectedType('docx');
        setStatus('Word document detected - extracting text...');
        finalData = await processWordDocument(file);
      }
      // Handle PDF files
      else if (file.type === 'application/pdf' || fileName.endsWith('.pdf')) {
        const arrayBuffer = await file.arrayBuffer();
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

        setStatus('Detecting PDF type...');
        setProgress(10);

        // Check if PDF has embedded text or is scanned
        const { pages: textPages, hasText } = await extractPdfTextContent(pdf);

        if (hasText) {
          setDetectedType('pdf-text');
          setStatus('Text-based PDF detected - extracting content...');
          finalData = await processTextPdf(pdf, textPages);
        } else {
          setDetectedType('pdf-scanned');
          setStatus('Scanned PDF detected - using AI vision...');
          finalData = await processScannedPdf(pdf);
        }
      }
      // Handle image files
      else if (file.type.startsWith('image/')) {
        setDetectedType('image');
        setStatus('Image detected - using AI vision...');
        finalData = await processImage(file);
      }
      // Unsupported file type
      else {
        throw new Error('Unsupported file type. Please upload a PDF, Word document (.docx), or image file.');
      }

      setStatus('Finalizing document...');
      setProgress(95);

      const template: ContractTemplate = {
        id: `import-${Date.now()}`,
        title: finalData.title || "Imported Document",
        description: getDescriptionForType(detectedType),
        category: "Imported",
        content: finalData.html,
        placeholders: finalData.html.match(/xxxx_[A-Z_0-9]+/g) || []
      };

      setSuccessTemplate(template);
      setCustomTitle(template.title);
    } catch (err: any) {
      console.error(err);
      alert("Error processing document: " + (err.message || "Please try again."));
    } finally {
      setLoading(false);
      setStatus('');
      setProgress(0);
    }
  };

  const getDescriptionForType = (type: DocumentType | null): string => {
    switch (type) {
      case 'docx': return 'Imported from Word document with text extraction.';
      case 'pdf-text': return 'Imported from text-based PDF with format reconstruction.';
      case 'pdf-scanned': return 'Imported from scanned PDF using AI vision.';
      case 'image': return 'Imported from image using AI vision OCR.';
      default: return 'Imported legacy document with A4 page formatting.';
    }
  };

  const getTypeIcon = (): string => {
    switch (detectedType) {
      case 'docx': return 'fa-file-word';
      case 'pdf-text': return 'fa-file-pdf';
      case 'pdf-scanned': return 'fa-file-image';
      case 'image': return 'fa-image';
      default: return 'fa-file-import';
    }
  };

  const getTypeLabel = (): string => {
    switch (detectedType) {
      case 'docx': return 'Word Document';
      case 'pdf-text': return 'Text PDF';
      case 'pdf-scanned': return 'Scanned PDF';
      case 'image': return 'Image';
      default: return 'Document';
    }
  };

  const handleFinalize = (openNow: boolean) => {
    if (!successTemplate) return;
    const finalTpl = { ...successTemplate, title: customTitle };
    onComplete(finalTpl, openNow);
  };

  if (successTemplate) {
    return (
      <div className="max-w-md mx-auto py-16 md:py-20 px-6 animate-fade-in">
        <div className="bg-white dark:bg-zinc-900 p-8 md:p-10 shadow-xl rounded-2xl md:rounded-3xl text-center border border-zinc-100 dark:border-zinc-800 flex flex-col items-center">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 text-xl md:text-2xl shadow-lg shadow-green-500/20 animate-bounce">
            <i className="fas fa-check"></i>
          </div>

          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-3 dark:text-white">
            {t.ocr_success_title}
          </h2>

          {/* Show detected document type */}
          <div className="flex items-center gap-1.5 mb-4 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 rounded-full">
            <i className={`fas ${getTypeIcon()} text-orange-500 text-xs`}></i>
            <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">{getTypeLabel()}</span>
          </div>

          <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium mb-8 max-w-xs mx-auto">
            {t.ocr_success_desc}
          </p>

          <div className="w-full text-left mb-6">
            <label className="text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-1.5 block">{t.ocr_field_title}</label>
            <input
              className="w-full bg-zinc-50 dark:bg-zinc-800 border-2 border-transparent focus:border-orange-500 rounded-xl p-3.5 focus:outline-none font-bold text-sm text-zinc-800 dark:text-white transition-all"
              value={customTitle}
              onChange={e => setCustomTitle(e.target.value)}
              placeholder="e.g. Service Agreement 2024"
            />
          </div>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={() => handleFinalize(true)}
              className="w-full py-3.5 rounded-xl bg-orange-500 text-white font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-black transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              <i className="fas fa-magic"></i> {t.ocr_open_ed}
            </button>
            <button
              onClick={() => handleFinalize(false)}
              className="w-full py-3.5 rounded-xl bg-zinc-900 text-white font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-orange-500 transition-all active:scale-95"
            >
              {t.ocr_save_lib}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-16 md:py-20 px-6 animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 p-8 md:p-10 shadow-xl rounded-2xl md:rounded-3xl text-center border border-zinc-100 dark:border-zinc-800 flex flex-col items-center relative overflow-hidden">
        {loading && (
          <div className="absolute top-0 left-0 h-1 bg-orange-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
        )}

        <div className={`w-14 h-14 md:w-16 md:h-16 bg-zinc-50 dark:bg-zinc-800 text-orange-500 rounded-2xl flex items-center justify-center mb-6 text-xl md:text-2xl shadow-sm border border-zinc-100 dark:border-zinc-700`}>
          <i className={`fas ${loading ? 'fa-circle-notch fa-spin' : 'fa-file-import'}`}></i>
        </div>

        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-3 dark:text-white">{t.ocr_title_1} <span className="text-orange-500">{t.ocr_title_2}</span></h2>

        {/* Show detected type during processing */}
        {loading && detectedType && (
          <div className="flex items-center gap-1.5 mb-3 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <i className={`fas ${getTypeIcon()} text-blue-500 text-xs`}></i>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{getTypeLabel()} detected</span>
          </div>
        )}

        <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium mb-8 max-w-xs mx-auto">
          {loading ? status : t.ocr_desc}
        </p>

        {/* Supported formats info */}
        {!loading && (
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
              <i className="fas fa-file-pdf text-red-500"></i> PDF
            </span>
            <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
              <i className="fas fa-file-word text-blue-500"></i> Word
            </span>
            <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
              <i className="fas fa-image text-green-500"></i> Image
            </span>
          </div>
        )}

        <label className="w-full">
          <div className={`w-full py-3.5 md:py-4 rounded-xl font-black uppercase tracking-widest text-[9px] md:text-[10px] cursor-pointer transition-all flex items-center justify-center gap-2 ${loading ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400' : 'bg-black text-white hover:bg-orange-500'}`}>
            {loading ? <i className="fas fa-brain fa-pulse"></i> : <i className="fas fa-cloud-upload-alt"></i>}
            {loading ? t.ocr_processing : t.ocr_btn}
          </div>
          <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*" onChange={processFile} disabled={loading} />
        </label>

        {!loading && (
          <button onClick={onCancel} className="mt-6 text-zinc-400 font-black uppercase text-[9px] tracking-widest hover:text-orange-500 transition">
            <i className="fas fa-times mr-2"></i> {t.ocr_cancel}
          </button>
        )}
      </div>
    </div>
  );
};
