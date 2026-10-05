import crypto from 'crypto';
import { analyzeSymptoms } from '../services/aiService.js';
import { getNearbyFacilities } from '../services/mapsService.js';
import { localStore, getSupabase } from '../config/db.js';

export const handleAnalyzeSymptoms = async (req, res, next) => {
  try {
    const { symptomText, ageGroup, duration, severity, location, latitude, longitude } = req.body;

    if (!symptomText || typeof symptomText !== 'string' || !symptomText.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please describe your symptoms to receive educational health information.'
      });
    }

    // 1. Run AI analysis
    const analysis = await analyzeSymptoms({
      text: symptomText,
      ageGroup,
      duration,
      severity,
      location
    });

    // 2. Fetch matched nearby healthcare facilities
    const nearbyFacilities = await getNearbyFacilities({
      latitude,
      longitude,
      city: location || 'Dindigul',
      specialty: analysis.relevantSpecialty,
      limit: 6
    });

    // 3. Persist record if user is authenticated or demo session
    const checkId = crypto.randomUUID();
    const resultId = crypto.randomUUID();
    const userId = req.user?.id || null;

    const symptomRecord = {
      id: checkId,
      user_id: userId,
      input_type: 'text',
      symptom_text: symptomText.trim(),
      image_url: null,
      duration: duration || 'Not specified',
      severity: severity || 'Mild',
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

    // Store in local store
    localStore.symptomChecks.unshift(symptomRecord);
    localStore.healthResults.unshift(healthResultRecord);

    // Sync to Supabase if active
    const supabase = getSupabase();
    if (supabase && userId) {
      try {
        await supabase.from('symptom_checks').insert([{
          id: checkId,
          user_id: userId,
          input_type: 'text',
          symptom_text: symptomText.trim(),
          duration,
          severity,
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
        console.warn('[SymptomController] Supabase insert warning:', err.message);
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
