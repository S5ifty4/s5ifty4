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
      note: 'Lavender latte & cream puff', order: 1,
    },
    {
      name: 'American Museum of Natural History',
      lat: 40.7813, lng: -73.974,
      cat: 'attraction', day: [1], time: '10:00 AM',
      note: 'Take 1 train from 50th to 81st St', order: 2,
    },
    {
      name: "Jacob's Pickles",
      lat: 40.7845, lng: -73.9764,
      cat: 'food', day: [1], time: '1:00 PM',
      note: 'Southern fried chicken & biscuits, mushroom gravy', order: 3,
    },
    {
      name: 'Levain Bakery (74th St)',
      lat: 40.7799, lng: -73.9803,
      cat: 'dessert', day: [1], time: '2:30 PM',
      note: 'Iconic chocolate chip walnut cookie', order: 4,
    },
    {
      name: 'Times Square',
      lat: 40.758, lng: -73.9855,
      cat: 'attraction', day: [1], time: '5:30 PM',
      note: 'See the lights at dusk', order: 5,
    },
    {
      name: 'The Smith (Lincoln Square)',
      lat: 40.7738, lng: -73.983,
      cat: 'food', day: [1], time: '7:30 PM',
      note: 'Dinner', order: 6,
    },
    {
      name: "Dizzy's Club (Jazz at Lincoln Center)",
      lat: 40.7688, lng: -73.9832,
      cat: 'nightlife', day: [1], time: '10:00 PM',
      note: 'Columbus Circle', order: 7,
    },

    // ── Day 2 · Sun 22 ──────────────────────────────────────────
    {
      name: 'Liberty Bagels',
      lat: 40.7554, lng: -73.9903,
      cat: 'food', day: [2], time: '8:00 AM',
      note: 'Breakfast', order: 1,
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
      note: 'Give yourself 2–3 hours', order: 3,
    },
    {
      name: 'Brookfield Place / The Oculus',
      lat: 40.7112, lng: -74.0147,
      cat: 'food', day: [2], time: '1:00 PM',
      note: 'Lunch', order: 4,
    },
    {
      name: 'The High Line (Gansevoort St start)',
      lat: 40.739, lng: -74.008,
      cat: 'attraction', day: [2], time: '2:30 PM',
      note: 'Walk north → Hudson Yards → The Vessel', order: 5,
    },
    {
      name: 'Magnolia Bakery (Rockefeller Center)',
      lat: 40.7587, lng: -73.9787,
      cat: 'dessert', day: [2], time: '4:30 PM',
      note: 'Classic banana pudding', order: 6,
    },
    {
      name: 'Central Park (72nd St entrance)',
      lat: 40.7736, lng: -73.9712,
      cat: 'attraction', day: [2], time: '5:30 PM',
      note: 'Strawberry Fields, The Lake, Bethesda Terrace', order: 7,
    },
    {
      name: "L'Industrie Pizzeria",
      lat: 40.7109, lng: -73.9575,
      cat: 'food', day: [2], time: '7:00 PM',
      note: 'Legendary slice — Williamsburg', order: 8,
    },
    {
      name: 'Smalls Jazz Club',
      lat: 40.734, lng: -74.0025,
      cat: 'nightlife', day: [2], time: '10:00 PM',
      note: 'West Village — intimate jazz/blues', order: 9,
    },

    // ── Day 3 · Mon 23 ──────────────────────────────────────────
    {
      name: 'Grand Central Terminal',
      lat: 40.7527, lng: -73.9772,
      cat: 'attraction', day: [3], time: '8:30 AM',
      note: 'Coffee + celestial ceiling', order: 1,
    },
    {
      name: 'NYSE (New York Stock Exchange)',
      lat: 40.7069, lng: -74.0113,
      cat: 'attraction', day: [3], time: '9:45 AM',
      note: 'Employee access — business attire required!', order: 2,
    },
    {
      name: 'Charging Bull & Fearless Girl',
      lat: 40.7056, lng: -74.0134,
      cat: 'attraction', day: [3], time: '11:00 AM',
      note: 'Bowling Green', order: 3,
    },
    {
      name: 'Brooklyn Bridge (Manhattan side)',
      lat: 40.7061, lng: -73.9969,
      cat: 'attraction', day: [3], time: '12:00 PM',
      note: 'Walk to High St Brooklyn & back', order: 4,
    },
    {
      name: 'NY Public Library & Bryant Park',
      lat: 40.7536, lng: -73.9832,
      cat: 'attraction', day: [3], time: '2:30 PM',
      note: 'Rose Main Reading Room', order: 5,
    },
    {
      name: "Arthur's Tavern",
      lat: 40.7317, lng: -74.0008,
      cat: 'nightlife', day: [3], time: '9:30 PM',
      note: 'Jazz/blues — West Village', order: 6,
    },

    // ── Day 4 · Tue 24 ──────────────────────────────────────────
    {
      name: 'La Parisienne',
      lat: 40.7567, lng: -73.986,
      cat: 'food', day: [4], time: '8:00 AM',
      note: 'Breakfast', order: 1,
    },
    {
      name: 'Grand Central (Whispering Gallery)',
      lat: 40.753, lng: -73.977,
      cat: 'attraction', day: [4], time: '10:00 AM',
      note: 'Stand diagonally — sound travels!', order: 2,
    },
    {
      name: "Katz's Delicatessen",
      lat: 40.7223, lng: -73.9874,
      cat: 'food', day: [4], time: '12:00 PM',
      note: 'Legendary pastrami', order: 3,
    },
    {
      name: 'Work Dinner',
      lat: 40.7484, lng: -73.9856,
      cat: 'food', day: [4], time: '5:00 PM',
      note: 'R work dinner', order: 4,
    },

    // ── Day 5 · Wed 25 ──────────────────────────────────────────
    {
      name: 'OLIO E PIÙ',
      lat: 40.7327, lng: -73.999,
      cat: 'food', day: [5], time: '6:00 PM',
      note: 'Dinner reservation — West Village', order: 1,
    },
    {
      name: 'EWR Airport',
      lat: 40.6895, lng: -74.1745,
      cat: 'transport', day: [5], time: 'Evening',
      note: 'UA 1558 EWR → SFO, 8:10 PM', order: 2,
    },
  ],
};

export default nycFeb2026;
