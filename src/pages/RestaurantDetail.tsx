
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useRestaurants } from '@/hooks/useRestaurants';
import Map from '@/components/Map';
import { Review } from '@/types';

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: '1',
    restaurantId: '1',
    userId: '101',
    userName: 'John Smith',
    rating: 4,
    text: 'Great pizza! The crust was perfect and toppings were fresh. Will definitely come back.',
    createdAt: '2023-06-15T14:30:00Z'
  },
  {
    id: '2',
    restaurantId: '1',
    userId: '102',
    userName: 'Sarah Johnson',
    rating: 5,
    text: 'Best pizza in town! Amazing flavors and excellent service.',
    createdAt: '2023-07-20T18:45:00Z'
  },
  {
    id: '3',
    restaurantId: '2',
    userId: '103',
    userName: 'Mike Brown',
    rating: 5,
    text: 'The sushi was incredibly fresh. Chef really knows what he\'s doing!',
    createdAt: '2023-05-10T19:15:00Z'
  }
];

export default function RestaurantDetail() {
  const { id } = useParams<{ id: string }>();
  const { getRestaurantById } = useRestaurants();
  const restaurant = getRestaurantById(id || '');
  
  const [reviews, setReviews] = useState<Review[]>(() => {
    return mockReviews.filter(review => review.restaurantId === id);
  });
  const [userRating, setUserRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isLoggedIn] = useState(false);
  
  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Restaurant not found</h2>
          <Link to="/" className="text-primary hover:underline">
            Go back to home page
          </Link>
        </div>
      </div>
    );
  }
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast.error('Please log in to submit a review');
      return;
    }
    
    if (!reviewText) {
      toast.error('Please enter a review');
      return;
    }
    
    const newReview: Review = {
      id: `new-${Date.now()}`,
      restaurantId: restaurant.id,
      userId: 'current-user',
      userName: 'Current User',
      rating: userRating,
      text: reviewText,
      createdAt: new Date().toISOString()
    };
    
    setReviews([newReview, ...reviews]);
    setReviewText('');
    toast.success('Review submitted successfully!');
  };
  
  const renderStars = (rating: number, interactive = false) => {
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (interactive) {
        stars.push(
          <button 
            key={i} 
            type="button"
            onClick={() => setUserRating(i)}
            className={`text-2xl ${i <= userRating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </button>
        );
      } else {
        stars.push(
          <span 
            key={i} 
            className={`${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        );
      }
    }
    
    return stars;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="flex items-center text-primary mb-4 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to results
      </Link>
      
      <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6">
            <span className="px-2 py-1 bg-primary text-white text-sm font-medium rounded-full">
              {restaurant.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-white mt-2">
              {restaurant.name}
            </h1>
            <div className="flex items-center mt-2">
              <div className="flex">
                {renderStars(restaurant.rating)}
              </div>
              <span className="ml-2 text-white">
                {restaurant.rating} ({restaurant.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">About</h2>
            <p className="text-gray-600">{restaurant.description}</p>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary shrink-0" />
                <span>{restaurant.address}, {restaurant.city}, {restaurant.zipCode}</span>
              </div>
              
              {restaurant.phone && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-primary" />
                  <span>{restaurant.phone}</span>
                </div>
              )}
              
              {restaurant.website && (
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-primary" />
                  <a 
                    href={restaurant.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {restaurant.website}
                  </a>
                </div>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Reviews ({reviews.length})</h2>
            
            {isLoggedIn ? (
              <form onSubmit={handleSubmitReview} className="mb-6">
                <div className="mb-4">
                  <label className="block mb-2">Your rating:</label>
                  <div className="flex">
                    {renderStars(userRating, true)}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="review" className="block mb-2">Your review:</label>
                  <Textarea
                    id="review"
                    placeholder="Write your review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="h-32"
                  />
                </div>
                <Button type="submit">Submit Review</Button>
              </form>
            ) : (
              <Card className="mb-6">
                <CardContent className="p-4">
                  <p className="mb-2">Sign in to leave a review.</p>
                </CardContent>
              </Card>
            )}
            
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{review.userName}</p>
                          <div className="flex mt-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600">{review.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Location</h2>
          <Map 
            restaurants={[restaurant]} 
            center={restaurant.coordinates} 
          />
          
          {restaurant.hours && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Hours</h2>
              <Card>
                <CardContent className="p-4">
                  <dl className="space-y-2">
                    {Object.entries(restaurant.hours).map(([day, hours]) => (
                      <div key={day} className="grid grid-cols-2">
                        <dt className="font-medium">{day}</dt>
                        <dd className="text-gray-600">{hours}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
