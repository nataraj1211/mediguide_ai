import React from 'react';
import { 
  PhoneCall, 
  AlertOctagon, 
  ShieldAlert, 
  Activity, 
  HeartCrack, 
  Wind, 
  Brain, 
  Flame, 
  Building2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmergencyPage = () => {
  const emergencyServices = [
    {
      name: 'National Emergency Response (All Emergencies)',
      number: '112',
      description: 'Single unified national emergency response service across India for Police, Medical Ambulance, and Fire.',
      priority: true
    },
    {
      name: 'Medical Ambulance Emergency Service',
      number: '108',
      description: 'Free 24x7 emergency medical transport, ambulance dispatch, and trauma care response.',
      priority: true
    },
    {
      name: 'National Health Helpline',
      number: '1075',
      description: 'Toll-free national health inquiry and public health emergency helpline by MoHFW.',
      priority: false
    },
    {
      name: 'Tele-MANAS Mental Health Helpline',
      number: '14416',
      description: '24/7 free, confidential psychological support and crisis tele-counseling across India.',
      priority: false
    },
    {
      name: 'Police Emergency Response',
      number: '100',
      description: 'Immediate police protection and road traffic emergency assistance.',
      priority: false
    },
    {
      name: 'Fire & Rescue Services',
      number: '101',
      description: 'Emergency fire response, rescue operations, and hazardous material incidents.',
      priority: false
    }
  ];

  const criticalRedFlags = [
    {
      icon: HeartCrack,
      title: 'Chest Pain or Pressure',
      desc: 'Severe, crushing heaviness in the chest, radiating to left arm, neck, or jaw.'
    },
    {
      icon: Wind,
      title: 'Shortness of Breath',
      desc: 'Severe struggle to breathe, gasping, blue lips, or inability to speak in full sentences.'
    },
    {
      icon: Brain,
      title: 'Suspected Stroke Symptoms (F.A.S.T)',
      desc: 'Facial droop, arm weakness, slurred speech, sudden loss of balance, or confusion.'
    },
    {
      icon: AlertOctagon,
      title: 'Severe Uncontrolled Bleeding',
      desc: 'Active, heavy bleeding that does not stop with 10 minutes of direct firm pressure.'
    },
    {
      icon: ShieldAlert,
      title: 'Severe Anaphylactic Reaction',
      desc: 'Swelling of lips, tongue, or throat, hives all over, with throat tightness or breathing distress.'
    },
    {
      icon: Activity,
      title: 'Loss of Consciousness / Seizure',
      desc: 'Fainting, unresponsive state, convulsions, or severe head trauma with confusion.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Urgent Header Banner */}
        <div className="bg-red-600 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
                <AlertOctagon className="w-4 h-4" />
                <span>Life-Threatening Emergency Notice</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Emergency Medical Guidance
              </h1>
              <p className="mt-2 text-red-100 text-sm sm:text-base max-w-xl">
                If you or someone around you is in immediate danger or experiencing severe acute symptoms, please call emergency services immediately.
              </p>
            </div>

            <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto">
              <a
                href="tel:112"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-red-700 font-black text-lg shadow-xl hover:bg-red-50 transition-all transform hover:scale-105"
              >
                <PhoneCall className="w-6 h-6 text-red-600 animate-bounce" />
                <span>CALL 112 (INDIA)</span>
              </a>
              <a
                href="tel:108"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-red-800 text-white font-bold text-sm hover:bg-red-900 transition-colors"
              >
                <span>Call 108 (Ambulance)</span>
              </a>
            </div>
          </div>
        </div>

        {/* What to do in an Emergency */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <span>Immediate Emergency Protocol</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">1. Stay Calm & Call 112</span>
              <p className="text-slate-600 dark:text-slate-400">
                Dial 112 or 108 immediately. State your exact location, landmark, and the patient's condition clearly.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">2. Keep Patient Safe</span>
              <p className="text-slate-600 dark:text-slate-400">
                Place the person in a comfortable position. If breathing is difficult, sitting upright is usually best.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">3. Avoid Unprescribed Meds</span>
              <p className="text-slate-600 dark:text-slate-400">
                Do not offer solid food, drinks, or unverified medications while awaiting paramedic assistance.
              </p>
            </div>
          </div>
        </div>

        {/* Critical Red-Flag Warning Indicators */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Recognize Critical Red-Flag Symptoms
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Do not wait or rely on an AI assistant if you experience any of these time-critical warnings:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {criticalRedFlags.map((flag, idx) => {
              const Icon = flag.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-red-100 dark:border-red-950/60 bg-red-50/50 dark:bg-red-950/20"
                >
                  <div className="p-2 w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 mb-2 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-red-950 dark:text-red-200 mb-1">
                    {flag.title}
                  </h4>
                  <p className="text-[11px] text-red-900/80 dark:text-red-300/80 leading-relaxed">
                    {flag.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Emergency Contact Directory (India) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Official Emergency Hotlines (India)
          </h2>

          <div className="space-y-3">
            {emergencyServices.map((srv, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 gap-3"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{srv.name}</span>
                    {srv.priority && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400">
                        Primary
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {srv.description}
                  </p>
                </div>

                <a
                  href={`tel:${srv.number}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shrink-0 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call {srv.number}</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Find Emergency Hospital Departments */}
        <div className="text-center pt-4">
          <Link
            to="/nearby-healthcare?specialty=Emergency"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:underline"
          >
            <Building2 className="w-4 h-4" />
            <span>View 24x7 Emergency Departments in Dindigul, Madurai & Coimbatore</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default EmergencyPage;
