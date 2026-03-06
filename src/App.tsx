import React, { useState } from 'react';
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
  CheckCircle2
} from 'lucide-react';

const SERVICES = [
  {
    title: "General Consultation",
    description: "Comprehensive health checkups and personalized medical advice for all ages.",
    icon: <Stethoscope className="w-6 h-6" />,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Cardiology",
    description: "Advanced heart care including ECG, stress tests, and specialized cardiac monitoring.",
    icon: <HeartPulse className="w-6 h-6" />,
    color: "bg-rose-50 text-rose-600"
  },
  {
    title: "Diagnostics",
    description: "State-of-the-art laboratory services for accurate and timely medical testing.",
    icon: <Activity className="w-6 h-6" />,
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    title: "Pediatrics",
    description: "Gentle and expert care for infants, children, and adolescents in a friendly environment.",
    icon: <User className="w-6 h-6" />,
    color: "bg-amber-50 text-amber-600"
  }
];

const DOCTORS = [
  {
    name: "Dr. Sarah Mitchell",
    specialty: "Senior Cardiologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71f153678f?auto=format&fit=crop&q=80&w=400&h=500",
    description: "15+ years of experience in cardiovascular health and interventional cardiology."
  },
  {
    name: "Dr. James Wilson",
    specialty: "General Physician",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=500",
    description: "Specializing in internal medicine and preventive healthcare strategies."
  },
  {
    name: "Dr. Elena Rodriguez",
    specialty: "Pediatric Specialist",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=500",
    description: "Dedicated to providing compassionate care for children's developmental health."
  }
];

