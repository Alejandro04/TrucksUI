import React, { useCallback, useState } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer, LoadScript } from '@react-google-maps/api';
import { City } from '../types';

interface MapComponentProps {
  from: City | null;
  to: City | null;
}

const ROUTE_COLORS = ['#4285F4', '#DB4437', '#F4B400'];

export const MapComponent: React.FC<MapComponentProps> = ({ from, to }) => {
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

  const directionsCallback = useCallback((
    result: google.maps.DirectionsResult | null,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === 'OK' && result) {
      setDirections(result);
    }
  }, []);

  const mapContainerStyle = {
    width: '100%',
    height: '500px'
  };

  const center = {
    lat: 39.8283,
    lng: -98.5795
  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={4}
        center={center}
      >
        {from && to && (
          <DirectionsService
            options={{
              destination: { lat: to.lat, lng: to.lng },
              origin: { lat: from.lat, lng: from.lng },
              travelMode: google.maps.TravelMode.DRIVING,
              provideRouteAlternatives: true
            }}
            callback={directionsCallback}
          />
        )}
        {directions?.routes.map((route, index) => (
          <DirectionsRenderer
            key={index}
            options={{
              directions: directions,
              routeIndex: index,
              polylineOptions: {
                strokeColor: ROUTE_COLORS[index % ROUTE_COLORS.length],
                strokeWeight: 4
              }
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};