"use client";

import { motion } from "framer-motion";

interface DIYProject {
  emoji: string;
  title: string;
  desc: string;
  tags: string[];
  year: number;
}

const diyProjects: DIYProject[] = [
  {
    emoji: "🚪",
    title: "Built-in IKEA Pax Closet",
    desc: "Floor-to-ceiling built-in with custom baseboard, panels, and crown molding trim — stock flat-pack made architectural.",
    tags: ["Woodworking", "Trim Work", "IKEA Hack"],
    year: 2024,
  },
  {
    emoji: "🪣",
    title: "Powder Room Remodel",
    desc: "Full gut — board & batten wainscoting, bold wallpaper, new vanity and fixtures. Tiny room, big transformation.",
    tags: ["Wallpaper", "Millwork", "Plumbing"],
    year: 2024,
  },
  {
    emoji: "📺",
    title: "TV Wall with Fireplace",
    desc: "Electric fireplace insert, flanking floor-to-ceiling cabinets, full tile surround. Anchor of the family room.",
    tags: ["Tile", "Electrical", "Carpentry"],
    year: 2023,
  },
  {
    emoji: "🪑",
    title: "Kitchen Banquette",
    desc: "Custom built-in bench seating with lift-top storage for the breakfast nook. Framed from scratch, cushioned for Sunday mornings.",
    tags: ["Framing", "Upholstery", "Storage"],
    year: 2023,
  },
  {
    emoji: "📚",
    title: "Built-in Office Bookshelf",
    desc: "Floor-to-ceiling shelving, integrated desk, hidden cable management. Blank wall → proper home office.",
    tags: ["Woodworking", "Millwork"],
    year: 2024,
  },
  {
    emoji: "🎬",
    title: "Home Movie Theater",
    desc: "Converted a bedroom into a dedicated cinema: tiered riser, acoustic panels, projector, 4K screen, Dolby surround.",
    tags: ["AV/Audio", "Framing", "Acoustic"],
    year: 2025,
  },
];

const tagColors: Record<string, string> = {
  Woodworking: "bg-amber-900/50 text-amber-300",
  "Trim Work": "bg-orange-900/50 text-orange-300",
  "IKEA Hack": "bg-blue-900/50 text-blue-300",
  Wallpaper: "bg-pink-900/50 text-pink-300",
  Millwork: "bg-amber-900/50 text-amber-300",
  Plumbing: "bg-cyan-900/50 text-cyan-300",
  Tile: "bg-slate-700/50 text-slate-300",
  Electrical: "bg-yellow-900/50 text-yellow-300",
  Carpentry: "bg-amber-900/50 text-amber-300",
  Framing: "bg-stone-700/50 text-stone-300",
  Upholstery: "bg-purple-900/50 text-purple-300",
  Storage: "bg-green-900/50 text-green-300",
  "AV/Audio": "bg-indigo-900/50 text-indigo-300",
  Acoustic: "bg-violet-900/50 text-violet-300",
};

export default function DIYPage() {
  return (
    <main className="min-h-[calc(100vh-52px)] px-4 py-12 bg-slate-950">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-100 mb-3">
            🔨 DIY Projects
          </h1>
          <p className="text-slate-400">
            Built by hand — mostly YouTube and stubbornness.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
          {diyProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6"
            >
              <span className="absolute top-4 right-4 text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded">
                {project.year}
              </span>
              <div className="text-3xl mb-4">{project.emoji}</div>
              <h2 className="text-lg font-semibold text-slate-100 mb-2">
                {project.title}
              </h2>
              <p className="text-sm text-slate-400 mb-4">{project.desc}</p>
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
