import image1 from './image1.jpg'
import image2 from './image2.jpg'
import image3 from './image3.jpg'

const flights = [
  {
    id: 1,
    originCode: 'DAR',
    originCity: 'Dar es salaam',
    departureTime: 'TUE,16 • 14:05',
    destinationCode: 'KLM',
    destinationCity: 'Kilimanjaro',
    arrivalTime: 'TUE,16 • 16:05',
    airline: 'Precision Air',
    price: 370000,
    hasPolicy: true
  },
  {
    id: 2,
    originCode: 'DAR',
    originCity: 'Dar es salaam',
    departureTime: 'WED,17 • 09:15',
    destinationCode: 'KLM',
    destinationCity: 'Kilimanjaro',
    arrivalTime: 'WED,17 • 11:15',
    airline: 'Air Tanzania',
    price: 385000,
    hasPolicy: false
  },
  {
    id: 3,
    originCode: 'DAR',
    originCity: 'Dar es salaam',
    departureTime: 'THU,18 • 07:30',
    destinationCode: 'KLM',
    destinationCity: 'Kilimanjaro',
    arrivalTime: 'THU,18 • 09:30',
    airline: 'Precision Air',
    price: 365000,
    hasPolicy: true
  },
  {
    id: 4,
    originCode: 'DAR',
    originCity: 'Dar es salaam',
    departureTime: 'FRI,19 • 16:45',
    destinationCode: 'KLM',
    destinationCity: 'Kilimanjaro',
    arrivalTime: 'FRI,19 • 18:45',
    airline: 'Air Tanzania',
    price: 390000,
    hasPolicy: false
  },
  {
    id: 5,
    originCode: 'DAR',
    originCity: 'Dar es salaam',
    departureTime: 'SAT,20 • 11:20',
    destinationCode: 'KLM',
    destinationCity: 'Kilimanjaro',
    arrivalTime: 'SAT,20 • 13:20',
    airline: 'Precision Air',
    price: 375000,
    hasPolicy: true
  }
];

const hotels = [
  {
    id: 1,
    name: 'Sydede by Marriott Hotel',
    location: 'Rau River, Moshi, Tanzania',
    amenities: 'Ocean view, Balcony, Swimming pool',
    rating: 8.5,
    price: 150000,
    image: image1,
    stars: 3,
    reviewScore: 8.5,
    nights: 2,
    guests: 2,
    policy: 'Only 5 rooms left',
    propertyType: 'hotels',
    inPolicy: false
  },
  {
    id: 2,
    name: 'Lucky by Marriott lodge',
    location: 'Rau River, Moshi, Tanzania',
    amenities: 'Ocean view, Balcony, Swimming pool',
    rating: 7.5,
    price: 190000,
    image: image2,
    stars: 4,
    reviewScore: 7.5,
    nights: 2,
    guests: 2,
    policy: 'Limited-time deal',
    propertyType: 'resort',
    inPolicy: true
  },
  {
    id: 3,
    name: 'Sydede by Marriott Hotel',
    location: 'Rau River, Moshi, Tanzania',
    amenities: 'Ocean view, Balcony, Swimming pool',
    rating: 8.5,
    price: 150000,
    image: image3,
    stars: 5,
    reviewScore: 8.5,
    nights: 2,
    guests: 2,
    policy: 'Out of Policy',
    propertyType: 'hotels',
    inPolicy: false
  }
];

export {hotels, flights}