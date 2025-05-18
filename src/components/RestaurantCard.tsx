
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Restaurant } from '@/types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`star-${i}`} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half-star" className="text-yellow-400">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
    }
    
    return stars;
  };

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative h-48 w-full">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-medium">
          {restaurant.category}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold line-clamp-1">{restaurant.name}</h3>
          <div className="flex items-center">
            <span className="text-sm font-medium mr-1">{restaurant.rating}</span>
            <div className="flex text-sm">{renderStars(restaurant.rating)}</div>
          </div>
        </div>
        <div className="flex items-center text-gray-500 text-sm mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="line-clamp-1">{restaurant.address}, {restaurant.city}</span>
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{restaurant.description}</p>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between">
        <span className="text-xs text-gray-500">{restaurant.reviewCount} reviews</span>
        <Link 
          to={`/restaurant/${restaurant.id}`}
          className="text-primary text-sm font-medium hover:underline"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}
