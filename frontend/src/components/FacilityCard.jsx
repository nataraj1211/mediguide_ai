import React from 'react';
import { Building2, MapPin, Phone, Globe, Navigation, ShieldCheck, AlertTriangle } from 'lucide-react';

export const FacilityCard = ({ facility, onSelect, isSelected = false }) => {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${facility.name}, ${facility.address}`
  )}`;

  return (
    <div 
      onClick={() => onSelect && onSelect(facility)}
      className={`p-5 rounded-2xl border transition-all cursor-pointer ${
        isSelected
          ? 'bg-sky-50/60 dark:bg-sky-950/40 border-sky-500 shadow-md ring-2 ring-sky-500/20'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
              {facility.name}
            </h4>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {facility.facility_type}
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300">
                {facility.specialty}
              </span>
            </div>
          </div>
        </div>

        {/* Distance Indicator if available */}
        {facility.distance !== null && facility.distance !== undefined && (
          <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300">
            {facility.distance} km
          </span>
        )}
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 my-3">
        <MapPin className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
        <span>{facility.address} ({facility.city})</span>
      </div>

      {/* Data Source & Verification Status Badge (Critical Rule) */}
      <div className="my-3">
        {facility.verified ? (
          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-1 rounded-lg">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
            <span className="truncate">Verified: {facility.source}</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 px-2.5 py-1 rounded-lg">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>Demo Data – Verify Before Visiting</span>
          </div>
        )}
      </div>

      {/* Action Buttons: Call & Directions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-xs">
          {facility.phone && (
            <a 
              href={`tel:${facility.phone}`}
              className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-sky-600 font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{facility.phone}</span>
            </a>
          )}
          {facility.website && (
            <a 
              href={facility.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400 hover:underline font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Website</span>
            </a>
          )}
        </div>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Open in Maps</span>
        </a>
      </div>
    </div>
  );
};

export default FacilityCard;
