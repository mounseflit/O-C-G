
import React, { useState, useEffect, useRef } from 'react';
import { aiService } from '../ai.service';
import { WizardData, ContractTemplate } from '../types';

// Updated props to include 't' for translations
export const Wizard = ({ onComplete, t }: { onComplete: (t: ContractTemplate) => void, t: any }) => {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState(1);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WizardData>({
    object: '', purpose: '', context: '', clientName: '', format: '',
    dynamicQuestions: [], dynamicAnswers: {}
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to top on step change for mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Focus input after transition
    const timeout = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(timeout);
  }, [step, phase]);

  const initialQuestions = [
    { key: 'format', label: 'Framework Type', options: ['Master Agreement', 'Service Order', 'MOU', 'NDA', 'SLA', 'Distribution DTC', 'Distribution GP', 'Distribution Fixe', 'Distribution POSTP', 'Recharge', 'Partenariat', 'GNV', 'Avenant'], sublabel: 'Each framework follows distinct legal protocols.' },
    { key: 'clientName', label: 'Counterparty', sublabel: 'The legal entity name for this agreement.', placeholder: 'e.g. L’Oréal Paris' },
    { key: 'object', label: 'Core Object', sublabel: 'What is the primary service being delivered?', placeholder: 'e.g. Managed SD-WAN Services' },
    { key: 'purpose', label: 'Strategic Goal', sublabel: 'The business justification for this contract.', placeholder: 'e.g. Network modernization' },
    { key: 'context', label: 'Regulatory Scope', sublabel: 'Specific compliance requirements or constraints.', placeholder: 'e.g. GDPR & Local Data Residency' }
  ];

  const handleNext = async () => {
    if (phase === 1) {
      if (step < initialQuestions.length - 1) {
        setStep(s => s + 1);
      } else {
        setLoading(true);
        try {
          const dynQs = await aiService.generateDynamicQuestions(data);
          setData(prev => ({ ...prev, dynamicQuestions: dynQs }));
          setPhase(2);
          setStep(0);
        } catch (error) {
          alert("Connection error while architecting questions. Please try again.");
          console.error("Wizard Phase 1 error:", error);
        } finally {
          setLoading(false);
        }
      }
    } else {
      if (step < data.dynamicQuestions.length - 1) {
        setStep(s => s + 1);
      } else {
        setLoading(true);
        try {
          const res = await aiService.generateTemplate(data);
          onComplete({
            id: `gen-${Date.now()}`,
            title: res.title,
            category: res.category,
            description: `AI-architected ${data.format} for ${data.clientName}.`,
            content: res.html,
            placeholders: res.html.match(/xxxx_[A-Z0-9_]+/g) || []
          });
        } catch (error) {
          alert("Error generating final template. The response might have been truncated. Please try a simpler object.");
          console.error("Wizard Phase 2 error:", error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const currentQ = phase === 1 ? initialQuestions[step] : {
    label: data.dynamicQuestions[step],
    placeholder: 'Type your answer...',
    sublabel: 'Custom AI probe to sharpen the contract terms.'
  };

  const val = phase === 1 ? (data as any)[(currentQ as any).key] : data.dynamicAnswers[step] || '';

  return (
    <div className="min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-64px)] bg-white flex flex-col items-center justify-center p-4 md:p-8 overflow-x-hidden relative">
      <div className="absolute top-0 right-0 w-[250px] md:w-[600px] h-[250px] md:h-[600px] bg-orange-500/5 rounded-full blur-[50px] md:blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10"></div>

      <div className="w-full max-w-4xl relative flex flex-col min-h-[350px] md:min-h-[480px]">

        {/* Progress Header */}
        <div className="flex items-center gap-3 md:gap-8 mb-6 md:mb-10 animate-fade-in px-2">
          <div className="flex items-center gap-1.5 md:gap-3">
            <span className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[9px] font-black ${phase === 1 ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'}`}>
              {phase === 1 ? '1' : <i className="fas fa-check"></i>}
            </span>
            <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.15em] hidden sm:inline ${phase === 1 ? 'text-zinc-900' : 'text-zinc-300'}`}>{t.wiz_step_1}</span>
          </div>
          <div className="h-[2px] w-4 md:w-8 bg-zinc-100 hidden sm:block"></div>
          <div className="flex items-center gap-1.5 md:gap-3">
            <span className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[9px] font-black ${phase === 2 ? 'bg-orange-500 text-white' : 'bg-zinc-100 text-zinc-400'}`}>2</span>
            <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-[0.15em] hidden sm:inline ${phase === 2 ? 'text-zinc-900' : 'text-zinc-300'}`}>{t.wiz_step_2}</span>
          </div>

          {loading && (
            <div className="ml-auto flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-zinc-900 text-white rounded-lg md:rounded-xl animate-pulse">
              <i className="fas fa-brain text-[9px] md:text-[10px] text-orange-500"></i>
              <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest whitespace-nowrap">{t.wiz_architecting}</span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div key={`${phase}-${step}`} className="flex-1 flex flex-col animate-fade-in px-2">
          <div className="mb-1.5 md:mb-3 flex items-center gap-2">
            <span className="text-orange-500 font-black text-[8px] uppercase tracking-[0.3em]">{t.wiz_q_counter} {phase === 1 ? step + 1 : step + 6} {t.wiz_of} 10</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-zinc-900 leading-[1.1] mb-3 md:mb-4 tracking-tighter">
            {currentQ.label}
          </h2>
          {(currentQ as any).sublabel && (
            <p className="text-zinc-400 text-sm md:text-base font-medium mb-6 md:mb-10 max-w-2xl leading-relaxed">
              {(currentQ as any).sublabel}
            </p>
          )}

          <div className="flex-1">
            {(currentQ as any).options ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                {(currentQ as any).options.map((opt: string) => (
                  <button
                    key={opt}
                    onClick={() => { setData({ ...data, format: opt }); handleNext(); }}
                    className={`p-4 md:p-6 rounded-xl md:rounded-2xl border-2 text-left transition-all duration-300 flex flex-col justify-between h-24 md:h-32 group relative overflow-hidden ${data.format === opt
                      ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                      : 'border-zinc-100 bg-white text-zinc-600 hover:border-orange-500 hover:bg-zinc-50'
                      }`}
                  >
                    <div className="absolute top-3 right-4 text-lg md:text-xl opacity-10 group-hover:opacity-20 transition-opacity">
                      <i className={`fas ${opt === 'NDA' ? 'fa-lock' : opt === 'MOU' ? 'fa-handshake' : opt === 'SLA' ? 'fa-clipboard-check' : opt === 'Distribution DTC' ? 'fa-store' : opt === 'Distribution GP' ? 'fa-users' : opt === 'Distribution Fixe' ? 'fa-home' : opt === 'Distribution POSTP' ? 'fa-mobile-alt' : opt === 'Recharge' ? 'fa-battery-full' : opt === 'Partenariat' ? 'fa-hands-helping' : opt === 'GNV' ? 'fa-gas-pump' : opt === 'Avenant' ? 'fa-file-alt' : 'fa-file-signature'}`}></i>
                    </div>
                    <span className="font-black uppercase tracking-[0.25em] text-[7px] md:text-[8px] mb-1">{opt}</span>
                    <div className="flex items-center gap-2 font-bold text-[10px]">
                      Select Type <i className="fas fa-chevron-right text-[9px] group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="max-w-3xl relative group">
                <input
                  ref={inputRef}
                  className="w-full bg-transparent border-b-[3px] md:border-b-4 border-zinc-100 focus:border-orange-500 focus:outline-none text-xl md:text-3xl py-4 md:py-6 font-bold placeholder:text-zinc-50 transition-all duration-500"
                  placeholder={(currentQ as any).placeholder}
                  value={val}
                  onChange={e => {
                    if (phase === 1) setData({ ...data, [(currentQ as any).key]: e.target.value });
                    else setData({ ...data, dynamicAnswers: { ...data.dynamicAnswers, [step]: e.target.value } });
                  }}
                  onKeyDown={e => e.key === 'Enter' && val && handleNext()}
                />
                <div className="absolute bottom-1.5 md:bottom-3 right-0 flex items-center gap-2 text-zinc-200 group-focus-within:text-orange-500 transition-colors">
                  <span className="text-[9px] font-black uppercase tracking-widest hidden sm:inline">Press Enter</span>
                  <i className="fas fa-level-down-alt rotate-90 text-xs"></i>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-6 md:mt-10 pt-6 md:pt-8 flex items-center justify-between border-t border-zinc-50 px-2">
          <button
            onClick={() => step > 0 ? setStep(s => s - 1) : phase === 2 && (setPhase(1), setStep(initialQuestions.length - 1))}
            disabled={step === 0 && phase === 1}
            className="text-zinc-400 font-black text-[9px] uppercase tracking-[0.25em] hover:text-orange-500 disabled:opacity-0 transition-colors flex items-center gap-2"
          >
            <i className="fas fa-long-arrow-alt-left"></i> {t.wiz_prev}
          </button>

          <div className="flex items-center gap-3">
            {!loading && val && !(currentQ as any).options && (
              <button
                onClick={handleNext}
                className="bg-black text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.25em] md:tracking-[0.3em] hover:bg-orange-500 transition-all shadow-lg active:scale-95 flex items-center gap-3 group"
              >
                {phase === 2 && step === data.dynamicQuestions.length - 1 ? t.wiz_build : t.wiz_next}
                <i className="fas fa-arrow-right text-[9px] group-hover:translate-x-1 transition-transform"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
