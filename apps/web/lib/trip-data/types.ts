export type Category =
  | 'hotel'
  | 'food'
  | 'dessert'
  | 'attraction'
  | 'nightlife'
  | 'transport';

export interface Place {
  name: string;
  lat: number;
  lng: number;
  cat: Category;
  day: number[]; // 1-based day indices
  time?: string;
  note?: string;
  order?: number; // chronological order within day; 99 = no number shown
}

export interface TripData {
  id: string;
  name: string; // e.g. "NYC Feb 2026"
  subtitle?: string; // e.g. "Feb 21–25"
  center: [number, number];
  zoom: number;
  dayLabels: Record<number, string>; // 1 → "Sat 21"
  places: Place[];
}
