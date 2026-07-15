"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import projectData from "@/data/projects.json";

type Transformation = {
  id: number;
  title: string;
  description: string;
  before: string;
  after: string;
};

type InstagramPost = {
  title: string;
  hook: string;
  caption: string;
  format: string;
};

const transformations: Transformation[] = [
  ...projectData.transformations,
];

const instagramPosts: InstagramPost[] = [
  {
    title: "Before → After Reveal",
    hook: "Wait until you see this kitchen transformation.",
    caption:
      "From dated and closed-off to bright, custom, and elevated. K & G Art Design creates spaces that feel high-end and intentional.",
    format: "Reel / Carousel",
  },
  {
    title: "Design Detail Post",
    hook: "Luxury is in the details.",
    caption:
      "Cabinetry, finishes, layout, and flow all work together to change how a space feels. This is the K & G difference.",
    format: "Static Post",
  },
  {
    title: "Lead Generation Post",
    hook: "Thinking about upgrading your kitchen?",
    caption:
      "Send us your inspiration photo and we’ll help you turn your vision into a custom design plan.",
    format: "Story + CTA",
  },
];

const { phoneDisplay, phoneHref, address, mapsHref, websiteUrl, websiteDisplay } = projectData.contact;

const instagramHandle = "@kgartandesign";
const instagramUrl = "https://www.instagram.com/kgartandesign/";

const proofPoints = [
  { value: "7", label: "Featured transformations" },
  { value: "Miami", label: "Local showroom and service area" },
  { value: "Custom", label: "Cabinetry, closets, kitchens, vanities" },
  { value: "1:1", label: "Consultation and design guidance" },
];

const whyChooseUs = [
  {
    title: "Custom Work, Not Generic Installs",
    text: "Every project is planned around the room, the finish, and the way the client wants the space to feel.",
  },
  {
    title: "Design-Led Execution",
    text: "The focus is not only construction. It is proportion, flow, color, materials, and the finished reveal.",
  },
  {
    title: "Premium Visual Finish",
    text: "Cabinetry, counters, built-ins, and details are selected to make the space feel cleaner and more expensive.",
  },
  {
    title: "Before/After Planning",
    text: "Clients can compare what they have now with what the space can become before they commit to the next step.",
  },
  {
    title: "Local Miami Access",
    text: "A real Miami location makes it easier to talk through ideas, review finishes, and move the project forward.",
  },
  {
    title: "Content-Ready Results",
    text: "Projects are designed to photograph well, share well, and create the kind of reveal clients are proud to show.",
  },
];

const processSteps = [
  {
    title: "Consultation",
    text: "We start with the room, goals, inspiration, timeline, and what needs to change.",
  },
  {
    title: "Measurements & Photos",
    text: "Bring measurements, photos, or inspiration so the project can be planned with real context.",
  },
  {
    title: "Design Direction",
    text: "We define the look: layout, finishes, cabinetry style, counters, storage, and focal points.",
  },
  {
    title: "Material Selection",
    text: "Choose finishes that match the home, budget, and level of luxury the client wants.",
  },
  {
    title: "Build & Install",
    text: "The design moves into fabrication, installation, and the details that make it feel custom.",
  },
  {
    title: "Final Reveal",
    text: "The finished space is reviewed, photographed, and ready to use, share, and enjoy.",
  },
];

const serviceAreas = ["Miami", "Kendall", "Doral", "Coral Gables", "Pinecrest", "Homestead", "South Florida"];

const projectHighlights = [
  "Before and after transformations that show the full upgrade, not just close-up details.",
  "Custom storage and cabinetry solutions built around real homes and real routines.",
  "Luxury finishes selected to make kitchens, closets, vanities, and built-ins feel intentional.",
];

const testimonials = [
  {
    quote: "K & G transformed our kitchen into something I didn't think was possible. Every detail feels custom and expensive.",
    author: "Sarah M.",
    project: "Kitchen Transformation",
  },
  {
    quote: "The design process was seamless. They listened, they delivered, and the results speak for themselves.",
    author: "James & Lisa P.",
    project: "Custom Cabinetry",
  },
  {
    quote: "This is what happens when you work with people who actually care about design. Worth every penny.",
    author: "Maria C.",
    project: "Full Interior Upgrade",
  },
];

