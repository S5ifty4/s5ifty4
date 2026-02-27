"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ctaCards = [
  {
    emoji: "🗺️",
    label: "Trips",
    desc: "Interactive maps of places I've been",
    href: "/trips",
  },
  {
    emoji: "🔨",
    label: "DIY",
    desc: "Home projects built by hand",
    href: "/diy",
  },
  {
    emoji: "💻",
    label: "Projects",
    desc: "Code that ships, bots that trade",
    href: "/projects",
  },
];

const stackPills = [
  "React",
  "TypeScript",
  "Python",
  "Node.js",
  "DeFi/Web3",
];

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-52px)] flex flex-col items-center justify-center px-4 py-16 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-slate-100 mb-4">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Manish.
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-slate-300 mb-2"
        >
          Senior Software Engineer · DIYer · Traveler
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400"
        >
          Newark, CA
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-4 mt-12"
      >
        {ctaCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.03, y: -4 }}
          >
            <Link
              href={card.href}
              className="block w-64 p-6 rounded-2xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm hover:border-slate-600 transition-colors"
            >
              <div className="text-3xl mb-3">{card.emoji}</div>
              <h2 className="text-lg font-semibold text-slate-100 mb-1">
                {card.label}
              </h2>
              <p className="text-sm text-slate-400">{card.desc}</p>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-wrap justify-center gap-2 mt-12"
      >
        {stackPills.map((tech, index) => (
          <motion.span
            key={tech}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            className="px-3 py-1.5 rounded-full text-sm bg-slate-800/80 text-slate-300 border border-slate-700"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>
    </main>
  );
}
