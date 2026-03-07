"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface DIYProject {
  emoji: string;
  title: string;
  desc: string;
  tags: string[];
  year: number;
  cover?: string;
  images?: string[];
}

const diyProjects: DIYProject[] = [
  // 2026
  {
    emoji: "🚪",
    title: "Built-in IKEA Pax Closet",
    desc: "Floor-to-ceiling built-in with custom baseboard, panels, and crown molding trim — stock flat-pack made architectural.",
    tags: ["Woodworking", "Trim Work", "IKEA Hack"],
    year: 2026,
    cover: "/diy/closet/IMG_9192.jpg",
    images: [
      "/diy/closet/IMG_8908.jpg",
      "/diy/closet/IMG_8913.jpg",
      "/diy/closet/IMG_8915.jpg",
      "/diy/closet/IMG_8916.jpg",
      "/diy/closet/IMG_8929_copy.jpg",
      "/diy/closet/IMG_9014.jpg",
      "/diy/closet/IMG_9027.jpg",
      "/diy/closet/IMG_9028.jpg",
      "/diy/closet/IMG_9029.jpg",
      "/diy/closet/IMG_9043.jpg",
      "/diy/closet/IMG_9069.jpg",
      "/diy/closet/IMG_9087.jpg",
      "/diy/closet/IMG_9102.jpg",
      "/diy/closet/IMG_9132.jpg",
      "/diy/closet/IMG_9192.jpg",
      "/diy/closet/IMG_9193.jpg",
      "/diy/closet/IMG_9194.jpg",
    ],
  },
  // 2025
  {
    emoji: "🪣",
    title: "Powder Room Remodel",
    desc: "Full gut — board & batten wainscoting, bold wallpaper, new vanity and fixtures. Tiny room, big transformation.",
    tags: ["Wallpaper", "Millwork", "Plumbing"],
    year: 2025,
    cover: "/diy/powderroom/IMG_7760.jpg",
    images: [
      "/diy/powderroom/IMG_7341.jpg",
      "/diy/powderroom/IMG_7406.jpg",
      "/diy/powderroom/IMG_7407.jpg",
      "/diy/powderroom/IMG_7423.jpg",
      "/diy/powderroom/IMG_7424.jpg",
      "/diy/powderroom/IMG_7430.jpg",
      "/diy/powderroom/IMG_7552.jpg",
      "/diy/powderroom/IMG_7613.jpg",
      "/diy/powderroom/IMG_7614.jpg",
      "/diy/powderroom/IMG_7654.jpg",
      "/diy/powderroom/IMG_7655.jpg",
      "/diy/powderroom/IMG_7656.jpg",
      "/diy/powderroom/IMG_7717.jpg",
      "/diy/powderroom/IMG_7718.jpg",
      "/diy/powderroom/IMG_7746.jpg",
      "/diy/powderroom/IMG_7749.jpg",
      "/diy/powderroom/IMG_7760.jpg",
    ],
  },
  // 2024
  {
    emoji: "🔥",
    title: "TV Wall with Fireplace",
    desc: "Electric fireplace insert, flanking floor-to-ceiling cabinets, full tile surround. Anchor of the family room.",
    tags: ["Tile", "Electrical", "Carpentry"],
    year: 2024,
    cover: "/diy/tvwall/IMG_6017.jpg",
    images: [
      "/diy/tvwall/IMG_4989.jpg",
      "/diy/tvwall/IMG_5091.jpg",
      "/diy/tvwall/IMG_5095.jpg",
      "/diy/tvwall/IMG_5109.jpg",
      "/diy/tvwall/IMG_5117.jpg",
      "/diy/tvwall/IMG_5323.jpg",
      "/diy/tvwall/IMG_5466.jpg",
      "/diy/tvwall/IMG_5493.jpg",
      "/diy/tvwall/IMG_5527.jpg",
      "/diy/tvwall/IMG_5698.jpg",
      "/diy/tvwall/IMG_5742.jpg",
      "/diy/tvwall/IMG_5746.jpg",
      "/diy/tvwall/IMG_5751.jpg",
      "/diy/tvwall/IMG_5761_2.jpg",
      "/diy/tvwall/IMG_5774_2.jpg",
      "/diy/tvwall/IMG_5860.jpg",
      "/diy/tvwall/IMG_6017.jpg",
    ],
  },
  {
    emoji: "📺",
    title: "Built-in Entertainment Center",
    desc: "Custom floor-to-ceiling entertainment center with integrated electric fireplace, flanking cabinets, and tile surround — the anchor of the family room.",
    tags: ["Carpentry", "Tile", "Electrical"],
    year: 2020,
    cover: "/diy/entertainment-center/IMG_4605.jpg",
    images: [
      "/diy/entertainment-center/IMG_3986.jpg",
      "/diy/entertainment-center/IMG_4011.jpg",
      "/diy/entertainment-center/IMG_4026.jpg",
      "/diy/entertainment-center/IMG_4027.jpg",
      "/diy/entertainment-center/IMG_4099.jpg",
      "/diy/entertainment-center/IMG_4101.jpg",
      "/diy/entertainment-center/IMG_4106.jpg",
      "/diy/entertainment-center/IMG_4300.jpg",
      "/diy/entertainment-center/IMG_4302.jpg",
      "/diy/entertainment-center/IMG_4331.jpg",
      "/diy/entertainment-center/IMG_4334.jpg",
      "/diy/entertainment-center/IMG_4367.jpg",
      "/diy/entertainment-center/IMG_4385.jpg",
      "/diy/entertainment-center/IMG_4401.jpg",
      "/diy/entertainment-center/IMG_4573.jpg",
      "/diy/entertainment-center/IMG_4574.jpg",
      "/diy/entertainment-center/IMG_4605.jpg",
    ],
  },
  // 2021
  {
    emoji: "🎬",
    title: "Home Movie Theater",
    desc: "Converted a bedroom into a dedicated cinema: tiered riser, acoustic panels, projector, 4K screen, Dolby surround.",
    tags: ["AV/Audio", "Framing", "Acoustic"],
    year: 2021,
    cover: "/diy/movie-theater/IMG_5867.jpg",
    images: [
      "/diy/movie-theater/IMG_4883.jpg",
      "/diy/movie-theater/IMG_5364.jpg",
      "/diy/movie-theater/IMG_5388.jpg",
      "/diy/movie-theater/IMG_5407.jpg",
      "/diy/movie-theater/IMG_5413.jpg",
      "/diy/movie-theater/IMG_5488.jpg",
      "/diy/movie-theater/IMG_5538.jpg",
      "/diy/movie-theater/IMG_5552.jpg",
      "/diy/movie-theater/IMG_5570.jpg",
      "/diy/movie-theater/IMG_5595.jpg",
      "/diy/movie-theater/IMG_5604.jpg",
      "/diy/movie-theater/IMG_5607.jpg",
      "/diy/movie-theater/IMG_5624.jpg",
      "/diy/movie-theater/IMG_5640.jpg",
      "/diy/movie-theater/IMG_5646.jpg",
      "/diy/movie-theater/IMG_5654.jpg",
      "/diy/movie-theater/IMG_5714.jpg",
      "/diy/movie-theater/IMG_5740.jpg",
      "/diy/movie-theater/IMG_5749.jpg",
      "/diy/movie-theater/IMG_5761.jpg",
      "/diy/movie-theater/IMG_5762.jpg",
      "/diy/movie-theater/IMG_5764.jpg",
      "/diy/movie-theater/IMG_5774.jpg",
      "/diy/movie-theater/IMG_5841.jpg",
      "/diy/movie-theater/IMG_5842.jpg",
      "/diy/movie-theater/IMG_5862.jpg",
      "/diy/movie-theater/IMG_5867.jpg",
    ],
  },
  // 2020 — Hallway Window, Office, Banquette, Patio Tiling, Workbench, Planters
  {
    emoji: "🪟",
    title: "Hallway Window",
    desc: "Custom hallway window build — framing, trim, and finishing work to bring natural light into an interior space.",
    tags: ["Framing", "Trim Work", "Carpentry"],
    year: 2020,
    cover: "/diy/hallway-window/IMG_3948.jpg",
    images: [
      "/diy/hallway-window/IMG_3540.jpg",
      "/diy/hallway-window/IMG_3543.jpg",
      "/diy/hallway-window/IMG_3717.jpg",
      "/diy/hallway-window/IMG_3724.jpg",
      "/diy/hallway-window/IMG_3727.jpg",
      "/diy/hallway-window/IMG_3758.jpg",
      "/diy/hallway-window/IMG_3761.jpg",
      "/diy/hallway-window/IMG_3838.jpg",
      "/diy/hallway-window/IMG_3840.jpg",
      "/diy/hallway-window/IMG_3847.jpg",
      "/diy/hallway-window/IMG_3851.jpg",
      "/diy/hallway-window/IMG_3948.jpg",
    ],
  },
  {
    emoji: "🧱",
    title: "Patio Tiling",
    desc: "Laid outdoor patio tile from scratch — prep, leveling, cutting, and grouting for a clean, durable finish.",
    tags: ["Tile", "Outdoor"],
    year: 2020,
    cover: "/diy/patio-tiling/IMG_2930.jpg",
    images: [
      "/diy/patio-tiling/IMG_2900.jpg",
      "/diy/patio-tiling/IMG_2905.jpg",
      "/diy/patio-tiling/IMG_2906.jpg",
      "/diy/patio-tiling/IMG_2907.jpg",
      "/diy/patio-tiling/IMG_2908.jpg",
      "/diy/patio-tiling/IMG_2915.jpg",
      "/diy/patio-tiling/IMG_2930.jpg",
    ],
  },
  {
    emoji: "📚",
    title: "Built-in Office Bookshelf",
    desc: "Floor-to-ceiling shelving, integrated desk, hidden cable management. Blank wall → proper home office.",
    tags: ["Woodworking", "Millwork"],
    year: 2020,
    cover: "/diy/office/IMG_2875.jpg",
    images: [
      "/diy/office/IMG_2619.jpg",
      "/diy/office/IMG_2746.jpg",
      "/diy/office/IMG_2756.jpg",
      "/diy/office/IMG_2757.jpg",
      "/diy/office/IMG_2773.jpg",
      "/diy/office/IMG_2775.jpg",
      "/diy/office/IMG_2789.jpg",
      "/diy/office/IMG_2805.jpg",
      "/diy/office/IMG_2818.jpg",
      "/diy/office/IMG_2829.jpg",
      "/diy/office/IMG_2830.jpg",
      "/diy/office/IMG_2853.jpg",
      "/diy/office/IMG_2859.jpg",
      "/diy/office/IMG_2875.jpg",
    ],
  },
  {
    emoji: "🪑",
    title: "Kitchen Banquette",
    desc: "Custom built-in bench seating with lift-top storage for the breakfast nook. Framed from scratch, cushioned for Sunday mornings.",
    tags: ["Framing", "Upholstery", "Storage"],
    year: 2020,
    cover: "/diy/banquette/10-finished.jpg",
    images: [
      "/diy/banquette/01-before.jpg",
      "/diy/banquette/02-framing-start.jpg",
      "/diy/banquette/03-framing-full.jpg",
      "/diy/banquette/04-box-build.jpg",
      "/diy/banquette/05-panels.jpg",
      "/diy/banquette/06-drawers.jpg",
      "/diy/banquette/07-seat-tops.jpg",
      "/diy/banquette/08-painting.jpg",
      "/diy/banquette/09-painted.jpg",
      "/diy/banquette/10-finished.jpg",
    ],
  },
  {
    emoji: "🔧",
    title: "Workbench",
    desc: "Built a sturdy workshop workbench from scratch — solid top, lower shelf, and plenty of workspace for projects.",
    tags: ["Woodworking", "Storage"],
    year: 2020,
    cover: "/diy/workbench/IMG_2459.jpg",
    images: [
      "/diy/workbench/IMG_2412.jpg",
      "/diy/workbench/IMG_2413.jpg",
      "/diy/workbench/IMG_2415.jpg",
      "/diy/workbench/IMG_2425.jpg",
      "/diy/workbench/IMG_2445.jpg",
      "/diy/workbench/IMG_2455.jpg",
      "/diy/workbench/IMG_2459.jpg",
      "/diy/workbench/IMG_3568.jpg",
    ],
  },
  {
    emoji: "🌱",
    title: "Raised Planters",
    desc: "Built a set of cedar raised garden beds from scratch — elevated design with liner, drainage, and a warm walnut stain. From raw lumber to backyard ready.",
    tags: ["Woodworking", "Outdoor", "Garden"],
    year: 2020,
    cover: "/diy/planters/05-finished.jpg",
    images: [
      "/diy/planters/01-frame.jpg",
      "/diy/planters/02-floor.jpg",
      "/diy/planters/03-trim.jpg",
      "/diy/planters/04-liner.jpg",
      "/diy/planters/05-finished.jpg",
      "/diy/planters/06-installed.jpg",
      "/diy/planters/07-batch.jpg",
    ],
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
  Outdoor: "bg-green-900/50 text-green-300",
  Garden: "bg-lime-900/50 text-lime-300",
};

function LightboxModal({
  images,
  startIndex,
  title,
  onClose,
}: {
  images: string[];
  startIndex: number;
  title: string;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-slate-400 hover:text-white text-sm"
        >
          ✕ Close
        </button>

        {/* Image */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-900">
          <Image
            src={images[current]!}
            alt={`${title} — photo ${current + 1}`}
            fill
            className="object-contain"
          />
        </div>

        {/* Nav */}
        {images.length > 1 && (
          <div className="flex items-center justify-between mt-4 px-2">
            <button
              onClick={prev}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
            >
              ← Prev
            </button>
            <span className="text-slate-400 text-sm">
              {current + 1} / {images.length}
            </span>
            <button
              onClick={next}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
            >
              Next →
            </button>
          </div>
        )}

        {/* Thumbnails */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                i === current ? "border-sky-400" : "border-transparent"
              }`}
            >
              <Image src={img} alt={`thumb ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function DIYPage() {
  const [lightbox, setLightbox] = useState<{ project: DIYProject; index: number } | null>(null);

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
              className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"
            >
              {/* Cover image */}
              {project.cover && (
                <button
                  onClick={() => setLightbox({ project, index: 0 })}
                  className="block w-full relative h-48 overflow-hidden group"
                >
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  {project.images && project.images.length > 1 && (
                    <span className="absolute bottom-2 right-2 text-xs bg-black/60 text-white px-2 py-1 rounded">
                      📷 {project.images.length} photos
                    </span>
                  )}
                </button>
              )}

              <div className="p-6">
                <span className="absolute top-4 right-4 text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded">
                  {project.year}
                </span>
                {!project.cover && (
                  <div className="text-3xl mb-4">{project.emoji}</div>
                )}
                <h2 className="text-lg font-semibold text-slate-100 mb-2">
                  {project.cover ? `${project.emoji} ${project.title}` : project.title}
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && lightbox.project.images && (
          <LightboxModal
            images={lightbox.project.images}
            startIndex={lightbox.index}
            title={lightbox.project.title}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
