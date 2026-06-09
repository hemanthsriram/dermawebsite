import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  Stethoscope,
  HeartPulse,
  Activity,
  User,
  Calendar,
  Menu,
  X,
  Star,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Scissors,
  Zap,
  Sun,
  Droplets,
  Weight,
  Timer,
  Layers,
  Quote,
  ExternalLink
} from 'lucide-react';
import { Header } from '@/components/ui/header-2';
import { ScrollRotatingServices } from '@/components/ui/scroll-rotating-services';
import { DoctorSection } from '@/components/ui/doctor-section';

const SERVICES = [
  {
    title: "Dermabrasion",
    description: "Advanced skin resurfacing treatment to improve skin texture and reduce imperfections for a smoother complexion.",
    icon: <Layers className="w-6 h-6" />,
    color: "bg-rose-50 text-rose-600",
    image: "/Dermabrasion.jpeg"
  },
  {
    title: "Laser Resurfacing",
    description: "Precision laser technology to rejuvenate your skin, reduce wrinkles, and restore a youthful glow.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-blue-50 text-blue-600",
    image: "/Laser Resurfacing.jpeg"
  },
  {
    title: "Scar Treatment",
    description: "Specialized treatments to minimize the appearance of scars using the latest dermatological techniques.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-emerald-50 text-emerald-600",
    image: "/Scar Treatment.jpg"
  },
  {
    title: "Wart Removal",
    description: "Safe and effective wart removal procedures with minimal downtime and excellent results.",
    icon: <Scissors className="w-6 h-6" />,
    color: "bg-amber-50 text-amber-600",
    image: "/Wart Removal.jpg"
  },
  {
    title: "Laser Hair Removal",
    description: "Permanent hair reduction for the face and body using advanced laser technology for smooth, hair-free skin.",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-purple-50 text-purple-600",
    image: "/Laser Hair Removal.jpg"
  },
  {
    title: "Pigmented Lesion Treatment",
    description: "Effective treatment for sun spots, age spots, and other pigmented lesions to restore even skin tone.",
    icon: <Sun className="w-6 h-6" />,
    color: "bg-orange-50 text-orange-600",
    image: "/Pigmented Lesion Treatment.jpg"
  },
  {
    title: "Peel, Polishing & Lasers",
    description: "Chemical peels, skin polishing, and laser treatments for comprehensive skin renewal and radiance.",
    icon: <Droplets className="w-6 h-6" />,
    color: "bg-cyan-50 text-cyan-600",
    image: "/Peel, Polishing & Lasers.webp"
  },
  {
    title: "Weight Loss Counseling",
    description: "Personalized diet counseling and weight management plans for a healthier, more confident you.",
    icon: <Weight className="w-6 h-6" />,
    color: "bg-lime-50 text-lime-600",
    image: "/Weight Loss Counseling.jpg"
  },
  {
    title: "Anti Aging Treatment",
    description: "Turn back the clock with advanced anti-aging solutions that restore youthful vitality to your skin.",
    icon: <Timer className="w-6 h-6" />,
    color: "bg-pink-50 text-pink-600",
    image: "/Anti Aging Treatment.jpeg"
  },
  {
    title: "Laser Treatment",
    description: "Comprehensive laser therapies for a wide range of skin conditions, delivered with precision and care.",
    icon: <Activity className="w-6 h-6" />,
    color: "bg-indigo-50 text-indigo-600",
    image: "/Laser Treatment.jpg"
  }
];

