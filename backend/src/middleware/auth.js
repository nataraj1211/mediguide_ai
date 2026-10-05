import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { localStore, getSupabase } from '../config/db.js';

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    req.user = null;
    return next();
  }

  // 1. Try Supabase verification if Supabase is active
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (!error && user) {
        // Fetch profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        req.user = {
          id: profile?.id || user.id,
          user_id: user.id,
          email: user.email,
          full_name: profile?.full_name || user.user_metadata?.full_name || 'User',
          role: profile?.role || 'user'
        };
        return next();
      }
    } catch (e) {
      // Fallback to JWT verify
    }
  }

  // 2. JWT Verification fallback
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    // Find in localStore if local mode
    const profile = localStore.profiles.find(p => p.id === decoded.id || p.email === decoded.email);
    req.user = {
      id: decoded.id,
      user_id: decoded.user_id || decoded.id,
      email: decoded.email,
      full_name: profile?.full_name || decoded.full_name || 'User',
      role: profile?.role || decoded.role || 'user'
    };
    next();
  } catch (err) {
    req.user = null;
    next();
  }
};

export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required. Please log in to continue.'
    });
  }
  next();
};

export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required.'
    });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      error: 'Access restricted. Administrator privileges required.'
    });
  }

  next();
};
