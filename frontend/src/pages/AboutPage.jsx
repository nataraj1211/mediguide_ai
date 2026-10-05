import React from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Cpu, 
  Lock, 
  AlertTriangle, 
  Stethoscope, 
  Database, 
  Map, 
  BookOpen, 
  HeartHandshake 
} from 'lucide-react';
import DisclaimerBanner from '../components/DisclaimerBanner';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 mb-3 shadow-xs">
            <Activity className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            About MediGuide AI
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Smart, safe healthcare educational guidance and verified medical facility discovery designed for community health literacy.
          </p>
        </div>

        {/* Mandatory Medical Disclaimer Banner */}
        <DisclaimerBanner />

        {/* Core Mission & Purpose */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-600" />
            <span>Project Purpose</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            MediGuide AI was created as an educational healthcare assistant prototype to help individuals understand everyday symptoms, learn proper supportive first-aid, identify warning signs, and locate accredited hospitals and clinics near their hometowns (such as Dindigul, Madurai, Coimbatore, and across Tamil Nadu).
          </p>
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 text-xs leading-relaxed font-medium">
            <strong>Important Safety Principle:</strong> MediGuide AI does NOT provide medical diagnoses and does NOT prescribe medications. AI-generated health information cannot replace an in-person physical examination by a registered physician.
          </div>
        </div>

        {/* How It Works & Clinical Safety Engine */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-teal-600" />
            <span>Architecture & Safe AI Logic</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block text-sm">
                1. Multi-tier Emergency Screening
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Before providing educational summaries, the system filters for red-flag acute indicators (chest pain, severe dyspnea, stroke signs, traumatic bleeding). If detected, it immediately provides the national emergency number (112) rather than home remedies.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block text-sm">
                2. Visual Triage with Uncertainty Awareness
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Uploaded images of rashes or cuts are handled with strict non-certainty phrasing ("This image may be consistent with...") to ensure patients understand that visual skin presentations must be evaluated clinically.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block text-sm">
                3. Specialty-Guided Hospital Discovery
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The AI maps symptom categories directly to relevant medical departments (Dermatology, General Medicine, Ophthalmology, Orthopedics, Dentistry, Emergency) so patients know which specialist to consult.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-bold text-slate-900 dark:text-white block text-sm">
                4. Strict Data Integrity Standard
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                We never fabricate fake reviews or doctor ratings. Verified hospitals cite official government directories (such as the Directorate of Medical Education), while development records are explicitly labelled "Demo Data – Verify Before Visiting".
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack Grid */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-600" />
            <span>Technology Stack</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block">React.js & Vite</span>
              <span className="text-slate-500">Fast responsive UI</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block">Tailwind CSS</span>
              <span className="text-slate-500">Accessible modern styling</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block">Node & Express</span>
              <span className="text-slate-500">RESTful microservices</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block">Supabase & PostgreSQL</span>
              <span className="text-slate-500">Row Level Security</span>
            </div>
          </div>
        </div>

        {/* Privacy & Ethical Standards */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-600" />
            <span>Patient Privacy & Confidentiality</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            MediGuide AI does not sell or distribute personal health information. Health consultation history is tied privately to user accounts through Row Level Security (RLS) policies and can be deleted by the user at any time.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
