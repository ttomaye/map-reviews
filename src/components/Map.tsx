
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Restaurant, Location } from '@/types';

interface MapProps {
  restaurants: Restaurant[];
  center: Location | null;
}

export default function Map({ restaurants, center }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [mapInitialized, setMapInitialized] = useState(false);
  
  useEffect(() => {
    if (!mapboxToken) return;
    
    const initializeMap = async () => {
      if (!mapRef.current || mapInitialized) return;
      
      // In a real app, this would be imported at the top
      // For demo purposes, we're dynamically importing it
      const mapboxgl = await import('mapbox-gl');
      await import('mapbox-gl/dist/mapbox-gl.css');
      
      mapboxgl.default.accessToken = mapboxToken;
      
      const map = new mapboxgl.default.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center ? [center.lng, center.lat] : [-74.0060, 40.7128],
        zoom: 12
      });
      
      map.addControl(new mapboxgl.default.NavigationControl(), 'top-right');
      
      map.on('load', () => {
        restaurants.forEach(restaurant => {
          const popup = new mapboxgl.default.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-semibold text-base">${restaurant.name}</h3>
                <p class="text-xs text-gray-600">${restaurant.category}</p>
                <p class="text-xs text-gray-600">Rating: ${restaurant.rating}/5 (${restaurant.reviewCount} reviews)</p>
                <a href="/restaurant/${restaurant.id}" class="text-primary text-xs font-medium hover:underline">View Details</a>
              </div>
            `);
            
          new mapboxgl.default.Marker({ color: '#F97316' })
            .setLngLat([restaurant.coordinates.lng, restaurant.coordinates.lat])
            .setPopup(popup)
            .addTo(map);
        });
      });
      
      setMapInitialized(true);
      
      return () => map.remove();
    };
    
    initializeMap();
  }, [restaurants, center, mapboxToken, mapInitialized]);
  
  if (!mapboxToken) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-64 bg-gray-100 rounded-lg p-4">
        <p className="text-sm text-gray-600 mb-2">Please enter your Mapbox access token:</p>
        <input 
          type="text"
          placeholder="Mapbox access token"
          className="p-2 border rounded w-full max-w-sm mb-2"
          onChange={(e) => setMapboxToken(e.target.value)}
        />
        <p className="text-xs text-gray-500">
          You can get your token at <a href="https://account.mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mapbox.com</a>
        </p>
      </div>
    );
  }
  
  return (
    <div ref={mapRef} className="w-full h-64 lg:h-[500px] rounded-lg overflow-hidden" />
  );
}