const faqs = [
  {
    question: "Can I send inspiration photos before calling?",
    answer: "Yes. Inspiration photos, current room photos, measurements, and finish ideas all help start the design conversation faster.",
  },
  {
    question: "Do you only work on kitchens?",
    answer: "No. Projects can include kitchens, custom cabinets, countertops, closets, vanities, entertainment walls, built-ins, and full interior upgrades.",
  },
  {
    question: "Do you offer custom sizes?",
    answer: "Yes. Custom sizing is one of the main reasons to choose this service over a basic off-the-shelf option.",
  },
  {
    question: "How do I start?",
    answer: `Call ${phoneDisplay}, share what you want to transform, and bring photos or inspiration if you have them.`,
  },
];

function ArrowIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function MenuIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function CloseIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      )}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-64 bg-black/95 backdrop-blur-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-6 p-6 pt-20">
          <a
            href="#transformations"
            className="text-lg font-semibold text-white transition hover:text-amber-300"
            onClick={onClose}
          >
            Transformations
          </a>
          <a
            href="#services"
            className="text-lg font-semibold text-white transition hover:text-amber-300"
            onClick={onClose}
          >
            Services
          </a>
          <a
            href="#instagram"
            className="text-lg font-semibold text-white transition hover:text-amber-300"
            onClick={onClose}
          >
            Instagram
          </a>
          <a
            href="#lead"
            className="text-lg font-semibold text-white transition hover:text-amber-300"
            onClick={onClose}
          >
            Start Project
          </a>
          <div className="border-t border-white/10 pt-4">
            <a href={phoneHref} className="block rounded-full bg-amber-400 px-6 py-3 text-center font-black text-black transition hover:bg-amber-300">
              Call {phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

interface FormState {
  name: string;
  contact: string;
  projectType: string;
  message: string;
  submitted: boolean;
  loading: boolean;
  error: string;
}

function SubmissionForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    contact: "",
    projectType: "",
    message: "",
    submitted: false,
    loading: false,
    error: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value, error: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.contact || !form.projectType || !form.message) {
      setForm((prev) => ({ ...prev, error: "Please fill in all fields" }));
      return;
    }

    setForm((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch("https://formspree.io/f/xjkbzqql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          contact: form.contact,
          projectType: form.projectType,
          message: form.message,
        }),
      });

      if (response.ok) {
        setForm({
          name: "",
          contact: "",
          projectType: "",
          message: "",
          submitted: true,
          loading: false,
          error: "",
        });
        setTimeout(() => {
          setForm((prev) => ({ ...prev, submitted: false }));
        }, 5000);
      } else {
        setForm((prev) => ({ ...prev, error: "Failed to submit. Please try again.", loading: false }));
      }
    } catch {
      setForm((prev) => ({ ...prev, error: "Error submitting form. Please call instead.", loading: false }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white p-7 text-black shadow-2xl shadow-black/40">
      <h3 className="text-2xl font-black">Request a Design Consultation</h3>
      <p className="mt-2 text-sm text-black/55">Call or send your project details to start a design consultation.</p>

      {form.submitted ? (
        <div className="mt-6 rounded-2xl bg-green-50 p-6 text-center">
          <p className="text-lg font-bold text-green-900">✓ Thank you!</p>
          <p className="mt-2 text-sm text-green-700">We&apos;ll be in touch within 24 hours.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-black/10 bg-neutral-100 px-4 py-4 outline-none focus:border-amber-600"
            placeholder="Full Name"
          />
          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            className="w-full rounded-2xl border border-black/10 bg-neutral-100 px-4 py-4 outline-none focus:border-amber-600"
            placeholder="Phone / Email"
          />
          <select
            name="projectType"
            aria-label="Project Type"
            value={form.projectType}
            onChange={handleChange}
            className="w-full rounded-2xl border border-black/10 bg-neutral-100 px-4 py-4 outline-none focus:border-amber-600"
          >
            <option value="">What do you want to transform?</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Cabinets">Cabinets</option>
            <option value="Countertops">Countertops</option>
            <option value="Bathroom / Vanity">Bathroom / Vanity</option>
            <option value="Closet">Closet</option>
            <option value="Entertainment Wall">Entertainment Wall</option>
            <option value="Full Renovation">Full Renovation</option>
          </select>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            className="min-h-28 w-full rounded-2xl border border-black/10 bg-neutral-100 px-4 py-4 outline-none focus:border-amber-600"
            placeholder="Tell us about your project, timeline, and inspiration."
          />
          {form.error && <p className="text-sm text-red-600">{form.error}</p>}
          <button
            type="submit"
            disabled={form.loading}
            className="block w-full rounded-full bg-black px-8 py-5 text-center font-black text-white transition hover:bg-neutral-800 disabled:opacity-50"
          >
            {form.loading ? "Sending..." : `Call ${phoneDisplay}`}
          </button>
          <a href={mapsHref} target="_blank" rel="noreferrer" className="block text-center text-xs text-black/55 transition hover:text-black">
            Visit us at {address}
          </a>
          <a href={websiteUrl} target="_blank" rel="noreferrer" className="block text-center text-xs font-semibold text-black/55 transition hover:text-black">
            {websiteDisplay}
          </a>
        </div>
      )}
    </form>
  );
}

function StickyContactButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="#lead"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-amber-400 px-6 py-4 font-black text-black shadow-2xl transition hover:bg-amber-300 hover:scale-110 md:bottom-8 md:right-8"
    >
      ✨ Get Quote
    </a>
  );
}

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const displayValue = value;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      });
    });

    const element = document.getElementById(`counter-${label}`);
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible, label]);

  return (
    <div id={`counter-${label}`} className="border border-white/10 bg-white/[0.05] p-6">
      <p className="text-4xl font-black text-amber-300">{displayValue}</p>
      <p className="mt-3 text-sm leading-6 text-white/65">{label}</p>
    </div>
  );
}

