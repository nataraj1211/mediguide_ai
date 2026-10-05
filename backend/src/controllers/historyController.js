import { localStore, getSupabase } from '../config/db.js';

export const getHistory = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    // Local store history
    let checks = localStore.symptomChecks;
    if (userId) {
      checks = checks.filter(c => c.user_id === userId || !c.user_id);
    }

    // Attach category from healthResults
    const historyWithDetails = checks.map(check => {
      const result = localStore.healthResults.find(r => r.symptom_check_id === check.id);
      return {
        id: check.id,
        date: check.created_at,
        inputType: check.input_type,
        symptomSummary: check.symptom_text,
        imageUrl: check.image_url,
        category: result?.category || 'General Health Review',
        riskLevel: check.risk_level,
        recommendation: check.recommendation
      };
    });

    res.json({
      success: true,
      count: historyWithDetails.length,
      data: historyWithDetails
    });
  } catch (error) {
    next(error);
  }
};

export const getHistoryDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const check = localStore.symptomChecks.find(c => c.id === id);
    if (!check) {
      return res.status(404).json({
        success: false,
        error: 'History record not found.'
      });
    }

    // Check authorization: record must belong to user if authenticated
    if (userId && check.user_id && check.user_id !== userId && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'You do not have permission to view this private health record.'
      });
    }

    const result = localStore.healthResults.find(r => r.symptom_check_id === check.id);

    res.json({
      success: true,
      data: {
        id: check.id,
        date: check.created_at,
        inputType: check.input_type,
        symptomSummary: check.symptom_text,
        imageUrl: check.image_url,
        category: result?.category || 'General Health Review',
        explanation: result?.explanation || check.ai_summary,
        possibleCauses: result?.possible_causes || [],
        selfCare: result?.self_care || [],
        warningSigns: result?.warning_signs || [],
        healthcareRecommendation: result?.healthcare_recommendation || check.recommendation,
        riskLevel: check.risk_level
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHistoryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const index = localStore.symptomChecks.findIndex(c => c.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        error: 'Record not found.'
      });
    }

    const check = localStore.symptomChecks[index];
    if (userId && check.user_id && check.user_id !== userId && req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Permission denied.'
      });
    }

    localStore.symptomChecks.splice(index, 1);
    const resultIdx = localStore.healthResults.findIndex(r => r.symptom_check_id === id);
    if (resultIdx !== -1) {
      localStore.healthResults.splice(resultIdx, 1);
    }

    res.json({
      success: true,
      message: 'History record removed successfully.'
    });
  } catch (error) {
    next(error);
  }
};
