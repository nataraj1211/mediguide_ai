import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Stethoscope, Camera, MapPin, PhoneCall } from 'lucide-react';

export const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Symptoms', path: '/symptom-checker', icon: Stethoscope },
    { label: 'Photo AI', path: '/image-checker', icon: Camera },
    { label: 'Hospitals', path: '/nearby-healthcare', icon: MapPin },
    { label: '112 Help', path: '/emergency', icon: PhoneCall, isEmergency: true }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-2xl safe-area-pb">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          if (item.isEmergency) {
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center justify-center py-1 px-2 group"
              >
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-500/30 group-active:scale-95 transition-transform animate-pulse">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-red-600 dark:text-red-400 mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-colors active:scale-95 ${
                active
                  ? 'text-sky-600 dark:text-sky-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-[10px] mt-0.5 tracking-tight ${active ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
