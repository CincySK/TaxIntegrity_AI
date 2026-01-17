import { ArrowRight, CheckCircle, Shield, Search, TrendingUp, AlertTriangle, FileText, Lock } from 'lucide-react';
import { AppView } from '../types';

interface PageProps {
    onChangeView: (view: AppView) => void;
}

export const HomePage = ({ onChangeView }: PageProps) => (
    <div className="animate-fade-in">
        {/* Hero Section */}
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] -z-10" />
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                    TaxIntegrity
                </h1>
                <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-2xl mx-auto">
                    AI Solutions for Smarter Tax Audits &amp; Evasion Detection
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => onChangeView(AppView.SIMULATOR)}
                        className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors"
                    >
                        Try Simulator
                    </button>
                    <button
                        onClick={() => onChangeView(AppView.AUDITS)}
                        className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-full font-bold hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                    >
                        Learn More <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid md:grid-cols-3 gap-8">
                <div
                    className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl hover:bg-slate-800 transition-colors cursor-pointer"
                    onClick={() => onChangeView(AppView.AUDITS)}
                >
                    <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                        <FileText size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">AI Tax Audits</h3>
                    <p className="text-slate-400">
                        Streamline triage and document verification with explainable risk scoring.
                    </p>
                </div>

                <div
                    className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl hover:bg-slate-800 transition-colors cursor-pointer"
                    onClick={() => onChangeView(AppView.EVASION)}
                >
                    <div className="w-12 h-12 bg-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center mb-6">
                        <AlertTriangle size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Evasion Detection</h3>
                    <p className="text-slate-400">
                        Uncover hidden income and offshore anomalies using graph analysis.
                    </p>
                </div>

                <div
                    className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl hover:bg-slate-800 transition-colors cursor-pointer"
                    onClick={() => onChangeView(AppView.PROGRESS)}
                >
                    <div className="w-12 h-12 bg-brand-500/20 text-brand-400 rounded-2xl flex items-center justify-center mb-6">
                        <TrendingUp size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Progress Tracking</h3>
                    <p className="text-slate-400">
                        Monitor AI adoption metrics and recovered revenue in real-time.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export const AuditsPage = () => (
    <div className="pt-28 pb-20 px-4 max-w-5xl mx-auto animate-fade-in">
        <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">Tax Audits</h1>
            <p className="text-xl text-slate-400">
                AI-assisted audit triage, document verification, and explainable risk scoring.
            </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center text-white">
                    <Shield size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">How AI speeds up tax audits</h2>
            </div>

            <p className="text-slate-300 leading-relaxed mb-8">
                In real life, audits take time because returns must be selected, reviewed, and validated.
                Responsible AI can speed up the early steps by prioritizing cases, auto-organizing documents,
                and surfacing explainable “risk signals” for human reviewers.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
                {[
                    { title: 'Triage faster', desc: 'Score & route cases to the right team' },
                    { title: 'Document assist', desc: 'Extract key fields and flag missing items' },
                    { title: 'Explainable drivers', desc: 'Show why a case is prioritized' },
                ].map((item, i) => (
                    <div key={i} className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                        <div className="flex items-center gap-2 mb-2 text-brand-400 font-bold">
                            <CheckCircle size={16} />
                            {item.title}
                        </div>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700 text-xs text-slate-500">
                Evidence (public sources): The IRS says it is using AI and advanced analytics to help select
                complex partnerships for audits (IRA Strategic Operating Plan update, Apr 2024).
            </div>
        </div>
    </div>
);

export const EvasionPage = () => (
    <div className="pt-28 pb-20 px-4 max-w-5xl mx-auto animate-fade-in">
        <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">Evasion Detection</h1>
            <p className="text-xl text-slate-400">
                Explainable signals to help investigators spot evasion patterns.
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center">
                <p className="text-slate-400 text-sm mb-2">Gross tax gap (2022)</p>
                <p className="text-4xl font-bold text-white">$696B</p>
                <p className="text-xs text-slate-500 mt-2">Total unpaid/late-paid liability estimate</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center">
                <p className="text-slate-400 text-sm mb-2">Net tax gap (2022)</p>
                <p className="text-4xl font-bold text-white">$606B</p>
                <p className="text-xs text-slate-500 mt-2">After late payments + enforcement</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center">
                <p className="text-slate-400 text-sm mb-2">Largest component</p>
                <p className="text-2xl font-bold text-white mt-1 mb-1">Underreporting</p>
                <p className="text-xs text-slate-500 mt-2">≈77% of gross gap</p>
            </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Search className="text-brand-500" />
                Combating Tax Evasion with AI
            </h2>

            <div className="space-y-4">
                {[
                    'Anomaly detection on filings and third-party data.',
                    'Pattern discovery across related entities (graph analysis).',
                    'Explainable risk scoring for investigators.',
                    'Human-in-the-loop review before any enforcement action.',
                ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-brand-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                        <span className="text-slate-300">{text}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const ProgressPage = () => (
    <div className="pt-28 pb-20 px-4 max-w-5xl mx-auto animate-fade-in">
        <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">Progress</h1>
            <p className="text-xl text-slate-400">Demonstration metrics that scale with AI adoption.</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Real-world IRS AI usage</h2>
            <p className="text-slate-300 mb-8 max-w-3xl">
                Public watchdog reporting shows the IRS is actively developing and using AI across internal
                operations. In a 2024 TIGTA evaluation, the IRS reported an inventory of 68 AI projects.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <div className="text-4xl font-bold text-white mb-2">68</div>
                    <div className="text-sm font-medium text-slate-400">Total Projects</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <div className="text-4xl font-bold text-brand-500 mb-2">30</div>
                    <div className="text-sm font-medium text-slate-400">Operational</div>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                    <div className="text-4xl font-bold text-blue-500 mb-2">38</div>
                    <div className="text-sm font-medium text-slate-400">In Development</div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700 text-xs text-slate-500">
                Source: Treasury Inspector General for Tax Administration (TIGTA), report issued Nov 12, 2024.
            </div>
        </div>
    </div>
);

export const SourcesPage = () => (
    <div className="pt-28 pb-20 px-4 max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-white mb-8">Data Sources</h1>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
            {[
                'IRS "The Tax Gap" (updated Apr 2025)',
                'IRS SOI "What’s New" (net tax gap projection for 2022)',
                'IRS Publication 5869',
                'IRA Strategic Operating Plan update (Apr 2024)',
                'Treasury Inspector General for Tax Administration (TIGTA) 2024 Evaluation',
            ].map((source, i) => (
                <div
                    key={i}
                    className="p-4 border-b border-slate-700 last:border-0 flex items-center gap-3 text-slate-300 hover:bg-slate-700/50 transition-colors"
                >
                    <Lock size={16} className="text-slate-500" />
                    {source}
                </div>
            ))}
        </div>
    </div>
);
