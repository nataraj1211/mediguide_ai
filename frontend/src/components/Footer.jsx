import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, PhoneCall, ShieldAlert, Heart, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Prominent Mandatory Medical Disclaimer Banner */}
        <div className="bg-slate-800/80 border border-amber-500/30 rounded-2xl p-6 mb-12 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl shrink-0 mt-0.5">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-amber-400 font-bold text-base mb-1 tracking-wide">
                MANDATORY MEDICAL DISCLAIMER
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Disclaimer: MediGuide AI is an informational and educational tool. It does not provide a medical diagnosis, treatment plan, or professional medical advice. AI-generated information may be incomplete or inaccurate. Always consult a qualified healthcare professional for medical concerns. In an emergency, contact emergency services or visit the nearest emergency department.
              </p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">MediGuide AI</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Safe, educational AI-assisted healthcare information triage and verified hospital discovery across Dindigul, Madurai, Coimbatore, and beyond.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-950/50 border border-red-800/50 text-red-300 text-xs font-semibold">
              <PhoneCall className="w-3.5 h-3.5 text-red-400" />
              <span>National Emergency: 112 (India)</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Healthcare Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/symptom-checker" className="hover:text-sky-400 transition-colors">
                  Symptom Checker (Text)
                </Link>
              </li>
              <li>
                <Link to="/image-checker" className="hover:text-sky-400 transition-colors">
                  Skin & Injury Image Review
                </Link>
              </li>
              <li>
                <Link to="/nearby-healthcare" className="hover:text-sky-400 transition-colors">
                  Find Hospitals & Clinics
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-red-400 hover:text-red-300 transition-colors font-medium">
                  Emergency Guidance (112)
                </Link>
              </li>
            </ul>
          </div>

          {/* Coverage Areas */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Hospital Locations
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/nearby-healthcare?city=Dindigul" className="hover:text-sky-400 transition-colors">
                  Dindigul Facilities
                </Link>
              </li>
              <li>
                <Link to="/nearby-healthcare?city=Madurai" className="hover:text-sky-400 transition-colors">
                  Madurai Medical Centers
                </Link>
              </li>
              <li>
                <Link to="/nearby-healthcare?city=Coimbatore" className="hover:text-sky-400 transition-colors">
                  Coimbatore Hospitals
                </Link>
              </li>
              <li>
                <Link to="/nearby-healthcare" className="hover:text-sky-400 transition-colors">
                  Interactive Tamil Nadu Map
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Transparency
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-sky-400 transition-colors">
                  About MediGuide AI
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="hover:text-sky-400 transition-colors">
                  Send User Feedback
                </Link>
              </li>
              <li>
                <span className="text-slate-500 text-xs">
                  Academic & Educational Healthcare Assistant Prototype (MCA College Project Demonstration).
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} MediGuide AI. Designed with patient safety and educational clarity.</p>
          <div className="flex items-center gap-6">
            <span>Ambulance: 108</span>
            <span>Health Helpline: 1075</span>
            <span>Emergency: 112</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
