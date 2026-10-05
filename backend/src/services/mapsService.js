import { localStore, getSupabase } from '../config/db.js';

/**
 * Calculates the great-circle distance between two geographic coordinates
 * using the Haversine formula (returns distance in Kilometers)
 */
export const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
};

/**
 * Search and filter healthcare facilities
 */
export const getNearbyFacilities = async ({
  latitude,
  longitude,
  city,
  specialty,
  facilityType,
  query,
  limit = 20
}) => {
  let facilities = [];

  // Try Supabase first if available
  const supabase = getSupabase();
  if (supabase) {
    try {
      let q = supabase.from('healthcare_facilities').select('*');
      if (city) {
        q = q.ilike('city', `%${city}%`);
      }
      if (facilityType && facilityType !== 'All') {
        q = q.eq('facility_type', facilityType);
      }
      if (specialty && specialty !== 'All') {
        q = q.ilike('specialty', `%${specialty}%`);
      }
      const { data, error } = await q;
      if (!error && data && data.length > 0) {
        facilities = data;
      }
    } catch (err) {
      console.warn('[MapsService] Supabase fetch fallback to local store:', err.message);
    }
  }

  // Fallback to local store if Supabase returned empty or was not active
  if (facilities.length === 0) {
    facilities = [...localStore.healthcareFacilities];
  }

  // Filter in memory for precise matching
  let filtered = facilities.filter(item => {
    if (city && city !== 'All') {
      const cityMatch = item.city.toLowerCase().includes(city.toLowerCase());
      if (!cityMatch) return false;
    }

    if (facilityType && facilityType !== 'All') {
      const typeMatch = item.facility_type.toLowerCase() === facilityType.toLowerCase();
      if (!typeMatch) return false;
    }

    if (specialty && specialty !== 'All') {
      const specMatch = item.specialty.toLowerCase().includes(specialty.toLowerCase());
      if (!specMatch) return false;
    }

    if (query) {
      const q = query.toLowerCase();
      const match =
        item.name.toLowerCase().includes(q) ||
        item.address.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.specialty.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  // Calculate distance if user coordinates provided
  const userLat = latitude ? parseFloat(latitude) : null;
  const userLng = longitude ? parseFloat(longitude) : null;

  filtered = filtered.map(facility => {
    let distance = null;
    if (userLat && userLng && facility.latitude && facility.longitude) {
      distance = calculateDistanceKm(userLat, userLng, facility.latitude, facility.longitude);
    }
    return {
      ...facility,
      distance
    };
  });

  // Sort by distance if user coords are present, or by verified status
  if (userLat && userLng) {
    filtered.sort((a, b) => {
      if (a.distance === null) return 1;
      if (b.distance === null) return -1;
      return a.distance - b.distance;
    });
  } else {
    // Show verified entries first
    filtered.sort((a, b) => (b.verified ? 1 : 0) - (a.verified ? 1 : 0));
  }

  return filtered.slice(0, limit);
};
