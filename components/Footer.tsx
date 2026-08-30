import Link from 'next/link';
import { Calculator, Mail, Phone, MapPin, ArrowRight, Instagram, Music } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-yellow-500 p-1.5 rounded-md">
                <Calculator className="h-6 w-6 text-slate-900" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">FinovaCalc</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              A suite of free, professional financial calculators to help you make smarter financial decisions. From loans and investments to retirement planning, we have the tools you need.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/jarryullah22" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@finovacalc" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 hover:text-white transition-all"
                aria-label="TikTok"
              >
                <Music className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wider text-sm uppercase">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/calculators" className="hover:text-white transition-colors">Calculators</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wider text-sm uppercase">Calculators</h3>
            <ul className="space-y-4 text-sm">
              <li><Link href="/calculators" className="hover:text-white transition-colors">EMI Calculator</Link></li>
              <li><Link href="/calculators" className="hover:text-white transition-colors">Compound Interest Calculator</Link></li>
              <li><Link href="/calculators" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/calculators" className="hover:text-white transition-colors">Retirement Calculator</Link></li>
              <li>
                <Link href="/calculators" className="text-yellow-500 hover:text-yellow-400 font-medium flex items-center transition-colors">
                  View All <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 tracking-wider text-sm uppercase">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-slate-400 shrink-0 mt-0.5" />
                <span>support@finova-calc.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-slate-400 shrink-0 mt-0.5" />
                <span>+923356471303</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-slate-400 shrink-0 mt-0.5" />
                <span>Bhutto Colony, Faisalabad, Pakistan</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 FinovaCalc. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
