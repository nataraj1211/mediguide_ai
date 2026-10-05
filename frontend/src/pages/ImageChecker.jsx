import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Camera, 
  Upload, 
  X, 
  Loader2, 
  ShieldAlert, 
  AlertCircle, 
  CheckCircle, 
  Image as ImageIcon,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { api } from '../services/api';
import DisclaimerBanner from '../components/DisclaimerBanner';

export const ImageChecker = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [notes, setNotes] = useState('');
  const [duration, setDuration] = useState('1-2 Days');
  const [location, setLocation] = useState('Dindigul');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Unsupported file format. Please upload a JPG, JPEG, or PNG image.');
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('The image size exceeds 5MB. Please choose a smaller file.');
      return;
    }

    setErrorMessage('');
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMessage('Please select or capture an image to analyze.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      if (notes) formData.append('notes', notes.trim());
      formData.append('duration', duration);
      formData.append('location', location);

      const response = await api.analyzeImage(formData);

      navigate('/result', {
        state: {
          result: response.data,
          analysisId: response.analysisId
        }
      });
    } catch (err) {
      setErrorMessage(err.message || 'Unable to process image at this moment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-900/60 text-teal-600 dark:text-teal-400 mb-3 shadow-xs">
            <Camera className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Skin & Injury Image Review
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Upload a clear photo of a localized skin condition, mild rash, or minor scrape for safe educational categorization and first-aid recommendations.
          </p>
        </div>

        {/* Disclaimer Banner explicitly tailored for images */}
        <DisclaimerBanner isImage={true} />

        {/* Upload Card */}
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

          {/* Privacy Notice Box (Mandatory Specification Rule) */}
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
              <span className="font-bold block mb-0.5">Privacy Notice:</span>
              Do not upload images containing personally identifying information, faces, or sensitive private body zones. Images are analyzed solely for general educational health guidance.
            </div>
          </div>

          {/* Image Upload / Preview Area */}
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
              Select or Take Photo <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/jpg,image/webp"
              capture="environment"
              className="hidden"
              id="imageUploadInput"
            />

            {!previewUrl ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 rounded-2xl p-8 text-center cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800/40"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <Upload className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Click to browse from device or take photo with mobile camera
                </h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Supported formats: JPG, JPEG, PNG, WebP (Max 5MB)
                </p>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 p-2">
                <div className="relative h-64 sm:h-72 w-full flex items-center justify-center rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={previewUrl}
                    alt="Uploaded condition preview"
                    className="max-h-full max-w-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-3 right-3 p-2 rounded-full bg-red-600/90 text-white hover:bg-red-700 shadow-md transition-colors"
                    title="Remove and choose another image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between px-2 pt-3 pb-1 text-xs">
                  <span className="text-slate-600 dark:text-slate-300 truncate max-w-xs">
                    {selectedFile?.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Change Image</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Optional Observation Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Additional Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Mild itching, appeared 2 days ago after gardening"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Duration & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Duration of presentation
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
              >
                <option value="Few hours">Few hours</option>
                <option value="1-2 Days">1-2 Days</option>
                <option value="3-7 Days">3-7 Days</option>
                <option value="More than 1 week">More than 1 week</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Preferred Area
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-teal-500"
              >
                <option value="Dindigul">Dindigul</option>
                <option value="Madurai">Madurai</option>
                <option value="Coimbatore">Coimbatore</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !selectedFile}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white font-bold text-base shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing Image Analysis...</span>
                </>
              ) : (
                <>
                  <Camera className="w-5 h-5" />
                  <span>Analyze Image</span>
                </>
              )}
            </button>
          </div>

          {/* Disclaimer reminder */}
          <p className="text-center text-[11px] text-slate-500 dark:text-slate-400">
            AI image assessment uses educational wording such as "This image may be consistent with..." and does not replace in-person clinical inspection.
          </p>
        </form>

      </div>
    </div>
  );
};

export default ImageChecker;
