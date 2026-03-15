import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Layers, 
  Repeat, 
  TrendingUp, 
  Wind, 
  ShieldAlert 
} from 'lucide-react';

const Section = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-indigo-500/30 transition-all group"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
    <div className="space-y-4 text-slate-400 leading-relaxed">
      {children}
    </div>
  </motion.div>
);

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            How It Works
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Master the fundamentals of investing with simple, beginner-friendly explanations.
          </p>
        </motion.div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Section title="What is a Mutual Fund?" icon={Layers}>
          <p>
            A mutual fund is a pool of money collected from many investors to invest in securities like stocks, bonds, and other assets.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Managed by professional fund managers.</li>
            <li>Allows you to diversify your portfolio with small amounts.</li>
            <li>Regulated by SEBI in India for investor protection.</li>
          </ul>
        </Section>

        <Section title="What is SIP?" icon={Repeat}>
          <p>
            SIP (Systematic Investment Plan) is a method of investing a fixed amount regularly in a mutual fund scheme.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Instills financial discipline.</li>
            <li>Benefits from Rupee Cost Averaging (buying more units when prices are low).</li>
            <li>No need to time the market.</li>
          </ul>
        </Section>

        <Section title="What is Compounding?" icon={TrendingUp}>
          <p>
            Compounding is the process where the returns on your investment start generating their own returns.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>It's like a snowball effect — it starts small but grows exponentially.</li>
            <li>Time is the most critical factor in compounding.</li>
            <li>The longer you stay invested, the more powerful compounding becomes.</li>
          </ul>
        </Section>

        <Section title="What is Inflation?" icon={Wind}>
          <p>
            Inflation is the rate at which the general level of prices for goods and services is rising, and consequently, the purchasing power of currency is falling.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>₹100 today will buy less in 10 years.</li>
            <li>Your investments must beat inflation to truly grow your wealth.</li>
            <li>Equity mutual funds are historically effective at beating long-term inflation.</li>
          </ul>
        </Section>

        <Section title="Risk vs Return" icon={ShieldAlert}>
          <p>
            In the world of investing, risk and return are directly related. Higher potential returns usually come with higher risk.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-indigo-300">Equity:</strong> High risk, high potential return.</li>
            <li><strong className="text-indigo-300">Debt:</strong> Low risk, stable but lower returns.</li>
            <li><strong className="text-indigo-300">Hybrid:</strong> Moderate risk, balanced returns.</li>
          </ul>
          <p className="mt-4 text-sm italic text-slate-500">
            "The goal is not to avoid risk, but to manage it according to your financial goals and time horizon."
          </p>
        </Section>
      </div>
    </div>
  );
};

export default HowItWorksPage;
