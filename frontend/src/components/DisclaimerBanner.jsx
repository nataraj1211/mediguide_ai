import React, { useState } from 'react';
import { AlertTriangle, X, ShieldAlert } from 'lucide-react';

export const DisclaimerBanner = ({ isImage = false }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-4 my-4 shadow-xs">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="flex-1 text-sm text-amber-900 dark:text-amber-200">
          <p className="font-semibold text-amber-950 dark:text-amber-100 mb-1">
            Important Medical Information Disclaimer
          </p>
          <p className="text-xs leading-relaxed text-amber-800 dark:text-amber-300">
            MediGuide AI is strictly an informational and educational tool. It does not provide a medical diagnosis, treatment plan, or professional medical advice. AI-generated information may be incomplete or inaccurate. Always consult a qualified healthcare professional for medical concerns. In an emergency, contact emergency services (112) or visit the nearest emergency department.
          </p>
          {isImage && (
            <p className="text-xs font-medium text-amber-900 dark:text-amber-200 mt-1">
              • Image analysis is for general informational purposes only and cannot reliably diagnose a medical condition.
            </p>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-amber-600 dark:text-amber-400 hover:text-amber-800 p-1 rounded-md"
          title="Dismiss disclaimer banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DisclaimerBanner;
