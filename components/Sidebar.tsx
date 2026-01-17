import { AppView } from '../types';
import {
    LayoutDashboard,
    BookOpen,
    ShieldCheck,
    Settings,
    LogOut,
    Globe,
    Sparkles,
} from 'lucide-react';

interface SidebarProps {
    currentView: AppView;
    onChangeView: (view: AppView) => void;
}

type NavItem = {
    view: AppView;
    label: string;
    icon: any; // <- key fix: avoids Lucide forwardRef typing conflicts in arrays
};

const Sidebar = ({ currentView, onChangeView }: SidebarProps) => {
    const navItems: NavItem[] = [
        { view: AppView.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
        { view: AppView.CHAT, label: 'Sentinel AI', icon: Sparkles },
        { view: AppView.GUIDELINES, label: 'Integrity Rules', icon: ShieldCheck },
        { view: AppView.RESOURCES, label: 'Resources', icon: BookOpen },
    ];

    return (
        <div className="h-screen w-64 bg-slate-950 border-r border-slate-800 flex flex-col text-slate-300 fixed left-0 top-0 z-20 shadow-2xl">
            <div className="p-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-600 to-brand-800 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-brand-900/20">
                    TI
                </div>
                <span className="text-xl font-bold text-white tracking-tight">TaxIntegrity</span>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = currentView === item.view;
                    const isSentinel = item.view === AppView.CHAT;
                    const Icon = item.icon as any;

                    return (
                        <button
                            key={item.view}
                            onClick={() => onChangeView(item.view)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${isActive
                                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/40'
                                    : isSentinel
                                        ? 'bg-slate-900 border border-brand-500/30 text-brand-100 shadow-[0_0_15px_rgba(168,85,247,0.05)] hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:border-brand-500/50'
                                        : 'hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            {isSentinel && !isActive && (
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}

                            <Icon
                                size={20}
                                className={
                                    isSentinel && !isActive
                                        ? 'text-brand-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]'
                                        : ''
                                }
                            />

                            <span className={`font-medium ${isSentinel ? 'tracking-wide' : ''}`}>{item.label}</span>

                            {isSentinel && (
                                <span
                                    className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded border flex items-center gap-1 ${isActive
                                            ? 'bg-white/20 border-white/20 text-white'
                                            : 'bg-brand-500/10 border-brand-500/20 text-brand-300 shadow-[0_0_10px_rgba(168,85,247,0.1)]'
                                        }`}
                                >
                                    <div
                                        className={`w-1 h-1 rounded-full ${isActive ? 'bg-white' : 'bg-brand-400'
                                            } animate-pulse`}
                                    />
                                    LIVE
                                </span>
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-900/30">
                <button
                    onClick={() => onChangeView(AppView.HOME)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors group"
                >
                    <Globe size={18} className="group-hover:text-brand-400 transition-colors" />
                    Back to Website
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                    <Settings size={18} />
                    Settings
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
