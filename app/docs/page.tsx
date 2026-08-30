'use client';

import { motion } from 'motion/react';
import { Book, Shield, Calculator, Info, Zap, MessageSquare } from 'lucide-react';

import Link from 'next/link';

const sections = [
  {
    title: 'Getting Started',
    icon: <Zap className="w-5 h-5" />,
    content: 'FinovaCalc is a comprehensive financial calculator suite designed to simplify complex financial planning. Whether you are planning for a home, an investment, or just managing daily expenses, our tools provide accurate insights.',
  },
  {
    title: 'Calculator Categories',
    icon: <Calculator className="w-5 h-5" />,
    content: 'Our platform offers various categories: \n• Loan Calculators (Auto, Personal)\n• Investment Planning (SIP, Lumpsum)\n• Mortgage & EMI Calculators\n• Savings & FD Estimators',
  },
  {
    title: 'Data Privacy',
    icon: <Shield className="w-5 h-5" />,
    content: 'We take your privacy seriously. All calculations are performed on the client-side, meaning your sensitive financial data never leaves your browser unless explicitly saved to a profile.',
  },
  {
    title: 'Professional Accuracy',
    icon: <Info className="w-5 h-5" />,
    content: 'While our algorithms are based on standard financial formulas, results should be used for estimation purposes. We recommend consulting with a financial advisor for critical decisions.',
  },
  {
    title: 'Community & Support',
    icon: <MessageSquare className="w-5 h-5" />,
    content: 'Have questions or feedback? Visit our Contact page to get in touch with our team. We are constantly improving based on user suggestions.',
  },
];

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-yellow-500 p-3 rounded-xl shadow-lg shadow-yellow-500/20">
            <Book className="w-8 h-8 text-slate-900" />
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">Documentation</h1>
            <p className="text-slate-500 text-lg">Learn how to make the most of FinovaCalc tools.</p>
          </div>
        </div>

        <div className="grid gap-8">
          {sections.map((section, index) => (
            <motion.section 
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-yellow-600 bg-yellow-50 p-2 rounded-lg">
                  {section.icon}
                </div>
                <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
              </div>
              <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </motion.section>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-8 bg-slate-900 rounded-2xl text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to calculate?</h3>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Explore our professional suite of financial tools and start planning your future today.
          </p>
          <Link 
            href="/calculators" 
            className="inline-flex items-center justify-center px-6 py-3 bg-yellow-500 text-slate-900 font-bold rounded-xl hover:bg-yellow-400 transition-colors"
          >
            Go to Calculators
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
