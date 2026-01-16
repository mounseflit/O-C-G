
import React, { useState, useRef, useEffect } from 'react';
import { aiService } from '../ai.service';
import { audioService } from '../audio.service';
import { ContractTemplate } from '../types';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export const Editor = ({ initialHtml, template, onReset, t, theme }: { initialHtml: string, template: ContractTemplate | null, onReset: () => void, t: any, theme: string }) => {
  const [html, setHtml] = useState(initialHtml);
  const [prompt, setPrompt] = useState('');
  const [selection, setSelection] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleUpdate = async (instruction?: string) => {
    const text = instruction || prompt;
    if (!text) return;

    const userMsg: ChatMessage = { role: 'user', text, timestamp: new Date() };
    setHistory(prev => [...prev, userMsg]);

    setLoading(true);
    setPrompt('');

    try {
      const newHtml = await aiService.editContract(html, text, selection || undefined);
      setHtml(newHtml);

      const assistantMsg: ChatMessage = {
        role: 'assistant',
        text: selection
          ? `Clause refined.`
          : `Document updated.`,
        timestamp: new Date()
      };
      setHistory(prev => [...prev, assistantMsg]);
      setSelection(null);
    } catch (e) {
      console.error(e);
      setHistory(prev => [...prev, { role: 'assistant', text: 'Error refining contract.', timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.toString().trim().length > 3) {
      setSelection(sel.toString());
    } else {
      setSelection(null);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) return;
    setIsRecording(true);
    try {
      await audioService.startTranscription(
        (text) => setPrompt(prev => (prev + ' ' + text).trim()),
        () => setIsRecording(false)
      );
    } catch (err) {
      setIsRecording(false);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const exportToDoc = () => {
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + html + footer;
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'contract.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
    setIsExportModalOpen(false);
  };

  const handlePrint = () => {
    window.print();
    setIsExportModalOpen(false);
  };

  return (
    <div ref={containerRef} className={`h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] flex overflow-hidden relative selection:bg-orange-200 dark:selection:bg-orange-900 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-[#F0F2F5]'}`}>

      <div className="flex-1 flex flex-col relative overflow-hidden">
        <header className={`h-12 md:h-14 border-b px-3 md:px-6 flex items-center justify-between shrink-0 z-50 shadow-sm ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'}`}>
          <div className="flex items-center gap-2">
            <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-widest hidden sm:block">{t.ed_ai_live}</span>
            <h2 className={`font-extrabold text-[10px] md:text-xs line-clamp-1 ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'}`}>{template?.title || "Contract Editor"}</h2>
          </div>

          <div className={`flex items-center gap-0.5 md:gap-1 p-0.5 rounded-lg border no-print ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
            <button
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded hover:shadow-sm text-zinc-500 transition-all ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-white'}`}
            >
              <i className="fas fa-minus text-[8px]"></i>
            </button>
            <span className="text-[8px] font-black text-zinc-400 w-8 text-center uppercase tracking-wider">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded hover:shadow-sm text-zinc-500 transition-all ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-white'}`}
            >
              <i className="fas fa-plus text-[8px]"></i>
            </button>
            <div className={`w-[1px] h-3 mx-0.5 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
            <button
              onClick={toggleFullScreen}
              className={`w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded hover:shadow-sm text-zinc-500 transition-all ${isFullScreen ? 'text-orange-500' : ''} ${theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-white'}`}
            >
              <i className={`fas ${isFullScreen ? 'fa-compress' : 'fa-expand'} text-[8px]`}></i>
            </button>
          </div>

          <div className="flex items-center gap-1.5 no-print">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="h-7 md:h-8 px-3 md:px-4 bg-orange-500 text-white text-[8px] font-black uppercase tracking-widest rounded-lg hover:bg-black transition-all flex items-center gap-1.5"
            >
              <i className="fas fa-file-export text-[8px]"></i> <span className="hidden sm:inline">{t.ed_export}</span>
            </button>
            <button onClick={() => setIsSidebarOpen(true)} className={`lg:hidden w-7 h-7 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-50 text-zinc-400'}`}>
              <i className="fas fa-history text-[10px]"></i>
            </button>
          </div>
        </header>

        <div className={`flex-1 overflow-auto p-3 md:p-6 pb-48 transition-all duration-300 ${theme === 'dark' ? 'bg-zinc-950' : 'bg-[#F0F2F5]'}`}>
          <div
            className="editor-zoom-wrapper mx-auto transition-all duration-200"
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              width: zoom < 100 ? `${100 / (zoom / 100)}%` : '100%',
              maxWidth: zoom < 100 ? 'none' : undefined
            }}
          >
            <div
              ref={editorRef}
              className={`editor-document-container mx-auto no-print focus:outline-none animate-fade-in shadow-xl relative ${theme === 'dark' ? 'bg-white text-zinc-900' : 'bg-white text-zinc-900'}`}
              contentEditable
              suppressContentEditableWarning
              onMouseUp={handleSelection}
              dangerouslySetInnerHTML={{ __html: html }}
              onBlur={e => setHtml(e.currentTarget.innerHTML)}
            />
          </div>
        </div>

        <div className="absolute bottom-4 md:bottom-8 left-0 right-0 px-3 md:px-4 no-print pointer-events-none">
          <div className="max-w-2xl mx-auto pointer-events-auto">

            {selection && (
              <div className="mb-2 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 animate-fade-in shadow-2xl flex items-center gap-3 group">
                <div className="flex-1 overflow-hidden">
                  <span className="text-[7px] font-black text-orange-500 uppercase tracking-widest block mb-0.5">Selection</span>
                  <p className="text-white/60 text-[9px] italic line-clamp-1">"{selection}"</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button onClick={() => handleUpdate(`Simplify this.`)} className="bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded text-[7px] font-black uppercase tracking-widest text-white transition-all">Simplify</button>
                  <button onClick={() => setSelection(null)} className="w-6 h-6 flex items-center justify-center text-white/30 hover:text-white transition-colors">
                    <i className="fas fa-times text-[8px]"></i>
                  </button>
                </div>
              </div>
            )}

            <div className={`backdrop-blur-xl border rounded-xl md:rounded-2xl p-1.5 md:p-2.5 flex flex-col gap-1.5 shadow-xl transition-all ${theme === 'dark' ? 'bg-zinc-900/90 border-zinc-800' : 'bg-white/90 border-zinc-200'}`}>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleRecording}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 transition-all ${isRecording ? 'bg-red-500 text-white animate-pulse' : theme === 'dark' ? 'bg-zinc-800 text-zinc-400 hover:bg-orange-500 hover:text-white' : 'bg-zinc-100 text-zinc-500 hover:bg-orange-500 hover:text-white'}`}
                >
                  <i className={`fas ${isRecording ? 'fa-stop' : 'fa-microphone'} text-sm`}></i>
                </button>

                <div className="flex-1 relative flex items-center">
                  <input
                    className={`w-full h-8 md:h-10 bg-transparent px-1 focus:outline-none text-xs md:text-sm font-medium ${theme === 'dark' ? 'text-white placeholder:text-zinc-700' : 'text-zinc-900 placeholder:text-zinc-300'}`}
                    placeholder={selection ? t.ed_placeholder_sel : t.ed_placeholder}
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleUpdate()}
                  />

                  <div className="flex items-center gap-1 pr-1">
                    {loading ? (
                      <div className="bg-orange-500 text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                        <i className="fas fa-circle-notch fa-spin text-[7px]"></i>
                        <span className="text-[7px] font-black uppercase tracking-widest">{t.ed_drafting}</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleUpdate()}
                        disabled={!prompt}
                        className="bg-black text-white w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-all disabled:opacity-20 active:scale-90"
                      >
                        <i className="fas fa-paper-plane text-[10px]"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className={`fixed lg:relative inset-y-0 right-0 z-50 w-60 md:w-64 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} transition-transform duration-300 flex flex-col border-l no-print ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <div className={`p-4 md:p-5 border-b ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-100'}`}>
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-orange-500 text-white rounded-lg flex items-center justify-center shadow">
                <i className="fas fa-history text-[10px]"></i>
              </div>
              <div>
                <h3 className="text-[8px] font-black uppercase tracking-[0.15em] text-orange-500 leading-none mb-0.5">{t.ed_activity}</h3>
                <p className={`text-[10px] font-bold leading-none ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{t.ed_history}</p>
              </div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className={`lg:hidden w-6 h-6 rounded text-[10px] ${theme === 'dark' ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-400'}`}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <button onClick={onReset} className={`w-full text-left px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest transition-colors flex items-center justify-between group ${theme === 'dark' ? 'hover:bg-zinc-800 text-zinc-500' : 'hover:bg-zinc-50 text-zinc-400'}`}>
            <span>{t.ed_reset}</span>
            <i className="fas fa-undo text-[7px] group-hover:rotate-[-45deg] transition-transform"></i>
          </button>
        </div>

        <div className={`flex-1 overflow-y-auto p-3 md:p-4 space-y-3 ${theme === 'dark' ? 'bg-zinc-950/50' : 'bg-zinc-50/50'}`}>
          {history.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 px-4">
              <i className="fas fa-comment-alt text-xl mb-3 text-zinc-400"></i>
              <p className="text-[7px] uppercase font-black tracking-[0.15em] leading-relaxed">{t.ed_log_empty}</p>
            </div>
          )}
          {history.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in`}>
              <div className={`max-w-[90%] p-2.5 rounded-xl text-[9px] leading-relaxed shadow-sm ${msg.role === 'user'
                ? 'bg-black text-white rounded-tr-none'
                : theme === 'dark' ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-tl-none' : 'bg-white text-zinc-700 border border-zinc-200 rounded-tl-none'
                }`}>
                {msg.text}
              </div>
              <span className="text-[6px] font-bold text-zinc-500 mt-1 uppercase tracking-widest">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </aside>

      {isExportModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in no-print">
          <div className={`w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden p-8 md:p-12 relative border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-white/20'}`}>
            <button onClick={() => setIsExportModalOpen(false)} className="absolute top-8 right-8 text-zinc-500 hover:text-orange-500 transition-colors">
              <i className="fas fa-times text-xl"></i>
            </button>
            <div className="mb-10">
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-orange-500' : 'bg-zinc-50 border-zinc-100 text-orange-500'}`}>
                <i className="fas fa-file-export text-xl md:text-2xl"></i>
              </div>
              <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{t.ed_export} <span className="text-orange-500">Framework</span></h3>
              <p className="text-zinc-500 text-xs md:text-sm font-medium leading-relaxed">{t.export_desc}</p>
            </div>
            <div className="space-y-4">
              <button onClick={exportToDoc} className={`w-full flex items-center gap-6 p-6 rounded-3xl border-2 transition-all text-left group ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 hover:border-orange-500' : 'bg-white border-zinc-50 hover:border-orange-500'}`}>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center text-lg shadow-sm"><i className="fas fa-file-word"></i></div>
                <div className="flex-1">
                  <span className={`block font-black text-[10px] md:text-[11px] uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Word</span>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">.doc editable</span>
                </div>
              </button>
              <button onClick={handlePrint} className={`w-full flex items-center gap-6 p-6 rounded-3xl border-2 transition-all text-left group ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 hover:border-orange-500' : 'bg-white border-zinc-50 hover:border-orange-500'}`}>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center text-lg shadow-sm"><i className="fas fa-file-pdf"></i></div>
                <div className="flex-1">
                  <span className={`block font-black text-[10px] md:text-[11px] uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>PDF</span>
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">.pdf format</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
