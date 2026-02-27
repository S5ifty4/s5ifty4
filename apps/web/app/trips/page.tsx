"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { trips } from "@/lib/trip-data";
import { FilterBar } from "@/components/filter-bar";
import type { Category } from "@/lib/trip-data/types";

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

  const handleTripChange = (tripId: string) => {
    setSelectedTripId(tripId);
    setSelectedDays([]);
    setSelectedCategories([]);
  };

  if (!selectedTrip) {
    return (
      <main className="min-h-[calc(100vh-52px)] flex items-center justify-center bg-slate-950">
        <p className="text-slate-400">No trips available</p>
      </main>
    );
  }

  return (
    <main className="h-[calc(100vh-52px)] flex flex-col bg-slate-950">
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

      <FilterBar
        dayLabels={selectedTrip.dayLabels}
        selectedDays={selectedDays}
        selectedCategories={selectedCategories}
        onDayToggle={handleDayToggle}
        onCategoryToggle={handleCategoryToggle}
      />

      <div className="flex-1">
        <TripMap
          places={selectedTrip.places}
          center={selectedTrip.center}
          zoom={selectedTrip.zoom}
          selectedDays={selectedDays}
          selectedCategories={selectedCategories}
        />
      </div>
    </main>
  );
}
