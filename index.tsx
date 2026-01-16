
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ViewState, ContractTemplate, Theme, Language, User } from './types';
import { translations } from './translations';
import { apiService } from './api.service';
import { Navigation } from './components/Navigation';
import { Library } from './components/Library';
import { Wizard } from './components/Wizard';
import { Prefill } from './components/Prefill';
import { Editor } from './components/Editor';
import { OCRUpload } from './components/OCRUpload';
import { Choice } from './components/Choice';
import { Auth } from './components/Auth';

const App = () => {
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // App state
  const [view, setView] = useState<ViewState>('library');
  const [theme, setTheme] = useState<Theme>('light');
  const [lang, setLang] = useState<Language>('fr');
  const [templates, setTemplates] = useState<ContractTemplate[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [currentHtml, setCurrentHtml] = useState('');
  const [prefillValues, setPrefillValues] = useState<Record<string, string>>({});

  const t = translations[lang];

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = apiService.getToken();
      if (token) {
        try {
          const data = await apiService.verifyToken();
          setUser(data.user);
          if (data.user.preferences) {
            setTheme(data.user.preferences.theme || 'light');
            setLang(data.user.preferences.language || 'fr');
          }
        } catch {
          apiService.logout();
        }
      }
      setAuthLoading(false);
    };
    checkAuth();
  }, []);

  // Load templates when user logs in
  useEffect(() => {
    if (user) {
      loadTemplates();
    }
  }, [user]);

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Save preferences to server
  const updateTheme = async (newTheme: Theme) => {
    setTheme(newTheme);
    if (user) {
      try {
        await apiService.updateProfile({ preferences: { theme: newTheme } });
      } catch (e) {
        console.error('Failed to save theme preference:', e);
      }
    }
  };

  const updateLang = async (newLang: Language) => {
    setLang(newLang);
    if (user) {
      try {
        await apiService.updateProfile({ preferences: { language: newLang } });
      } catch (e) {
        console.error('Failed to save language preference:', e);
      }
    }
  };

  const loadTemplates = async () => {
    setTemplatesLoading(true);
    try {
      const data = await apiService.getTemplates();
      setTemplates(data.templates.map((t: any) => ({
        id: t._id,
        title: t.title,
        description: t.description,
        category: t.category,
        content: t.content,
        placeholders: t.placeholders,
        isPinned: t.isPinned
      })));
    } catch (e) {
      console.error('Failed to load templates:', e);
    } finally {
      setTemplatesLoading(false);
    }
  };

  const handleAuth = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    if (authenticatedUser.preferences) {
      setTheme(authenticatedUser.preferences.theme || 'light');
      setLang(authenticatedUser.preferences.language || 'en');
    }
  };

  const handleLogout = () => {
    apiService.logout();
    setUser(null);
    setTemplates([]);
    setView('library');
  };

  const handleTemplateSelect = (tpl: ContractTemplate, directToEditor: boolean = false) => {
    setSelectedTemplate(tpl);
    const initialValues: Record<string, string> = {};
    tpl.placeholders.forEach(p => initialValues[p] = '');
    setPrefillValues(initialValues);
    setView('prefill');
  };

  const handleLaunchEditor = (finalHtml: string) => {
    setCurrentHtml(finalHtml);
    setView('editor');
  };

  const handleAddTemplate = async (tpl: ContractTemplate, openImmediately: boolean = false) => {
    try {
      const data = await apiService.createTemplate({
        title: tpl.title,
        description: tpl.description,
        category: tpl.category,
        content: tpl.content,
        placeholders: tpl.placeholders,
        isPinned: tpl.isPinned
      });

      const newTemplate: ContractTemplate = {
        id: data.template._id,
        title: data.template.title,
        description: data.template.description,
        category: data.template.category,
        content: data.template.content,
        placeholders: data.template.placeholders,
        isPinned: data.template.isPinned
      };

      setTemplates([newTemplate, ...templates]);

      if (openImmediately) {
        handleTemplateSelect(newTemplate);
      } else {
        setView('library');
      }
    } catch (e) {
      console.error('Failed to save template:', e);
      alert('Failed to save template. Please try again.');
    }
  };

  const handleTogglePin = async (id: string) => {
    try {
      await apiService.togglePin(id);
      setTemplates(templates.map(t =>
        t.id === id ? { ...t, isPinned: !t.isPinned } : t
      ));
    } catch (e) {
      console.error('Failed to toggle pin:', e);
    }
  };

  const handleDuplicateTemplate = async (id: string) => {
    try {
      const data = await apiService.duplicateTemplate(id);
      const newTemplate: ContractTemplate = {
        id: data.template._id,
        title: data.template.title,
        description: data.template.description,
        category: data.template.category,
        content: data.template.content,
        placeholders: data.template.placeholders,
        isPinned: data.template.isPinned
      };
      setTemplates([newTemplate, ...templates]);
    } catch (e) {
      console.error('Failed to duplicate template:', e);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    try {
      await apiService.deleteTemplate(id);
      setTemplates(templates.filter(t => t.id !== id));
    } catch (e) {
      console.error('Failed to delete template:', e);
    }
  };

  // Show loading spinner during auth check
  if (authLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-zinc-950' : 'bg-zinc-50'}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}`}>Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth screen if not logged in
  if (!user) {
    return <Auth onAuth={handleAuth} t={t} theme={theme} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col selection:bg-orange-500 selection:text-white ${theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-zinc-900'}`}>
      <Navigation
        currentView={view}
        setView={setView}
        theme={theme}
        toggleTheme={() => updateTheme(theme === 'light' ? 'dark' : 'light')}
        lang={lang}
        setLang={updateLang}
        t={t}
        user={user}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {view === 'library' && (
          <Library
            templates={templates}
            onSelect={handleTemplateSelect}
            onAdd={() => setView('choice')}
            onTogglePin={handleTogglePin}
            onDuplicate={handleDuplicateTemplate}
            onDelete={handleDeleteTemplate}
            t={t}
            theme={theme}
            loading={templatesLoading}
          />
        )}

        {view === 'choice' && (
          <Choice
            onSelectForm={() => setView('wizard')}
            onSelectUpload={() => setView('upload')}
            onCancel={() => setView('library')}
            t={t}
          />
        )}

        {view === 'wizard' && (
          <Wizard onComplete={handleAddTemplate} t={t} />
        )}

        {view === 'prefill' && selectedTemplate && (
          <Prefill
            template={selectedTemplate}
            values={prefillValues}
            onChange={setPrefillValues}
            onConfirm={handleLaunchEditor}
            t={t}
          />
        )}

        {view === 'editor' && (
          <Editor
            initialHtml={currentHtml}
            template={selectedTemplate}
            onReset={() => handleTemplateSelect(selectedTemplate!)}
            t={t}
            theme={theme}
          />
        )}

        {view === 'upload' && (
          <OCRUpload onComplete={handleAddTemplate} onCancel={() => setView('library')} t={t} />
        )}
      </main>
    </div>
  );
};

const root = document.getElementById('root');
if (root) createRoot(root).render(<App />);
