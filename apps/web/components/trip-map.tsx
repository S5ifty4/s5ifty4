"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Place, Category } from "@/lib/trip-data/types";

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

const CATEGORY_EMOJI: Record<Category, string> = {
  hotel: "🏨",
  food: "🍽️",
  dessert: "🧁",
  attraction: "🗽",
  nightlife: "🎵",
  transport: "✈️",
};

function createMarkerIcon(
  emoji: string,
  dayIndex: number,
  order?: number
): L.DivIcon {
  const dayColor = DAY_PALETTE[dayIndex % DAY_PALETTE.length] || "#94a3b8";
  const showBadge = order !== undefined && order < 99;

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        position: relative;
        width: 36px;
        height: 36px;
        background: white;
        border-radius: 50%;
        border: 3px solid ${dayColor};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">
        ${emoji}
        ${
          showBadge
            ? `<span style="
            position: absolute;
            top: -6px;
            right: -6px;
            width: 18px;
            height: 18px;
            background: ${dayColor};
            color: white;
            border-radius: 50%;
            font-size: 10px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
          ">${order}</span>`
            : ""
        }
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
}

interface MapUpdaterProps {
  center: [number, number];
  zoom: number;
}

function MapUpdater({ center, zoom }: MapUpdaterProps) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

interface TripMapProps {
  places: Place[];
  center: [number, number];
  zoom: number;
  selectedDays: number[];
  selectedCategories: Category[];
}

export function TripMap({
  places,
  center,
  zoom,
  selectedDays,
  selectedCategories,
}: TripMapProps) {
  const filteredPlaces = places.filter((place) => {
    const dayMatch =
      selectedDays.length === 0 ||
      place.day.some((d) => selectedDays.includes(d));
    const catMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(place.cat);
    return dayMatch && catMatch;
  });

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="h-full w-full"
      style={{ background: "#0f172a" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <MapUpdater center={center} zoom={zoom} />
      {filteredPlaces.map((place, index) => {
        const primaryDay = place.day[0] ?? 1;
        const icon = createMarkerIcon(
          CATEGORY_EMOJI[place.cat],
          primaryDay - 1,
          place.order
        );

        return (
          <Marker
            key={`${place.name}-${index}`}
            position={[place.lat, place.lng]}
            icon={icon}
          >
            <Popup>
              <div className="min-w-[200px]">
                <div className="font-semibold text-slate-900">{place.name}</div>
                {place.time && (
                  <div className="text-sm text-slate-600">{place.time}</div>
                )}
                {place.note && (
                  <div className="text-sm text-slate-500 mt-1">{place.note}</div>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
