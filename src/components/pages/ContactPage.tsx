import React, { useState } from 'react';
import { 
  HelpCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck,
  Package
} from 'lucide-react';

interface ContactPageProps {
  initialOrderNumber?: string;
  onNavigateToOrders: () => void;
  onShowToast: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialOrderNumber = '',
  onNavigateToOrders,
  onShowToast
}) => {
  // Support Inquiry State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Order & Delivery Tracking');
  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Skin Consultation State
  const [consultSkinType, setConsultSkinType] = useState('Combination');
  const [consultGoals, setConsultGoals] = useState('Radiance & Fine Lines');
  const [consultEmail, setConsultEmail] = useState('');
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How can I track my Ayesha Beauty delivery in real time?',
      a: 'You can navigate to our dedicated "My Orders & Tracking" page in the navigation menu. Simply log into your account or enter your Order ID (e.g. AYE-94821) and email for live courier updates.'
    },
    {
      q: 'What is the standard shipping delivery timeline?',
      a: 'We offer complimentary priority delivery on all US orders exceeding $75. Standard shipping arrives within 2 to 4 business days. Priority Express arrives within 1 to 2 business days in temperature-controlled packaging.'
    },
    {
      q: 'Are all Ayesha Beauty formulations clean and cruelty-free?',
      a: 'Yes, 100%. We are Leaping Bunny certified cruelty-free and vegan. We never use parabens, sulfates, synthetic artificial fragrance, phthalates, or microplastics.'
    },
    {
      q: 'What is your returns and satisfaction guarantee?',
      a: 'We offer a 30-day effortless return guarantee. If any formulation does not agree with your skin bio-chemistry, contact our concierge for a complimentary return label or tailored product exchange.'
    },
    {
      q: 'Can I patch-test formulations before full application?',
      a: 'We encourage patch testing. Apply a pea-sized amount behind the ear or inside the wrist for 24 hours. All our formulas undergo independent clinical dermatological allergy testing.'
    }
  ];

  const handleSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setIsSubmitted(true);
    onShowToast('Inquiry sent to Ayesha Beauty Concierge. Expect a reply within 4 hours.');
  };

  const handleSubmitConsult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultEmail) return;
    setConsultSubmitted(true);
    onShowToast('Skin consultation request received. Our aesthetician will email your custom routine.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
          <span>Client Concierge & Care</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
          How May We Assist You?
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          From tracking priority packages to personalized skin regimen consultations, our Beverly Hills atelier concierge is at your service.
        </p>
      </div>

      {/* Grid: Support Form and Concierge Contact Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Concierge Message Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
            <div>
              <h2 className="text-lg font-bold text-stone-900">Direct Concierge Inquiry</h2>
              <p className="text-xs text-stone-500">Send an inquiry directly to our customer care team.</p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Concierge Active</span>
            </span>
          </div>

          {isSubmitted ? (
            <div className="p-8 text-center rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-emerald-950">Inquiry Received</h3>
              <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                Thank you, {name || 'valued customer'}. Our concierge team has received your ticket regarding "{topic}" and will respond to <strong>{email}</strong> within 4 business hours.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setMessage('');
                }}
                className="mt-2 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800 transition-colors cursor-pointer"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitSupport} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-stone-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. eleanor@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Inquiry Topic</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-stone-900"
                  >
                    <option value="Order & Delivery Tracking">Order & Delivery Tracking</option>
                    <option value="Skincare Consultation">Skincare Consultation</option>
                    <option value="Returns & Exchanges">Returns & Exchanges</option>
                    <option value="Ingredients & Allergen Check">Ingredients & Allergen Check</option>
                    <option value="Wholesale & Press">Wholesale & Press</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700">Order Number (if applicable)</label>
                  <input
                    type="text"
                    placeholder="e.g. AYE-94821"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-stone-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700">Your Message or Question</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you with our skincare formulas or delivery logistics?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-stone-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <p className="text-[11px] text-stone-400">
                  Concierge responds within 2-4 hours Mon-Sat.
                </p>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Send Concierge Note</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right 1 Column: Atelier Info & Consultation Card */}
        <div className="space-y-6">
          {/* Atelier Contact Card */}
          <div className="bg-stone-900 text-white rounded-3xl p-6 space-y-4 border border-stone-800 shadow-md">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Beverly Hills Atelier
            </h3>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Flagship Studio</strong>
                  9454 Wilshire Boulevard, Suite 300<br />Beverly Hills, CA 90212
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Client Concierge</strong>
                  concierge@ayeshabeauty.com
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Telephone & WhatsApp</strong>
                  +1 (310) 892-4910
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Concierge Hours</strong>
                  Monday – Friday: 8:00 AM – 7:00 PM PST<br />
                  Saturday: 9:00 AM – 5:00 PM PST
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-800">
              <button
                onClick={onNavigateToOrders}
                className="w-full flex items-center justify-center gap-2 py-2 bg-stone-800 hover:bg-stone-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                <Package className="w-3.5 h-3.5 text-amber-300" />
                <span>Track an Existing Order</span>
              </button>
            </div>
          </div>

          {/* Complimentary Skin Consultation Form Widget */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Complimentary Skin Analysis</span>
            </div>
            <p className="text-xs text-amber-800/90 leading-relaxed">
              Unsure which botanical serums suit your cellular skin cycle? Request a free aesthetician consultation.
            </p>

            {consultSubmitted ? (
              <div className="p-3 bg-white rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Consultation request logged! Check your inbox shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmitConsult} className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">Your Skin Profile</label>
                  <select
                    value={consultSkinType}
                    onChange={(e) => setConsultSkinType(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-stone-900"
                  >
                    <option value="Combination">Combination / Sensitive</option>
                    <option value="Dry">Dry / Dull</option>
                    <option value="Oily">Oily / Congested</option>
                    <option value="Aging">Mature / Sun-damaged</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">Primary Desired Outcome</label>
                  <input
                    type="text"
                    value={consultGoals}
                    onChange={(e) => setConsultGoals(e.target.value)}
                    placeholder="e.g. Cellular Glow, Firmness"
                    className="w-full px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-stone-900"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={consultEmail}
                    onChange={(e) => setConsultEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-colors cursor-pointer text-xs"
                >
                  Request Consultation Routine
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      {/* Frequently Asked Questions Section */}
      <div className="pt-8 border-t border-stone-200 max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-stone-900">Frequently Asked Questions</h2>
          <p className="text-xs text-stone-500 mt-1">Quick answers to common inquiries regarding orders and formulation care.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-stone-900 hover:text-amber-800 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-600 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0 ml-2" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-stone-600 border-t border-stone-100 leading-relaxed bg-stone-50/50 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
