import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  Info, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  HelpCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Table
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateSIP, formatCurrency, formatNumber } from '../utils/calculations';

const SimulatorPage = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(10);
  const [adjustForInflation, setAdjustForInflation] = useState(false);
  const [inflationRate, setInflationRate] = useState(6);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const results = useMemo(() => {
    return calculateSIP(monthlyInvestment, annualReturn, years, adjustForInflation, inflationRate);
  }, [monthlyInvestment, annualReturn, years, adjustForInflation, inflationRate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const value = rawValue.replace(/[^0-9]/g, '');
    const numValue = value === '' ? 0 : parseInt(value, 10);
    setMonthlyInvestment(Math.min(Math.max(numValue, 0), 100000));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyInvestment(parseInt(e.target.value, 10));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent blur-3xl -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6 bg-gradient-to-r from-white via-indigo-200 to-slate-400 bg-clip-text text-transparent">
              Interactive SIP Growth Simulator
            </h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Understand how compounding and inflation shape your long-term wealth.
            </p>
            <p className="mt-6 text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
              This interactive simulator helps you visualize how systematic investing grows over time.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Parameters Section */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              Investment Parameters
            </h2>

            <div className="space-y-8">
              {/* Monthly Investment */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-400">Monthly Investment</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                    <input
                      type="text"
                      value={monthlyInvestment === 0 ? '' : formatNumber(monthlyInvestment)}
                      onChange={handleInputChange}
                      className="w-32 bg-slate-800 border border-slate-700 rounded-lg py-1.5 pl-7 pr-3 text-right font-semibold text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="500"
                  max="100000"
                  step="500"
                  value={monthlyInvestment}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>₹500</span>
                  <span>₹1,00,000</span>
                </div>
              </div>

              {/* Expected Return */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-400">Expected Annual Return</label>
                  <span className="text-indigo-400 font-bold">{annualReturn}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>1%</span>
                  <span>20%</span>
                </div>
                <p className="text-xs text-slate-500 italic bg-slate-800/50 p-2 rounded border border-slate-700/50">
                  "Historically, Indian equity mutual funds have delivered around 10–14% annual returns over the long term (not guaranteed)."
                </p>
              </div>

              {/* Investment Period */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-400">Investment Period</label>
                  <span className="text-indigo-400 font-bold">{years} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>1 Year</span>
                  <span>40 Years</span>
                </div>
              </div>

              {/* Inflation Toggle & Slider */}
              <div className="pt-4 border-t border-slate-800 space-y-6">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="space-y-0.5">
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Adjust for Inflation</span>
                    <p className="text-xs text-slate-500">Account for purchasing power</p>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={adjustForInflation}
                      onChange={(e) => setAdjustForInflation(e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </div>
                </label>

                <AnimatePresence>
                  {adjustForInflation && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-slate-400">Inflation Rate</label>
                        <span className="text-indigo-400 font-bold">{inflationRate}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="12"
                        step="0.5"
                        value={inflationRate}
                        onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>0%</span>
                        <span>12%</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Educational Insight Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-indigo-500/10 border border-indigo-500/30 rounded-2xl p-6"
          >
            <h3 className="text-indigo-300 font-bold mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Why Starting Early Matters
            </h3>
            <div className="space-y-3">
              <p className="text-sm text-indigo-200/80 leading-relaxed">
                If you delay investing by even 5 years, you lose valuable compounding time. Early investing allows returns to generate their own returns for longer periods.
              </p>
              <div className="pt-2 border-t border-indigo-500/20">
                <p className="text-xs text-indigo-300/70 italic">
                  "For example, investing ₹5,000 per month for 10 years versus 15 years can significantly increase final wealth due to compounding."
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Results & Chart Section */}
        <div className="lg:col-span-8 space-y-8">
          {/* Result Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <p className="text-slate-500 text-sm mb-1">Total Invested</p>
              <h3 className="text-2xl font-bold text-white">{formatCurrency(results.totalInvested)}</h3>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/20">
                  Returns Earned More
                </span>
              </div>
              <p className="text-slate-500 text-sm mb-1">Estimated Returns</p>
              <h3 className="text-2xl font-bold text-emerald-400">{formatCurrency(results.estimatedReturns)}</h3>
            </div>
            <div className="bg-indigo-600 rounded-2xl p-6 shadow-lg shadow-indigo-500/20 relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <span className="px-2 py-0.5 bg-white/20 text-white text-[10px] font-bold rounded-full backdrop-blur-sm">
                  {(results.projectedValue / results.totalInvested).toFixed(1)}x Growth
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-indigo-100 text-xs mb-1 uppercase tracking-wider font-medium">Projected Value</p>
                  <h3 className="text-2xl font-bold text-white">
                    {formatCurrency(results.projectedValue)}
                  </h3>
                </div>
                
                {adjustForInflation && (
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-indigo-200 text-xs mb-1 uppercase tracking-wider font-medium">Real Value (After Inflation)</p>
                    <h3 className="text-xl font-bold text-white">
                      {formatCurrency(results.inflationAdjustedValue!)}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Growth Projection</h3>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-600" />
                  <span className="text-slate-400">Invested</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span className="text-slate-400">Total Value</span>
                </div>
              </div>
            </div>
            
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
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
                      color: '#f8fafc',
                      padding: '12px'
                    }}
                    itemStyle={{ padding: '2px 0' }}
                    formatter={(value: number, name: string) => {
                      const labelMap: Record<string, string> = {
                        invested: 'Total Invested',
                        totalValue: 'Projected Value',
                        inflationAdjustedValue: 'Real Value (After Inflation)'
                      };
                      return [formatCurrency(value), labelMap[name] || name];
                    }}
                    labelFormatter={(label) => `Year ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="totalValue" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    name="totalValue"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="invested" 
                    stroke="#475569" 
                    strokeWidth={2}
                    fill="transparent"
                    name="invested"
                  />
                  {adjustForInflation && (
                    <Area 
                      type="monotone" 
                      dataKey="inflationAdjustedValue" 
                      stroke="#94a3b8" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fill="transparent"
                      name="inflationAdjustedValue"
                    />
                  )}
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <TrendingUp className="w-5 h-5 text-indigo-400 mt-0.5" />
              <p className="text-sm text-slate-400 leading-relaxed">
                "Notice how the curve becomes steeper over time — this is exponential growth caused by compounding, not linear growth."
              </p>
            </div>

            {/* Breakdown Toggle */}
            <div className="mt-8">
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <Table className="w-4 h-4" />
                {showBreakdown ? 'Hide Compounding Breakdown' : 'Show Compounding Breakdown'}
                {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <AnimatePresence>
                {showBreakdown && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 overflow-x-auto border border-slate-800 rounded-xl">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-slate-800/50 text-slate-400">
                          <tr>
                            <th className="px-4 py-3 font-semibold">Year</th>
                            <th className="px-4 py-3 font-semibold">Total Invested</th>
                            <th className="px-4 py-3 font-semibold">Annual Return Earned</th>
                            <th className="px-4 py-3 font-semibold">Total Value</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {results.chartData.map((row) => (
                            <tr key={row.year} className="hover:bg-slate-800/30 transition-colors">
                              <td className="px-4 py-3 text-slate-300">Year {row.year}</td>
                              <td className="px-4 py-3 text-slate-300">{formatCurrency(row.invested)}</td>
                              <td className="px-4 py-3 text-emerald-400">+{formatCurrency(row.annualReturnEarned || 0)}</td>
                              <td className="px-4 py-3 font-medium text-white">{formatCurrency(row.totalValue)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Calculation Explanation */}
          <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-8 mb-12">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-slate-400" />
              How Are These Calculations Done?
            </h3>
            <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
              <p>
                <strong className="text-slate-200">SIP Future Value Formula:</strong> The calculator uses the standard compound interest formula where your monthly investment grows at the selected annual rate, compounded monthly.
              </p>
              <p>
                Each monthly SIP contribution is treated as an independent investment and compounded monthly until the selected investment period ends.
              </p>
              <div className="flex items-start gap-2 text-slate-400 bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
                <Info className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" />
                <p className="text-xs">
                  Projections are calculated using the user-selected annual return rate and assume consistent growth for simulation purposes. Actual market returns vary and are not guaranteed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorPage;
