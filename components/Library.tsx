
import React, { useState } from 'react';
import { ContractTemplate } from '../types';

interface LibraryProps {
  templates: ContractTemplate[];
  onSelect: (t: ContractTemplate) => void;
  onAdd: () => void;
  onTogglePin: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  t: any;
  theme: string;
  loading?: boolean;
}

export const Library = ({ templates, onSelect, onAdd, onTogglePin, onDuplicate, onDelete, t, theme, loading }: LibraryProps) => {
  const [previewTemplate, setPreviewTemplate] = useState<ContractTemplate | null>(null);

  const pinnedTemplates = templates.filter(template => template.isPinned);
  const otherTemplates = templates.filter(template => !template.isPinned);

  // Added key property to the destructured props of TemplateCard to satisfy TypeScript's check when the component is rendered in a list
  const TemplateCard = ({ tpl }: { tpl: ContractTemplate; key?: string }) => (
    <div
      onClick={() => setPreviewTemplate(tpl)}
      className={`group relative rounded-2xl border transition-all duration-500 cursor-pointer shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col h-[280px] sm:h-[300px] lg:h-[320px] overflow-hidden ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:border-orange-500/50' : 'bg-white border-zinc-100 hover:border-orange-500/30'
        }`}
    >
      <div className={`h-24 sm:h-28 lg:h-32 border-b overflow-hidden relative p-3 group-hover:bg-orange-50/5 transition-colors ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-100'}`}>
        <div className={`absolute inset-x-3 top-3 bottom-[-100px] rounded-t-lg shadow-sm border origin-top transform group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden opacity-80 group-hover:opacity-100 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'}`}>
          <div
            className="text-[5px] p-3 pointer-events-none select-none"
            style={{ zoom: 0.45 }}
            dangerouslySetInnerHTML={{ __html: tpl.content.substring(0, 800) }}
          ></div>
        </div>
        <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent z-10 ${theme === 'dark' ? 'from-zinc-950/80' : 'from-zinc-50/80'}`}></div>
        <div className="absolute top-3 left-3 z-20">
          <span className="bg-orange-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-[0.15em] shadow-lg shadow-orange-500/20">
            {tpl.category}
          </span>
        </div>
      </div>

      <div className={`p-4 sm:p-5 lg:p-6 flex flex-col flex-1 relative z-20 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className={`text-sm sm:text-base font-extrabold group-hover:text-orange-500 transition-colors leading-tight line-clamp-2 ${theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'}`}>
            {tpl.title}
          </h3>
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              onClick={(e) => { e.stopPropagation(); onDuplicate(tpl.id); }}
              title={t.lib_duplicate}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${theme === 'dark' ? 'text-zinc-600 hover:text-orange-500 bg-zinc-800' : 'text-zinc-200 hover:text-orange-500 bg-zinc-50'
                }`}
            >
              <i className="fas fa-copy text-[8px]"></i>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onTogglePin(tpl.id); }}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${tpl.isPinned
                ? 'text-orange-500 bg-orange-500/10'
                : theme === 'dark' ? 'text-zinc-600 hover:text-zinc-400 bg-zinc-800' : 'text-zinc-200 hover:text-zinc-400 bg-zinc-50'
                }`}
            >
              <i className={`${tpl.isPinned ? 'fas' : 'far'} fa-bookmark text-[8px]`}></i>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); if (confirm(t.lib_delete_confirm)) onDelete(tpl.id); }}
              title={t.lib_delete}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${theme === 'dark' ? 'text-zinc-600 hover:text-red-500 bg-zinc-800' : 'text-zinc-200 hover:text-red-500 bg-zinc-50'
                }`}
            >
              <i className="fas fa-trash text-[8px]"></i>
            </button>
          </div>
        </div>

        <p className={`text-[9px] sm:text-[10px] line-clamp-2 mb-3 font-medium leading-relaxed ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}`}>
          {tpl.description}
        </p>

        <div className={`mt-auto pt-3 border-t flex items-center justify-between ${theme === 'dark' ? 'border-zinc-800' : 'border-zinc-50'}`}>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <i className="far fa-keyboard text-[8px] text-zinc-500"></i>
              <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">
                {tpl.placeholders.length} {t.lib_vars}
              </span>
            </div>
            <div className={`w-1 h-1 rounded-full ${theme === 'dark' ? 'bg-zinc-700' : 'bg-zinc-100'}`}></div>
            <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">v1.2</span>
          </div>
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-300 ${theme === 'dark' ? 'bg-orange-500 text-white' : 'bg-black text-white'}`}>
            <i className="fas fa-arrow-right text-[8px]"></i>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-6 md:py-10 px-4 md:px-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6 mb-8 md:mb-12">
        <div className="max-w-lg">
          <div className="inline-flex items-center gap-1.5 bg-black text-white px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.15em] mb-3">
            <i className="fas fa-shield-halved text-orange-500 text-[7px]"></i> {t.lib_hero_badge}
          </div>
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-3 leading-[1.1] ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
            {t.lib_hero_title_1} <span className="text-orange-500">{t.lib_hero_title_2}</span>.
          </h1>
          <p className="text-zinc-500 font-medium text-sm md:text-base leading-relaxed">
            {t.lib_hero_desc}
          </p>
        </div>
        <div className="w-full md:w-auto">
          <button onClick={onAdd} className="w-full md:w-auto bg-orange-500 text-white px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] hover:bg-black transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
            <i className="fas fa-plus text-[8px]"></i> {t.lib_btn_new}
          </button>
        </div>
      </div>

      {pinnedTemplates.length > 0 && (
        <section className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <h2 className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-500">{t.lib_priority}</h2>
            <div className={`h-[1px] flex-1 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-orange-100'}`}></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {pinnedTemplates.map(tpl => <TemplateCard key={tpl.id} tpl={tpl} />)}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <h2 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400">{t.lib_library}</h2>
          <div className={`h-[1px] flex-1 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'}`}></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {otherTemplates.map(tpl => <TemplateCard key={tpl.id} tpl={tpl} />)}
          <div
            onClick={onAdd}
            className={`group rounded-2xl border-2 border-dashed p-6 flex flex-col items-center justify-center text-center transition-all duration-500 cursor-pointer min-h-[280px] sm:min-h-[300px] lg:min-h-[320px] ${theme === 'dark' ? 'border-zinc-800 hover:border-orange-500/50 hover:bg-zinc-900/50' : 'border-zinc-200 hover:border-orange-500/50 hover:bg-orange-50/50'
              }`}
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 shadow-sm ${theme === 'dark' ? 'bg-zinc-800 text-zinc-500 group-hover:bg-orange-500 group-hover:text-white' : 'bg-zinc-50 group-hover:bg-orange-500 group-hover:text-white'
              }`}>
              <i className="fas fa-plus text-sm"></i>
            </div>
            <span className="font-black uppercase text-[8px] tracking-[0.2em] text-zinc-400 group-hover:text-orange-600 transition-colors">
              {t.lib_custom}
            </span>
          </div>
        </div>
      </section>

      {previewTemplate && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div
            className={`w-full max-w-4xl max-h-[85vh] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col relative border ${theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-white/20'
              }`}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewTemplate(null)}
              className="absolute top-3 right-3 md:top-6 md:right-6 w-8 h-8 rounded-lg bg-black text-white hover:bg-orange-500 transition-all z-20 flex items-center justify-center"
            >
              <i className="fas fa-times text-xs"></i>
            </button>

            <div className="flex flex-col md:flex-row h-full overflow-y-auto">
              <div className={`w-full md:w-72 lg:w-80 p-5 md:p-8 flex flex-col border-r ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                }`}>
                <div className="mb-4 md:mb-6">
                  <span className="bg-orange-500 text-white text-[7px] font-black px-2 py-0.5 rounded uppercase tracking-[0.15em] mb-2 inline-block">
                    {previewTemplate.category}
                  </span>
                  <h3 className={`text-xl md:text-2xl font-black mb-3 leading-[1.1] tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    {previewTemplate.title}
                  </h3>
                  <p className="text-zinc-500 text-[10px] md:text-xs font-medium leading-relaxed">
                    {previewTemplate.description}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{t.lib_preview_mapping}</span>
                    <div className="flex flex-wrap gap-1">
                      {previewTemplate.placeholders.slice(0, 3).map(p => (
                        <span key={p} className={`px-1.5 py-0.5 rounded text-[7px] font-bold border ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-400' : 'bg-white border-zinc-200 text-zinc-600'}`}>
                          {p.replace('xxxx_', '')}
                        </span>
                      ))}
                      {previewTemplate.placeholders.length > 3 && <span className="text-[7px] font-bold text-orange-500">+{previewTemplate.placeholders.length - 3}</span>}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => { onSelect(previewTemplate); setPreviewTemplate(null); }}
                  className="w-full mt-auto bg-orange-500 text-white py-3 md:py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] shadow-lg hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {t.lib_preview_confirm} <i className="fas fa-bolt text-[8px]"></i>
                </button>
              </div>

              <div className={`flex-1 p-4 md:p-8 overflow-y-auto hidden md:block ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white/50'}`}>
                <div className={`rounded-xl p-6 md:p-10 shadow-lg border min-h-full max-w-[700px] mx-auto ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-zinc-100'}`}>
                  <div className="opacity-60 select-none pointer-events-none text-[10px] leading-relaxed" dangerouslySetInnerHTML={{ __html: previewTemplate.content }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
