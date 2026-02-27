import type { TripData } from './types';

// Gate1Travel Res 3365369 · Apr 19–29 2026 · Cairo → Nile Cruise → Aswan → Cairo
// Full itinerary: memory/2026-02-17.md
const egyptApr2026: TripData = {
  id: 'egypt-apr-2026',
  name: 'Egypt',
  subtitle: 'Apr 19–29, 2026',
  center: [26.5, 31.5],
  zoom: 6,
  dayLabels: {
    1:  'Sun Apr 19',
    2:  'Mon Apr 20',
    3:  'Tue Apr 21',
    4:  'Wed Apr 22',
    5:  'Thu Apr 23',
    6:  'Fri Apr 24',
    7:  'Sat Apr 25',
    8:  'Sun Apr 26',
    9:  'Mon Apr 27',
    10: 'Tue Apr 28',
    11: 'Wed Apr 29',
  },
  places: [
    // TODO: populate from Gate1Travel itinerary
    // Key stops: Cairo Marriott, Giza Pyramids, Cairo Museum,
    //   Luxor Temple, Valley of the Kings (Nile Cruise),
    //   Aswan (Movenpick), Abu Simbel, back to Hilton Heliopolis
    {
      name: 'Cairo (Arrive)',
      lat: 30.0444, lng: 31.2357,
      cat: 'transport', day: [1],
      time: 'Arrival',
      note: 'Cairo Marriott — conf# BU45BI',
      order: 1,
    },
    {
      name: 'Giza Pyramids & Sphinx',
      lat: 29.9792, lng: 31.1342,
      cat: 'attraction', day: [2],
      time: 'Morning',
      order: 1,
    },
    {
      name: 'Egyptian Museum',
      lat: 30.0478, lng: 31.2336,
      cat: 'attraction', day: [2],
      time: 'Afternoon',
      order: 2,
    },
    {
      name: 'Luxor Temple',
      lat: 25.6995, lng: 32.6392,
      cat: 'attraction', day: [5],
      time: 'Morning',
      order: 1,
    },
    {
      name: 'Valley of the Kings',
      lat: 25.7402, lng: 32.6014,
      cat: 'attraction', day: [6],
      time: 'Morning',
      order: 1,
    },
    {
      name: 'Aswan — Movenpick Resort',
      lat: 24.0889, lng: 32.8998,
      cat: 'hotel', day: [7, 8],
      time: 'Night Stay',
      order: 99,
    },
    {
      name: 'Abu Simbel Temples',
      lat: 22.3372, lng: 31.6258,
      cat: 'attraction', day: [8],
      time: 'Early Morning (flight)',
      order: 1,
    },
    {
      name: 'Cairo — Hilton Heliopolis',
      lat: 30.1219, lng: 31.4067,
      cat: 'hotel', day: [9, 10, 11],
      time: 'Night Stay',
      note: 'Return to Cairo via flight',
      order: 99,
    },
  ],
};

export default egyptApr2026;