const TESTIMONIALS = [
  {
    name: "Robert Chen",
    role: "Patient",
    content: "The care I received at Lumina was exceptional. The staff is professional and the facility is top-notch.",
    rating: 5
  },
  {
    name: "Amanda Brooks",
    role: "Patient",
    content: "Dr. Mitchell took the time to explain everything clearly. I felt very comfortable and well cared for.",
    rating: 5
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900">
      {/* Top Bar */}
      <div className="hidden lg:block bg-stone-900 text-stone-300 py-2 px-6 text-xs font-medium tracking-wider uppercase">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> +1 (555) 123-4567</span>
            <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> 123 Medical Plaza, Health City</span>
          </div>
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> Mon - Sat: 8:00 AM - 8:00 PM</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">LUMINA<span className="text-emerald-600">HEALTH</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wide">
            <a href="#home" className="hover:text-emerald-600 transition-colors">Home</a>
            <a href="#services" className="hover:text-emerald-600 transition-colors">Services</a>
            <a href="#about" className="hover:text-emerald-600 transition-colors">About</a>
            <a href="#doctors" className="hover:text-emerald-600 transition-colors">Doctors</a>
            <a href="#contact" className="hover:text-emerald-600 transition-colors">Contact</a>
            <button className="bg-stone-900 text-white px-6 py-2.5 rounded-full hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-stone-200">
              Appointment
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-stone-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4 font-semibold">
                <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
                <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
                <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
                <a href="#doctors" onClick={() => setIsMenuOpen(false)}>Doctors</a>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
                <button className="bg-emerald-600 text-white py-3 rounded-xl">Book Appointment</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-12 pb-24 lg:pt-24 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Trusted Healthcare Provider
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-[1.1] mb-8">
              Compassionate <br />
              <span className="text-emerald-600 italic">Care for Your</span> <br />
              Whole Family.
            </h1>
            <p className="text-lg text-stone-500 mb-10 max-w-lg leading-relaxed">
              Experience modern healthcare with a human touch. Our expert team provides 
              comprehensive medical services tailored to your unique needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 group">
                Book Appointment
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-stone-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-stone-50 transition-all flex items-center justify-center gap-2">
                Our Services
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i+10}`} 
                    className="w-10 h-10 rounded-full border-2 border-white"
                    alt="Patient"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center text-amber-500">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <p className="text-stone-500 font-medium">Trusted by 10k+ happy patients</p>
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
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" 
                alt="Modern Clinic"
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50 -z-10" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
            
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20 border border-stone-100 max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Next Available</span>
              </div>
              <p className="text-lg font-bold">Today, 2:30 PM</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Years Experience", value: "25+" },
              { label: "Expert Doctors", value: "40+" },
              { label: "Happy Patients", value: "15k+" },
              { label: "Success Rate", value: "99%" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl lg:text-4xl font-serif font-bold text-stone-900 mb-1">{stat.value}</p>
                <p className="text-sm text-stone-500 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">Our Services</h2>
              <h3 className="text-4xl lg:text-5xl font-serif font-bold leading-tight">
                Comprehensive Medical Solutions <br /> For Your Health.
              </h3>
            </div>
            <p className="text-stone-500 max-w-md">
              We offer a wide range of specialized medical services to ensure 
              you and your family receive the best possible care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl border border-stone-100 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-50/50 transition-all duration-300 bg-white group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${service.color}`}>
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                <p className="text-stone-500 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-stone-900 hover:text-emerald-600 transition-colors">
                  Learn More <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 lg:py-32 bg-stone-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
                alt="Doctors meeting"
                className="w-full h-[500px] object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-emerald-600 p-10 rounded-3xl hidden lg:block">
              <p className="text-5xl font-serif font-bold mb-2">100%</p>
              <p className="text-sm font-bold uppercase tracking-widest opacity-80">Patient Satisfaction</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-[0.2em] mb-6">Why Choose Us</h2>
            <h3 className="text-4xl lg:text-5xl font-serif font-bold leading-tight mb-8">
              We Prioritize Your <br /> Health Above All.
            </h3>
            <p className="text-stone-400 text-lg mb-10 leading-relaxed">
              At Lumina Health, we combine cutting-edge medical technology with 
              personalized attention. Our clinic is designed to be a sanctuary 
              where healing begins the moment you walk through our doors.
            </p>
            
            <div className="space-y-6">
              {[
                "Modern medical equipment and facilities",
                "Highly experienced and certified doctors",
                "Personalized treatment plans for every patient",
                "Quick and easy appointment scheduling"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-emerald-600/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-stone-200">{item}</span>
                </div>
              ))}
            </div>
            
            <button className="mt-12 bg-white text-stone-900 px-8 py-4 rounded-full font-bold hover:bg-emerald-400 transition-all">
              About Our Clinic
            </button>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">Our Specialists</h2>
            <h3 className="text-4xl lg:text-5xl font-serif font-bold mb-6">Meet Our Expert Team</h3>
            <p className="text-stone-500">
              Our doctors are leaders in their respective fields, dedicated to 
              providing the highest standard of medical care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {DOCTORS.map((doctor, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="relative rounded-3xl overflow-hidden mb-6 aspect-[4/5]">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <div className="flex gap-4">
                      {/* Social icons could go here */}
                    </div>
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-1">{doctor.name}</h4>
                <p className="text-emerald-600 font-bold text-sm uppercase tracking-wider mb-4">{doctor.specialty}</p>
                <p className="text-stone-500 text-sm leading-relaxed">{doctor.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div>
              <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">Testimonials</h2>
              <h3 className="text-4xl font-serif font-bold mb-6">What Our Patients Say</h3>
              <p className="text-stone-500 mb-8">
                Real stories from patients who have experienced our care first-hand.
              </p>
              <div className="flex gap-2">
                <button className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all">
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <button className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-white hover:shadow-md transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100">
                  <div className="flex text-amber-500 mb-6">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-lg text-stone-700 italic mb-8 leading-relaxed">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center font-bold text-stone-400">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold">{t.name}</p>
                      <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-stone-900 rounded-[3rem] overflow-hidden grid lg:grid-cols-2">
            <div className="p-12 lg:p-20">
              <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-[0.2em] mb-6">Contact Us</h2>
              <h3 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-10">Get In Touch With Our Team.</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white font-bold mb-1">Phone Number</p>
                    <p className="text-stone-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white font-bold mb-1">Email Address</p>
                    <p className="text-stone-400">hello@luminahealth.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-white font-bold mb-1">Clinic Location</p>
                    <p className="text-stone-400">123 Medical Plaza, Health City, ST 12345</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-12 lg:p-20">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Full Name</label>
                    <input type="text" className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:border-emerald-500 transition-colors" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Email Address</label>
                    <input type="email" className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:border-emerald-500 transition-colors" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Subject</label>
                  <select className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:border-emerald-500 transition-colors">
                    <option>General Inquiry</option>
                    <option>Appointment Request</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Message</label>
                  <textarea rows={4} className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:outline-none focus:border-emerald-500 transition-colors" placeholder="How can we help you?"></textarea>
                </div>
                <button className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-stone-900 transition-all shadow-xl shadow-emerald-100">
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
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xl font-bold tracking-tight">LUMINA<span className="text-emerald-600">HEALTH</span></span>
              </div>
              <p className="text-stone-500 text-sm leading-relaxed mb-8">
                Providing world-class healthcare services with a focus on 
                compassion, innovation, and excellence.
              </p>
              <div className="flex gap-4">
                {/* Social links */}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-stone-400">Quick Links</h4>
              <ul className="space-y-4 text-sm font-semibold text-stone-600">
                <li><a href="#home" className="hover:text-emerald-600 transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-emerald-600 transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-emerald-600 transition-colors">About Us</a></li>
                <li><a href="#doctors" className="hover:text-emerald-600 transition-colors">Our Doctors</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-stone-400">Services</h4>
              <ul className="space-y-4 text-sm font-semibold text-stone-600">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Cardiology</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Pediatrics</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Diagnostics</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">General Care</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-8 uppercase tracking-widest text-xs text-stone-400">Newsletter</h4>
              <p className="text-stone-500 text-sm mb-6">Subscribe to get the latest health tips and news.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="bg-white border border-stone-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-emerald-500 w-full" />
                <button className="bg-stone-900 text-white p-2 rounded-xl hover:bg-emerald-600 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-stone-400 uppercase tracking-widest">
            <p>© 2024 Lumina Health Clinic. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-stone-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-stone-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}