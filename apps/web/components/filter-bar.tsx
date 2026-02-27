"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/lib/trip-data/types";

const DAY_PALETTE = [
  "#e74c3c",
  "#f39c12",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
  "#16a085",
  "#d35400",
  "#c0392b",
  "#7f8c8d",
  "#2c3e50",
  "#1abc9c",
];

const CATEGORY_CONFIG: Record<Category, { color: string; emoji: string }> = {
  hotel: { color: "#e74c3c", emoji: "🏨" },
  food: { color: "#e67e22", emoji: "🍽️" },
  dessert: { color: "#e91e8e", emoji: "🧁" },
  attraction: { color: "#2980b9", emoji: "🗽" },
  nightlife: { color: "#8e44ad", emoji: "🎵" },
  transport: { color: "#16a085", emoji: "✈️" },
};

interface FilterBarProps {
  dayLabels: Record<number, string>;
  selectedDays: number[];
  selectedCategories: Category[];
  onDayToggle: (day: number) => void;
  onCategoryToggle: (cat: Category) => void;
}

export function FilterBar({
  dayLabels,
  selectedDays,
  selectedCategories,
  onDayToggle,
  onCategoryToggle,
}: FilterBarProps) {
  const days = Object.entries(dayLabels)
    .map(([key, label]) => ({ num: parseInt(key, 10), label }))
    .sort((a, b) => a.num - b.num);

  const categories = Object.keys(CATEGORY_CONFIG) as Category[];

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-slate-900 border-b border-slate-800">
      <div className="flex flex-wrap gap-2">
        {days.map((day) => {
          const isSelected = selectedDays.includes(day.num);
          const color = DAY_PALETTE[(day.num - 1) % DAY_PALETTE.length];
          return (
            <button
              key={day.num}
              onClick={() => onDayToggle(day.num)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                isSelected
                  ? "text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              )}
              style={isSelected ? { backgroundColor: color } : undefined}
            >
              {day.label}
            </button>
          );
        })}
      </div>
      <div className="w-px bg-slate-700" />
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const config = CATEGORY_CONFIG[cat];
          const isSelected = selectedCategories.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => onCategoryToggle(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5",
                isSelected
                  ? "text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              )}
              style={isSelected ? { backgroundColor: config.color } : undefined}
            >
              <span>{config.emoji}</span>
              <span className="capitalize">{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
