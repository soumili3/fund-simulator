import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Activity, 
  ShieldCheck, 
  Info, 
  AlertCircle 
} from 'lucide-react';
import { formatCurrency } from '../utils/calculations';

const FundCategoriesPage = () => {
  // Simulation: ₹5,000/month for 20 years
  const monthlyInvestment = 5000;
  const years = 20;
  const months = years * 12;

  const calculateData = (rate: number) => {
    const monthlyRate = rate / 12 / 100;
    const data = [];
    for (let y = 0; y <= years; y++) {
      const m = y * 12;
      if (m === 0) {
        data.push(0);
        continue;
      }
      const value = monthlyInvestment * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate);
      data.push(Math.round(value));
    }
    return data;
  };

  const equityData = calculateData(12);
  const hybridData = calculateData(9);
  const debtData = calculateData(7);

  const chartData = Array.from({ length: years + 1 }, (_, i) => ({
    year: i,
    Equity: equityData[i],
    Hybrid: hybridData[i],
    Debt: debtData[i],
  }));

  const categories = [
    {
      title: 'Equity Fund',
      avgReturn: '12%',
      risk: 'High',
      icon: TrendingUp,
      color: '#6366f1',
      description: 'Primarily invests in stocks. Higher potential returns with higher volatility.',
      suitable: 'Investors with higher risk tolerance seeking long-term growth (5+ years).',
    },
    {
      title: 'Hybrid Fund',
      avgReturn: '9%',
      risk: 'Medium',
      icon: Activity,
      color: '#10b981',
      description: 'Mix of equity and debt. Balanced growth and stability.',
      suitable: 'Investors seeking balanced growth with moderate risk.',
    },
    {
      title: 'Debt Fund',
      avgReturn: '7%',
      risk: 'Low',
      icon: ShieldCheck,
      color: '#64748b',
      description: 'Invests in bonds and fixed-income securities. Lower volatility.',
      suitable: 'Conservative investors seeking capital preservation.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Understanding Mutual Fund Categories
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Compare mutual fund categories using simulated projections to understand risk-return differences.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Chart Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Growth Comparison Chart</h2>
              <p className="text-slate-500 text-sm">Simulated Projection – Not Based on Real Fund Data</p>
              <p className="text-slate-400 text-xs mt-1 italic">₹5,000/month for 20 years</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {categories.map((cat) => (
                <div key={cat.title} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs text-slate-400">{cat.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="year" 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `Yr ${val}`}
                />
                <YAxis 
                  stroke="#64748b" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid #1e293b',
                    borderRadius: '12px',
                    color: '#f8fafc'
                  }}
                  formatter={(value: number) => formatCurrency(value)}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="Equity" 
                  stroke="#6366f1" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Hybrid" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="Debt" 
                  stroke="#64748b" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-8 p-4 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex items-start gap-3">
            <Info className="w-5 h-5 text-indigo-400 mt-0.5" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Higher expected returns typically come with higher volatility. Notice how equity funds show steeper growth but may fluctuate more.
            </p>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <motion.div 
              key={cat.title}
              whileHover={{ y: -5 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${cat.color}15` }}>
                  <cat.icon className="w-6 h-6" style={{ color: cat.color }} />
                </div>
                <h3 className="text-xl font-bold text-white">{cat.title}</h3>
              </div>

              <div className="space-y-8 flex-grow">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Average Return</p>
                    <p className="text-xl font-bold text-white">~{cat.avgReturn}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Risk Level</p>
                    <p className="text-xl font-bold text-white">{cat.risk}</p>
                  </div>
                </div>

                <div className="space-y-8 pt-6 border-t border-slate-800/50">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{cat.description}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Suitable for</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{cat.suitable}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-500 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <h4 className="text-amber-500 font-bold text-sm">Important Note</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              The returns shown above are for simulation purposes only. Actual mutual fund returns are subject to market conditions and can be higher or lower than these assumptions. Past performance is not an indicator of future results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundCategoriesPage;
