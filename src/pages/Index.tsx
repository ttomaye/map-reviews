
import { useState } from 'react';
import { useRestaurants } from '@/hooks/useRestaurants';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import RestaurantCard from '@/components/RestaurantCard';
import Map from '@/components/Map';

export default function Index() {
  const { 
    restaurants, 
    isLoading, 
    searchRestaurants, 
    filterByCategory, 
    selectedCategory,
    searchLocation
  } = useRestaurants();
  
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  
  const handleSearch = (location: string) => {
    searchRestaurants(location);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="px-4 py-8 md:py-12 text-center bg-gradient-to-r from-orange-50 to-orange-100">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Find the Best Restaurants Near You
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Discover amazing restaurants in your area. Search by location and filter by cuisine.
        </p>
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {restaurants.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                {searchLocation ? `Restaurants in ${searchLocation.city || 'your area'}` : 'Popular Restaurants'}
              </h2>
              <div className="flex space-x-2">
                <button
                  className={`px-4 py-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setViewMode('list')}
                >
                  List View
                </button>
                <button
                  className={`px-4 py-2 rounded ${viewMode === 'map' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
                  onClick={() => setViewMode('map')}
                >
                  Map View
                </button>
              </div>
            </div>
            <CategoryFilter 
              selectedCategory={selectedCategory} 
              onSelectCategory={filterByCategory} 
            />
          </div>
        )}
        
        {viewMode === 'list' ? (
          <>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : restaurants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-lg font-semibold mb-2">No restaurants found</h3>
                <p className="text-gray-500">Try searching for a different location or category</p>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg overflow-hidden shadow-md">
            <Map 
              restaurants={restaurants} 
              center={searchLocation} 
            />
          </div>
        )}
      </div>
    </div>
  );
}
