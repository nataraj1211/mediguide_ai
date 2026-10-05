import crypto from 'crypto';
import { analyzeImage } from '../services/aiService.js';
import { getNearbyFacilities } from '../services/mapsService.js';
import { localStore, getSupabase } from '../config/db.js';

export const handleAnalyzeImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Please upload an image file (JPG, JPEG, PNG).'
      });
    }

    const { notes, ageGroup, duration, location, latitude, longitude } = req.body;

    // 1. Analyze the image through safe AI service
    const analysis = await analyzeImage({
      file: req.file,
      notes,
      ageGroup,
      duration
    });

    // 2. Fetch matched facilities
    const nearbyFacilities = await getNearbyFacilities({
      latitude,
      longitude,
      city: location || 'Dindigul',
      specialty: analysis.relevantSpecialty,
      limit: 6
    });

    // 3. Persist check and result records
    const checkId = crypto.randomUUID();
    const resultId = crypto.randomUUID();
    const userId = req.user?.id || null;

    const symptomRecord = {
      id: checkId,
      user_id: userId,
      input_type: 'image',
      symptom_text: notes ? `Image with notes: ${notes}` : 'Image upload of skin/minor visible presentation',
      image_url: analysis.imageUrl,
      duration: duration || 'Not specified',
      severity: 'Visual Assessment',
      ai_summary: analysis.generalExplanation,
      risk_level: analysis.recommendedLevelOfCare,
      recommendation: analysis.healthcareRecommendation,
      created_at: new Date().toISOString()
    };

    const healthResultRecord = {
      id: resultId,
      symptom_check_id: checkId,
      category: analysis.possibleCategory,
      explanation: analysis.generalExplanation,
      possible_causes: analysis.possibleCauses,
      self_care: analysis.selfCare,
      warning_signs: analysis.warningSigns,
      healthcare_recommendation: analysis.healthcareRecommendation,
      created_at: new Date().toISOString()
    };

    localStore.symptomChecks.unshift(symptomRecord);
    localStore.healthResults.unshift(healthResultRecord);

    // Sync to Supabase if active
    const supabase = getSupabase();
    if (supabase && userId) {
      try {
        await supabase.from('symptom_checks').insert([{
          id: checkId,
          user_id: userId,
          input_type: 'image',
          symptom_text: symptomRecord.symptom_text,
          image_url: analysis.imageUrl,
          duration,
          severity: 'Visual Assessment',
          ai_summary: analysis.generalExplanation,
          risk_level: analysis.recommendedLevelOfCare,
          recommendation: analysis.healthcareRecommendation
        }]);

        await supabase.from('health_results').insert([{
          id: resultId,
          symptom_check_id: checkId,
          category: analysis.possibleCategory,
          explanation: analysis.generalExplanation,
          possible_causes: analysis.possibleCauses,
          self_care: analysis.selfCare,
          warning_signs: analysis.warningSigns,
          healthcare_recommendation: analysis.healthcareRecommendation
        }]);
      } catch (err) {
        console.warn('[ImageController] Supabase insert warning:', err.message);
      }
    }

    res.status(200).json({
      success: true,
      analysisId: checkId,
      data: {
        ...analysis,
        nearbyFacilities
      }
    });
  } catch (error) {
    next(error);
  }
};
