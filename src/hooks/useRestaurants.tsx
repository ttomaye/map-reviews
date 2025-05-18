
import { useState } from 'react';
import { Restaurant, Category, Location } from '@/types';

// Mock data for the initial version
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Tasty Pizza Palace',
    category: 'Pizza',
    image: '/placeholder.svg',
    rating: 4.5,
    reviewCount: 128,
    description: 'Authentic Italian pizza with a variety of fresh toppings.',
    address: '123 Main St',
    city: 'New York',
    zipCode: '10001',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    phone: '(212) 555-1234',
    website: 'https://example.com',
    hours: { 
      'Monday': '11AM-10PM',
      'Tuesday': '11AM-10PM',
      'Wednesday': '11AM-10PM',
      'Thursday': '11AM-10PM',
      'Friday': '11AM-11PM',
      'Saturday': '11AM-11PM',
      'Sunday': '12PM-9PM'
    }
  },
  {
    id: '2',
    name: 'Sushi Haven',
    category: 'Sushi',
    image: '/placeholder.svg',
    rating: 4.8,
    reviewCount: 256,
    description: 'Premium sushi and sashimi prepared by master chefs.',
    address: '456 Elm St',
    city: 'New York',
    zipCode: '10001',
    coordinates: { lat: 40.7160, lng: -74.0030 },
    phone: '(212) 555-5678',
    website: 'https://example.com',
  },
  {
    id: '3',
    name: 'Taco Fiesta',
    category: 'Mexican',
    image: '/placeholder.svg',
    rating: 4.2,
    reviewCount: 87,
    description: 'Authentic Mexican tacos, burritos, and enchiladas.',
    address: '789 Oak St',
    city: 'New York',
    zipCode: '10001',
    coordinates: { lat: 40.7200, lng: -74.0100 },
    phone: '(212) 555-9012',
  },
  {
    id: '4',
    name: 'The Pasta House',
    category: 'Italian',
    image: '/placeholder.svg',
    rating: 4.6,
    reviewCount: 173,
    description: 'Handmade pasta dishes with traditional Italian sauces.',
    address: '321 Pine St',
    city: 'New York',
    zipCode: '10002',
    coordinates: { lat: 40.7180, lng: -74.0080 },
  },
  {
    id: '5',
    name: 'Burger Joint',
    category: 'American',
    image: '/placeholder.svg',
    rating: 4.3,
    reviewCount: 142,
    description: 'Juicy burgers with a variety of toppings and sides.',
    address: '555 Maple St',
    city: 'New York',
    zipCode: '10002',
    coordinates: { lat: 40.7220, lng: -74.0070 },
  },
  {
    id: '6',
    name: 'Thai Spice',
    category: 'Thai',
    image: '/placeholder.svg',
    rating: 4.7,
    reviewCount: 109,
    description: 'Authentic Thai cuisine with fresh ingredients and bold flavors.',
    address: '888 Walnut St',
    city: 'Los Angeles',
    zipCode: '90001',
    coordinates: { lat: 34.0522, lng: -118.2437 },
  }
];

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchLocation, setSearchLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const searchRestaurants = async (location: string) => {
    setIsLoading(true);
    
    // Mock API call - in a real app, this would fetch from Supabase
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock location search
    if (location.toLowerCase().includes('los angeles')) {
      setSearchLocation({ lat: 34.0522, lng: -118.2437, city: 'Los Angeles' });
      const results = restaurants.filter(r => r.city.toLowerCase() === 'los angeles');
      setFilteredRestaurants(results);
    } else {
      // Default to New York
      setSearchLocation({ lat: 40.7128, lng: -74.0060, city: 'New York' });
      const results = restaurants.filter(r => r.city.toLowerCase() === 'new york');
      setFilteredRestaurants(results);
    }
    
    setIsLoading(false);
  };

  const filterByCategory = (category: Category) => {
    setSelectedCategory(category);
    
    if (category === 'All') {
      setFilteredRestaurants(searchLocation 
        ? restaurants.filter(r => r.city.toLowerCase() === searchLocation.city?.toLowerCase())
        : restaurants
      );
    } else {
      setFilteredRestaurants(
        restaurants.filter(restaurant => {
          const categoryMatch = restaurant.category === category;
          const locationMatch = searchLocation 
            ? restaurant.city.toLowerCase() === searchLocation.city?.toLowerCase()
            : true;
          
          return categoryMatch && locationMatch;
        })
      );
    }
  };

  const getRestaurantById = (id: string) => {
    return restaurants.find(restaurant => restaurant.id === id) || null;
  };

  return {
    restaurants: filteredRestaurants,
    isLoading,
    searchRestaurants,
    filterByCategory,
    selectedCategory,
    searchLocation,
    getRestaurantById
  };
};
