export interface Location {
  id: string;
  name: string;
  district: string;
  coordinates: { lat: number; lng: number };
  starVisibility: number; // 0-100
  cloudCover: number; // 0-100
  lightPollution: number; // 0-100 (lower is better)
  altitude: number; // meters
  accessibility: 'Easy' | 'Moderate' | 'Difficult';
  bestTime: string;
  description: string;
  features: string[];
}

export const locations: Location[] = [
  {
    id: 'achanakmar',
    name: 'Achanakmar Wildlife Sanctuary',
    district: 'Bilaspur',
    coordinates: { lat: 22.3333, lng: 81.6167 },
    starVisibility: 95,
    cloudCover: 15,
    lightPollution: 12,
    altitude: 850,
    accessibility: 'Moderate',
    bestTime: '10:00 PM - 4:00 AM',
    description: 'Remote wildlife sanctuary with exceptional dark skies',
    features: ['Milky Way visible', 'Low light pollution', 'Clear horizons'],
  },
  {
    id: 'barnawapara',
    name: 'Barnawapara Wildlife Sanctuary',
    district: 'Mahasamund',
    coordinates: { lat: 21.1667, lng: 82.3500 },
    starVisibility: 88,
    cloudCover: 22,
    lightPollution: 18,
    altitude: 265,
    accessibility: 'Easy',
    bestTime: '9:30 PM - 3:30 AM',
    description: 'Accessible location with good sky visibility',
    features: ['Easy access', 'Good for beginners', 'Wide open spaces'],
  },
  {
    id: 'chitrakote',
    name: 'Chitrakote Waterfall Viewpoint',
    district: 'Bastar',
    coordinates: { lat: 19.2000, lng: 81.7500 },
    starVisibility: 92,
    cloudCover: 18,
    lightPollution: 8,
    altitude: 560,
    accessibility: 'Moderate',
    bestTime: '10:30 PM - 4:30 AM',
    description: 'Spectacular location with minimal light interference',
    features: ['Pristine skies', 'Natural wonder nearby', 'Excellent visibility'],
  },
  {
    id: 'mainpat',
    name: 'Mainpat Hill Station',
    district: 'Surguja',
    coordinates: { lat: 23.0000, lng: 83.0833 },
    starVisibility: 97,
    cloudCover: 12,
    lightPollution: 5,
    altitude: 1152,
    accessibility: 'Difficult',
    bestTime: '9:00 PM - 5:00 AM',
    description: 'Highest elevation site with pristine dark skies',
    features: ['Best overall location', 'High altitude', 'Minimal pollution'],
  },
  {
    id: 'sirpur',
    name: 'Sirpur Archaeological Site',
    district: 'Mahasamund',
    coordinates: { lat: 21.1990, lng: 82.9710 },
    starVisibility: 85,
    cloudCover: 25,
    lightPollution: 22,
    altitude: 235,
    accessibility: 'Easy',
    bestTime: '10:00 PM - 3:00 AM',
    description: 'Historical site with decent sky viewing conditions',
    features: ['Cultural significance', 'Easy to reach', 'Open terrain'],
  },
  {
    id: 'kanger',
    name: 'Kanger Valley National Park',
    district: 'Bastar',
    coordinates: { lat: 18.9000, lng: 81.9000 },
    starVisibility: 90,
    cloudCover: 20,
    lightPollution: 10,
    altitude: 560,
    accessibility: 'Moderate',
    bestTime: '10:00 PM - 4:00 AM',
    description: 'Dense forest area with excellent night sky visibility',
    features: ['Protected area', 'Low pollution', 'Rich biodiversity'],
  },
  {
    id: 'tala',
    name: 'Tala Village Observatory Point',
    district: 'Bilaspur',
    coordinates: { lat: 22.0833, lng: 82.1500 },
    starVisibility: 82,
    cloudCover: 28,
    lightPollution: 25,
    altitude: 290,
    accessibility: 'Easy',
    bestTime: '9:30 PM - 2:30 AM',
    description: 'Community-accessible viewing point',
    features: ['Community friendly', 'Basic facilities', 'Regular events'],
  },
  {
    id: 'dantewada',
    name: 'Dantewada Hills',
    district: 'Dantewada',
    coordinates: { lat: 18.9000, lng: 81.3500 },
    starVisibility: 94,
    cloudCover: 16,
    lightPollution: 7,
    altitude: 620,
    accessibility: 'Difficult',
    bestTime: '10:00 PM - 4:30 AM',
    description: 'Remote hilltop location with exceptional conditions',
    features: ['Very dark skies', 'Panoramic views', 'Advanced observers'],
  },
];

export const getLocationById = (id: string): Location | undefined => {
  return locations.find(loc => loc.id === id);
};

export const getTopLocations = (count: number = 3): Location[] => {
  return [...locations]
    .sort((a, b) => {
      const scoreA = a.starVisibility - a.lightPollution - a.cloudCover;
      const scoreB = b.starVisibility - b.lightPollution - b.cloudCover;
      return scoreB - scoreA;
    })
    .slice(0, count);
};

export const calculateOverallScore = (location: Location): number => {
  return Math.round(
    (location.starVisibility * 0.5) +
    ((100 - location.cloudCover) * 0.25) +
    ((100 - location.lightPollution) * 0.25)
  );
};
