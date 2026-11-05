import React, { useState } from 'react';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Building,
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'Care Clinic / Plant Health Emergency',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState(0);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please describe your inquiry or plant situation.';
    } else if (formData.message.trim().length < 15) {
      errs.message = 'Please provide at least 15 characters of detail.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedTicket = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
      setTicketId(generatedTicket);
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }, 800);
  };

  const FAQS = [
    {
      q: 'How are living plants safely shipped across India?',
      a: 'We use custom climate-regulated corrugated suspension crates with organic coir-cocooned root systems that lock moisture in place. Plants are hydrated with kelp extract prior to departure and transit under temperature-monitored conditions.',
    },
    {
      q: 'What is covered under the 14-Day Living Guarantee?',
      a: 'If any specimen arrives with broken stems, root disturbance, or severe yellowing, simply send a photo within 14 days of receipt. Our head horticulturist will diagnose the issue and immediately dispatch a complimentary replacement.',
    },
    {
      q: 'Can I request commercial biophilic design for offices or cafes?',
      a: 'Yes. Our biophilic architectural team conducts on-site or virtual lux audits to curate self-watering specimen groupings tailored to your workplace lighting and humidity conditions.',
    },
    {
      q: 'Do you offer white-glove unboxing and placement?',
      a: 'In Mumbai, Delhi NCR, and Bengaluru, our trained delivery horticulturists unpack the specimen, position it in optimal indirect light, and inspect leaf health before concluding the handover.',
    },
  ];

  return (
    <div className="min-h-screen bg-offwhite text-charcoal flex flex-col font-sans">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold flex items-center justify-center gap-1.5 mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            VERDORA Botanical Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-forest tracking-tight mb-3">
            Get in Touch with our Botanists
          </h1>
          <p className="text-sm sm:text-base text-charcoal/70 leading-relaxed">
            Have a question about plant care, a custom biophilic residential project, or an active consignment? Our horticultural team responds within 4 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ======================================================= */}
          {/* LEFT: Contact Form with Interactive States */}
          {/* ======================================================= */}
          <div className="lg:col-span-7 bg-white border border-forest/10 rounded-3xl p-6 sm:p-10 shadow-subtle">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-botanical/10 text-botanical flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold">
                  Concierge Inquiry Received
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-forest font-bold">
                  Thank You, {formData.fullName.split(' ')[0]}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal/70 max-w-md mx-auto leading-relaxed">
                  Your inquiry has been assigned ticket reference{' '}
                  <span className="font-mono font-bold text-forest">{ticketId}</span>. A senior botanical curator will review your details and reply to{' '}
                  <span className="font-semibold text-forest">{formData.email}</span> shortly.
                </p>

                <div className="pt-6">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        inquiryType: 'Care Clinic / Plant Health Emergency',
                        message: '',
                      });
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="pb-3 border-b border-forest/10 mb-2">
                  <h2 className="font-serif text-xl text-forest font-bold">
                    Send a Message to the Greenhouse
                  </h2>
                  <p className="text-xs text-charcoal/60 mt-0.5">
                    Fill out the form below. For plant emergencies, include watering history and leaf symptoms.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      label="Your Full Name *"
                      placeholder="e.g. Priya Iyer"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      error={errors.fullName}
                    />
                  </div>
                  <div>
                    <Input
                      label="Email Address *"
                      type="email"
                      placeholder="priya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      error={errors.email}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+91 98200 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-forest uppercase font-mono tracking-wider">
                      Inquiry Subject *
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) =>
                        setFormData({ ...formData, inquiryType: e.target.value })
                      }
                      className="w-full bg-white border border-forest/20 rounded-editorial px-3.5 py-2.5 text-xs text-forest focus:outline-none focus:border-botanical"
                    >
                      <option value="Care Clinic / Plant Health Emergency">
                        Care Clinic / Plant Health Emergency
                      </option>
                      <option value="Order Status & Climate Logistics">
                        Order Status & Climate Logistics
                      </option>
                      <option value="Residential Biophilic Interior Styling">
                        Residential Biophilic Interior Styling
                      </option>
                      <option value="Corporate Greenery & Bulk Gifting">
                        Corporate Greenery & Bulk Gifting
                      </option>
                      <option value="Rare Specimen Reservation">
                        Rare Specimen Reservation
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-forest uppercase font-mono tracking-wider">
                    Your Botanical Query or Situation *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your plant condition, light exposure, or order question in detail..."
                    className={`w-full bg-white border rounded-editorial p-3.5 text-xs text-forest placeholder:text-charcoal/40 focus:outline-none focus:border-botanical transition-all ${
                      errors.message ? 'border-red-500' : 'border-forest/20'
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] text-red-600 block">{errors.message}</span>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isSubmitting}
                    icon={Send}
                  >
                    Transmit Inquiry to Concierge
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-charcoal/50 font-mono text-center pt-2">
                  <Clock className="w-3.5 h-3.5 text-botanical" />
                  <span>Average Response Time: 3 to 4 hours on business days</span>
                </div>
              </form>
            )}
          </div>

          {/* ======================================================= */}
          {/* RIGHT: Direct Channels & Atelier Addresses */}
          {/* ======================================================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-forest text-cream rounded-3xl p-6 sm:p-8 shadow-editorial relative overflow-hidden space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-sage">
                  Direct Communications
                </span>
                <h3 className="font-serif text-2xl text-cream font-bold">
                  Atelier Concierge
                </h3>
              </div>

              <div className="space-y-4 text-xs font-sans">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sage shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sage font-mono block text-[10px] uppercase">
                      Direct Voice Line
                    </span>
                    <a
                      href="tel:+919820144521"
                      className="font-medium text-cream hover:text-sage transition-colors text-sm"
                    >
                      +91 98201 44521
                    </a>
                    <span className="block text-[10px] text-cream/60">
                      Mon – Sat, 10:00 AM – 7:00 PM IST
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sage shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-sage font-mono block text-[10px] uppercase">
                      Horticultural Mail
                    </span>
                    <a
                      href="mailto:concierge@verdora.in"
                      className="font-medium text-cream hover:text-sage transition-colors text-sm"
                    >
                      concierge@verdora.in
                    </a>
                    <span className="block text-[10px] text-cream/60">
                      Plant clinic: care@verdora.in
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Greenhouse Atelier Locations */}
            <div className="bg-white border border-forest/10 rounded-3xl p-6 sm:p-8 shadow-subtle space-y-5">
              <h3 className="font-serif text-lg text-forest font-bold pb-3 border-b border-forest/10 flex items-center gap-2">
                <Building className="w-4 h-4 text-botanical" />
                <span>Our Physical Ateliers</span>
              </h3>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <span className="font-serif text-sm text-forest font-bold block">
                    Mumbai Flagship Botanical Maison
                  </span>
                  <p className="text-charcoal/70 leading-relaxed">
                    A-4, Ropewalk Lane, Kala Ghoda, Fort, Mumbai 400001
                  </p>
                  <span className="text-[10px] font-mono text-botanical block">
                    Open Tue–Sun: 10:00 AM – 8:00 PM
                  </span>
                </div>

                <div className="space-y-1 pt-3 border-t border-forest/5">
                  <span className="font-serif text-sm text-forest font-bold block">
                    Bengaluru Botanical Design Studio
                  </span>
                  <p className="text-charcoal/70 leading-relaxed">
                    12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038
                  </p>
                  <span className="text-[10px] font-mono text-botanical block">
                    Open Mon–Sat: 10:30 AM – 7:30 PM
                  </span>
                </div>

                <div className="space-y-1 pt-3 border-t border-forest/5">
                  <span className="font-serif text-sm text-forest font-bold block">
                    Pune Master Propagation Greenhouse
                  </span>
                  <p className="text-charcoal/70 leading-relaxed">
                    Survey No. 44, Hadapsar-Saswad Road, Pune 412308
                  </p>
                  <span className="text-[10px] font-mono text-earth block">
                    By Horticultural Appointment Only
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* FAQS ACCORDION */}
        {/* ======================================================= */}
        <section className="mt-16 sm:mt-24 pt-12 border-t border-forest/10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-botanical font-semibold flex items-center justify-center gap-1.5 mb-2">
                <HelpCircle className="w-3.5 h-3.5" />
                Frequently Asked
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-forest font-bold">
                Answers from our Botanists
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-forest/15 rounded-2xl overflow-hidden bg-white shadow-subtle transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif text-sm sm:text-base font-semibold text-forest hover:bg-cream/30 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-botanical shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal/75 leading-relaxed font-sans border-t border-forest/5 bg-cream/10">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
