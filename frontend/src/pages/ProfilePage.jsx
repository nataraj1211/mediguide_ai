import React from 'react';
import { User, Mail, Phone, ShieldCheck, LogOut, Lock, Calendar, History, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-md">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-slate-100 dark:border-slate-800 text-center sm:text-left">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-600 to-teal-500 text-white flex items-center justify-center text-3xl font-black shadow-lg shadow-sky-500/25">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {user?.fullName || 'Registered User'}
                </h1>
                {isAdmin ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    Administrator
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                    Member
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Account ID: {user?.id || 'Local User'}
              </p>
            </div>
          </div>

          <div className="py-6 space-y-4 text-xs">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Mail className="w-4 h-4 text-sky-600" />
                <span>Email Address</span>
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">{user?.email}</span>
            </div>

            {user?.phone && (
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Phone className="w-4 h-4 text-teal-600" />
                  <span>Phone Number</span>
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">{user.phone}</span>
              </div>
            )}

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <span className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Database Privacy Protocol</span>
              </span>
              <span className="font-semibold text-emerald-600">Supabase RLS Active</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              to="/history"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              <History className="w-4 h-4" />
              <span>Review Past Consultations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
