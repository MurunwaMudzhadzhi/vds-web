import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Quote,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  Sprout,
} from "lucide-react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const WHATSAPP_NUMBER = "27766245113";
const STORAGE_KEY = "vhumatshelo_reviews";
const GOOGLE_REVIEW_URL =
  "https://www.google.com/maps/search/?api=1&query=Vhumatshelo+Skills+Development+Kameeldrift+Pretoria";

const programOptions = [
  "Computers & Digital",
  "Animal Production",
  "Plant Production",
  "Horticulture",
  "Mixed Farming",
  "Entrepreneurial Skills",
];

type ReviewEntry = {
  id: string;
  name: string;
  program: string;
  rating: number;
  quote: string;
  date: string;
  seeded?: boolean;
};

const seedReviews: ReviewEntry[] = [
  { id: "seed-1", name: "Nomvula Dlamini", program: "Plant Production", rating: 5, quote: "Started my own vegetable production business supplying local markets. This program changed everything.", date: "2024", seeded: true },
  { id: "seed-2", name: "Sipho Khumalo", program: "Horticulture", rating: 5, quote: "I learned practical horticulture skills and now grow and supply fresh produce full-time.", date: "2024", seeded: true },
  { id: "seed-3", name: "Thandi Mokoena", program: "Computers & Digital", rating: 5, quote: "Got a data-entry job at a local clinic thanks to the digital literacy classes.", date: "2025", seeded: true },
  { id: "seed-4", name: "Bongani Sithole", program: "Animal Production", rating: 4, quote: "I now run a small livestock and poultry operation and support my family.", date: "2025", seeded: true },
];