const TESTIMONIALS = [
  {
    name: "Bharath",
    visitedFor: "Laser",
    content: "I was beyond impressed with my experience at this clinic. My first contact was with Dr. Soujanya — she was so responsive and quick at getting back to me! A lot of doctors don't realize how important it is to have that kind of attentiveness. My appointment ran on time, Dr. Soujanya was really knowledgeable and made me feel comfortable throughout. I would highly recommend ADCS Clinic.",
    rating: 5,
    timeAgo: "10 years ago"
  },
  {
    name: "Praveen G Medapuram",
    visitedFor: "Allergies",
    content: "Took my mom to ADCS. We have visited many doctors earlier for the same problem. Dr. Soujanya was cordial and the way she explained about the problem and reasons is beyond our expectations. You feel better immediately after seeing her, that's how she treats her patients.",
    rating: 5,
    timeAgo: "9 years ago"
  },
  {
    name: "Navya",
    visitedFor: "Skin Infections / Fungal Infection",
    content: "The doctor was very assuring and to the point. In a friendly way she explained me everything I need to know about my skin infection. I saw results in less than a week. A very good one to go to for any skin related concerns.",
    rating: 5,
    timeAgo: "9 years ago"
  },
  {
    name: "Sri",
    visitedFor: "Skin Allergy",
    content: "I went for allergy on my hands and treated very well, within no time it got healed — within 3 days! Thanks for the service and would highly recommend anybody for any kind of skin problems or other services. Good luck!",
    rating: 5,
    timeAgo: "7 years ago"
  },
  {
    name: "Saikiran",
    visitedFor: "Rashes",
    content: "Doctor was very cordial and very patient in explaining everything I asked. I found doctor to be very credible.",
    rating: 5,
    timeAgo: "10 years ago"
  },
  {
    name: "Verified Patient",
    visitedFor: "Hair Problems / Skin Treatment",
    content: "It was a great experience in getting cured after searching several clinics in and around Hyderabad. She is very kind and helped me in curing my hair and skin problems within a period of 6 months. Really I am very grateful to you, madam.",
    rating: 5,
    timeAgo: "9 years ago"
  },
  {
    name: "Pratap Kumar Papineni",
    visitedFor: "Surgical Dermatology",
    content: "Very sensible enough for our concerns, recommends suitable methods of treatment. Responsive to calls.",
    rating: 5,
    timeAgo: "7 years ago"
  },
  {
    name: "Dr. Mounika",
    visitedFor: "General Dermatology",
    content: "She is an excellent doctor. Very patient and kind, and the treatment was very good. Would definitely recommend her!",
    rating: 5,
    timeAgo: "9 years ago"
  },
  {
    name: "Chandra Shekar",
    visitedFor: "Hair Problems",
    content: "Ambience is good and the processes followed are hygienic. Even the staff is responsive in their actions and will always be there to share the necessary information whenever required.",
    rating: 5,
    timeAgo: "9 years ago"
  },
  {
    name: "Roshni Shaikh",
    visitedFor: "General Dermatology",
    content: "She is so friendly and nice. She diagnosed the problem immediately and made sure to explain me in detail. This helps instil confidence. Thank you, Ma'am!",
    rating: 5,
    timeAgo: "8 years ago"
  },
  {
    name: "Roshmi Roy",
    visitedFor: "Hair Disease",
    content: "She describes well and answers all our necessary queries. Suggests medicines as needed. We should definitely follow her suggestions.",
    rating: 5,
    timeAgo: "9 years ago"
  },
  {
    name: "Raj",
    visitedFor: "General Dermatology",
    content: "Doctor was very cordial, knowledgeable and patient.",
    rating: 5,
    timeAgo: "10 years ago"
  },
  {
    name: "Verified Patient",
    visitedFor: "Hyper Pigmentation Treatment",
    content: "She is an awesome doctor. I would strongly recommend her for dermatological issues. Thank you, Doctor, for explaining patiently.",
    rating: 5,
    timeAgo: "7 years ago"
  },
  {
    name: "Verified Patient",
    visitedFor: "Laser Therapy",
    content: "Doctor is very patient and her services are excellent. She has been very friendly with me and has responded immediately when I had a problem.",
    rating: 5,
    timeAgo: "8 years ago"
  },
  {
    name: "Verified Patient",
    visitedFor: "Scar Treatment",
    content: "Doctor was very amicable, her submission while explaining treatment is very pleasing. Totally convinced with my experience.",
    rating: 5,
    timeAgo: "8 years ago"
  }
];

