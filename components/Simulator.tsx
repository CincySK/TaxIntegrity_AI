import { useState } from 'react';
import { Settings, BarChart3, Download, RefreshCw, Info } from 'lucide-react';

const Simulator = () => {
    const [adoption, setAdoption] = useState(35);

    // Baseline data (FY 2024 actual)
    const baseline = {
        audits: 505514,
        tax: 29.0, // Billions
        rate: 0.40, // Percent
    };

    // Max uplift assumptions at 100% adoption
    const maxUplift = {
        audits: 0.20, // +20%
        tax: 0.10, // +10%
    };

    // Calculated values
    const multiplier = adoption / 100;
    const simulatedAudits = Math.round(baseline.audits * (1 + maxUplift.audits * multiplier));
    const simulatedTax = baseline.tax * (1 + maxUplift.tax * multiplier);
    const auditUpliftPct = Math.round(maxUplift.audits * multiplier * 100);
    const taxUpliftPct = Math.round(maxUplift.tax * multiplier * 100);

    const handleDownload = () => {
        const report = {
            timestamp: new Date().toISOString(),
            simulation: {
                aiAdoptionLevel: adoption,
                baselineYear: 'FY 2024',
                metrics: {
                    auditsClosed: simulatedAudits,
                    additionalTaxRevenue: `$${simulatedTax.toFixed(1)}B`,
                    upliftFromBaseline: {
                        audits: `+${auditUpliftPct}%`,
                        tax: `+${taxUpliftPct}%`,
                    },
                },
            },
        };

        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tax-integrity-simulation.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Impact Simulator</h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Adjust the AI adoption level to see projected impacts on audit efficiency and revenue recovery.
                    <br />
                    <span className="text-sm opacity-70">(Uses FY 2024 Baselines + Synthetic Projections)</span>
                </p>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 mb-8 shadow-2xl">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    {/* Controls */}
                    <div className="w-full md:w-1/3 space-y-8">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-white font-medium flex items-center gap-2">
                                    <Settings size={18} className="text-brand-400" />
                                    AI Adoption Level
                                </label>
                                <span className="bg-brand-900 text-brand-300 px-3 py-1 rounded-full text-sm font-bold">
                                    {adoption}%
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={adoption}
                                onChange={(e) => setAdoption(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-brand-500"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-2">
                                <span>Pilot</span>
                                <span>Full Scale</span>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 rounded-xl p-4 text-sm text-slate-400">
                            <p className="flex items-start gap-2">
                                <Info size={16} className="mt-0.5 shrink-0" />
                                This simulation applies a linear uplift model based on documented efficiency gains in early pilot programs.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleDownload}
                                className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl transition-colors text-sm font-medium"
                            >
                                <Download size={18} />
                                Export JSON
                            </button>
                            <button
                                onClick={() => setAdoption(35)}
                                className="flex items-center justify-center p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                                title="Reset"
                            >
                                <RefreshCw size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Visualization */}
                    <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <BarChart3 size={64} className="text-brand-500" />
                            </div>
                            <p className="text-slate-400 text-sm font-medium mb-1">Audits Closed (Annual)</p>
                            <div className="flex items-baseline gap-3">
                                <h3 className="text-3xl font-bold text-white">{simulatedAudits.toLocaleString()}</h3>
                                {auditUpliftPct > 0 && <span className="text-brand-400 text-sm font-bold">+{auditUpliftPct}%</span>}
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Baseline: 505,514</p>
                            <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-brand-500 transition-all duration-300"
                                    style={{ width: `${100 * (simulatedAudits / (baseline.audits * 1.25))}%` }}
                                />
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <div className="text-6xl font-serif text-blue-500">$</div>
                            </div>
                            <p className="text-slate-400 text-sm font-medium mb-1">Recovered Revenue</p>
                            <div className="flex items-baseline gap-3">
                                <h3 className="text-3xl font-bold text-white">${simulatedTax.toFixed(1)}B</h3>
                                {taxUpliftPct > 0 && <span className="text-blue-400 text-sm font-bold">+{taxUpliftPct}%</span>}
                            </div>
                            <p className="text-xs text-slate-500 mt-2">Baseline: $29.0B</p>
                            <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 transition-all duration-300"
                                    style={{ width: `${100 * (simulatedTax / (baseline.tax * 1.15))}%` }}
                                />
                            </div>
                        </div>

                        <div className="col-span-1 sm:col-span-2 bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                            <h4 className="text-white font-semibold mb-2">Executive Summary</h4>
                            <p className="text-slate-400 text-sm">
                                At <span className="text-white font-bold">{adoption}% AI adoption</span>, the model predicts an additional
                                <span className="text-white font-bold"> {(simulatedAudits - baseline.audits).toLocaleString()} cases</span> closed
                                and <span className="text-white font-bold">${(simulatedTax - baseline.tax).toFixed(1)}B</span> in revenue.
                                Efficiency gains proceed from automated document verification and risk-based triage.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Simulator;