function InstagramFeed() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6">
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Follow Us</p>
          <h3 className="mt-2 text-2xl font-bold text-white">{instagramHandle}</h3>
        </div>
        
        <div className="text-center">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 font-bold text-white transition hover:shadow-lg hover:shadow-pink-500/50"
          >
            Follow on Instagram →
          </a>
        </div>
        
        <p className="text-center text-xs text-white/60">
          See our latest transformations, before & afters, and design tips
        </p>
      </div>
    </div>
  );
}

function Logo({ hero = false }: { hero?: boolean }) {
  return (
    <a href="#" className="group flex items-center gap-3" aria-label="K & G Art Design home">
      <div
        className={`${
          hero ? "h-20 w-20" : "h-14 w-14"
        } relative flex items-center justify-center rounded-full border border-amber-300/40 bg-black/45 shadow-[0_0_32px_rgba(251,191,36,0.22)] backdrop-blur-xl`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-200/20 via-transparent to-yellow-700/20" />
        <div className="absolute inset-[-3px] animate-spin rounded-full border border-transparent border-t-amber-300/70" />
        <Image
          src="/images/kg-logo.png"
          alt="K & G Art Design Logo"
          width={80}
          height={80}
          className={`${hero ? "h-14" : "h-10"} relative z-10 w-auto object-contain drop-shadow-[0_0_14px_rgba(251,191,36,0.5)]`}
          priority={hero}
        />
      </div>
      {!hero && (
        <div className="leading-none">
          <p className="text-lg font-black uppercase tracking-[0.22em] text-amber-300">K & G</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.38em] text-white/55 transition group-hover:text-white/80">
            Art Design
          </p>
        </div>
      )}
    </a>
  );
}