function StarRow({
  rating,
  size = 18,
  interactive = false,
  onChange,
}: {
  rating: number;
  size?: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const shown = hover ?? rating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          disabled={!interactive}
          onClick={() => onChange?.(n)}
          onMouseEnter={() => interactive && setHover(n)}
          onMouseLeave={() => interactive && setHover(null)}
          className={interactive ? "cursor-pointer" : "cursor-default"}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          <Star
            size={size}
            className={
              n <= shown
                ? "fill-secondary text-secondary"
                : "fill-transparent text-muted-foreground/40"
            }
          />
        </button>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewEntry[]>(seedReviews);
  const [name, setName] = useState("");
  const [program, setProgram] = useState(programOptions[0]);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Load any locally-saved reviews from previous visits on this device
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored: ReviewEntry[] = JSON.parse(raw);
        setReviews([...stored, ...seedReviews]);
      }
    } catch {
      // ignore corrupted storage
    }
  }, []);

  const average = useMemo(() => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }, [reviews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !message.trim() || rating === 0) {
      setError("Please add your name, a star rating, and a short message before sending.");
      return;
    }

    const entry: ReviewEntry = {
      id: `local-${Date.now()}`,
      name: name.trim(),
      program,
      rating,
      quote: message.trim(),
      date: new Date().toLocaleDateString("en-ZA", { month: "short", year: "numeric" }),
    };

    // Save locally so the review shows up on this device right away
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const stored: ReviewEntry[] = raw ? JSON.parse(raw) : [];
      const updated = [entry, ...stored];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setReviews([entry, ...reviews]);
    } catch {
      setReviews([entry, ...reviews]);
    }

    // Send the review straight to Vhumatshelo's WhatsApp so it's actually received
    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
    const text = [
      `New review via website:`,
      `Name: ${entry.name}`,
      `Program: ${entry.program}`,
      `Rating: ${stars} (${rating}/5)`,
      `Message: ${entry.quote}`,
    ].join("\n");
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(waLink, "_blank", "noopener,noreferrer");

    setSubmitted(true);
    setName("");
    setRating(0);
    setMessage("");
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* Top bar */}
      <header className="w-full border-b bg-background/90 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold">
              V
            </div>
            <span className="font-display font-bold text-lg hidden sm:inline-block">Vhumatshelo</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-16 md:py-24 field-pattern overflow-hidden bg-foreground text-background">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/25 to-transparent" />
          <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/15 text-secondary font-medium text-sm mb-6">
              <Sprout size={14} />
              GROWN FROM REAL STORIES
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Share Your Experience
            </h1>
            <p className="text-lg text-white/70 mb-8">
              Tell us how your program helped you grow. Your review is sent directly to our
              team on WhatsApp, and added to the stories below.
            </p>
            <div className="flex flex-col items-center gap-2">
              <StarRow rating={Math.round(average)} size={26} />
              <p className="text-sm text-white/60">
                {average.toFixed(1)} average from {reviews.length} review{reviews.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </section>

        {/* Form + Reviews */}
        <section className="py-16 md:py-24 seed-pattern">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2 bg-card border rounded-3xl p-8 shadow-sm h-fit lg:sticky lg:top-24"
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="thanks"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={28} />
                      </div>
                      <h3 className="font-display font-bold text-xl mb-2">Thank you!</h3>
                      <p className="text-muted-foreground mb-6">
                        Your review has been added below, and a WhatsApp message has been
                        opened to send it straight to our team.
                      </p>
                      <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full">
                        Leave another review
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="font-display font-bold text-2xl mb-1">Leave a Review</h2>
                        <p className="text-sm text-muted-foreground">
                          Takes less than a minute.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Rating</label>
                        <StarRow rating={rating} interactive size={30} onChange={setRating} />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Name</label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Naledi Mahlangu"
                          className="h-12 bg-muted/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Program Attended</label>
                        <select
                          value={program}
                          onChange={(e) => setProgram(e.target.value)}
                          className="w-full h-12 px-3 rounded-md border border-input bg-muted/50 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          {programOptions.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Review</label>
                        <Textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Tell us about your experience..."
                          className="min-h-[120px] bg-muted/50 resize-none"
                        />
                      </div>

                      {error && (
                        <p className="text-sm text-destructive font-medium">{error}</p>
                      )}

                      <Button type="submit" className="w-full h-12 text-base font-bold rounded-xl gap-2">
                        <FaWhatsapp size={18} />
                        Send Review via WhatsApp
                      </Button>

                      <a
                        href={GOOGLE_REVIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center text-sm font-medium text-primary hover:underline pt-1"
                      >
                        Prefer Google? Leave us a Google Review →
                      </a>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Reviews list */}
              <div className="lg:col-span-3">
                <h2 className="font-display font-bold text-2xl mb-6">
                  What Our Students Say
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {reviews.map((r, i) => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (i % 6) * 0.05 }}
                      className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col gap-3"
                    >
                      <Quote className="text-primary/30" size={28} />
                      <p className="text-foreground/90 leading-relaxed flex-1">
                        "{r.quote}"
                      </p>
                      <StarRow rating={r.rating} size={14} />
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div>
                          <p className="font-display font-bold text-sm">{r.name}</p>
                          <p className="text-xs text-muted-foreground">{r.program}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{r.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 items-start mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold">
                  V
                </div>
                <span className="font-display font-bold text-xl">Vhumatshelo</span>
              </div>
              <p className="text-white/60 text-sm max-w-sm mb-6">
                Empowering national communities through practical skills development and
                hands-on training.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white transition-colors"><FaFacebook size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white transition-colors"><FaInstagram size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white transition-colors"><FaTiktok size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-primary hover:text-white transition-colors"><FaXTwitter size={18} /></a>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <MapPin size={18} className="text-secondary shrink-0 mt-0.5" />
                <p className="text-white/70 text-sm">Roodepark Eco Estate, 306 Acacia St, Pretoria, 0189</p>
              </div>
              <div className="flex gap-3 items-start">
                <Mail size={18} className="text-secondary shrink-0 mt-0.5" />
                <p className="text-white/70 text-sm">Vhumatshelodevelopment@gmail.com</p>
              </div>
              <div className="flex gap-3 items-start">
                <Phone size={18} className="text-secondary shrink-0 mt-0.5" />
                <p className="text-white/70 text-sm">076 624 5113 / 082 819 6995</p>
              </div>
            </div>

            <div>
              <Link href="/" className="text-white/70 text-sm hover:text-primary transition-colors">
                ← Back to Vhumatshelo home
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm">
            <p>&copy; {new Date().getFullYear()} Vhumatshelo Skills Development. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
