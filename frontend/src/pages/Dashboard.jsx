import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Camera, 
  MapPin, 
  History, 
  PhoneCall, 
  User, 
  Activity, 
  Clock, 
  ShieldAlert, 
  ArrowRight, 
  AlertOctagon, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  Building2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

export const Dashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await api.getHistory();
        setHistory(data.slice(0, 4));
      } catch (err) {
        console.warn('Could not load history:', err.message);
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-sky-900 to-teal-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Patient Guidance Portal</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Welcome back, {user?.fullName || 'Health Explorer'}!
              </h1>
              <p className="mt-2 text-sky-100 text-sm max-w-xl">
                Ready to review health inquiries, evaluate skin presentations, or explore verified medical facilities.
              </p>
            </div>

            {/* Quick Emergency Button in Header */}
            <div className="shrink-0">
              <Link
                to="/emergency"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105"
              >
                <PhoneCall className="w-4 h-4 animate-pulse" />
                <span>Emergency Help (112)</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Main Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <Link
            to="/symptom-checker"
            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-sky-500 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Check Symptoms
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Enter symptoms in natural text to receive structured educational guidance.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
              Start Check <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            to="/image-checker"
            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-teal-500 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Upload Image
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Upload a clear photo of a visible skin condition or minor injury.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
              Upload Photo <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            to="/nearby-healthcare"
            className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-500 hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Nearby Healthcare
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Explore medical centers, district hospitals, and clinics on the interactive map.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
              View Map <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            to="/emergency"
            className="group p-6 rounded-2xl bg-red-50/60 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 shadow-xs hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-red-950 dark:text-red-200 mb-1">
              Emergency Help
            </h3>
            <p className="text-xs text-red-800/80 dark:text-red-300/80 mb-4">
              Immediate connection to national emergency services 112 & trauma contacts.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform">
              Emergency Numbers <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* Dashboard Grid: Recent Consultation History & Profile Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Recent Analysis History (2 columns) */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-sky-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Recent Consultations & Analyses
                </h3>
              </div>
              <Link
                to="/history"
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
              >
                View All History
              </Link>
            </div>

            {loadingHistory ? (
              <p className="text-xs text-slate-400 py-6 text-center">Loading past consultations...</p>
            ) : history.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">No recent consultations recorded</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  When you check symptoms or upload images, your private educational health logs will appear here.
                </p>
                <div className="mt-4">
                  <Link
                    to="/symptom-checker"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold"
                  >
                    Run Your First Check
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-800/40 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.category}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 uppercase">
                          {item.inputType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-md mt-0.5">
                        {item.symptomSummary}
                      </p>
                    </div>

                    <Link
                      to="/history"
                      className="shrink-0 p-2 text-slate-400 hover:text-sky-600 transition-colors"
                      title="View record details"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Card & Safety Tips */}
          <div className="space-y-6">
            
            {/* User Profile Settings Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-lg">
                  {user?.fullName?.charAt(0) || 'U'}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {user?.fullName || 'Registered User'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Role:</span>
                  <span className="font-semibold capitalize text-slate-900 dark:text-white">{user?.role || 'User'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Account Privacy:</span>
                  <span className="text-emerald-600 font-semibold">Protected with RLS</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to="/profile"
                  className="block text-center py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                >
                  Manage Profile Settings
                </Link>
              </div>
            </div>

            {/* Health Reminder Card */}
            <div className="bg-sky-50 dark:bg-sky-950/40 rounded-3xl p-5 border border-sky-200 dark:border-sky-900/50">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div className="text-xs text-sky-950 dark:text-sky-200 leading-relaxed">
                  <span className="font-bold block mb-1">Self-Care Reminder:</span>
                  Always consult a certified healthcare practitioner before starting any medical treatments. MediGuide AI provides educational information only.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
