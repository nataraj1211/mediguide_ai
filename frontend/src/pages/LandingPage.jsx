import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  MessageSquareText, 
  Camera, 
  HeartHandshake, 
  UserCheck, 
  MapPin, 
  AlertOctagon, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  PhoneCall, 
  Stethoscope, 
  Sparkles 
} from 'lucide-react';
import DisclaimerBanner from '../components/DisclaimerBanner';

export const LandingPage = () => {
  const featureCards = [
    {
      icon: MessageSquareText,
      title: 'Text Symptom Analysis',
      description: 'Describe what you are experiencing in plain language to receive safe, structured educational health information and possible symptom categories.',
      link: '/symptom-checker',
      badge: 'Interactive'
    },
    {
      icon: Camera,
      title: 'Image-Based Health Info',
      description: 'Upload a clear photograph of a visible skin condition or minor injury for supportive visual educational categorization and care guidance.',
      link: '/image-checker',
      badge: 'Visual Triage'
    },
    {
      icon: HeartHandshake,
      title: 'General Self-Care Guidance',
      description: 'Access evidence-based home comfort measures, safe first-aid protocols, and things to avoid while monitoring your health.',
      link: '/symptom-checker',
      badge: 'Safe First Aid'
    },
    {
      icon: UserCheck,
      title: 'Specialist Recommendations',
      description: 'Discover which clinical specialty (Dermatology, General Medicine, Ophthalmology, Orthopedics, Dentistry) matches your symptoms.',
      link: '/nearby-healthcare',
      badge: 'Care Pathways'
    },
    {
      icon: MapPin,
      title: 'Nearby Hospital Finder',
      description: 'Locate verified medical centers, district government hospitals, and clinics across Dindigul, Madurai, Coimbatore, and Tamil Nadu.',
      link: '/nearby-healthcare',
      badge: 'Live Map'
    },
    {
      icon: AlertOctagon,
      title: 'Emergency Warning System',
      description: 'Instant automated detection of critical red-flag symptoms with direct connection to national emergency services (112 in India).',
      link: '/emergency',
      badge: '24/7 Hotline'
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Input Your Health Query',
      desc: 'Enter your symptoms in plain text or upload a photo of a visible skin rash or minor cut.'
    },
    {
      step: '02',
      title: 'AI Analysis & Triage',
      desc: 'Our clinical rule engine evaluates possible categories, red-flag indicators, and severity levels.'
    },
    {
      step: '03',
      title: 'Educational Guidance',
      desc: 'Receive safe self-care recommendations, warning signs, and suggested levels of care.'
    },
    {
      step: '04',
      title: 'Nearby Care Discovery',
      desc: 'Explore matching hospitals, clinics, and specialists with map directions and verified contact details.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200 dark:border-slate-800">
        <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-sky-400 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-teal-400 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Smart Clinical Guidance & Hospital Discovery</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Your Smart Healthcare Information{' '}
              <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-sky-700 dark:from-sky-400 dark:to-teal-300 bg-clip-text text-transparent">
                Assistant
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Describe your symptoms or upload an image to receive safe general health information, self-care guidance, and find nearby verified healthcare facilities.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/symptom-checker"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-base shadow-lg shadow-sky-600/25 hover:shadow-sky-600/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Stethoscope className="w-5 h-5" />
                <span>Check Symptoms</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                to="/nearby-healthcare"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-sky-500 text-slate-800 dark:text-slate-200 font-semibold text-base shadow-sm hover:shadow-md transition-all"
              >
                <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <span>Find Nearby Hospitals</span>
              </Link>
            </div>

            {/* Mobile upload shortcut */}
            <div className="mt-4">
              <Link 
                to="/image-checker" 
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Have a skin rash or minor cut? Upload an image here</span>
              </Link>
            </div>

            {/* Prominent Medical Disclaimer */}
            <div className="mt-10 text-left">
              <DisclaimerBanner />
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Guidance Spotlight Banner */}
      <section className="bg-red-50 dark:bg-red-950/30 border-y border-red-200 dark:border-red-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-red-900 dark:text-red-200 text-sm">
              <div className="p-2 bg-red-600 text-white rounded-lg animate-pulse shrink-0">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold uppercase tracking-wider block">Experiencing an emergency?</span>
                <span className="text-xs text-red-700 dark:text-red-300">
                  Chest pain, difficulty breathing, severe bleeding, or stroke symptoms require immediate medical intervention.
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="tel:112"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 112 (India)</span>
              </a>
              <Link
                to="/emergency"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 font-semibold text-xs hover:bg-red-100 transition-colors"
              >
                <span>Emergency Guide</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Designed for Patient Safety and Fast Information
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-base">
            MediGuide AI bridges patient understanding with clinical pathways through safe educational analysis and verified local healthcare directories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-sky-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <Link
                    to={feat.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Explore feature</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-sky-600 dark:text-sky-400">
              Clear & Transparent Flow
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              How MediGuide AI Works
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
              Empowering users with safe, step-by-step triage from symptom description to qualified medical discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((wf, i) => (
              <div
                key={i}
                className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="text-3xl font-black text-sky-600/30 dark:text-sky-400/20 mb-3">
                  {wf.step}
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {wf.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {wf.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Focus Spotlight: Dindigul, Madurai, Coimbatore */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-sky-900 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-semibold mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>Verified Hospital Directory</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Covering Government & Medical Centers in Tamil Nadu
            </h3>
            <p className="mt-3 text-sky-100 text-sm leading-relaxed">
              Explore official verified medical institutions such as Government Rajaji Hospital Madurai, Dindigul Government Medical College Hospital, and Coimbatore Medical College Hospital with authentic contact numbers and maps.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/nearby-healthcare?city=Dindigul"
                className="px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold text-xs hover:bg-sky-50 transition-colors"
              >
                Dindigul Facilities
              </Link>
              <Link
                to="/nearby-healthcare?city=Madurai"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
              >
                Madurai Facilities
              </Link>
              <Link
                to="/nearby-healthcare?city=Coimbatore"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
              >
                Coimbatore Facilities
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
