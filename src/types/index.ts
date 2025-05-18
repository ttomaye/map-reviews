
export interface Restaurant {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  address: string;
  city: string;
  zipCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone?: string;
  website?: string;
  hours?: Record<string, string>;
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  rating: number;
  text: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export type Category = 'All' | 'Pizza' | 'Sushi' | 'Mexican' | 'Italian' | 'American' | 'Thai' | 'Indian' | 'Chinese';

export interface Location {
  lat: number;
  lng: number;
  city?: string;
  zipCode?: string;
}
