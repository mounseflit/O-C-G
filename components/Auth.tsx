import React, { useState } from 'react';

interface AuthProps {
    onAuth: (user: any) => void;
    t: any;
    theme: string;
}

export const Auth = ({ onAuth, t, theme }: AuthProps) => {
    const [mode, setMode] = useState<'login' | 'register'>('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { apiService } = await import('../api.service');

            if (mode === 'login') {
                const data = await apiService.login(email, password);
                onAuth(data.user);
            } else {
                if (!name.trim()) {
                    setError('Name is required');
                    setLoading(false);
                    return;
                }
                const data = await apiService.register(email, password, name, company);
                onAuth(data.user);
            }
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    

    const isDark = theme === 'dark';

    return (
        <div className={`min-h-screen flex items-center justify-center p-6 ${isDark ? 'bg-zinc-950' : 'bg-gradient-to-br from-orange-50 to-zinc-100'}`}>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px]"></div>
            </div>

            <div className={`w-full max-w-md relative z-10 ${isDark ? 'bg-zinc-900' : 'bg-white'} rounded-3xl shadow-2xl shadow-orange-500/10 overflow-hidden`}>
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                            <i className="fas fa-file-contract text-white text-xl"></i>
                        </div>
                    </div>
                    <h1 className="text-2xl font-black text-white tracking-tight">Orange Contract Generator</h1>
                    <p className="text-white/80 text-sm mt-2">Smart Legal Document Platform</p>
                </div>

                {/* Tabs */}
                <div className={`flex border-b ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
                    <button
                        onClick={() => { setMode('login'); setError(''); }}
                        className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-all ${mode === 'login'
                                ? 'text-orange-500 border-b-2 border-orange-500'
                                : `${isDark ? 'text-zinc-500' : 'text-zinc-400'} hover:text-orange-500`
                            }`}
                    >
                        {t.auth_login || 'Login'}
                    </button>
                    <button
                        onClick={() => { setMode('register'); setError(''); }}
                        className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-all ${mode === 'register'
                                ? 'text-orange-500 border-b-2 border-orange-500'
                                : `${isDark ? 'text-zinc-500' : 'text-zinc-400'} hover:text-orange-500`
                            }`}
                    >
                        {t.auth_register || 'Register'}
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                            <i className="fas fa-exclamation-circle"></i>
                            {error}
                        </div>
                    )}

                    {mode === 'register' && (
                        <>
                            <div>
                                <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                    {t.auth_name || 'Full Name'} *
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:border-orange-500 ${isDark
                                            ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                                            : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'
                                        }`}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div>
                                <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                    {t.auth_company || 'Company'}
                                </label>
                                <input
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:border-orange-500 ${isDark
                                            ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                                            : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'
                                        }`}
                                    placeholder="Orange Business"
                                />
                            </div>
                        </>
                    )}

                    <div>
                        <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            {t.auth_email || 'Email'} *
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:border-orange-500 ${isDark
                                    ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                                    : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'
                                }`}
                            placeholder="you@company.com"
                            required
                        />
                    </div>

                    <div>
                        <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            {t.auth_password || 'Password'} *
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none focus:border-orange-500 ${isDark
                                    ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500'
                                    : 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'
                                }`}
                            placeholder="••••••••"
                            minLength={6}
                            required
                        />
                        {mode === 'register' && (
                            <p className={`text-xs mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                {t.auth_password_hint || 'Minimum 6 characters'}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        {loading ? (
                            <>
                                <i className="fas fa-circle-notch fa-spin"></i>
                                {t.auth_loading || 'Please wait...'}
                            </>
                        ) : mode === 'login' ? (
                            <>
                                <i className="fas fa-sign-in-alt"></i>
                                {t.auth_login_btn || 'Sign In'}
                            </>
                        ) : (
                            <>
                                <i className="fas fa-user-plus"></i>
                                {t.auth_register_btn || 'Create Account'}
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className={`px-8 pb-8 text-center ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    <p className="text-xs">
                        {mode === 'login'
                            ? (t.auth_no_account || "Don't have an account? ")
                            : (t.auth_have_account || 'Already have an account? ')}
                        <button
                            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
                            className="text-orange-500 font-bold hover:underline"
                        >
                            {mode === 'login' ? (t.auth_register || 'Register') : (t.auth_login || 'Login')}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
