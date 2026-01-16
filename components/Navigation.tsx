
import React, { useState } from 'react';
import { ViewState, Theme, Language, User } from '../types';

const ORANGE_LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/2048px-Orange_logo.svg.png";

export const Navigation = ({
  currentView,
  setView,
  theme,
  toggleTheme,
  lang,
  setLang,
  t,
  user,
  onLogout
}: {
  currentView: ViewState,
  setView: (v: ViewState) => void,
  theme: Theme,
  toggleTheme: () => void,
  lang: Language,
  setLang: (l: Language) => void,
  t: any,
  user?: User,
  onLogout?: () => void
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="h-14 md:h-16 bg-black text-white px-3 md:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-[100] border-b border-zinc-800">
      <div className="flex items-center gap-2 md:gap-3 cursor-pointer" onClick={() => setView('library')}>
        <img src={ORANGE_LOGO} className="w-6 h-6 md:w-8 md:h-8" alt="Logo" />
        <div className="flex flex-col">
          <span className="font-black text-sm md:text-base lg:text-lg tracking-tighter uppercase leading-none">Orange</span>
          <span className="text-[7px] md:text-[8px] font-bold text-orange-500 uppercase tracking-widest hidden sm:block">Contract Studio</span>
        </div>
      </div>

      <div className="flex gap-2 md:gap-4 lg:gap-6 items-center">
        <div className="hidden lg:flex gap-4 items-center text-[9px] md:text-[10px] font-black uppercase tracking-widest mr-2 border-r border-zinc-800 pr-4">
          <button onClick={() => setView('library')} className={currentView === 'library' ? 'text-orange-500' : 'hover:text-orange-500 transition'}>{t.nav_library}</button>
          <button onClick={() => setView('wizard')} className={currentView === 'wizard' ? 'text-orange-500' : 'hover:text-orange-500 transition'}>{t.nav_wizard}</button>
          <button onClick={() => setView('upload')} className={currentView === 'upload' ? 'text-orange-500' : 'hover:text-orange-500 transition'}>{t.nav_import}</button>
        </div>

        <div className="flex items-center gap-1.5 md:gap-2 bg-zinc-900/50 p-1 rounded-xl border border-zinc-800">
          <div className="flex items-center bg-black rounded-lg p-0.5">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded text-[8px] font-black transition-all ${lang === 'en' ? 'bg-orange-500 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-2 py-0.5 rounded text-[8px] font-black transition-all ${lang === 'fr' ? 'bg-orange-500 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              FR
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg bg-black text-zinc-400 hover:text-orange-500 transition-colors border border-zinc-800"
          >
            <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'} text-[10px]`}></i>
          </button>

          {/* User Menu */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-black hover:bg-zinc-800 transition-colors border border-zinc-800"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded flex items-center justify-center">
                  <span className="text-[9px] font-black text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-[10px] font-bold hidden sm:block max-w-[80px] truncate">{user.name}</span>
                <i className={`fas fa-chevron-down text-[7px] text-zinc-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}></i>
              </button>

              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)}></div>
                  <div className="absolute right-0 top-14 w-64 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50">
                    <div className="p-4 border-b border-zinc-800">
                      <p className="font-bold text-sm">{user.name}</p>
                      <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                      {user.company && (
                        <p className="text-[10px] text-orange-500 mt-1 font-medium">{user.company}</p>
                      )}
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onLogout?.();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-left"
                      >
                        <i className="fas fa-sign-out-alt text-xs"></i>
                        <span className="text-xs font-bold">{t.nav_logout || 'Logout'}</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
