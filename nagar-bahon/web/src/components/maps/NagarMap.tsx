'use client';

import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface DriverLocation {
  id: string;
  coordinates: [number, number]; // [lng, lat]
  heading: number;
  availableSeats: number;
  destination: string;
}

interface NagarMapProps {
  accessToken: string;
  center?: [number, number];
  zoom?: number;
  driverLocations?: DriverLocation[];
  onDriverClick?: (driverId: string) => void;
}

const NagarMap: React.FC<NagarMapProps> = ({
  accessToken,
  center = [90.4125, 23.8103], // Default: Dhaka
  zoom = 12,
  driverLocations = [],
  onDriverClick,
}) => {
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const map = React.useRef<mapboxgl.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !accessToken) return;

    mapboxgl.accessToken = accessToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11', // Clean, professional style
      center,
      zoom,
      pitch: 0,
      bearing: 0,
      antialias: true,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add geolocate control for user's location
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserHeading: true,
    });
    map.current.addControl(geolocate, 'top-right');

    map.current.on('load', () => {
      setIsMapLoaded(true);
      
      // Add driver markers
      addDriverMarkers(driverLocations);
    });

    return () => {
      map.current?.remove();
    };
  }, [accessToken]);

  // Update markers when driver locations change
  useEffect(() => {
    if (map.current && isMapLoaded) {
      // Remove existing markers
      const markers = document.querySelectorAll('.driver-marker');
      markers.forEach(marker => marker.remove());

      addDriverMarkers(driverLocations);
    }
  }, [driverLocations, isMapLoaded]);

  const addDriverMarkers = (locations: DriverLocation[]) => {
    locations.forEach((driver) => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'driver-marker cursor-pointer';
      el.innerHTML = `
        <div class="relative">
          <div class="w-10 h-10 bg-blue-900 rounded-full border-2 border-white shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 17H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z"/>
            </svg>
          </div>
          <div class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
            ${driver.availableSeats}
          </div>
        </div>
      `;

      el.style.cursor = 'pointer';
      el.addEventListener('click', () => {
        if (onDriverClick) onDriverClick(driver.id);
      });

      // Add tooltip
      const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
        .setHTML(`
          <div class="p-2">
            <p class="font-bold text-gray-800">${driver.destination}</p>
            <p class="text-sm text-gray-600">${driver.availableSeats} seats available</p>
          </div>
        `);

      new mapboxgl.Marker(el)
        .setLngLat(driver.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full rounded-xl overflow-hidden shadow-inner" />
      
      {/* Map Overlay Controls */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg max-w-xs">
        <h3 className="font-bold text-gray-800 text-sm mb-2">Live Drivers Nearby</h3>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <div className="w-3 h-3 bg-blue-900 rounded-full"></div>
          <span>Available Cars</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span>Empty Seats Count</span>
        </div>
      </div>

      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-3"></div>
            <p className="text-gray-600 font-medium">Loading Map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NagarMap;
