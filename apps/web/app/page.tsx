"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showOrigin, setShowOrigin] = useState(false);

  return (
    <main className="min-h-[calc(100vh-52px)] flex flex-col items-center justify-center px-4 py-16 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-slate-100 mb-4">
          <button
            onClick={() => setShowOrigin(true)}
            className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent hover:from-sky-300 hover:to-indigo-300 transition-all cursor-pointer"
          >
            S5ifty4
          </button>
        </h1>
      </motion.div>

      {/* Origin Story Modal */}
      <AnimatePresence>
        {showOrigin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setShowOrigin(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-2xl p-8 overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowOrigin(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-slate-100 mb-2 text-center">
                What&apos;s in a name?
              </h2>
              <p className="text-slate-400 text-center mb-8 text-sm">
                <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent font-semibold">S5ifty4</span>{" "}
                = the Audi <span className="text-sky-400 font-semibold">S5</span> + the BMW <span className="text-indigo-400 font-semibold">S54</span> engine
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src="/images/audi-s5.jpg"
                      alt="Audi S5"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sky-400 font-semibold text-lg">Audi S5</p>
                    <p className="text-slate-500 text-xs">Grand touring, refined power</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                    <Image
                      src="/images/bmw-s54.jpg"
                      alt="BMW S54 Engine"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-indigo-400 font-semibold text-lg">BMW S54</p>
                    <p className="text-slate-500 text-xs">E46 M3 — the greatest inline-6 ever built</p>
                  </div>
                </div>
              </div>

              <p className="text-slate-500 text-center mt-6 text-xs">
                Two icons. One name.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap justify-center items-stretch gap-4 mt-12"
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
              className="block w-64 h-full p-6 rounded-2xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm hover:border-slate-600 transition-colors"
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
