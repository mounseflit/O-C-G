
import { GoogleGenAI, Type } from "@google/genai";

const AI_MODEL_REASONING = 'gemini-3-flash-preview'; // Switched to Flash for higher rate limits
const AI_MODEL_DOCUMENT = 'gemini-3-flash-preview';
const AI_MODEL_VISION = 'gemini-2.5-flash-image';

export class AIService {
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Helper to execute AI calls with exponential backoff on 429 errors.
   */
  private async withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
    let lastError: any;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error: any) {
        lastError = error;
        // Check for 429 Rate Limit error
        if (error?.message?.includes('429') || error?.status === 'RESOURCE_EXHAUSTED' || error?.message?.includes('quota')) {
          const waitTime = Math.pow(2, i) * 2000 + Math.random() * 1000;
          console.warn(`Rate limit hit. Retrying in ${Math.round(waitTime)}ms... (Attempt ${i + 1}/${maxRetries})`);
          await this.delay(waitTime);
          continue;
        }
        throw error;
      }
    }
    throw lastError;
  }

  private optimizeHtml(html: string): string {
    if (!html) return "";
    return html
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  }

  private safeParseJSON(text: string) {
    try {
      const cleaned = text.replace(/```json|```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (e) {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          return JSON.parse(match[0]);
        } catch (e2) {
          console.error("Failed to parse JSON even with regex match", e2);
          throw new Error("Malformed JSON response from AI");
        }
      }
      throw e;
    }
  }

  async generateDynamicQuestions(data: any) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return this.withRetry(async () => {
      const prompt = `You are a Senior Legal Counsel at Orange. Based on this context:
      - Object: ${data.object}
      - Purpose: ${data.purpose}
      - Client: ${data.clientName}
      - Strategic Context: ${data.context}
      
      Generate exactly 5 critical, specific, and short follow-up questions for the contract template. 
      Focus on business risks, SLAs, and liability.
      Return ONLY a valid JSON array of strings.`;

      const response = await ai.models.generateContent({
        model: AI_MODEL_REASONING,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: { type: Type.ARRAY, items: { type: Type.STRING } }
        }
      });
      return this.safeParseJSON(response.text);
    });
  }

  async generateTemplate(data: any) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return this.withRetry(async () => {
      const prompt = `Generate a professional Orange Business contract template in HTML.
      Inputs:
      - Object: ${data.object}
      - Client: ${data.clientName}
      - Format: ${data.format}
      - Details: ${JSON.stringify(data.dynamicAnswers)}

      Requirements:
      1. Orange #FF7900 branding and professional legal structure.
      2. Use xxxx_VARIABLE placeholders for all specific details.
      3. Return JSON: { "title": "...", "category": "...", "html": "..." }.`;

      const response = await ai.models.generateContent({
        model: AI_MODEL_DOCUMENT,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              category: { type: Type.STRING },
              html: { type: Type.STRING }
            },
            required: ['title', 'category', 'html']
          }
        }
      });
      return this.safeParseJSON(response.text);
    });
  }

  async analyzeDocumentChunk(base64: string, mimeType: string, chunkIndex: number) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return this.withRetry(async () => {
      const response = await ai.models.generateContent({
        model: AI_MODEL_VISION,
        contents: {
          parts: [
            { inlineData: { data: base64, mimeType } },
            { text: `This is part ${chunkIndex + 1} of a larger contract. Reconstruct the text exactly as seen but in clean HTML tags. Replace specific details (names, dates, amounts) with descriptive xxxx_VARIABLE_NAME placeholders. Focus only on structure and content extraction. Return ONLY the HTML snippet.` }
          ]
        }
      });
      return response.text;
    });
  }

  /**
   * Reconstruct a text-based document (from Word or text PDF) with proper formatting
   * Preserves structure, alignment, and creates a faithful reproduction in HTML
   */
  async reconstructTextDocument(rawContent: string, sourceType: 'docx' | 'pdf', sourceInfo: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return this.withRetry(async () => {
      const prompt = `You are reconstructing a legal contract document from extracted text content.

SOURCE TYPE: ${sourceType === 'docx' ? 'Microsoft Word document' : 'Text-based PDF'} (${sourceInfo})

EXTRACTED CONTENT:
${rawContent}

TASK:
Reconstruct this document as clean, semantic HTML:

1. EXACT TEXT PRESERVATION:
   - Keep ALL text exactly as extracted - do not summarize or modify wording
   - Preserve the complete content of every section

2. FORMAT RECONSTRUCTION:
   - Identify and properly format headings (h1, h2, h3) based on context
   - Reconstruct paragraph structure with proper spacing
   - Recreate any lists (bulleted or numbered) that appear in the content
   - Rebuild tables if tabular data is detected

3. DOCUMENT STRUCTURE:
   - Organize into logical sections as they appear in the original
   - Preserve any article/section numbering
   - Use semantic HTML tags only (h1-h6, p, ul, ol, li, table, etc.)

4. PLACEHOLDER CONVERSION:
   - Replace specific values with xxxx_VARIABLE_NAME placeholders:
     * Company/person names → xxxx_COMPANY_NAME, xxxx_CLIENT_NAME
     * Dates → xxxx_CONTRACT_DATE, xxxx_START_DATE, xxxx_END_DATE
     * Amounts/prices → xxxx_AMOUNT, xxxx_PRICE, xxxx_TOTAL
     * Addresses → xxxx_ADDRESS, xxxx_CITY
     * Phone/email → xxxx_PHONE, xxxx_EMAIL
     * ID numbers → xxxx_CONTRACT_NUMBER, xxxx_REFERENCE

5. DO NOT INCLUDE:
   - No <style> tags or inline styles
   - No style attributes
   - No CSS - styling is handled externally

Return JSON:
{
  "title": "Extracted document title",
  "html": "Clean semantic HTML without any styles"
}`;

      const response = await ai.models.generateContent({
        model: AI_MODEL_DOCUMENT,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              html: { type: Type.STRING }
            },
            required: ['title', 'html']
          }
        }
      });

      const result = this.safeParseJSON(response.text);

      // Clean up the HTML
      const styledHtml = this.wrapWithA4Styles(result.html, 1);

      return { title: result.title, html: styledHtml };
    });
  }

  /**
   * Extract exact text content from a single page image
   * Preserves original formatting, structure, and layout
   */
  async extractPageContent(base64: string, mimeType: string, pageNum: number, totalPages: number) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return this.withRetry(async () => {
      const response = await ai.models.generateContent({
        model: AI_MODEL_VISION,
        contents: {
          parts: [
            { inlineData: { data: base64, mimeType } },
            {
              text: `EXACT TEXT EXTRACTION - Page ${pageNum} of ${totalPages}

CRITICAL INSTRUCTIONS:
1. Extract ALL text EXACTLY as it appears on this page - every word, every paragraph, every line
2. Preserve the EXACT formatting: headings, paragraphs, bullet points, numbered lists, tables
3. Maintain the original document structure and hierarchy
4. Keep all spacing and line breaks as they appear
5. Do NOT summarize, paraphrase, or skip any content
6. Do NOT add any content that is not visible on the page

OUTPUT FORMAT:
- Return clean HTML that faithfully reproduces the page content
- Use appropriate HTML tags: <h1>-<h6> for headings, <p> for paragraphs, <ul>/<ol> for lists, <table> for tables
- For specific values (names, dates, amounts, addresses), replace with xxxx_VARIABLE_NAME placeholders
- Examples: "John Smith" → xxxx_CLIENT_NAME, "January 15, 2024" → xxxx_DATE, "$5,000" → xxxx_AMOUNT

Return ONLY the HTML content for this page, no markdown code blocks.` }
          ]
        }
      });
      return response.text.replace(/```html|```/g, '').trim();
    });
  }

  /**
   * Assemble extracted pages into a proper multi-page document
   */
  async assembleMultiPageDocument(pageContents: string[], totalPages: number) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return this.withRetry(async () => {
      const pagesHtml = pageContents.map((content, idx) =>
        `<!-- PAGE ${idx + 1} START -->\n${content}\n<!-- PAGE ${idx + 1} END -->`
      ).join('\n\n');

      const prompt = `You are assembling a multi-page legal document from ${totalPages} extracted pages.

EXTRACTED PAGE CONTENTS:
${pagesHtml}

TASK:
Create a clean HTML document with the following requirements:

1. PAGE STRUCTURE:
   - Wrap each original page content in a div with class "a4-page"
   - Add a page number div at the end of each page: <div class="page-number">Page X of ${totalPages}</div>
   - DO NOT include any <style> tags or inline styles - CSS is handled externally

2. HTML STRUCTURE:
   - Wrap everything in a single container: <div class="document-container">...</div>
   - Use semantic HTML: h1, h2, h3 for headings, p for paragraphs, ul/ol for lists, table for tables
   - Keep the structure clean and simple

3. CONTENT PRESERVATION:
   - Keep ALL extracted text exactly as provided
   - Maintain all headings, paragraphs, lists, and tables
   - Preserve the document flow and structure
   - Keep all xxxx_VARIABLE_NAME placeholders

4. DO NOT INCLUDE:
   - No <style> tags
   - No inline style attributes
   - No CSS classes other than: document-container, a4-page, page-number

Return JSON with:
{
  "title": "Document title extracted from content",
  "html": "Clean HTML without any styles"
}`;

      const response = await ai.models.generateContent({
        model: AI_MODEL_DOCUMENT,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              html: { type: Type.STRING }
            },
            required: ['title', 'html']
          }
        }
      });

      const result = this.safeParseJSON(response.text);

      // Clean up the HTML
      const styledHtml = this.wrapWithA4Styles(result.html, totalPages);

      return { title: result.title, html: styledHtml };
    });
  }

  /**
   * Wrap HTML content with proper structure for editor viewing
   * CSS is handled by index.html - no inline styles needed
   */
  private wrapWithA4Styles(html: string, totalPages: number): string {
    // If already has document structure, just clean it up
    if (html.includes('a4-page') || html.includes('document-container')) {
      // Remove any inline styles that might conflict with editor styles
      return html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/style="[^"]*"/gi, '');
    }

    // If no page structure, wrap content in a simple container
    // The editor CSS will handle all styling
    if (!html.includes('a4-page')) {
      if (totalPages > 1) {
        // For multi-page, create page divs
        return `<div class="document-container">${html}</div>`;
      }
      return html;
    }

    return html;
  }

  async synthesizeContract(chunks: string[]) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    return this.withRetry(async () => {
      const combinedContent = chunks.join('\n\n');

      const prompt = `You have analyzed a legacy contract in parts. Here is the raw extracted HTML content from all parts:
      
      ${combinedContent}

      Task:
      1. Stitch these parts into a single, cohesive, and professional Orange Business Services contract template.
      2. Standardize the HTML structure. Use Orange branding (Headings in #FF7900).
      3. Ensure all placeholders follow the xxxx_VARIABLE_NAME format consistently.
      4. Remove duplicate headers/footers that might have appeared in multiple parts.
      5. Return JSON: { "title": "A descriptive title", "html": "The full synthesized HTML" }.`;

      const response = await ai.models.generateContent({
        model: AI_MODEL_DOCUMENT,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              html: { type: Type.STRING }
            },
            required: ['title', 'html']
          }
        }
      });
      return this.safeParseJSON(response.text);
    });
  }

  async processOCR(base64: string, mimeType: string) {
    const chunk = await this.analyzeDocumentChunk(base64, mimeType, 0);
    return this.synthesizeContract([chunk]);
  }

  async editContract(html: string, instruction: string, selection?: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const optimizedHtml = this.optimizeHtml(html);

    return this.withRetry(async () => {
      const prompt = `Task: Modify the contract HTML based on the following instruction.
      Instruction: "${instruction}"
      ${selection ? `Scope: Only change this specific text within the document: "${selection}"` : "Scope: Apply the change to the whole document where relevant."}
      
      Document HTML:
      ${optimizedHtml}

      Return ONLY the updated HTML. Do not include markdown blocks.`;

      const response = await ai.models.generateContent({
        model: AI_MODEL_DOCUMENT,
        contents: prompt
      });

      return response.text.replace(/```html|```/g, '').trim();
    });
  }
}

export const aiService = new AIService();
