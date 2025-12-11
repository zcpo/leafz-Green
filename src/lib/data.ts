import type { State, City, Dispensary, Review } from './types';
import statesAndCities from './states-and-cities.json';

// Type assertion to match the imported JSON with the expected structure.
const typedStatesAndCities: { name: string; abbr: string; cities: string[] }[] = statesAndCities;

const states: State[] = typedStatesAndCities.map(s => ({
  id: s.abbr.toLowerCase(),
  name: s.name
}));

const cities: City[] = typedStatesAndCities.flatMap(s => 
  s.cities.map(c => ({
    id: c.toLowerCase().replace(/ /g, '-'),
    name: c,
    stateId: s.abbr.toLowerCase()
  }))
);

const dispensaries: Dispensary[] = [
  {
    id: 'la-green-thumb',
    name: 'LA Green Thumb',
    address: '123 Sunset Blvd, Los Angeles, CA',
    cityId: 'los-angeles',
    stateId: 'ca',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    imageUrl: 'https://picsum.photos/seed/1/600/400',
    imageHint: 'dispensary interior',
    rating: 4.5,
    reviewCount: 120,
  },
  {
    id: 'sf-herbal-remedies',
    name: 'SF Herbal Remedies',
    address: '456 Golden Gate Ave, San Francisco, CA',
    cityId: 'san-francisco',
    stateId: 'ca',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    imageUrl: 'https://picsum.photos/seed/2/600/400',
    imageHint: 'cannabis product',
    rating: 4.8,
    reviewCount: 250,
  },
  {
    id: 'denver-high-point',
    name: 'Denver High Point',
    address: '789 Colfax Ave, Denver, CO',
    cityId: 'denver',
    stateId: 'co',
    coordinates: { lat: 39.7392, lng: -104.9903 },
    imageUrl: 'https://picsum.photos/seed/3/600/400',
    imageHint: 'mountain view',
    rating: 4.7,
    reviewCount: 180,
  },
  {
    id: 'seattle-emerald-leaf',
    name: 'Seattle Emerald Leaf',
    address: '101 Pike St, Seattle, WA',
    cityId: 'seattle',
    stateId: 'wa',
    coordinates: { lat: 47.6062, lng: -122.3321 },
    imageUrl: 'https://picsum.photos/seed/4/600/400',
    imageHint: 'city skyline',
    rating: 4.6,
    reviewCount: 210
  }
];

const reviews: Review[] = [
  {
    id: 'review-1',
    dispensaryId: 'la-green-thumb',
    userId: 'user-1',
    userName: 'Alex Smith',
    rating: 5,
    text: 'Great selection and friendly staff. Will definitely be back!',
    createdAt: new Date('2023-10-26T10:00:00Z'),
  },
  {
    id: 'review-2',
    dispensaryId: 'la-green-thumb',
    userId: 'user-2',
    userName: 'Maria Garcia',
    rating: 4,
    text: 'Good prices, but can get a bit crowded during peak hours.',
    createdAt: new Date('2023-10-25T15:30:00Z'),
  },
   {
    id: 'review-3',
    dispensaryId: 'sf-herbal-remedies',
    userId: 'user-3',
    userName: 'John Doe',
    rating: 5,
    text: 'Amazing place! The quality is top-notch and the ambiance is very relaxed.',
    createdAt: new Date('2023-11-01T12:00:00Z'),
  },
];

// Simulate API latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getStates = async (): Promise<State[]> => {
  await delay(500);
  return states;
};

export const getStateById = async (id: string): Promise<State | undefined> => {
  await delay(500);
  return states.find(s => s.id === id);
}

export const getCitiesByState = async (stateId: string): Promise<City[]> => {
  await delay(500);
  return cities.filter(c => c.stateId === stateId);
};

export const getCityById = async (id: string): Promise<City | undefined> => {
    await delay(500);
    return cities.find(c => c.id === id);
}

export const getDispensariesByCity = async (cityId: string): Promise<Dispensary[]> => {
  await delay(500);
  return dispensaries.filter(d => d.cityId === cityId);
};

export const getDispensaryById = async (id: string): Promise<Dispensary | undefined> => {
  await delay(500);
  return dispensaries.find(d => d.id === id);
};

export const getReviewsByDispensary = async (dispensaryId: string): Promise<Review[]> => {
  await delay(500);
  return reviews.filter(r => r.dispensaryId === dispensaryId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const addReview = async (review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> => {
    await delay(500);
    const newReview: Review = {
        ...review,
        id: `review-${Date.now()}`,
        createdAt: new Date(),
    };
    reviews.unshift(newReview);
    // In a real app, you would also update the dispensary's average rating
    return newReview;
}
