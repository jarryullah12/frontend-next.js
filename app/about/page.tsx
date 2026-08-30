import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Zap, Lock, Globe, Users, Target } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about FinovaCalc and our mission to make financial literacy accessible through free and accurate calculators.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-24 pb-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-yellow-500 text-xs font-bold uppercase tracking-wider mb-6">
            About FinovaCalc
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Empowering Your <br/>
            <span className="text-yellow-500">Financial Journey</span>
          </h1>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl leading-relaxed">
            FinovaCalc was founded with a simple belief: everyone deserves access to professional-grade financial tools. We build calculators that are accurate, intuitive, and completely free.
          </p>
          
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
               <Image
                  src="https://plain-eeur-prod-public.komododecks.com/202607/12/TkNSEQstcSQvuTpZX80B/image.jpg"
                  alt="People discussing finances"
                  width={800}
                  height={600}
                  className="w-full object-cover"
                  referrerPolicy="no-referrer"
                  priority
               />
               <div className="absolute bottom-6 right-6 bg-slate-900 text-white p-4 rounded-xl shadow-xl flex items-center gap-4 border border-slate-800">
                <div className="w-12 h-12 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold">Our Mission</div>
                  <div className="text-sm text-slate-400">Simplify Finance</div>
                </div>
              </div>
            </div>
            
            <div>
              <span className="text-yellow-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Making Financial Literacy <br/><span className="text-blue-500">Accessible to All</span></h2>
              <div className="space-y-6 text-slate-600 text-lg">
                <p>
                  At FinovaCalc, we believe that financial literacy is the cornerstone of a secure future. Our mission is to empower individuals, families, and businesses with the tools they need to make informed financial decisions — without the complexity, cost, or confusion that often comes with professional financial software.
                </p>
                <p>
                  Whether you are a first-time homebuyer calculating your mortgage payments, a young professional planning for retirement, or an investor analyzing your returns, our suite of 100+ calculators is designed to give you accurate, real-time results with beautiful visual breakdowns.
                </p>
              </div>
              
              <ul className="mt-8 space-y-4">
                {[
                  "Built on industry-standard financial formulas",
                  "Real-time calculations with visual charts",
                  "Zero data collection — 100% client-side processing",
                  "Completely free with no premium paywalls"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-yellow-600 font-bold tracking-wider uppercase text-sm mb-2 block">What We Stand For</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Core <span className="text-blue-500">Values</span></h2>
            <p className="text-slate-600">These principles guide everything we build and every decision we make at FinovaCalc.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Accuracy First', desc: 'Our calculators use industry-standard financial formulas verified by finance professionals to ensure every result is precise and reliable.', icon: Shield },
              { title: 'Speed & Simplicity', desc: 'Get instant results with our lightning-fast calculators. No sign-ups, no downloads — just enter your numbers and see results in real time.', icon: Zap },
              { title: 'User Privacy', desc: 'All calculations happen directly on your device. We never store, transmit, or sell your financial data. Your privacy is our top priority.', icon: Lock },
              { title: 'Free For Everyone', desc: 'We believe financial literacy should be accessible to all. Every tool on FinovaCalc is 100% free to use with no hidden charges or premium tiers.', icon: Globe },
            ].map((value, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center flex flex-col items-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* CTA */}
      <section className="py-24 bg-white text-center border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Ready to Start Calculating?</h2>
          <p className="text-slate-600 text-lg mb-10">
            Explore our complete suite of 100+ financial calculators and take control of your financial future today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/calculators" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-md font-semibold flex items-center transition-colors">
              Explore All Calculators <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/contact" className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-8 py-3 rounded-md font-semibold transition-colors">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
