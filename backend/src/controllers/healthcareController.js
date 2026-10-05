import { getNearbyFacilities } from '../services/mapsService.js';
import { localStore, getSupabase } from '../config/db.js';

export const getNearby = async (req, res, next) => {
  try {
    const { latitude, longitude, city, specialty, facilityType, limit } = req.query;

    const facilities = await getNearbyFacilities({
      latitude,
      longitude,
      city,
      specialty,
      facilityType,
      limit: limit ? parseInt(limit) : 20
    });

    res.json({
      success: true,
      count: facilities.length,
      data: facilities
    });
  } catch (error) {
    next(error);
  }
};

export const searchFacilities = async (req, res, next) => {
  try {
    const { q, city, specialty, facilityType, latitude, longitude } = req.query;

    const facilities = await getNearbyFacilities({
      latitude,
      longitude,
      city,
      specialty,
      facilityType,
      query: q,
      limit: 30
    });

    res.json({
      success: true,
      count: facilities.length,
      data: facilities
    });
  } catch (error) {
    next(error);
  }
};

export const getFacilityById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check local store
    let facility = localStore.healthcareFacilities.find(f => f.id === id);

    // Or check Supabase if available
    const supabase = getSupabase();
    if (!facility && supabase) {
      const { data } = await supabase.from('healthcare_facilities').select('*').eq('id', id).single();
      if (data) facility = data;
    }

    if (!facility) {
      return res.status(404).json({
        success: false,
        error: 'Healthcare facility not found.'
      });
    }

    res.json({
      success: true,
      data: facility
    });
  } catch (error) {
    next(error);
  }
};

export const getEmergencyResources = async (req, res, next) => {
  try {
    const resources = localStore.emergencyResources;
    res.json({
      success: true,
      primaryNumber: '112',
      country: 'India',
      data: resources
    });
  } catch (error) {
    next(error);
  }
};
