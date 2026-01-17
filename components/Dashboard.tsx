import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { AlertTriangle, CheckCircle, Clock, Activity } from 'lucide-react';
import { MOCK_AUDITS } from '../constants';

const data = [
    { name: 'Mon', audits: 4 },
    { name: 'Tue', audits: 7 },
    { name: 'Wed', audits: 5 },
    { name: 'Thu', audits: 12 },
    { name: 'Fri', audits: 9 },
    { name: 'Sat', audits: 3 },
    { name: 'Sun', audits: 2 },
];

type StatCardProps = {
    title: string;
    value: string;
    icon: any; // Lucide icons are forwardRef components; keep this flexible
    color: string;
};

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex items-center justify-between">
        <div>
            <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-full bg-opacity-20 ${color}`}>
            <Icon className={color.replace('bg-', 'text-').replace('bg-opacity-20', '')} size={24} />
        </div>
    </div>
);

const Dashboard = () => {
    return (
        <div className="p-8 space-y-8 animate-fade-in">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Audit Dashboard</h1>
                <p className="text-slate-400">Overview of current tax integrity status and AI audit performance.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Audits" value="1,248" icon={Activity} color="bg-blue-500 bg-opacity-20 text-blue-500" />
                <StatCard
                    title="Compliance Rate"
                    value="94.2%"
                    icon={CheckCircle}
                    color="bg-green-500 bg-opacity-20 text-green-500"
                />
                <StatCard title="Risk Flags" value="18" icon={AlertTriangle} color="bg-red-500 bg-opacity-20 text-red-500" />
                <StatCard title="Avg. Processing" value="1.2s" icon={Clock} color="bg-brand-500 bg-opacity-20 text-brand-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[400px]">
                <div className="lg:col-span-2 bg-slate-800 border border-slate-700 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Weekly Audit Volume</h3>
                        <button className="text-sm text-brand-400 hover:text-brand-300">View Report</button>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                                <XAxis dataKey="name" stroke="#a3a3a3" axisLine={false} tickLine={false} />
                                <YAxis stroke="#a3a3a3" axisLine={false} tickLine={false} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', color: '#fff' }}
                                    cursor={{ fill: '#262626', opacity: 0.4 }}
                                />
                                <Bar dataKey="audits" radius={[4, 4, 0, 0]}>
                                    {data.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill="#a855f7" />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 overflow-hidden flex flex-col">
                    <h3 className="text-lg font-semibold text-white mb-6">Recent Activities</h3>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-hide">
                        {MOCK_AUDITS.map((audit) => (
                            <div
                                key={audit.id}
                                className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700/50"
                            >
                                <div>
                                    <h4 className="text-sm font-medium text-white">{audit.entityName}</h4>
                                    <p className="text-xs text-slate-500">{audit.id}</p>
                                </div>
                                <div className="text-right">
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full font-medium ${audit.status === 'Compliant'
                                                ? 'bg-green-500/20 text-green-400'
                                                : audit.status === 'Flagged'
                                                    ? 'bg-red-500/20 text-red-400'
                                                    : 'bg-yellow-500/20 text-yellow-400'
                                            }`}
                                    >
                                        {audit.status}
                                    </span>
                                    <p className="text-xs text-slate-500 mt-1">Risk: {audit.riskScore}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
