import crypto from 'crypto';
import { localStore, getSupabase } from '../config/db.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = localStore.profiles.length;
    const totalChecks = localStore.symptomChecks.length;
    const imageAnalyses = localStore.symptomChecks.filter(c => c.input_type === 'image').length;
    const emergencyAlerts = localStore.symptomChecks.filter(c => c.risk_level === 'EMERGENCY').length;
    const totalFacilities = localStore.healthcareFacilities.length;
    const verifiedFacilities = localStore.healthcareFacilities.filter(f => f.verified).length;
    const totalFeedbacks = localStore.feedback.length;

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalChecks,
        imageAnalyses,
        emergencyAlerts,
        totalFacilities,
        verifiedFacilities,
        totalFeedbacks
      },
      recentChecks: localStore.symptomChecks.slice(0, 5),
      recentFeedbacks: localStore.feedback.slice(0, 5)
    });
  } catch (error) {
    next(error);
  }
};

export const createFacility = async (req, res, next) => {
  try {
    const { name, facility_type, specialty, address, city, latitude, longitude, phone, website, verified, source } = req.body;

    if (!name || !facility_type || !address || !city) {
      return res.status(400).json({
        success: false,
        error: 'Name, facility type, address, and city are required.'
      });
    }

    const isVerified = Boolean(verified);
    // Explicit safety rule: If verified is true, source cannot be unverified/empty
    const verifiedSource = isVerified
      ? (source?.trim() || 'Verified by System Administrator via State Registry')
      : 'DEMO DATA – NOT VERIFIED';

    const newFacility = {
      id: crypto.randomUUID(),
      name: name.trim(),
      facility_type: facility_type.trim(),
      specialty: specialty?.trim() || 'General Medicine',
      address: address.trim(),
      city: city.trim(),
      latitude: latitude ? parseFloat(latitude) : 10.3673,
      longitude: longitude ? parseFloat(longitude) : 77.9803,
      phone: phone?.trim() || '',
      website: website?.trim() || '',
      rating: null,
      verified: isVerified,
      source: verifiedSource,
      created_at: new Date().toISOString()
    };

    localStore.healthcareFacilities.unshift(newFacility);

    // Sync to Supabase
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from('healthcare_facilities').insert([newFacility]);
      } catch (err) {
        console.warn('[Admin] Supabase insert warning:', err.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Healthcare facility added successfully.',
      data: newFacility
    });
  } catch (error) {
    next(error);
  }
};

export const updateFacility = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, facility_type, specialty, address, city, latitude, longitude, phone, website, verified, source } = req.body;

    const index = localStore.healthcareFacilities.findIndex(f => f.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Healthcare facility not found.'
      });
    }

    const current = localStore.healthcareFacilities[index];
    const isVerified = verified !== undefined ? Boolean(verified) : current.verified;
    const finalSource = isVerified
      ? (source?.trim() || current.source || 'Verified Official Registry')
      : 'DEMO DATA – NOT VERIFIED';

    const updated = {
      ...current,
      name: name !== undefined ? name.trim() : current.name,
      facility_type: facility_type !== undefined ? facility_type.trim() : current.facility_type,
      specialty: specialty !== undefined ? specialty.trim() : current.specialty,
      address: address !== undefined ? address.trim() : current.address,
      city: city !== undefined ? city.trim() : current.city,
      latitude: latitude !== undefined ? parseFloat(latitude) : current.latitude,
      longitude: longitude !== undefined ? parseFloat(longitude) : current.longitude,
      phone: phone !== undefined ? phone.trim() : current.phone,
      website: website !== undefined ? website.trim() : current.website,
      verified: isVerified,
      source: finalSource
    };

    localStore.healthcareFacilities[index] = updated;

    res.json({
      success: true,
      message: 'Healthcare facility updated successfully.',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFacility = async (req, res, next) => {
  try {
    const { id } = req.params;

    const index = localStore.healthcareFacilities.findIndex(f => f.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Healthcare facility not found.'
      });
    }

    localStore.healthcareFacilities.splice(index, 1);

    res.json({
      success: true,
      message: 'Healthcare facility deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};

export const toggleVerifyFacility = async (req, res, next) => {
  try {
    const { id } = req.params;

    const facility = localStore.healthcareFacilities.find(f => f.id === id);
    if (!facility) {
      return res.status(404).json({
        success: false,
        error: 'Healthcare facility not found.'
      });
    }

    facility.verified = !facility.verified;
    if (facility.verified) {
      facility.source = 'Verified by System Administrator (State Health Register)';
    } else {
      facility.source = 'DEMO DATA – NOT VERIFIED';
    }

    res.json({
      success: true,
      message: `Facility ${facility.verified ? 'marked as verified' : 'marked as unverified'}.`,
      data: facility
    });
  } catch (error) {
    next(error);
  }
};
