import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

export const MapView = ({ facilities = [], userLocation = null, selectedFacility = null, onSelectFacility }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Fix default Leaflet icon paths
  const customHospitalIcon = L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        background-color: #0284c7; 
        color: white; 
        width: 34px; 
        height: 34px; 
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3);
        border: 2px solid white;
        cursor: pointer;
      ">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 6v12m-6-6h12"/>
        </svg>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18]
  });

  const customUserIcon = L.divIcon({
    className: 'custom-user-marker',
    html: `
      <div style="
        background-color: #10b981; 
        color: white; 
        width: 32px; 
        height: 32px; 
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.25);
        border: 2px solid white;
      ">
        <div style="width: 10px; height: 10px; background-color: white; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Default center: Dindigul / Tamil Nadu Central Coordinates
    const defaultCenter = userLocation
      ? [userLocation.latitude, userLocation.longitude]
      : [10.3673, 77.9803];

    // Initialize Map instance once
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: defaultCenter,
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Add user marker if available
    if (userLocation && userLocation.latitude && userLocation.longitude) {
      const userMarker = L.marker([userLocation.latitude, userLocation.longitude], {
        icon: customUserIcon
      }).addTo(map).bindPopup('<strong>You are here</strong> (Current Location)');
      markersRef.current.push(userMarker);
    }

    // Add Facility Markers
    const bounds = [];
    if (userLocation?.latitude && userLocation?.longitude) {
      bounds.push([userLocation.latitude, userLocation.longitude]);
    }

    facilities.forEach(facility => {
      if (!facility.latitude || !facility.longitude) return;

      const latLng = [parseFloat(facility.latitude), parseFloat(facility.longitude)];
      bounds.push(latLng);

      const isVerified = facility.verified;
      const statusBadge = isVerified
        ? '<span style="color:#0284c7;font-weight:600;font-size:11px;">✓ Verified Official Registry</span>'
        : '<span style="color:#ea580c;font-weight:600;font-size:11px;">⚠ Demo Data – Verify Before Visiting</span>';

      const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        `${facility.name}, ${facility.address}`
      )}`;

      const popupHtml = `
        <div style="min-width: 200px; font-family: system-ui, sans-serif;">
          <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #0f172a;">${facility.name}</h4>
          <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b;">${facility.facility_type} • ${facility.specialty}</p>
          <div style="margin-bottom: 6px;">${statusBadge}</div>
          <p style="margin: 0 0 8px 0; font-size: 11px; color: #334155; line-height: 1.3;">${facility.address}</p>
          ${facility.distance !== null && facility.distance !== undefined ? `<p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; color: #0284c7;">Approx. ${facility.distance} km away</p>` : ''}
          <div style="display: flex; gap: 8px;">
            <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" style="
              display: inline-flex;
              align-items: center;
              background-color: #0284c7;
              color: white;
              padding: 4px 10px;
              border-radius: 6px;
              font-size: 11px;
              text-decoration: none;
              font-weight: 600;
            ">Open in Maps</a>
            ${facility.phone ? `<a href="tel:${facility.phone}" style="
              display: inline-flex;
              align-items: center;
              background-color: #f1f5f9;
              color: #0f172a;
              padding: 4px 10px;
              border-radius: 6px;
              font-size: 11px;
              text-decoration: none;
              font-weight: 600;
            ">Call</a>` : ''}
          </div>
        </div>
      `;

      const marker = L.marker(latLng, { icon: customHospitalIcon })
        .addTo(map)
        .bindPopup(popupHtml);

      marker.on('click', () => {
        if (onSelectFacility) {
          onSelectFacility(facility);
        }
      });

      markersRef.current.push(marker);
    });

    // Auto-fit bounds if markers exist
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [facilities, userLocation]);

  // Center on selected facility when changed
  useEffect(() => {
    if (selectedFacility && mapInstanceRef.current && selectedFacility.latitude && selectedFacility.longitude) {
      mapInstanceRef.current.setView([selectedFacility.latitude, selectedFacility.longitude], 14, {
        animate: true
      });
    }
  }, [selectedFacility]);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute bottom-3 left-3 z-[400] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs px-3 py-1.5 rounded-lg text-[11px] text-slate-600 dark:text-slate-300 shadow-sm border border-slate-200 dark:border-slate-800">
        Showing {facilities.length} Healthcare Facilities (OpenStreetMap)
      </div>
    </div>
  );
};

export default MapView;
