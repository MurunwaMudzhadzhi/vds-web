import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Wrench, 
  Monitor, 
  Bird, 
  Sprout,
  Leaf,
  Tractor,
  TrendingUp, 
  CheckCircle2,
  Users,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  Star,
  Award,
  BookOpen,
  CheckCircle,
  Download,
  UserCircle2
} from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// TODO: Replace these placeholder URLs with Vhumatshelo's real social media page links.
const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/vhumatshelodevelopment",
  instagram: "https://www.instagram.com/vhumatshelodevelopment",
  tiktok: "https://www.tiktok.com/@vhumatshelodevelopment",
  twitter: "https://x.com/vhumatshelodev",
};

const programs = [
  {
    title: "Computers & Digital",
    description: "Essential digital literacy and basic computing skills to connect you to the modern economy and job market.",
    icon: Monitor,
    image: "/images/computers.png",
    color: "bg-accent/10 text-accent"
  },
  {
    title: "Animal Production",
    description: "A verified qualification teaching modern, sustainable animal and poultry production and agribusiness management.",
    icon: Bird,
    image: "/images/poultry-3.jpg",
    color: "bg-primary/10 text-primary"
  },
  {
    title: "Plant Production",
    description: "Hands-on training in crop cultivation, soil management, and sustainable field production techniques.",
    icon: Sprout,
    image: "/images/plant-production-1.jpg",
    color: "bg-secondary/10 text-secondary-foreground"
  },
  {
    title: "Horticulture",
    description: "Learn to grow and manage vegetables, fruit, and ornamental plants for household food security and market gardens.",
    icon: Leaf,
    image: "/images/horticulture.jpg",
    color: "bg-accent/10 text-accent"
  },
  {
    title: "Mixed Farming",
    description: "Combine crop and livestock production in one integrated, sustainable small-scale farming system.",
    icon: Tractor,
    image: "/images/mixed-farming.jpg",
    color: "bg-primary/10 text-primary"
  },
  {
    title: "Entrepreneurial Skills",
    description: "Coming soon: Helping our support group members launch small businesses and turn skills into income.",
    icon: TrendingUp,
    image: "/images/entrepreneurial-skills.webp",
    color: "bg-secondary/10 text-secondary-foreground"
  }
];

const testimonials = [
  { name: "Nomvula Dlamini", age: 34, program: "Plant Production", quote: "Started my own vegetable production business supplying local markets. This program changed everything." },
  { name: "Sipho Khumalo", age: 27, program: "Horticulture", quote: "I learned practical horticulture skills and now grow and supply fresh produce full-time." },
  { name: "Thandi Mokoena", age: 42, program: "Computers & Digital", quote: "Got a data-entry job at a local clinic thanks to the digital literacy classes." },
  { name: "Bongani Sithole", age: 29, program: "Animal Production", quote: "I now run a small livestock and poultry operation and support my family." },
];

const newsItems = [
  { date: "July 2024", title: "Graduation Day 2024 — 47 New Certificates Awarded", image: "/images/news-graduation.png", excerpt: "Our biggest graduating class yet celebrates their achievements with family and community members." },
  { date: "March 2025", title: "New Entrepreneurship Program Launching in 2025", image: "/images/news-entrepreneur.png", excerpt: "A new initiative to help our graduates turn their technical skills into sustainable small businesses." },
  { date: "June 2026", title: "From Seed to Harvest: Our Students Growing Fresh Produce", image: "/images/plant-production-3.jpg", excerpt: "Meet the graduates using their Plant Production and Horticulture training to grow food and income for their communities." },
];

const pricingInfo = [
  { program: "Animal Production", duration: "Anytime" },
  { program: "Plant Production", duration: "Anytime" },
  { program: "Horticulture", duration: "Anytime" },
];

