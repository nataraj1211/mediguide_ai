import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  History as HistoryIcon, 
  Trash2, 
  Eye, 
  Clock, 
  AlertCircle, 
  Stethoscope, 
  Camera, 
  Loader2,
  Calendar,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';

export const HistoryPage = () => {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const data = await api.getHistory();
      setHistoryList(data);
    } catch (err) {
      setErrorMessage(err.message || 'Unable to retrieve history records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to remove this record from your history?')) {
      return;
    }

    setDeleteLoadingId(id);
    try {
      await api.deleteHistoryItem(id);
      setHistoryList(prev => prev.filter(item => item.id !== id));
      if (selectedItem?.id === id) setSelectedItem(null);
    } catch (err) {
      alert(err.message || 'Failed to delete record.');
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const handleViewDetail = async (id) => {
    try {
      const detail = await api.getHistoryDetail(id);
      navigate('/result', {
        state: {
          result: {
            inputSummary: detail.symptomSummary,
            imageUrl: detail.imageUrl,
            possibleCategory: detail.category,
            generalExplanation: detail.explanation,
            possibleCauses: detail.possibleCauses,
            selfCare: detail.selfCare,
            warningSigns: detail.warningSigns,
            recommendedLevelOfCare: detail.riskLevel,
            healthcareRecommendation: detail.healthcareRecommendation,
            relevantSpecialty: 'General Medicine',
            isEmergency: detail.riskLevel === 'EMERGENCY',
            disclaimer: 'Historical record retrieved from your private account.'
          },
          analysisId: detail.id
        }
      });
    } catch (err) {
      alert('Could not open history details: ' + err.message);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'EMERGENCY':
        return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300 border-red-300';
      case 'HIGH':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border-orange-300';
      case 'MODERATE':
        return 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-300';
      case 'LOW':
      default:
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
              <HistoryIcon className="w-8 h-8 text-sky-600" />
              <span>My Health Information History</span>
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Review your past AI health information inquiries, self-care notes, and hospital recommendations.
            </p>
          </div>

          <Link
            to="/symptom-checker"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-xs transition-colors shrink-0"
          >
            <Stethoscope className="w-4 h-4" />
            <span>New Symptom Check</span>
          </Link>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* History List */}
        {loading ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-16 text-center border border-slate-200 dark:border-slate-800 shadow-sm">
            <Loader2 className="w-8 h-8 text-sky-600 animate-spin mx-auto mb-3" />
            <p className="text-xs text-slate-500">Retrieving your private consultation records...</p>
          </div>
        ) : historyList.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm max-w-lg mx-auto">
            <Clock className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No Health Inquiries Yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6 leading-relaxed">
              You haven't run any symptom checks or uploaded any images yet. Start your first inquiry to receive safe educational guidance.
            </p>
            <Link
              to="/symptom-checker"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 text-white text-xs font-semibold shadow-md"
            >
              <span>Check Symptoms Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {historyList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleViewDetail(item.id)}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  
                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 text-slate-400 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="inline-flex items-center gap-1 font-semibold uppercase text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {item.inputType === 'image' ? <Camera className="w-3 h-3" /> : <Stethoscope className="w-3 h-3" />}
                      <span>{item.inputType}</span>
                    </span>
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border ${getRiskColor(item.riskLevel)}`}>
                      {item.riskLevel}
                    </span>
                  </div>

                  {/* Category Title */}
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.category}
                  </h3>

                  {/* Summary Snippet */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {item.symptomSummary}
                  </p>

                  {/* Recommendation Preview */}
                  <div className="text-[11px] text-teal-700 dark:text-teal-400 font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Advice: {item.recommendation}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => handleViewDetail(item.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 text-sky-700 dark:text-sky-300 text-xs font-semibold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Result</span>
                  </button>

                  <button
                    type="button"
                    disabled={deleteLoadingId === item.id}
                    onClick={(e) => handleDelete(item.id, e)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default HistoryPage;
