import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Stethoscope, 
  Send, 
  Loader2, 
  HelpCircle, 
  Sparkles, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  Flame, 
  AlertCircle 
} from 'lucide-react';
import { api } from '../services/api';
import DisclaimerBanner from '../components/DisclaimerBanner';

export const SymptomChecker = () => {
  const navigate = useNavigate();

  const [symptomText, setSymptomText] = useState('');
  const [ageGroup, setAgeGroup] = useState('Adult (18-64)');
  const [duration, setDuration] = useState('1-2 Days');
  const [severity, setSeverity] = useState('Mild');
  const [location, setLocation] = useState('Dindigul');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Preset demo test cases for instant 1-click testing
  const presets = [
    {
      label: 'Headache & Fatigue',
      text: 'I have a mild throbbing headache and eye strain since working on my laptop.',
      duration: '1 day',
      severity: 'Mild'
    },
    {
      label: 'Mild Fever & Chills',
      text: 'Mild fever and body chills since yesterday evening.',
      duration: '24 hours',
      severity: 'Moderate'
    },
    {
      label: 'Itchy Skin Rash',
      text: 'I have an itchy red skin rash on my forearms after using a new detergent.',
      duration: '2 days',
      severity: 'Mild'
    },
    {
      label: 'Stomach Discomfort',
      text: 'Stomach cramp, bloating and nausea after eating spicy restaurant food.',
      duration: 'Few hours',
      severity: 'Moderate'
    },
    {
      label: 'Red-Flag Emergency Test',
      text: 'Severe chest pain, heavy pressure in chest and difficulty breathing.',
      duration: '15 mins',
      severity: 'Severe'
    }
  ];

  const handleApplyPreset = (preset) => {
    setSymptomText(preset.text);
    setDuration(preset.duration);
    setSeverity(preset.severity);
    setErrorMessage('');
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!symptomText.trim()) {
      setErrorMessage('Please describe your symptoms to receive educational health information.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await api.analyzeSymptoms({
        symptomText: symptomText.trim(),
        ageGroup,
        duration,
        severity,
        location
      });

      // Navigate to result page passing analysis payload in location state
      navigate('/result', {
        state: {
          result: response.data,
          analysisId: response.analysisId
        }
      });
    } catch (err) {
      setErrorMessage(err.message || 'Unable to analyze the information right now. Please try again later or consult a healthcare professional.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-900/60 text-sky-600 dark:text-sky-400 mb-3 shadow-xs">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Symptom Checker
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Describe how you are feeling in your own words. Receive safe, educational triage, home self-care recommendations, and matching hospital discoveries.
          </p>
        </div>

        {/* Disclaimer Banner */}
        <DisclaimerBanner />

        {/* Quick Test Presets */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 mb-6 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Click any example case to pre-fill test symptoms:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                  p.label.includes('Emergency')
                    ? 'border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:border-sky-300'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Symptom Form Card */}
        <form 
          onSubmit={handleAnalyze}
          className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6"
        >
          {errorMessage && (
            <div className="flex items-start gap-2.5 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Main Symptom Description */}
          <div>
            <label 
              htmlFor="symptomText" 
              className="block text-sm font-bold text-slate-900 dark:text-slate-100 mb-2"
            >
              Describe Your Symptoms <span className="text-red-500">*</span>
            </label>
            <textarea
              id="symptomText"
              rows={4}
              value={symptomText}
              onChange={(e) => setSymptomText(e.target.value)}
              placeholder="Example: I have a mild headache and fever since yesterday."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 transition-all resize-y"
              required
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Please avoid including personally identifying details like phone numbers or addresses.
            </p>
          </div>

          {/* Optional Supporting Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            {/* Age Group */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Age Group (Optional)
              </label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-sky-500"
              >
                <option value="Child (0-12)">Child (0-12)</option>
                <option value="Adolescent (13-17)">Adolescent (13-17)</option>
                <option value="Adult (18-64)">Adult (18-64)</option>
                <option value="Senior (65+)">Senior (65+)</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Duration of Symptoms
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-sky-500"
              >
                <option value="Few hours">Few hours</option>
                <option value="1-2 Days">1-2 Days</option>
                <option value="3-7 Days">3-7 Days</option>
                <option value="More than 1 week">More than 1 week</option>
              </select>
            </div>

            {/* General Location */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                General Location (for hospital matching)
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-sky-500"
              >
                <option value="Dindigul">Dindigul</option>
                <option value="Madurai">Madurai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Chennai">Chennai</option>
                <option value="Trichy">Trichy</option>
              </select>
            </div>

            {/* Self-Assessed Severity */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Current Discomfort Level
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-sky-500"
              >
                <option value="Mild">Mild – Manageable discomfort</option>
                <option value="Moderate">Moderate – Disrupts daily routine</option>
                <option value="Severe">Severe – Intense distress</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-base shadow-lg shadow-sky-600/30 hover:shadow-sky-600/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing Symptoms with Clinical Safety Checks...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Analyze Symptoms</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Notice */}
          <p className="text-center text-[11px] text-slate-500 dark:text-slate-400">
            MediGuide AI never claims certainty or prescribes prescription medications.
          </p>
        </form>

      </div>
    </div>
  );
};

export default SymptomChecker;