const faqs = [
  {
    question: "Do I need any prior experience?",
    answer: "Not at all. Our programs are designed for beginners. We start from the basics and build your skills step-by-step."
  },
  {
    question: "Are the classes open to everyone?",
    answer: "Yes, our training is completely gender-inclusive and open to adult learners of all ages who want to improve their skills."
  },
  {
    question: "Do I get a certificate when I finish?",
    answer: "Yes, upon successful completion of your program, you will receive a certificate of completion from Vhumatshelo Skills Development, which is a registered training provider."
  },
  {
    question: "How much does it cost?",
    answer: "Our fees vary depending on the program length and materials required. We strive to keep costs as accessible as possible. Contact us for the latest fee structure."
  }
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const printCertificate = () => {
    const printContent = document.getElementById('sample-certificate');
    if (printContent) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Quick fix to restore react bindings after innerHTML replacement
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans selection:bg-primary/20 selection:text-primary relative">
      
      <div className="grain-overlay"></div>
      
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <div className="group relative flex flex-col items-center">
          <div className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-lg bg-foreground text-background px-4 py-2 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none shadow-lg">
            Chat with us on WhatsApp
            <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-foreground"></div>
          </div>
          <a 
            href="https://wa.me/27766245113?text=Hello%2C%20I%27m%20interested%20in%20enrolling%20at%20Vhumatshelo%20Skills%20Development" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl hover:bg-green-600 transition-transform hover:scale-110 animate-bounce"
            style={{ animationDuration: '3s' }}
          >
            <FaWhatsapp size={36} />
          </a>
        </div>
      </div>

      {/* Navbar */}
      <header 
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-xl">
              V
            </div>
            <span className="font-display font-bold text-xl hidden sm:inline-block">Vhumatshelo</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("about")} className="text-sm font-medium hover:text-primary transition-colors">About Us</button>
            <button onClick={() => scrollTo("programs")} className="text-sm font-medium hover:text-primary transition-colors">Programs</button>
            <button onClick={() => scrollTo("why-us")} className="text-sm font-medium hover:text-primary transition-colors">Why Us</button>
            <button onClick={() => scrollTo("faq")} className="text-sm font-medium hover:text-primary transition-colors">FAQ</button>
            <Link href="/reviews" className="text-sm font-medium hover:text-primary transition-colors">Reviews</Link>
            <Button onClick={() => scrollTo("contact")} className="rounded-full px-6 font-medium">Join a Program</Button>
          </nav>

          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-background pt-24 px-6 flex flex-col gap-6 md:hidden">
          <button onClick={() => scrollTo("about")} className="text-2xl font-display font-medium text-left border-b pb-4">About Us</button>
          <button onClick={() => scrollTo("programs")} className="text-2xl font-display font-medium text-left border-b pb-4">Programs</button>
          <button onClick={() => scrollTo("why-us")} className="text-2xl font-display font-medium text-left border-b pb-4">Why Us</button>
          <button onClick={() => scrollTo("faq")} className="text-2xl font-display font-medium text-left border-b pb-4">FAQ</button>
          <Link href="/reviews" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-display font-medium text-left border-b pb-4">Reviews</Link>
          <button onClick={() => scrollTo("contact")} className="text-2xl font-display font-medium text-left border-b pb-4 text-primary">Contact & Join</button>
          
          <div className="flex gap-4 mt-auto mb-8 justify-center">
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"><FaFacebook size={20} /></a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"><FaInstagram size={20} /></a>
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"><FaTiktok size={20} /></a>
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"><FaXTwitter size={20} /></a>
          </div>
        </div>
      )}

      <main className="flex-1">
        
        {/* Section 1: Hero */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden tech-grid circuit-lines mesh-glow">
          <div className="absolute top-1/3 left-1/2 -z-10 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl -translate-x-1/2"></div>
          
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground font-medium text-sm mb-6">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  EMPOWERING NATIONAL COMMUNITIES
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] text-foreground mb-6">
                  Learn a skill. <br />
                  <span className="text-primary">Shape your future.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
                  Vhumatshelo Skills Development deliver practical, hands-on agricultural training designed to empower individuals with the skills, knowledge and confidence to build self-sufficient, sustainable livelihoods.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="rounded-full text-base h-14 px-8" onClick={() => scrollTo("programs")}>
                    Explore Programs
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full text-base h-14 px-8" onClick={() => scrollTo("contact")}>
                    Get in Touch
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative z-10 bg-muted">
                  <img 
                    src="/images/poultry-1.jpg" 
                    alt="Broiler chickens raised through our Animal Production program" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-2xl shadow-xl z-20 max-w-[240px] hidden md:block border">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                      <CheckCircle2 size={24} />
                    </div>
                    <p className="font-display font-bold text-2xl">100%</p>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">HANDS-ON PRACTICAL TRAINING FOR WORK PLACE SKILLS AND ENTRPRENEURSHIP</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: About / Mission */}
        <section id="about" className="py-20 md:py-32 bg-foreground text-background mesh-glow overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Rooted in African Community Pride, we are a registered agricultural training provider based in Kameeldrift, Pretoria.</h2>
                  <p className="text-lg text-white/70 mb-6 leading-relaxed">
                    Our mission is to uplift rural and semi-urban communities across South Africa by building self-sufficiency through practical farming skills, agribusiness development, and sustainable land practices.
                  </p>
                  <p className="text-lg text-white/70 mb-8 leading-relaxed">
                    More than a training center, we are a vibrant hub where men and women come with ambition and leave with market ready agricultural skills and a viable farm plan for themselves and their communities.
                  </p>
                  
                  <div className="flex gap-8">
                    <div>
                      <p className="text-4xl font-display font-bold text-primary mb-1">5+</p>
                      <p className="text-sm text-white/60 uppercase tracking-wider font-semibold">Practical Skills</p>
                    </div>
                    <div>
                      <p className="text-4xl font-display font-bold text-secondary mb-1">All</p>
                      <p className="text-sm text-white/60 uppercase tracking-wider font-semibold">Genders Welcome</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="lg:col-span-6 lg:col-start-7 relative">
                <div className="grid grid-cols-2 gap-4">
                  <motion.img 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    src="/images/poultry-2.jpg" 
                    className="rounded-2xl aspect-square object-cover w-full mt-12 shadow-xl" 
                    alt="Animal production practice" 
                  />
                  <motion.img 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    src="/images/plant-production-2.jpg" 
                    className="rounded-2xl aspect-[4/5] object-cover w-full shadow-xl" 
                    alt="Plant production work" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Why Choose Us & Certificate Preview */}
        <section id="why-us" className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Why Train With Us?</h2>
              <p className="text-lg text-muted-foreground">
                We focus on what actually works: practical skills that translate directly into income.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border rounded-2xl p-8 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Wrench size={32} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">Hands-On Practice</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Theory is kept to a minimum. You learn by doing, building, and fixing real projects from day one.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card border rounded-2xl p-8 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary-foreground flex items-center justify-center mb-6">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">Registered Provider</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We are a formally registered training provider in Gauteng, ensuring the quality and validity of your education.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-card border rounded-2xl p-8 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">Community Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Join a network of ambitious learners. We support each other in starting businesses and finding work.
                </p>
              </motion.div>
            </div>

            {/* Certificate Download Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-muted/40 rounded-3xl p-8 md:p-12 border border-border flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto"
            >
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-medium text-sm mb-6">
                  <Award size={16} /> Formal Recognition
                </div>
                <h3 className="text-3xl font-display font-bold mb-4">Graduate with Confidence</h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Upon completion of your course, you receive a formal certificate demonstrating your competency. This gives employers confidence in your skills and validates your hard work.
                </p>
                <Button onClick={printCertificate} size="lg" className="rounded-full flex items-center gap-2">
                  <Download size={18} /> Download Sample Certificate
                </Button>
              </div>

              <div className="lg:w-1/2 w-full">
                {/* Certificate Preview Div */}
                <div id="sample-certificate" className="bg-white p-8 border-[12px] border-double border-muted shadow-lg text-center relative max-w-[500px] mx-auto overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  <div className="border border-border/50 p-6 h-full flex flex-col justify-center items-center">
                    <div className="w-12 h-12 bg-primary rounded-full mb-4 flex items-center justify-center text-white font-display font-bold text-xl">V</div>
                    <h4 className="text-2xl font-serif text-foreground mb-2">Certificate of Completion</h4>
                    <p className="text-sm text-muted-foreground mb-6 uppercase tracking-widest">Vhumatshelo Skills Development</p>
                    <p className="text-sm italic mb-2">This is to certify that</p>
                    <p className="text-2xl font-bold font-display text-primary mb-2">[Your Name]</p>
                    <p className="text-sm italic mb-4">has successfully completed</p>
                    <p className="text-lg font-bold text-foreground mb-8">[Program Name]</p>
                    <div className="w-32 border-t border-border mx-auto pt-2">
                      <p className="text-xs text-muted-foreground uppercase">Director</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section: Testimonials */}
        <section className="py-20 md:py-32 bg-foreground text-background mesh-glow overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Community Success Stories</h2>
              <p className="text-lg text-white/70">Hear from our recent graduates who are now using their skills to build better futures.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((t, i) => (
                <motion.div 
                  key={i} 
                  initial={{opacity:0, y:20}} 
                  whileInView={{opacity:1, y:0}} 
                  viewport={{once:true}} 
                  transition={{delay: i*0.1}} 
                  className="glass-panel p-6 rounded-2xl flex flex-col"
                >
                  <div className="flex text-yellow-400 mb-4">
                    <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                  </div>
                  <p className="italic text-white/80 mb-6 flex-grow leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 shrink-0">
                      <UserCircle2 size={28} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">{t.name}, {t.age}</p>
                      <p className="text-xs text-primary font-medium">{t.program}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Programs */}
        <section id="programs" className="py-20 md:py-32 bg-muted/30 border-b">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Our Training Programs</h2>
              <p className="text-lg text-muted-foreground">
                We offer verified, hands-on qualifications designed to give you the skills needed to find employment or start your own business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card rounded-3xl p-6 shadow-sm border hover:shadow-md transition-shadow group flex flex-col h-full"
                >
                  <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-muted">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${program.color}`}>
                      <program.icon size={24} />
                    </div>
                    <h3 className="text-xl font-display font-bold mt-1">{program.title}</h3>
                  </div>
                  <p className="text-muted-foreground flex-grow leading-relaxed">
                    {program.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Accreditation */}
        <section className="py-16 bg-background border-b">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl border">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <CheckCircle size={24} />
                </div>
                <p className="font-semibold text-sm">Verified Qualification: Animal Production</p>
              </div>
              <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl border">
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <p className="font-semibold text-sm">Registered Training Provider — Gauteng</p>
              </div>
              <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl border">
                <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary-foreground flex items-center justify-center shrink-0">
                  <Users size={24} />
                </div>
                <p className="font-semibold text-sm">Gender-Inclusive Training</p>
              </div>
              <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-xl border">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Award size={24} />
                </div>
                <p className="font-semibold text-sm">SETA Aligned Programs</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Pricing & Intake */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Pricing & Intakes</h2>
              <p className="text-lg text-muted-foreground">Transparent fees. Quality training. Start your journey.</p>
            </div>
            
            <div className="bg-card border rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-6 font-display font-bold text-foreground border-b">Program</th>
                      <th className="p-6 font-display font-bold text-foreground border-b">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingInfo.map((row, i) => (
                      <tr key={i} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="p-6 font-medium">{row.program}</td>
                        <td className="p-6">
                          <span className="inline-flex px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground text-sm font-medium">
                            {row.duration}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-muted/30 p-6 text-sm text-muted-foreground text-center border-t">
                Enrolment is ongoing — join anytime. Contact us to secure your spot.
              </div>
            </div>
          </div>
        </section>

        {/* Section: Partners */}
        <section className="py-16 bg-muted/30 border-y">
          <div className="container mx-auto px-4 md:px-6">
            <h3 className="text-center text-sm uppercase tracking-widest font-bold text-muted-foreground mb-8">Our Partners & Supporters</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
              <div className="text-xl font-display font-black text-foreground">Department of Labour</div>
              <div className="text-xl font-display font-black text-foreground tracking-tighter">SASSETA</div>
              <div className="text-xl font-serif font-bold text-foreground">Gauteng TVET</div>
              <div className="text-lg font-sans font-bold text-foreground flex flex-col leading-none">
                <span>Community Dev</span>
                <span>Foundation</span>
              </div>
              <div className="text-xl font-display font-bold text-foreground italic">SETA South Africa</div>
            </div>
          </div>
        </section>

        {/* Section: News & Stories */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">News & Stories</h2>
                <p className="text-lg text-muted-foreground">Updates from our center and inspiring stories from our students.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {newsItems.map((news, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-6 bg-muted">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-sm font-bold text-primary mb-3">{news.date}</p>
                  <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">{news.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{news.excerpt}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: Gallery Snapshot */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <img src="/images/plant-production-1.jpg" className="w-full h-48 md:h-64 object-cover rounded-2xl grayscale-[20%] hover:grayscale-0 transition-all" alt="Plant Production" />
              <img src="/images/horticulture.jpg" className="w-full h-48 md:h-64 object-cover rounded-2xl grayscale-[20%] hover:grayscale-0 transition-all md:-translate-y-8" alt="Horticulture" />
              <img src="/images/poultry-3.jpg" className="w-full h-48 md:h-64 object-cover rounded-2xl grayscale-[20%] hover:grayscale-0 transition-all" alt="Animal Production" />
              <img src="/images/mixed-farming.jpg" className="w-full h-48 md:h-64 object-cover rounded-2xl grayscale-[20%] hover:grayscale-0 transition-all md:-translate-y-8" alt="Mixed Farming" />
              <img src="/images/entrepreneurial-skills.webp" className="w-full h-48 md:h-64 object-cover rounded-2xl grayscale-[20%] hover:grayscale-0 transition-all" alt="Entrepreneurial Skills" />
              <img src="/images/computers.png" className="w-full h-48 md:h-64 object-cover rounded-2xl grayscale-[20%] hover:grayscale-0 transition-all md:-translate-y-8" alt="Computers" />
            </div>
          </div>
        </section>

        {/* Section 6: FAQ */}
        <section id="faq" className="py-20 md:py-32 bg-card">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Common Questions</h2>
                <p className="text-lg text-muted-foreground">Everything you need to know about getting started.</p>
              </div>

              <div className="space-y-6">
                {faqs.map((faq, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-muted/30 p-6 md:p-8 rounded-2xl border"
                  >
                    <h3 className="text-xl font-display font-bold mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Impact CTA */}
        <section id="impact" className="py-24 relative overflow-hidden bg-primary text-primary-foreground mesh-glow">
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" />
              </pattern>
              <rect width="100" height="100" fill="url(#pattern)" />
            </svg>
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">
              Don't wait for opportunities. <br className="hidden md:block" /> Let's build them together.
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Our doors at Roodepark Eco Estate are open. Whether you want to master a farming trade, grow your own produce, or launch a business, Vhumatshelo is where you start.
            </p>
            <Button size="lg" variant="secondary" className="rounded-full text-lg h-14 px-10 font-bold" onClick={() => scrollTo("contact")}>
              Enroll Today
            </Button>
          </div>
        </section>

        {/* Section 8: Contact Section */}
        <section id="contact" className="py-20 md:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Get in Touch</h2>
                <p className="text-lg text-muted-foreground mb-10">
                  Ready to start learning? Visit our center or send us a message below. We'll get back to you with program schedules and enrollment details.
                </p>

                <div className="space-y-8">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary-foreground flex items-center justify-center shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display font-bold text-lg mb-1">Our Location</h4>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Roodepark Eco Estate,<br />
                        306 Acacia St,<br />
                        Pretoria, 0189
                      </p>
                      <div className="w-full h-[400px] rounded-2xl overflow-hidden border">
                        <iframe 
                          src="https://maps.google.com/maps?q=Roodepark+Eco+Estate+306+Acacia+St+Pretoria+0189&output=embed" 
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen={false} 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg mb-1">Email Us</h4>
                      <p className="text-muted-foreground">Vhumatshelodevelopment@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg mb-1">Call Us</h4>
                      <p className="text-muted-foreground">076 624 5113<br />082 819 6995</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-card border rounded-3xl p-8 shadow-sm lg:sticky lg:top-24"
              >
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <Input placeholder="John" className="h-12 bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <Input placeholder="Doe" className="h-12 bg-muted/50" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input type="email" placeholder="john@example.com" className="h-12 bg-muted/50" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Program of Interest</label>
                    <select className="w-full h-12 px-3 rounded-md border border-input bg-muted/50 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" defaultValue="">
                      <option value="" disabled>Select a program...</option>
                      {programs.map(p => (
                        <option key={p.title} value={p.title}>{p.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea placeholder="Tell us a bit about why you want to join..." className="min-h-[120px] bg-muted/50 resize-none" />
                  </div>

                  <Button type="submit" className="w-full h-12 text-base font-bold rounded-xl">
                    Send Message
                  </Button>
                </form>
              </motion.div>

            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 items-start mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold">
                  V
                </div>
                <span className="font-display font-bold text-xl">Vhumatshelo</span>
              </div>
              <p className="text-white/60 text-sm max-w-sm mb-6">
                Empowering national communities through practical skills development and hands-on training.
              </p>
              
              <div className="flex gap-3">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white transition-colors">
                  <FaFacebook size={18} />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white transition-colors">
                  <FaInstagram size={18} />
                </a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white transition-colors">
                  <FaTiktok size={18} />
                </a>
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white transition-colors">
                  <FaXTwitter size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-display font-bold text-lg mb-4">Programs</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Computers & Digital</li>
                <li>Animal Production</li>
                <li>Plant Production</li>
                <li>Horticulture</li>
                <li>Mixed Farming</li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>Registered Training Provider</li>
                <li>Gauteng, South Africa</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li><Link href="/reviews" className="hover:text-primary transition-colors">Leave a Review</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} Vhumatshelo Skills Development. All rights reserved.</p>
            <p>Designed for the community, by the community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}