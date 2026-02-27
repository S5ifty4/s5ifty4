"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { trips } from "@/lib/trip-data";
import { FilterBar } from "@/components/filter-bar";
import type { Category, Place } from "@/lib/trip-data/types";

const TripMap = dynamic(
  () => import("@/components/trip-map").then((mod) => mod.TripMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-slate-900">
        <div className="text-slate-400">Loading map...</div>
      </div>
    ),
  }
);

const CATEGORY_CONFIG: Record<Category, { color: string; emoji: string; label: string }> = {
  food:       { color: "#e67e22", emoji: "🍽️",  label: "Food" },
  dessert:    { color: "#e91e8e", emoji: "🧁",  label: "Dessert" },
  attraction: { color: "#2980b9", emoji: "🗽",  label: "Attractions" },
  hotel:      { color: "#e74c3c", emoji: "🏨",  label: "Hotels" },
  transport:  { color: "#16a085", emoji: "✈️",  label: "Transport" },
  nightlife:  { color: "#8e44ad", emoji: "🎵",  label: "Nightlife" },
};

const CATEGORY_ORDER: Category[] = ["food", "dessert", "attraction", "hotel", "transport", "nightlife"];

interface PlaceCardProps {
  place: Place;
  dayLabel: string;
  accentColor: string;
}

function PlaceCard({ place, dayLabel, accentColor }: PlaceCardProps) {
  return (
    <div className="flex flex-col gap-0.5 py-2.5 px-3 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium text-slate-100 leading-snug">{place.name}</span>
        <span
          className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 mt-0.5"
          style={{ backgroundColor: accentColor + "33", color: accentColor }}
        >
          {dayLabel}
        </span>
      </div>
      {place.time && (
        <span className="text-xs text-slate-400">{place.time}</span>
      )}
      {place.note && (
        <span className="text-xs text-slate-500 leading-snug">{place.note}</span>
      )}
    </div>
  );
}

const DAY_PALETTE = [
  "#e74c3c","#f39c12","#27ae60","#2980b9","#8e44ad",
  "#16a085","#d35400","#c0392b","#7f8c8d","#2c3e50","#1abc9c",
];

export default function TripsPage() {
  const [selectedTripId, setSelectedTripId] = useState(trips[0]?.id ?? "");
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const selectedTrip = useMemo(
    () => trips.find((t) => t.id === selectedTripId) ?? trips[0],
    [selectedTripId]
  );

  const handleDayToggle = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleCategoryToggle = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleAllDaysToggle = () => setSelectedDays([]);
  const handleAllCategoriesToggle = () => setSelectedCategories([]);

  const handleTripChange = (tripId: string) => {
    setSelectedTripId(tripId);
    setSelectedDays([]);
    setSelectedCategories([]);
  };

  // Filtered places for both map and list
  const filteredPlaces = useMemo(() => {
    if (!selectedTrip) return [];
    return selectedTrip.places.filter((place) => {
      const dayMatch =
        selectedDays.length === 0 ||
        place.day.some((d) => selectedDays.includes(d));
      const catMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(place.cat);
      return dayMatch && catMatch;
    });
  }, [selectedTrip, selectedDays, selectedCategories]);

  // Group filtered places by category, sorted within each group by day then order
  const groupedByCategory = useMemo(() => {
    const groups: Partial<Record<Category, Place[]>> = {};
    for (const place of filteredPlaces) {
      if (!groups[place.cat]) groups[place.cat] = [];
      groups[place.cat]!.push(place);
    }
    // Sort each group by day then order
    for (const cat of Object.keys(groups) as Category[]) {
      groups[cat]!.sort((a, b) => {
        const dayA = a.day[0] ?? 0;
        const dayB = b.day[0] ?? 0;
        if (dayA !== dayB) return dayA - dayB;
        return (a.order ?? 0) - (b.order ?? 0);
      });
    }
    return groups;
  }, [filteredPlaces]);

  const activeCategoryOrder = CATEGORY_ORDER.filter(
    (cat) => (groupedByCategory[cat]?.length ?? 0) > 0
  );

  if (!selectedTrip) {
    return (
      <main className="min-h-[calc(100vh-52px)] flex items-center justify-center bg-slate-950">
        <p className="text-slate-400">No trips available</p>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-52px)] flex flex-col bg-slate-950">
      {/* Trip selector */}
      <div className="p-4 bg-slate-900 border-b border-slate-800">
        <select
          value={selectedTripId}
          onChange={(e) => handleTripChange(e.target.value)}
          className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          {trips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              {trip.name} {trip.subtitle ? `— ${trip.subtitle}` : ""}
            </option>
          ))}
        </select>
      </div>

      {/* Filter bar */}
      <FilterBar
        dayLabels={selectedTrip.dayLabels}
        selectedDays={selectedDays}
        selectedCategories={selectedCategories}
        onDayToggle={handleDayToggle}
        onCategoryToggle={handleCategoryToggle}
        onAllDaysToggle={handleAllDaysToggle}
        onAllCategoriesToggle={handleAllCategoriesToggle}
      />

      {/* Map — fixed height */}
      <div className="h-[60vh] min-h-[400px] w-full">
        <TripMap
          places={selectedTrip.places}
          center={selectedTrip.center}
          zoom={selectedTrip.zoom}
          selectedDays={selectedDays}
          selectedCategories={selectedCategories}
        />
      </div>

      {/* Places list below map */}
      {activeCategoryOrder.length > 0 && (
        <section className="bg-slate-950 border-t border-slate-800 px-4 py-8">
          <h2 className="text-slate-200 text-lg font-semibold mb-6">
            📍 All Stops
            {filteredPlaces.length > 0 && (
              <span className="ml-2 text-sm font-normal text-slate-500">
                ({filteredPlaces.length} places)
              </span>
            )}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeCategoryOrder.map((cat) => {
              const places = groupedByCategory[cat] ?? [];
              const config = CATEGORY_CONFIG[cat];
              return (
                <div key={cat}>
                  {/* Category header */}
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
                    <span className="text-base">{config.emoji}</span>
                    <h3 className="text-sm font-semibold uppercase tracking-wider"
                      style={{ color: config.color }}>
                      {config.label}
                    </h3>
                    <span className="ml-auto text-xs text-slate-600">{places.length}</span>
                  </div>

                  {/* Place cards */}
                  <div className="flex flex-col gap-2">
                    {places.map((place, i) => {
                      const primaryDay = place.day[0] ?? 1;
                      const dayLabel = selectedTrip.dayLabels[primaryDay] ?? `Day ${primaryDay}`;
                      const accentColor = DAY_PALETTE[(primaryDay - 1) % DAY_PALETTE.length] ?? "#94a3b8";
                      return (
                        <PlaceCard
                          key={`${place.name}-${i}`}
                          place={place}
                          dayLabel={dayLabel}
                          accentColor={accentColor}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}
