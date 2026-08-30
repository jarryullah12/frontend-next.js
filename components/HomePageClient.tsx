'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Home,
  PiggyBank,
  PieChart,
} from 'lucide-react';
import { motion } from 'motion/react';

import { calculators } from '@/lib/calculators';

export type HomeLatestPost = {
  id: string | number;
  slug: string;
  title: string;
  content?: string | null;
  category?: string | null;
  author?: string | null;
  image_url?: string | null;
  created_at: string;
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  viewport: { once: true },
};

export function HomePageClient({ latestPosts }: { latestPosts: HomeLatestPost[] }) {
  const featuredIds = ['emi', 'compound-interest', 'mortgage', 'sip', 'lumpsum', 'roi'];
  const featuredCalculators = featuredIds.map((id) => calculators.find((c) => c.id === id)).filter(Boolean);

  return (
    <div>
      <section className="bg-slate-900 text-white pt-20 pb-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-yellow-500 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                #1 Free Finance Calculator Platform
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Master Your <br />
                <span className="text-yellow-500">Financial Future</span>
                <br />
                with FinovaCalc
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl leading-relaxed">
                Professional-grade financial tools to help you make smarter decisions. Calculate loans, plan investments,
                and secure your future — all for free.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/calculators"
                  className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-6 py-3 rounded-md font-semibold flex items-center transition-colors"
                >
                  Explore Calculators <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/about"
                  className="bg-transparent hover:bg-slate-800 border border-slate-700 text-white px-6 py-3 rounded-md font-semibold flex items-center transition-colors"
                >
                  <ChevronRight className="mr-2 w-5 h-5 text-slate-400" /> Learn More
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative lg:h-[400px] flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-800">
                <Image
                  src="https://plain-eeur-prod-public.komododecks.com/202607/13/Rz2ttBZJxCCfu1hOsPQU/image.png"
                  alt="Financial Dashboard"
                  fill
                  className=""
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white text-slate-900 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-bold">
                  <Calculator className="w-4 h-4 text-yellow-500" /> 100+ Calculators
                </div>
                <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm border border-slate-700">
                  <div className="text-emerald-400 font-bold flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" /> +24.5%
                  </div>
                  <div className="text-xs text-slate-400">Investment Growth</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeIn} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-yellow-600 font-bold tracking-wider uppercase text-sm mb-2 block">Our Tools</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Powerful Financial <span className="text-blue-500">Calculators</span>
            </h2>
            <p className="text-slate-600">
              Professional-grade tools designed for everyday financial decisions. Fast, accurate, and beautifully
              visualized.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {featuredCalculators.map((calc) => {
              const icons = {
                emi: Calculator,
                'compound-interest': ArrowUpRight,
                mortgage: Home,
                sip: PiggyBank,
                lumpsum: PieChart,
                roi: BarChart3,
              };

              const Icon = icons[calc!.id as keyof typeof icons] || Calculator;

              return (
                <motion.div
                  key={calc!.id}
                  variants={fadeIn}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full"
                >
                  <div className="h-40 bg-slate-100 flex items-center justify-center text-slate-600 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                    <Icon className="w-16 h-16" strokeWidth={1.5} />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{calc!.name}</h3>
                    <p className="text-slate-600 text-sm mb-6 flex-grow">{calc!.description}</p>
                    <Link
                      href={`/calculators/${calc!.id}`}
                      className="text-blue-600 font-medium flex items-center text-sm hover:text-blue-700 mt-auto"
                    >
                      Try {calc!.name} <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div {...fadeIn} className="mt-12 text-center">
            <Link
              href="/calculators"
              className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-md font-medium transition-colors"
            >
              View All 100+ Calculators <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-yellow-600 font-bold tracking-wider uppercase text-sm mb-2 block">How It Works</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Simple Steps to <br />
                <span className="text-blue-500">Smart Decisions</span>
              </h2>
              <p className="text-slate-600 mb-10 text-lg">
                No complicated setup. No account required. Just pick a calculator, enter your numbers, and get instant
                results with beautiful visualizations.
              </p>

              <div className="space-y-8">
                {[
                  {
                    num: '01',
                    title: 'Choose Calculator',
                    desc: 'Select from 100+ professional financial calculators tailored to your needs.',
                  },
                  {
                    num: '02',
                    title: 'Enter Your Details',
                    desc: 'Input your financial data with our intuitive sliders and input fields.',
                  },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    {...fadeIn}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-5"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                      <p className="text-slate-600">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://plain-eeur-prod-public.komododecks.com/202607/13/IyZ2ivgZzcBOUqKmWINE/image.jpg"
                  alt="Laptop with financial charts"
                  width={800}
                  height={600}
                  className="w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Instant Results</div>
                  <div className="text-sm text-slate-500">Real-time calculations</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div {...fadeIn} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="text-yellow-600 font-bold tracking-wider uppercase text-sm mb-2 block">
                From Our Blog
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Latest from <span className="text-blue-500">Our Blog</span>
              </h2>
              <p className="text-slate-600 max-w-2xl">
                Fresh guides on investing, loans, saving, and smarter financial planning.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-md font-medium transition-colors shrink-0"
            >
              View All Articles <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>

          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestPosts.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow group flex flex-col"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                    {post.image_url ? (
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-slate-400">No Image</div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium">
                        {post.category || 'General'}
                      </span>
                      <span className="text-slate-400 text-sm">{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                      {(post.content || '').replace(/<[^>]*>?/gm, '').substring(0, 130)}...
                    </p>
                    <span className="text-blue-600 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform mt-auto">
                      Read More →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-14 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
              <div className="text-slate-900 font-bold text-xl mb-2">No Articles Yet</div>
              <div className="text-slate-600">As soon as you publish posts, the latest 3 will appear here.</div>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <motion.div {...fadeIn} className="text-center mb-16">
            <span className="text-yellow-600 font-bold tracking-wider uppercase text-sm mb-2 block">FAQs</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked <span className="text-blue-500">Questions</span>
            </h2>
            <p className="text-slate-600">
              Have questions? We&apos;ve got answers. If you can&apos;t find what you&apos;re looking for, feel free to
              contact us.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="space-y-2"
          >
            {[
              {
                q: 'What is FinovaCalc?',
                a: 'FinovaCalc is a comprehensive financial calculation platform that provides free, professional-grade tools for loans, investments, mortgages, taxes, savings, and personal finance planning.',
              },
              {
                q: 'Are the calculators free to use?',
                a: 'Yes, 100% free! All calculators and planning tools on FinovaCalc are completely free to use without any hidden fees, subscriptions, or paywalls.',
              },
              {
                q: 'Do I need to create an account?',
                a: 'No account creation or sign-up is required. You can instantly access and use all 100+ calculators directly in your web browser.',
              },
              {
                q: 'What kinds of calculators are available?',
                a: 'We offer calculators for EMI & loan repayments, compound interest, mortgage estimations, SIP & lump sum investments, ROI, retirement planning, savings goals, income tax estimates, and much more.',
              },
              {
                q: 'How accurate are the calculations?',
                a: 'Our calculators use standard financial formulas and mathematical models to ensure high accuracy. However, they are designed for educational and planning purposes, so we recommend consulting a certified financial advisor for formal advice.',
              },
              {
                q: 'Can I use FinovaCalc on my mobile device?',
                a: 'Yes! FinovaCalc is fully responsive and optimized for mobile phones, tablets, laptops, and desktop computers, allowing you to run financial calculations seamlessly on any device.',
              },
              {
                q: 'Is my data safe?',
                a: 'Yes, absolutely. All calculations are executed locally in your web browser. We do not store or transmit your sensitive financial inputs to external servers, ensuring complete privacy.',
              },
              {
                q: 'Who is FinovaCalc for?',
                a: 'FinovaCalc is built for everyone — including individual savers, homebuyers, investors, students, business owners, and financial planners seeking clear, data-driven financial insights.',
              },
              {
                q: 'How can I contact support?',
                a: 'You can easily reach out to our team anytime via our Contact page. We welcome user feedback, bug reports, and suggestions for new financial tools.',
              },
              {
                q: 'Are you planning to add more calculators?',
                a: 'Yes! We regularly expand our tool library and update existing calculators based on financial trends and user requests. Stay tuned for exciting new additions.',
              },
            ].map((faq, i) => (
              <motion.details
                key={i}
                variants={fadeIn}
                className="group border border-slate-200 rounded-lg overflow-hidden bg-white"
              >
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-slate-800 hover:text-blue-600 p-4 select-none">
                  <span>{faq.q}</span>
                  <span className="transition-transform group-open:rotate-180 text-slate-400">
                    <svg
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </summary>
                <div className="p-4 pt-0 text-slate-600 bg-white">
                  <p>{faq.a}</p>
                </div>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
