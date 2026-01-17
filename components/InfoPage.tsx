import ReactMarkdown from 'react-markdown';
import { TAX_INTEGRITY_KNOWLEDGE_BASE } from '../constants';
import { BookOpen, ExternalLink, Shield } from 'lucide-react';

const InfoPage = () => {
    return (
        <div className="p-8 md:p-12 overflow-y-auto h-screen animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-brand-900 to-slate-900 rounded-2xl p-8 mb-8 border border-brand-800/50">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-4">TaxIntegrity Guidelines</h1>
                            <p className="text-brand-100 max-w-2xl">
                                These are the official operational principles and auditing standards utilized by the
                                TaxIntegrity framework. This content is synchronized with our RAG AI to provide
                                accurate answers.
                            </p>
                        </div>
                        <Shield className="text-brand-400 w-16 h-16 opacity-50 hidden md:block" />
                    </div>
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-xl">
                    <article className="prose prose-invert prose-lg max-w-none prose-headings:text-brand-400 prose-a:text-brand-400">
                        <ReactMarkdown>{TAX_INTEGRITY_KNOWLEDGE_BASE}</ReactMarkdown>
                    </article>

                    <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center text-slate-400 text-sm">
                        <span>Last Updated: March 2024</span>
                        <a href="#" className="flex items-center gap-2 hover:text-brand-400 transition-colors">
                            <BookOpen size={16} />
                            View Original Documentation
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoPage;
