
import React from 'react';

export const Choice = ({ onSelectForm, onSelectUpload, onCancel, t }: {
  onSelectForm: () => void,
  onSelectUpload: () => void,
  onCancel: () => void,
  t: any
}) => {
  return (
    <div className="min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] flex items-center justify-center p-3 md:p-5 animate-fade-in">
      <div className="w-full max-w-3xl grid md:grid-cols-2 gap-3 md:gap-5">

        {/* Smart Form Option */}
        <button
          onClick={onSelectForm}
          className="group relative bg-white dark:bg-zinc-900 rounded-2xl md:rounded-3xl p-5 md:p-8 text-left border-2 border-transparent hover:border-orange-500 transition-all duration-500 shadow-lg md:shadow-xl overflow-hidden active:scale-[0.98]"
        >
          <div className="absolute top-0 right-0 p-3 md:p-6 text-orange-500 opacity-5 group-hover:opacity-10 transition-opacity">
            <i className="fas fa-magic text-5xl md:text-7xl"></i>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-500 text-white rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-orange-500/20">
            <i className="fas fa-wand-sparkles text-lg md:text-xl"></i>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white mb-1.5 md:mb-2 uppercase tracking-tighter">{t.choice_builder_title}</h3>
          <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-5 md:mb-8">{t.choice_builder_desc}</p>
          <div className="flex items-center gap-2 text-orange-500 font-black text-[8px] md:text-[9px] uppercase tracking-widest">
            {t.choice_builder_btn} <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
          </div>
        </button>

        {/* Upload Option */}
        <button
          onClick={onSelectUpload}
          className="group relative bg-zinc-900 dark:bg-zinc-800 rounded-2xl md:rounded-3xl p-5 md:p-8 text-left border-2 border-transparent hover:border-orange-500 transition-all duration-500 shadow-lg md:shadow-xl overflow-hidden active:scale-[0.98]"
        >
          <div className="absolute top-0 right-0 p-3 md:p-6 text-white opacity-5 group-hover:opacity-10 transition-opacity">
            <i className="fas fa-file-pdf text-5xl md:text-7xl"></i>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white text-zinc-900 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-white/5">
            <i className="fas fa-upload text-lg md:text-xl"></i>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white mb-1.5 md:mb-2 uppercase tracking-tighter">{t.choice_import_title}</h3>
          <p className="text-xs md:text-sm text-zinc-400 dark:text-zinc-500 font-medium mb-5 md:mb-8">{t.choice_import_desc}</p>
          <div className="flex items-center gap-2 text-white font-black text-[8px] md:text-[9px] uppercase tracking-widest">
            {t.choice_import_btn} <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
          </div>
        </button>

        <div className="md:col-span-2 flex justify-center mt-1 md:mt-2">
          <button onClick={onCancel} className="text-zinc-400 font-black text-[8px] md:text-[9px] uppercase tracking-widest hover:text-orange-500 transition-colors">
            <i className="fas fa-times mr-2"></i> {t.choice_cancel}
          </button>
        </div>
      </div>
    </div>
  );
};
