
export interface ContractTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  placeholders: string[];
  isPinned?: boolean;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  company?: string;
  role: 'user' | 'admin';
  preferences?: {
    theme?: 'light' | 'dark';
    language?: 'en' | 'fr';
  };
  createdAt: string;
  lastLogin?: string;
}

export interface WizardData {
  object: string;
  purpose: string;
  context: string;
  clientName: string;
  format: string;
  dynamicQuestions: string[];
  dynamicAnswers: Record<number, string>;
}

export type ViewState = 'library' | 'wizard' | 'prefill' | 'editor' | 'upload' | 'choice';
export type Theme = 'light' | 'dark';
export type Language = 'en' | 'fr';
