import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  AlertOctagon, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Stethoscope, 
  MapPin, 
  PhoneCall, 
  ArrowLeft, 
  Star, 
  Building2, 
  ThumbsUp, 
  ChevronRight,
  ExternalLink,
  HelpCircle,
  Clock,
  Sparkles,
  Share2
} from 'lucide-react';
import MapView from '../components/MapView';
import FacilityCard from '../components/FacilityCard';
import { api } from '../services/api';

export const AnalysisResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Result passed from navigation state or fallback
  const resultData = location.state?.result;
  const analysisId = location.state?.analysisId;

  // Feedback form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  if (!resultData) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-md">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No Analysis Data Available</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Please run a symptom check or upload an image first to view educational healthcare information.
          </p>
          <Link
            to="/symptom-checker"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-md"
          >
            Go to Symptom Checker
          </Link>
        </div>
      </div>
    );
  }

  const {
    inputSummary,
    imageUrl,
    possibleCategory,
    generalExplanation,
    possibleCauses = [],
    selfCare = [],
    thingsToAvoid = [],
    warningSigns = [],
    recommendedLevelOfCare = 'MODERATE',
    healthcareRecommendation,
    relevantSpecialty = 'General Medicine',
    isEmergency = false,
    emergencyNumber = '112',
    disclaimer,
    nearbyFacilities = []
  } = resultData;

  // Severity Badges & Theme
  const getRiskBadge = (level) => {
    switch (level) {
      case 'EMERGENCY':
        return {
          label: 'EMERGENCY / SEEK IMMEDIATE HELP',
          bg: 'bg-red-600 text-white',
          border: 'border-red-600',
          cardBg: 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800'
        };
      case 'HIGH':
        return {
          label: 'HIGH / SEEK MEDICAL CARE SOON',
          bg: 'bg-orange-500 text-white',
          border: 'border-orange-500',
          cardBg: 'bg-orange-50 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800'
        };
      case 'MODERATE':
        return {
          label: 'MODERATE / CONSIDER CONSULTING A DOCTOR',
          bg: 'bg-sky-600 text-white',
          border: 'border-sky-600',
          cardBg: 'bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800'
        };
      case 'LOW':
      default:
        return {
          label: 'LOW / SELF-CARE INFORMATION',
          bg: 'bg-emerald-600 text-white',
          border: 'border-emerald-600',
          cardBg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
        };
    }
  };

  const riskBadge = getRiskBadge(recommendedLevelOfCare);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setFeedbackLoading(true);
    try {
      await api.submitFeedback({
        rating,
        comment,
        analysisId
      });
      setFeedbackSubmitted(true);
    } catch (err) {
      console.error('Feedback error:', err);
    } finally {
      setFeedbackLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-sky-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Symptom Input</span>
          </button>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Educational Health Guidance Report
          </span>
        </div>

        {/* 1. CRITICAL EMERGENCY WARNING BANNER (When applicable) */}
        {isEmergency && (
          <div className="bg-red-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl animate-pulse">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-2xl shrink-0">
                <AlertOctagon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide">
                  EMERGENCY WARNING
                </h2>
                <p className="mt-2 text-base text-red-100 font-medium">
                  Please seek immediate medical attention. Your described symptoms indicate potential emergency indicators.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <a
                    href={`tel:${emergencyNumber}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-red-700 font-bold text-sm shadow-md hover:bg-red-50 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-red-600" />
                    <span>Call Emergency Services ({emergencyNumber})</span>
                  </a>
                  <a
                    href="tel:108"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-800 text-white font-semibold text-sm hover:bg-red-900 transition-colors"
                  >
                    <span>Ambulance 108</span>
                  </a>
                </div>
                <p className="mt-4 text-xs text-red-200">
                  Call your local emergency service or proceed directly to the nearest emergency department.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. MAIN RESULT CARD */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
          
          {/* Header Bar */}
          <div className="p-6 sm:p-8 bg-slate-900 text-white border-b border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold block mb-1">
                  AI-Assisted Educational Analysis
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {possibleCategory}
                </h1>
              </div>

              {/* Recommended Level of Care Badge */}
              <div className="shrink-0">
                <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${riskBadge.bg}`}>
                  {riskBadge.label}
                </span>
              </div>
            </div>

            {/* Input Summary */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-start gap-3 text-xs text-slate-300">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Symptom Summary: </span>
                <span>{inputSummary}</span>
              </div>
            </div>

            {/* If Image was uploaded */}
            {imageUrl && (
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-3">
                <img
                  src={imageUrl}
                  alt="Uploaded condition preview"
                  className="w-16 h-16 rounded-xl object-cover border border-slate-700"
                />
                <div className="text-xs text-slate-300">
                  <span className="font-semibold text-white block">Visual Assessment Image</span>
                  <span className="text-slate-400">Analyzed for superficial characteristics only.</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            
            {/* General Explanation ("What It May Mean") */}
            <div>
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-2">
                What It May Mean
              </h3>
              <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                {generalExplanation}
              </p>
            </div>

            {/* Possible Common Causes */}
            {possibleCauses.length > 0 && (
              <div>
                <h3 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-2">
                  Possible Common Causes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {possibleCauses.map((cause, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle className="w-4 h-4 text-sky-500 shrink-0" />
                      <span>{cause}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Basic Self-Care Guidance & Things to Avoid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Self Care */}
              <div className="p-5 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50">
                <h3 className="text-sm font-bold text-teal-900 dark:text-teal-200 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>General Self-Care Guidance</span>
                </h3>
                <ul className="space-y-2 text-xs text-teal-950 dark:text-teal-200 leading-relaxed">
                  {selfCare.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Things to Avoid */}
              <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
                <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Things to Avoid</span>
                </h3>
                <ul className="space-y-2 text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
                  {thingsToAvoid.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Warning Signs Checklist (High Visibility) */}
            {warningSigns.length > 0 && (
              <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60">
                <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200 mb-2 flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span>Warning Signs to Watch For</span>
                </h3>
                <p className="text-xs text-rose-800 dark:text-rose-300 mb-3">
                  If you experience any of the following symptoms, seek prompt medical care:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-rose-950 dark:text-rose-200">
                  {warningSigns.map((sign, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">⚠</span>
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Healthcare Professional Recommendation */}
            <div className="p-5 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-sky-600 text-white shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-sky-950 dark:text-sky-100">
                  Healthcare Professional Recommendation
                </h4>
                <p className="text-xs text-sky-900 dark:text-sky-200 mt-1 leading-relaxed">
                  {healthcareRecommendation}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-sky-200 dark:bg-sky-900 text-sky-800 dark:text-sky-200 text-[11px] font-semibold">
                  <span>Suggested Specialty: {relevantSpecialty}</span>
                </div>
              </div>
            </div>

            {/* Mandatory Disclaimer Display */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong>Medical Disclaimer:</strong> {disclaimer}
            </div>
          </div>
        </div>

        {/* 3. NEARBY HEALTHCARE FACILITIES & INTERACTIVE MAP */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-6 h-6 text-sky-600" />
                <span>Healthcare Professionals & Hospitals Near You</span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Matched according to your symptom category ({relevantSpecialty})
              </p>
            </div>

            <Link
              to="/nearby-healthcare"
              className="inline-flex items-center gap-1 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              <span>Explore all facilities</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Interactive Map */}
          <MapView
            facilities={nearbyFacilities}
            selectedFacility={selectedFacility}
            onSelectFacility={(fac) => setSelectedFacility(fac)}
          />

          {/* Facilities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyFacilities.map((fac) => (
              <FacilityCard
                key={fac.id}
                facility={fac}
                isSelected={selectedFacility?.id === fac.id}
                onSelect={(f) => setSelectedFacility(f)}
              />
            ))}
          </div>
        </div>

        {/* 4. USER FEEDBACK WIDGET */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Was this healthcare information helpful?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Your feedback helps us improve the application and ensures clinical educational safety.
          </p>

          {feedbackSubmitted ? (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Thank you! Your feedback has been recorded.</span>
            </div>
          ) : (
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 dark:text-slate-300">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <textarea
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts on clarity, safety, or hospital matching..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                required
              />

              <button
                type="submit"
                disabled={feedbackLoading}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                {feedbackLoading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default AnalysisResult;
