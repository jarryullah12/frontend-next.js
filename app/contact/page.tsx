import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact FinovaCalc for questions, feedback, or support related to calculators and the website.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white pt-24 pb-32 border-b border-slate-800 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-yellow-500 text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact <span className="text-yellow-500">FinovaCalc</span>
          </h1>
          <p className="text-xl text-slate-300">
            Have a question, feedback, or just want to say hello? We would love to hear from you. Our team is here to help you with anything related to our financial calculators and tools.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
      </section>

      {/* Contact Cards Section */}
      <section className="py-16 -mt-20 relative z-20 flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Email Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 text-center border border-slate-100 transform transition-transform hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-6 shadow-md shadow-blue-600/20">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Email Us</h3>
              <a href="mailto:support@finova-calc.com" className="text-blue-600 font-medium hover:underline block mb-2">
                support@finova-calc.com
              </a>
              <p className="text-sm text-slate-500">We reply within 24 hours</p>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 text-center border border-slate-100 transform transition-transform hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-6 shadow-md shadow-blue-600/20">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Call Us</h3>
              <a href="" className="text-slate-600 font-medium hover:text-blue-600 transition-colors block mb-2">
                +923356471303
              </a>
              <p className="text-sm text-slate-500">Mon-Fri, 9am to 6pm EST</p>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 text-center border border-slate-100 transform transition-transform hover:-translate-y-1">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-6 shadow-md shadow-blue-600/20">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Visit Us</h3>
              <p className="text-slate-600 font-medium block">
                Bhutto Colony, Faisalabad, Pakistan
              </p>
            </div>

          </div>

          {/* Contact Form Section */}
          <div className="mt-20 max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Send us a Message</h2>
                <p className="text-slate-600">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
              </div>

              <form action="https://formspree.io/f/mdapqeyl" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="example@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
