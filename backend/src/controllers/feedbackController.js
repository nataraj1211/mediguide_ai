import crypto from 'crypto';
import { localStore, getSupabase } from '../config/db.js';

export const submitFeedback = async (req, res, next) => {
  try {
    const { name, email, rating, comment, analysisId } = req.body;

    if (!comment || !comment.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide feedback comments.'
      });
    }

    const numericRating = rating ? parseInt(rating) : 5;
    if (numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        success: false,
        error: 'Rating must be between 1 and 5 stars.'
      });
    }

    const feedbackEntry = {
      id: crypto.randomUUID(),
      name: name?.trim() || req.user?.full_name || 'Anonymous User',
      email: email?.trim() || req.user?.email || 'N/A',
      rating: numericRating,
      comment: comment.trim(),
      analysis_id: analysisId || null,
      user_id: req.user?.id || null,
      created_at: new Date().toISOString()
    };

    localStore.feedback.unshift(feedbackEntry);

    // Sync to Supabase if active
    const supabase = getSupabase();
    if (supabase) {
      try {
        await supabase.from('feedback').insert([{
          id: feedbackEntry.id,
          user_id: feedbackEntry.user_id,
          analysis_id: feedbackEntry.analysis_id,
          rating: feedbackEntry.rating,
          comment: feedbackEntry.comment
        }]);
      } catch (err) {
        console.warn('[Feedback] Supabase insert warning:', err.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Thank you! Your feedback helps us improve the application.',
      data: feedbackEntry
    });
  } catch (error) {
    next(error);
  }
};

export const getFeedbacks = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: localStore.feedback
    });
  } catch (error) {
    next(error);
  }
};