function BeforeAfterSlider() {
  const [position, setPosition] = useState<number>(50);
  const [activeProject, setActiveProject] = useState<number>(0);
  const current = transformations[activeProject];

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
      <div className="relative h-[420px] md:h-[610px]">
        <div key={`${current.id}-after`} className="absolute inset-0">
          <Image
            src={current.after}
            alt={`${current.title} after transformation`}
            fill
            sizes="(min-width: 768px) 1200px, 100vw"
            className="h-full w-full object-cover"
          />
        </div>

        <div
          key={`${current.id}-before`}
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <div className="relative h-full" style={{ width: `${10000 / position}%` }}>
            <Image
              src={current.before}
              alt={`${current.title} before transformation`}
              fill
              sizes="(min-width: 768px) 1200px, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="absolute bottom-0 top-0 z-20 w-[3px] bg-white shadow-2xl" style={{ left: `${position}%` }}>
          <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white bg-amber-400 font-bold text-black shadow-2xl">
            ↔
          </div>
        </div>

        <input
          type="range"
          min="5"
          max="95"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
          aria-label={`Drag to compare before and after for ${current.title}`}
        />

        <div className="absolute left-5 top-5 z-20 rounded-full bg-black/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Before
        </div>
        <div className="absolute right-5 top-5 z-20 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black">
          After
        </div>

        <div className="absolute inset-0 z-10 flex items-end bg-gradient-to-t from-black/75 via-black/10 to-transparent p-8">
          <div>
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-amber-300">
              Featured Transformation
            </p>
            <h2 className="text-4xl font-black text-white md:text-6xl">{current.title}</h2>
            <p className="mt-3 max-w-xl text-white/75">{current.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 border-t border-white/10 bg-black/80 p-4 backdrop-blur sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
        {transformations.map((project, index) => (
          <button
            type="button"
            key={project.id}
            onClick={() => {
              setActiveProject(index);
              setPosition(50);
            }}
            className={`rounded-2xl border p-4 text-left transition ${
              activeProject === index
                ? "border-amber-300 bg-amber-300/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Project {String(project.id).padStart(2, "0")}</p>
            <p className="mt-2 text-sm font-bold leading-5 text-white">{project.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const heroImage = transformations[0].after;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden gap-8 text-sm text-white/70 md:flex">
            <a href="#transformations" className="transition hover:text-amber-300">
              Transformations
            </a>
            <a href="#services" className="transition hover:text-amber-300">
              Services
            </a>
            <a href="#instagram" className="transition hover:text-amber-300">
              Instagram
            </a>
            <a href="#lead" className="transition hover:text-amber-300">
              Start Project
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a href={phoneHref} className="hidden rounded-full bg-amber-400 px-6 py-2 text-sm font-black text-black transition hover:bg-amber-300 sm:inline-block">
              Call {phoneDisplay}
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <StickyContactButton />

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 scale-105">
          <Image
            src={heroImage}
            alt="Luxury kitchen transformation"
            fill
            priority
            sizes="100vw"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.18),transparent_32%),linear-gradient(to_bottom,rgba(0,0,0,0.45),rgba(0,0,0,0.92))]" />
        <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-yellow-200/10 blur-3xl" />

        <div className="relative z-10 max-w-6xl pt-28">
          <div className="mb-8 flex justify-center">
            <Logo hero />
          </div>

          <p className="mb-5 inline-flex rounded-full border border-amber-300/30 bg-white/10 px-5 py-2 text-sm uppercase tracking-[0.28em] text-amber-300 backdrop-blur">
            Luxury Custom Interiors
          </p>

          <h1 className="text-5xl font-black leading-none tracking-[-0.05em] md:text-8xl">
            This Isn’t Renovation.
            <span className="block bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
              It’s Transformation.
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/75">
            Custom kitchens, cabinetry, countertops, closets, vanities, and statement interiors designed to feel expensive, modern, and unforgettable.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#transformations" className="inline-flex items-center rounded-full bg-amber-400 px-9 py-4 font-black text-black shadow-[0_0_35px_rgba(251,191,36,0.35)] transition hover:-translate-y-1 hover:bg-amber-300">
              See The Wow <ArrowIcon className="ml-2 h-5 w-5" />
            </a>
            <a href={phoneHref} className="rounded-full border border-white/25 bg-white/10 px-9 py-4 font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20">
              Call {phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section id="transformations" className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-14 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Interactive Reveal</p>
          <h2 className="mt-4 text-5xl font-black tracking-[-0.04em] md:text-7xl">Drag. Feel the Difference.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-white/60">
            Switch between projects below, then drag the slider to reveal the before and after.
          </p>
        </div>
        <BeforeAfterSlider />
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">All Projects</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">Gallery of Transformations</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {transformations.map((project) => (
              <div key={project.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-amber-300/50 hover:bg-white/10">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.after}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="h-full w-full object-cover transition group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Project {String(project.id).padStart(2, "0")}</p>
                  <p className="mt-2 text-lg font-bold text-white">{project.title}</p>
                  <p className="mt-2 text-sm text-white/75">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-white/10 py-10">
        <div className="whitespace-nowrap text-3xl font-black uppercase tracking-[0.18em] text-white/15">
          Custom Cabinets • Luxury Kitchens • Countertops • Vanities • Closets • Entertainment Walls • Full Transformations • Custom Cabinets • Luxury Kitchens • Countertops • Vanities •
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-4">
            {proofPoints.map((point) => (
              <AnimatedCounter key={point.label} value={point.value} label={point.label} />
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-[#f7f3ea] px-6 py-24 text-black">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-700">Why Choose Us</p>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.04em] md:text-6xl">Built for Clients Who Want More Than Basic.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-black/60">
              K & G Art Design is for homeowners who want the finished space to feel designed, custom, and worth showing off.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="border border-black/10 bg-white p-7 shadow-xl shadow-black/5 transition hover:-translate-y-1">
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-black/60">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Our Process</p>
              <h2 className="mt-4 text-5xl font-black tracking-[-0.04em] md:text-6xl">Clear Steps. Cleaner Results.</h2>
              <p className="mt-5 text-lg leading-8 text-white/65">
                A clear process helps clients feel confident before the work starts and excited when the reveal is ready.
              </p>
              <a href={phoneHref} className="mt-8 inline-flex rounded-full bg-amber-400 px-8 py-4 font-black text-black transition hover:bg-amber-300">
                Book a Design Consultation
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {processSteps.map((step, index) => (
                <div key={step.title} className="border border-white/10 bg-white/[0.05] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-2xl font-black">{step.title}</h3>
                  <p className="mt-3 leading-7 text-white/60">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 text-black">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-700">Project Highlights</p>
              <h2 className="mt-4 text-5xl font-black tracking-[-0.04em] md:text-6xl">Proof You Can See.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-black/60">
                Until there are client reviews ready to publish, the strongest proof is the work itself: dramatic before/after results, cleaner finishes, and spaces that look custom.
              </p>
            </div>

            <div className="space-y-4">
              {projectHighlights.map((highlight) => (
                <div key={highlight} className="border border-black/10 bg-[#f7f3ea] p-6">
                  <p className="text-lg font-bold leading-8">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Service Areas</p>
              <h2 className="mt-4 text-5xl font-black tracking-[-0.04em] md:text-6xl">Miami-Based. South Florida Ready.</h2>
              <p className="mt-5 text-lg leading-8 text-white/65">
                Serving homeowners who want custom kitchens, cabinetry, closets, vanities, built-ins, and interior transformations.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {serviceAreas.map((area) => (
                <div key={area} className="border border-white/10 bg-white/[0.05] px-5 py-4 text-center font-bold text-white/80">
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-amber-50 to-yellow-50 px-6 py-24 text-black">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-700">Client Testimonials</p>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.04em] md:text-6xl">What Our Clients Say</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.author} className="rounded-2xl border border-black/10 bg-white p-8 shadow-lg shadow-black/5 transition hover:-translate-y-1">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-2xl">⭐</span>
                  ))}
                </div>
                <p className="text-lg font-semibold leading-8 text-black">{testimonial.quote}</p>
                <p className="mt-4 font-bold text-amber-900">{testimonial.author}</p>
                <p className="text-sm text-black/60">{testimonial.project}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="instagram" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Instagram System</p>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.04em] md:text-6xl">Turn Every Project Into Content.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-white/60">
              These blocks become your first posts, reels, and story CTAs using the same website photos.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {instagramPosts.map((post, index) => (
              <div key={post.title} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/20 transition hover:-translate-y-2">
                <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Post 0{index + 1} · {post.format}</p>
                <h3 className="mt-4 text-2xl font-black">{post.title}</h3>
                <p className="mt-4 font-semibold text-white">{post.hook}</p>
                <p className="mt-3 text-sm leading-6 text-white/60">{post.caption}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <InstagramFeed />
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3ea] px-6 py-24 text-black">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-700">FAQ</p>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.04em] md:text-6xl">Questions Before You Call.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {faqs.map((item) => (
              <div key={item.question} className="border border-black/10 bg-white p-7 shadow-xl shadow-black/5">
                <h3 className="text-xl font-black">{item.question}</h3>
                <p className="mt-4 leading-7 text-black/60">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lead" className="bg-gradient-to-br from-neutral-950 via-black to-neutral-900 px-6 py-28">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_0.9fr] md:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300">Lead Capture</p>
            <h2 className="mt-4 text-5xl font-black tracking-[-0.04em] md:text-7xl">Ready to Build Something That Turns Heads?</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
              Tell us what you want to transform. K & G Art Design can turn your inspiration, measurements, and project goals into a custom design plan.
            </p>
            <div className="mt-8 grid max-w-xl gap-3 text-sm text-white/70 sm:grid-cols-2">
              <p>✓ Kitchen transformations</p>
              <p>✓ Custom cabinetry</p>
              <p>✓ Countertops & vanities</p>
              <p>✓ Closets & entertainment walls</p>
            </div>
            <div className="mt-8 space-y-3 text-white/75">
              <p>
                <span className="font-bold text-white">Phone:</span>{" "}
                <a href={phoneHref} className="text-amber-300 transition hover:text-amber-200">
                  {phoneDisplay}
                </a>
              </p>
              <p>
                <span className="font-bold text-white">Address:</span>{" "}
                <a href={mapsHref} target="_blank" rel="noreferrer" className="text-amber-300 transition hover:text-amber-200">
                  {address}
                </a>
              </p>
              <p>
                <span className="font-bold text-white">Website:</span>{" "}
                <a href={websiteUrl} target="_blank" rel="noreferrer" className="text-amber-300 transition hover:text-amber-200">
                  {websiteDisplay}
                </a>
              </p>
            </div>
          </div>

          <SubmissionForm />
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/50 px-6 py-12 text-white/70 backdrop-blur">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <p className="font-bold text-white">K & G Art Design</p>
              <p className="mt-2 text-sm leading-6">Luxury custom kitchens, cabinetry, and interior transformations for South Florida homes.</p>
            </div>
            <div>
              <p className="font-bold text-white">Quick Links</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="#transformations" className="transition hover:text-amber-300">Transformations</a></li>
                <li><a href="#services" className="transition hover:text-amber-300">Services</a></li>
                <li><a href="#lead" className="transition hover:text-amber-300">Get a Quote</a></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-white">Services</p>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a href="#" className="transition hover:text-amber-300">Custom Kitchens</a></li>
                <li><a href="#" className="transition hover:text-amber-300">Cabinetry</a></li>
                <li><a href="#" className="transition hover:text-amber-300">Countertops & Vanities</a></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-white">Contact</p>
              <ul className="mt-2 space-y-2 text-sm">
                <li><a href={phoneHref} className="transition hover:text-amber-300">{phoneDisplay}</a></li>
                <li><a href={mapsHref} target="_blank" rel="noreferrer" className="transition hover:text-amber-300">{address}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-xs">
            <p>© 2025 K & G Art Design. All rights reserved. | Luxury Interior Transformations</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