export default function App() {
  const [visibleReviews, setVisibleReviews] = useState(6);

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900">
      {/* Top Bar */}
      <div className="hidden lg:block bg-stone-900 text-stone-300 py-2 px-6 text-xs font-medium tracking-wider uppercase">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> ADCS Clinic</span>
            <span className="flex items-center gap-2" title="95, Rd Number 72, Road No. 72, Jubilee Hills, Hyderabad, 500033"><MapPin className="w-3 h-3" /> 95, Rd Number 72, Jubilee Hills, Hyderabad, 500033</span>
          </div>
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> Mon - Sat: 10:00 AM - 8:00 PM | Sun: 10:00 AM - 1:00 PM</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section id="home" className="relative pt-6 pb-24 lg:pt-10 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Advanced Dermatology & Cosmetic Surgery
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-[1.1] mb-8">
              Expert Skin <br />
              <span className="text-emerald-600 italic">Care You Can</span> <br />
              Trust.
            </h1>
            <p className="text-lg text-stone-500 mb-10 max-w-lg leading-relaxed">
              ADCS Clinic provides affordable cosmetic dermatology services with
              the best technology and expertise available in the field, led by Dr. Soujanya D.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/appointment" className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
                Book Appointment
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="border border-stone-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-stone-50 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-500 focus-visible:ring-offset-2">
                Our Services
              </button>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    className="w-10 h-10 rounded-full border-2 border-white"
                    alt="Patient"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center text-amber-500">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-stone-500 font-medium">Trusted by thousands of happy patients</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000"
                alt="ADCS Dermatology Clinic"
                className="w-full h-[37.5rem] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50 -z-10" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />

            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 border border-stone-100 max-w-[13.75rem]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Open Today</span>
              </div>
              <p className="text-lg font-bold">10:00 AM – 8:00 PM</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Years Experience", value: "10+" },
              { label: "Services Offered", value: "10+" },
              { label: "Happy Patients", value: "1000s" },
              { label: "Patient Satisfaction", value: "100%" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl lg:text-4xl font-serif font-bold text-stone-900 mb-1">{stat.value}</p>
                <p className="text-sm text-stone-500 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section — GSAP scroll-driven rotating cards */}
      <ScrollRotatingServices services={SERVICES} />

      {/* About Section */}
      <section id="about" className="relative z-10 bg-emerald-50 text-stone-900 overflow-hidden">
        {/* Top gradient fade for seamless transition from services section */}
        <div
          className="absolute top-0 left-0 right-0 h-48 pointer-events-none z-[1]"
          style={{
            background: 'linear-gradient(to bottom, rgba(250,250,249,0.9) 0%, transparent 100%)',
          }}
        />
        <div className="relative z-[2] py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000"
                  alt="ADCS Clinic"
                  className="w-full h-[31.25rem] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-emerald-600 p-10 rounded-3xl hidden lg:block text-white">
                <p className="text-5xl font-serif font-bold mb-2">100%</p>
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">Patient Satisfaction</p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-6">Why Choose Us</h2>
              <h3 className="text-4xl lg:text-5xl font-serif font-bold leading-tight mb-8">
                Affordable Expertise <br /> In Cosmetic Dermatology.
              </h3>
              <p className="text-stone-600 text-lg mb-10 leading-relaxed">
                ADCS Clinic was started with the idea of providing affordable cosmetic dermatology
                services with the best technology and expertise available in the field. The team,
                led by Dr. Soujanya D., has brought together expertise from some of the
                renowned centers worldwide.
              </p>

              <div className="space-y-6">
                {[
                  "Best quality Cosmetic Dermatology Services and Hair Restoration at affordable prices",
                  "Passionate about making you look and feel your best using the latest technologies",
                  "Personal service is our motto — your experience is tailored to your needs and preferences",
                  "Most up-to-date procedures supported by the latest in medical and cosmetic research",
                  "Available before, during, and after your consultation — always happy to hear from you"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-stone-700">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/appointment" className="mt-12 inline-block bg-stone-900 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <DoctorSection />

      {/* Reviews / Testimonials */}
      <section id="reviews" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">Patient Reviews</h2>
            <h3 className="text-4xl font-serif font-bold mb-6">What Our Patients Say</h3>
            <p className="text-stone-500">
              Real stories from verified patients who have experienced our care first-hand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, visibleReviews).map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 flex flex-col"
              >
                <div className="flex text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-stone-700 italic mb-6 leading-relaxed flex-grow text-sm">"{t.content}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-stone-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600 text-sm">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{t.name}</p>
                      <p className="text-xs text-stone-400">{t.visitedFor}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {visibleReviews < TESTIMONIALS.length && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleReviews(prev => Math.min(prev + 6, TESTIMONIALS.length))}
                className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-600 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                Show More Reviews
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-stone-900 rounded-[3rem] overflow-hidden grid lg:grid-cols-2">
            <div className="p-12 lg:p-20">
              <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-[0.2em] mb-6">Contact Us</h2>
              <h3 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-10">Get In Touch With ADCS Clinic.</h3>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white font-bold mb-1">Working Hours</p>
                    <p className="text-stone-400">Mon - Sat: 10:00 AM - 8:00 PM</p>
                    <p className="text-stone-400">Sun: 10:00 AM - 1:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white font-bold mb-1">Email Address</p>
                    <p className="text-stone-400">info@adcscenter.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="w-full">
                    <p className="text-white font-bold mb-1">Clinic Location</p>
                    <p className="text-stone-400">95, Rd Number 72, Road No. 72, Jubilee Hills, Hyderabad, 500033</p>
                    {/* Embedded Mini-Map */}
                    <div className="relative w-full h-40 mt-6 rounded-xl overflow-hidden bg-stone-800">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.823357240556!2d78.4048813!3d17.4202628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96b5a7fce4b1%3A0xa872ec463ff40980!2sAdvanced%20Dermatology%20and%20Cosmetic%20Surgery%20Center!5e0!3m2!1sen!2sin!4v1773307354829!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="ADCS Clinic Location Mini Map"
                      ></iframe>
                      <a
                        href="https://maps.app.goo.gl/4JvGmmMnNeYJSgLo7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-stone-900 p-2 rounded-lg shadow-sm hover:bg-white hover:scale-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                        title="Open in Google Maps"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 lg:p-20">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Full Name</label>
                    <input type="text" className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Phone Number</label>
                    <input type="tel" className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors" placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Service Needed</label>
                  <select className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors">
                    <option>General Inquiry</option>
                    <option>Appointment Request</option>
                    <option>Laser Treatment</option>
                    <option>Scar Treatment</option>
                    <option>Hair Restoration</option>
                    <option>Anti Aging Treatment</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Message</label>
                  <textarea rows={4} className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:border-emerald-500 focus-visible:ring-2 focus-visible:ring-emerald-500 transition-colors" placeholder="Describe your concern or query..."></textarea>
                </div>
                <button className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-stone-900 transition-all shadow-xl shadow-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <img src="/adcs-logo-transparent.png" alt="ADCS Clinic Logo" className="h-12 w-auto object-contain rounded-md" />
                <span className="text-xl font-bold tracking-tight">ADCS<span className="text-emerald-600">CLINIC</span></span>
              </div>
              <p className="text-stone-500 text-sm leading-relaxed mb-8">
                95, Rd Number 72, Road No. 72, Jubilee Hills, Hyderabad, 500033<br /><br />
                Advanced Dermatology & Cosmetic Surgery Clinic — providing affordable,
                world-class dermatology services with cutting-edge technology and expertise.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-stone-400">Quick Links</h4>
              <ul className="space-y-4 text-sm font-semibold text-stone-600">
                <li><a href="#home" className="hover:text-emerald-600 transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-emerald-600 transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-emerald-600 transition-colors">About Us</a></li>
                <li><a href="#doctor" className="hover:text-emerald-600 transition-colors">Our Doctor</a></li>
                <li><a href="#reviews" className="hover:text-emerald-600 transition-colors">Reviews</a></li>
                <li><Link to="/appointment" className="hover:text-emerald-600 transition-colors">Book Appointment</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-stone-400">Services</h4>
              <ul className="space-y-4 text-sm font-semibold text-stone-600">
                <li><a href="#services" className="hover:text-emerald-600 transition-colors">Laser Treatment</a></li>
                <li><a href="#services" className="hover:text-emerald-600 transition-colors">Scar Treatment</a></li>
                <li><a href="#services" className="hover:text-emerald-600 transition-colors">Hair Removal</a></li>
                <li><a href="#services" className="hover:text-emerald-600 transition-colors">Anti Aging</a></li>
                <li><a href="#services" className="hover:text-emerald-600 transition-colors">Dermabrasion</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-stone-400">Clinic Hours</h4>
              <div className="space-y-4 text-sm text-stone-600">
                <div>
                  <p className="font-semibold">Monday - Saturday</p>
                  <p className="text-stone-500">10:00 AM - 8:00 PM</p>
                </div>
                <div>
                  <p className="font-semibold">Sunday</p>
                  <p className="text-stone-500">10:00 AM - 1:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-stone-400 uppercase tracking-widest">
            <p>© 2024 ADCS - Advanced Dermatology & Cosmetic Surgery Clinic. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-stone-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-stone-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer >
    </div >
  );
}