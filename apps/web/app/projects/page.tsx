"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Car,
  Gem,
  Bot,
  Globe,
  TrendingUp,
  Zap,
  Rocket,
  Code2,
  type LucideIcon,
} from "lucide-react";

interface Project {
  icon: LucideIcon;
  name: string;
  desc: string;
  status: "LIVE" | "PRIVATE" | "WIP";
  url?: string;
  tags: string[];
}

const projects: Project[] = [
  {
    icon: Car,
    name: "teslend.com",
    desc: "Peer-to-peer Tesla rental marketplace. List your Tesla, browse nearby rentals, request bookings, and manage your fleet — built for the Tesla community.",
    status: "LIVE",
    url: "https://teslend.com",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind", "Tesla"],
  },
  {
    icon: Gem,
    name: "crollateral.finance",
    desc: "Cronos collateral dashboard for Tectonic Finance DeFi positions. Real-time liquidation price and borrowing power visualization.",
    status: "LIVE",
    url: "https://crollateral.finance",
    tags: ["React", "TypeScript", "DeFi", "Cronos", "Web3"],
  },
  {
    icon: Bot,
    name: "Kalshi 15m Bot",
    desc: "Algorithmic prediction market trading bot for Kalshi BTC/ETH 15-min threshold markets. Log-normal pricing model, momentum-filtered signals, aggressive limit execution. Live trading.",
    status: "PRIVATE",
    tags: ["Python", "Kalshi API", "Quant Finance"],
  },
  {
    icon: Globe,
    name: "s5ifty4.com",
    desc: "This site. Turborepo + Next.js 15 App Router, shadcn/ui, Tailwind, react-leaflet maps, Framer Motion.",
    status: "LIVE",
    tags: ["Next.js", "TypeScript", "Tailwind", "Turborepo"],
  },
  {
    icon: TrendingUp,
    name: "CRO Swing Bot",
    desc: "Crypto swing trading bot hooked into the Crypto.com Exchange. Multi-strategy trading bot built with one purpose: accumulate as much CRO as possible.",
    status: "LIVE",
    tags: ["Python", "Crypto.com API", "Backtesting"],
  },
  {
    icon: Zap,
    name: "Perp Arb Bot",
    desc: "Delta-neutral perpetual futures funding rate arbitrage on Hyperliquid DEX. Holds spot exposure while shorting the perp at 1x to harvest funding payments — exits when funding flips or basis diverges.",
    status: "PRIVATE",
    tags: ["Python", "Hyperliquid", "DeFi", "Quant Finance"],
  },
  {
    icon: Rocket,
    name: "Solana Grad Bot",
    desc: "Snipes pump.fun token graduations the moment they migrate to PumpSwap at ~$69K market cap. Filters by buy/sell ratio and graduation speed, then trades a tiered exit strategy with trailing stops.",
    status: "PRIVATE",
    tags: ["TypeScript", "Solana", "Web3", "pump.fun"],
  },
];

const statusStyles: Record<Project["status"], string> = {
  LIVE: "bg-green-900/50 text-green-400",
  PRIVATE: "bg-slate-800 text-slate-400",
  WIP: "bg-amber-900/50 text-amber-400",
};

const tagColors: Record<string, string> = {
  React: "bg-sky-900/50 text-sky-300",
  TypeScript: "bg-blue-900/50 text-blue-300",
  DeFi: "bg-purple-900/50 text-purple-300",
  Cronos: "bg-indigo-900/50 text-indigo-300",
  Web3: "bg-violet-900/50 text-violet-300",
  Python: "bg-yellow-900/50 text-yellow-300",
  "Kalshi API": "bg-green-900/50 text-green-300",
  "Quant Finance": "bg-emerald-900/50 text-emerald-300",
  "Next.js": "bg-slate-700/50 text-slate-300",
  Tailwind: "bg-cyan-900/50 text-cyan-300",
  Turborepo: "bg-rose-900/50 text-rose-300",
  "Crypto.com API": "bg-blue-900/50 text-blue-300",
  Backtesting: "bg-orange-900/50 text-orange-300",
  Supabase: "bg-emerald-900/50 text-emerald-300",
  Tesla: "bg-red-900/50 text-red-300",
  Hyperliquid: "bg-purple-900/50 text-purple-300",
  Solana: "bg-green-900/50 text-green-300",
  "pump.fun": "bg-pink-900/50 text-pink-300",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-[calc(100vh-52px)] px-4 py-12 bg-slate-950">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-start justify-between mb-12"
        >
          <div>
            <h1 className="text-4xl font-bold text-slate-100 mb-3 flex items-center gap-3">
              <Code2 className="w-9 h-9" />
              Projects
            </h1>
          </div>
          <a
            href="https://github.com/s5ifty4"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors text-sm"
          >
            GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <project.icon className="w-6 h-6 text-slate-300 shrink-0" />
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold text-slate-100">
                        {project.name}
                      </h2>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${statusStyles[project.status]}`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
              <p className="text-slate-400 mb-4">{project.desc}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-1 rounded ${tagColors[tag] || "bg-slate-700/50 text-slate-300"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
