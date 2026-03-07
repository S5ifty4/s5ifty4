import type { TripData } from './types';

const nycFeb2026: TripData = {
  id: 'nyc-feb-2026',
  name: 'NYC',
  subtitle: 'Feb 21–25, 2026',
  center: [40.758, -73.985],
  zoom: 13,
  dayLabels: {
    1: 'Sat 21',
    2: 'Sun 22',
    3: 'Mon 23',
    4: 'Tue 24',
    5: 'Wed 25',
  },
  places: [
    // ── Hotels ─────────────────────────────────────────────────
    {
      name: 'Residence Inn Manhattan/Central Park',
      lat: 40.7631, lng: -73.9826,
      cat: 'hotel', day: [1, 2],
      time: 'Night Stay (Sat–Sun)',
      note: '1717 Broadway',
      order: 99,
    },
    {
      name: 'Hyatt Place NY / Chelsea',
      lat: 40.7448, lng: -73.9947,
      cat: 'hotel', day: [3, 4],
      time: 'Night Stay (Mon–Tue)',
      note: '140 W 24th St',
      order: 99,
    },

    // ── Day 1 · Sat 21 ──────────────────────────────────────────
    {
      name: 'Bibble & Sip',
      lat: 40.7623, lng: -73.9857,
      cat: 'food', day: [1], time: '9:00 AM',
      note: 'Lavender latte & chocolate croissant', order: 1,
    },
    {
      name: 'American Museum of Natural History',
      lat: 40.7813, lng: -73.974,
      cat: 'attraction', day: [1], time: '10:00 AM',
      note: 'Fun but nothing like the Night at the Museum movie', order: 2,
    },
    {
      name: "Joe's Pizza (Times Square)",
      lat: 40.757, lng: -73.9875,
      cat: 'food', day: [1], time: '1:00 PM',
      note: 'Classic NY slice near Times Square', order: 3,
    },
    {
      name: 'Levain Bakery (Times Square)',
      lat: 40.7604, lng: -73.9857,
      cat: 'dessert', day: [1], time: '2:30 PM',
      note: 'Ask for freshly baked or warm to order', order: 4,
    },
    {
      name: "Adel's Halal Cart",
      lat: 40.7582, lng: -73.9858,
      cat: 'food', day: [1], time: '4:00 PM',
      note: 'Chicken and Lamb over rice — Times Square area', order: 5,
    },
    {
      name: 'Times Square',
      lat: 40.758, lng: -73.9855,
      cat: 'attraction', day: [1], time: '5:30 PM',
      note: 'Walk around and explore', order: 6,
    },
    {
      name: 'Magnolia Bakery',
      lat: 40.7587, lng: -73.9787,
      cat: 'dessert', day: [1], time: '7:00 PM',
      note: 'Classic banana pudding', order: 7,
    },


    // ── Day 2 · Sun 22 ──────────────────────────────────────────
    {
      name: 'Broad Nosh Bagel',
      lat: 40.7071, lng: -74.0101,
      cat: 'food', day: [2], time: '8:00 AM',
      note: 'Breakfast bagel — FiDi', order: 1,
    },
    {
      name: 'World Trade Center / Ground Zero',
      lat: 40.7116, lng: -74.0131,
      cat: 'attraction', day: [2], time: '9:30 AM',
      note: 'Take E train from 7th Ave', order: 2,
    },
    {
      name: '9/11 Memorial & Museum',
      lat: 40.7115, lng: -74.0134,
      cat: 'attraction', day: [2], time: '10:00 AM',
      note: 'Walk around', order: 3,
    },
    {
      name: 'Los Tacos No. 1 (near Grand Central)',
      lat: 40.7506, lng: -73.9756,
      cat: 'food', day: [2], time: '1:00 PM',
      note: 'Al Pastor tacos and mulas', order: 4,
    },
    {
      name: 'The High Line (Gansevoort St start)',
      lat: 40.739, lng: -74.008,
      cat: 'attraction', day: [2], time: '2:30 PM',
      note: 'Walk north → Hudson Yards', order: 5,
    },
    {
      name: "Greg's Papaya",
      lat: 40.7617, lng: -73.9848,
      cat: 'food', day: [2], time: '4:00 PM',
      note: 'Hot dog with everything', order: 6,
    },
    {
      name: 'Central Park (72nd St entrance)',
      lat: 40.7736, lng: -73.9712,
      cat: 'attraction', day: [2], time: '5:00 PM',
      note: 'Walk through and explore', order: 7,
    },
    {
      name: 'Mitr Thai',
      lat: 40.7574, lng: -73.9882,
      cat: 'food', day: [2], time: '7:00 PM',
      note: 'Dinner — Theater District', order: 8,
    },


    // ── Day 3 · Mon 23 ──────────────────────────────────────────
    {
      name: 'Simpl Coffee',
      lat: 40.7059, lng: -74.0096,
      cat: 'food', day: [3], time: '8:00 AM',
      note: 'Chocolate coffee latte', order: 1,
    },
    {
      name: 'NYSE (New York Stock Exchange)',
      lat: 40.7069, lng: -74.0113,
      cat: 'attraction', day: [3], time: '9:00 AM',
      note: 'Walk the trading floor and watch opening bell ceremony', order: 2,
    },
    {
      name: 'Charging Bull & Fearless Girl',
      lat: 40.7056, lng: -74.0134,
      cat: 'attraction', day: [3], time: '11:00 AM',
      note: 'Take pics', order: 3,
    },
    {
      name: 'Skinny Louie\'s',
      lat: 40.7064, lng: -74.0092,
      cat: 'food', day: [3], time: '12:00 PM',
      note: 'Smashburger with Louie Sauce', order: 4,
    },
    {
      name: 'NY Public Library & Bryant Park',
      lat: 40.7536, lng: -73.9832,
      cat: 'attraction', day: [3], time: '2:00 PM',
      note: 'Rose Main Reading Room', order: 5,
    },
    {
      name: 'Angelina Bakery (Times Square)',
      lat: 40.7598, lng: -73.9882,
      cat: 'dessert', day: [3], time: '3:30 PM',
      note: 'French pastries near Times Square', order: 6,
    },
    {
      name: 'OLIO E PIÙ',
      lat: 40.7327, lng: -73.999,
      cat: 'food', day: [3], time: '6:00 PM',
      note: 'Best carbonara', order: 7,
    },
    {
      name: 'Brooklyn Bridge',
      lat: 40.7061, lng: -73.9969,
      cat: 'attraction', day: [3], time: 'Evening',
      note: 'Night walk on the bridge', order: 8,
    },
    {
      name: "Anita La Mamma del Gelato",
      lat: 40.7072, lng: -74.0086,
      cat: 'dessert', day: [3], time: 'Evening',
      note: 'Gelato near FiDi', order: 9,
    },


    // ── Day 4 · Tue 24 ──────────────────────────────────────────
    {
      name: 'Variety Coffee',
      lat: 40.7339, lng: -74.0021,
      cat: 'food', day: [4], time: '8:00 AM',
      note: 'Coffee — West Village', order: 1,
    },
    {
      name: 'Popup Bagel (Greenwich)',
      lat: 40.733, lng: -74.0038,
      cat: 'food', day: [4], time: '9:00 AM',
      note: '3-pack bagels with schmear tub', order: 2,
    },
    {
      name: 'Grand Central',
      lat: 40.753, lng: -73.977,
      cat: 'attraction', day: [4], time: '10:00 AM',
      note: 'Explore', order: 3,
    },
    {
      name: "Katz's Delicatessen",
      lat: 40.7223, lng: -73.9874,
      cat: 'food', day: [4], time: '12:00 PM',
      note: 'Pastrami on rye', order: 4,
    },
    {
      name: 'Supermoon Bakehouse',
      lat: 40.7217, lng: -73.9867,
      cat: 'dessert', day: [4], time: '2:00 PM',
      note: 'Hole in the wall pastries', order: 5,
    },
    {
      name: 'Rubirosa',
      lat: 40.7226, lng: -73.9968,
      cat: 'food', day: [4], time: '4:00 PM',
      note: 'Nolita — pizza & pasta', order: 6,
    },
    {
      name: 'Dominique Ansel Bakery',
      lat: 40.7257, lng: -74.0011,
      cat: 'dessert', day: [4], time: '5:30 PM',
      note: 'Monthy cronut special', order: 7,
    },
    {
      name: 'Hamilton (Richard Rodgers Theatre)',
      lat: 40.7595, lng: -73.9863,
      cat: 'attraction', day: [4], time: '7:00 PM',
      note: 'Broadway musical — Hamilton', order: 8,
    },

    // ── Day 5 · Wed 25 ──────────────────────────────────────────
    {
      name: '787 Coffee',
      lat: 40.746, lng: -73.9985,
      cat: 'food', day: [5], time: '8:00 AM',
      note: 'Coffee near Chelsea', order: 1,
    },
    {
      name: 'El Donkey (Chelsea Market)',
      lat: 40.7424, lng: -74.0061,
      cat: 'food', day: [5], time: '10:00 AM',
      note: 'Burrito cart — Chelsea Market', order: 2,
    },
    {
      name: 'Los Tacos No. 1 (Chelsea Market)',
      lat: 40.7425, lng: -74.006,
      cat: 'food', day: [5], time: '11:00 AM',
      note: 'Try all their tacos', order: 3,
    },
    {
      name: 'El Mariscos (Chelsea Market)',
      lat: 40.7424, lng: -74.0062,
      cat: 'food', day: [5], time: '12:00 PM',
      note: 'Fried fish and shrimp tacos', order: 4,
    },
    {
      name: 'The Lobster Place (Chelsea Market)',
      lat: 40.7423, lng: -74.0063,
      cat: 'food', day: [5], time: '12:30 PM',
      note: 'Lobster roll', order: 5,
    },
    {
      name: 'Levain Bakery (Greenwich)',
      lat: 40.7336, lng: -73.9993,
      cat: 'dessert', day: [5], time: '2:00 PM',
      note: 'More cookies to go', order: 6,
    },
    {
      name: 'The Vessel (Hudson Yards)',
      lat: 40.7538, lng: -74.0022,
      cat: 'attraction', day: [5], time: '3:00 PM',
      note: 'Climb the honeycomb sculpture and explore the mall', order: 7,
    },
    {
      name: 'EWR Airport',
      lat: 40.6895, lng: -74.1745,
      cat: 'transport', day: [5], time: 'Evening',
      note: 'UA 1558 EWR → SFO, 8:10 PM', order: 8,
    },
  ],
};

export default nycFeb2026;
