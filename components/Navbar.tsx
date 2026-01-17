import { AppView } from '../types';
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface NavbarProps {
    currentView: AppView;
    onChangeView: (view: AppView) => void;
}

const Navbar = ({ currentView, onChangeView }: NavbarProps) => {
    const navLinks = [
        { view: AppView.HOME, label: 'Home' },
        { view: AppView.AUDITS, label: 'Tax Audits' },
        { view: AppView.EVASION, label: 'Evasion' },
        { view: AppView.PROGRESS, label: 'Progress' },
        { view: AppView.SOURCES, label: 'Sources' },
    ];

    return (
        <nav className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-8">
                        <button
                            onClick={() => onChangeView(AppView.HOME)}
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-brand-900/20">
                                <ShieldCheck size={24} />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">
                                TaxIntegrity
                            </span>
                        </button>

                        <div className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <button
                                    key={link.view}
                                    onClick={() => onChangeView(link.view)}
                                    className={`text-sm font-medium transition-colors ${currentView === link.view
                                            ? 'text-white'
                                            : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => onChangeView(AppView.SIMULATOR)}
                            className={`hidden md:block px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentView === AppView.SIMULATOR
                                    ? 'bg-slate-800 text-white'
                                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                                }`}
                        >
                            Simulator
                        </button>

                        <button
                            onClick={() => onChangeView(AppView.CHAT)}
                            className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white rounded-lg font-medium transition-all shadow-lg shadow-brand-900/40 hover:shadow-brand-500/25 ring-1 ring-brand-400/50"
                        >
                            <Sparkles size={16} />
                            Launch AI Chat
                            <ArrowRight
                                size={16}
                                className="group-hover:translate-x-0.5 transition-transform"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
