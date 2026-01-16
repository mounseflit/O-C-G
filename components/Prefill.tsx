
import React from 'react';
import { ContractTemplate } from '../types';

// Updated props to include 't' for translations
export const Prefill = ({ template, values, onChange, onConfirm, t }: {
  template: ContractTemplate,
  values: Record<string, string>,
  onChange: (v: Record<string, string>) => void,
  onConfirm: (html: string) => void,
  t: any
}) => {
  const handleLaunch = () => {
    let finalHtml = template.content;
    Object.entries(values).forEach(([key, val]) => {
      const regex = new RegExp(key, 'g');
      const replacement = `<span class="placeholder-highlight">${val || key}</span>`;
      finalHtml = finalHtml.replace(regex, replacement);
    });
    onConfirm(finalHtml);
  };

  return (
    <div className="max-w-xl mx-auto py-12 md:py-16 px-4 min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] flex flex-col justify-center">
      <div className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.05)] border border-zinc-50 relative overflow-hidden">

        <div className="mb-8 md:mb-10">
          <div className="inline-block bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.15em] mb-3">
            {t.pre_badge}
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 mb-1.5">{t.pre_title_1} <span className="text-orange-500">{t.pre_title_2}</span></h2>
          <p className="text-zinc-400 text-[10px] font-medium uppercase tracking-widest leading-relaxed">{t.pre_desc}</p>
        </div>

        <div className="space-y-5">
          {template.placeholders.map(p => (
            <div key={p} className="group animate-fade-in">
              <label className="block text-[8px] font-black text-zinc-400 group-focus-within:text-orange-500 uppercase tracking-[0.15em] mb-1.5 transition-colors">
                {p.replace('xxxx_', '').replace(/_/g, ' ')}
              </label>
              <div className="relative">
                <input
                  className="w-full bg-zinc-50/50 border-2 border-transparent focus:border-orange-500 focus:bg-white rounded-xl px-4 py-3 focus:outline-none text-sm font-semibold text-zinc-800 transition-all duration-300 placeholder:text-zinc-300"
                  value={values[p]}
                  onChange={e => onChange({ ...values, [p]: e.target.value })}
                  placeholder={t.pre_input}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-100 group-focus-within:text-orange-100 transition-colors">
                  <i className="fas fa-pen-nib text-xs"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <button
            onClick={handleLaunch}
            className="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-zinc-900/10 hover:bg-orange-500 transition-all duration-300 active:scale-[0.98]"
          >
            {t.pre_launch}
          </button>
          <p className="text-center text-[8px] font-bold text-zinc-300 uppercase tracking-widest">{t.pre_audit}</p>
        </div>
      </div>
    </div>
  );
};
