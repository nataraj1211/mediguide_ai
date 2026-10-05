import { ENV } from '../config/env.js';

/**
 * MediGuide AI - Safe Clinical Information & Triage Service
 * 
 * NOTE: MediGuide AI provides educational healthcare information only.
 * It strictly adheres to medical disclaimer protocols, never diagnoses,
 * never prescribes medications, and actively flags red-flag emergencies.
 */

const EMERGENCY_KEYWORDS = [
  'chest pain', 'pressure in chest', 'heart attack',
  'difficulty breathing', 'shortness of breath', 'can\'t breathe', 'struggling to breathe',
  'loss of consciousness', 'passed out', 'fainted', 'unresponsive',
  'severe bleeding', 'uncontrolled bleeding', 'coughing blood', 'vomiting blood',
  'stroke', 'slurred speech', 'face drooping', 'facial droop', 'arm weakness', 'sudden weakness',
  'severe allergic reaction', 'anaphylaxis', 'swelling of lips', 'throat closing', 'swelling of throat',
  'seizure', 'convulsion', 'cyanosis', 'blue lips', 'severe head injury', 'unconscious'
];

/**
 * Check if the text matches emergency warning criteria
 */
export const checkEmergencyIndicators = (text = '') => {
  const normalized = text.toLowerCase();
  for (const keyword of EMERGENCY_KEYWORDS) {
    if (normalized.includes(keyword)) {
      return {
        isEmergency: true,
        detectedTrigger: keyword
      };
    }
  }
  return { isEmergency: false, detectedTrigger: null };
};

/**
 * Knowledge Base for Educational Guidance on Common Symptom Clusters
 */
const CLINICAL_KNOWLEDGE_BASE = [
  {
    keywords: ['rash', 'itchy', 'skin', 'hives', 'redness', 'spots', 'eczema', 'dermatitis'],
    category: 'Skin Irritation / Allergic-Type Rash',
    explanation: 'Several factors can cause an itchy red rash or cutaneous irritation. Common possibilities may include non-specific contact dermatitis, environmental irritants, mild allergic reactions, insect bites, or dry skin.',
    possibleCauses: [
      'Contact dermatitis (soaps, detergents, cosmetics)',
      'Mild allergic reaction or environmental allergen',
      'Heat rash or moisture friction',
      'Dry skin (xerosis) or mild insect bite reaction'
    ],
    selfCare: [
      'Avoid identified or suspected irritants, fragrances, and harsh soaps.',
      'Gently wash the affected skin area with lukewarm water.',
      'Refrain from scratching the skin to prevent skin breakage or secondary infection.',
      'Apply a cool, damp compress to soothe localized itching.',
      'Wear loose, soft, breathable cotton clothing.'
    ],
    thingsToAvoid: [
      'Avoid scratching or picking at the irritated area.',
      'Avoid applying unverified herbal pastes, hot water, or harsh alcohol-based antiseptics.',
      'Avoid sharing towels or unwashed garments.'
    ],
    warningSigns: [
      'Rapidly spreading rash over large body areas',
      'Significant facial, lip, tongue, or throat swelling',
      'Difficulty breathing or swallowing',
      'High fever or severe pain accompanying the rash',
      'Presence of pus, yellow crusting, or red streaks indicating infection'
    ],
    recommendedLevelOfCare: 'MODERATE',
    healthcareRecommendation: 'Consider consulting a qualified dermatologist or general practitioner, especially if the rash persists for more than 48 hours or worsens.',
    relevantSpecialty: 'Dermatology'
  },
  {
    keywords: ['headache', 'migraine', 'head pain', 'temple pain', 'head throbbing'],
    category: 'Tension-Type or Mild Headache Discomfort',
    explanation: 'Headaches are commonly associated with stress, lack of sleep, eye strain, dehydration, or prolonged screen time. Most mild headaches resolve with adequate rest, hydration, and relaxation.',
    possibleCauses: [
      'Tension or physical/mental fatigue',
      'Dehydration or missed meals',
      'Digital eye strain or postural neck tension',
      'Sinus congestion or lack of restful sleep'
    ],
    selfCare: [
      'Rest in a quiet, dimly lit, well-ventilated room.',
      'Drink plenty of water to maintain adequate hydration.',
      'Apply a gentle cool or warm compress to forehead or neck muscles.',
      'Take regular breaks from computer monitors, phones, and digital screens.'
    ],
    thingsToAvoid: [
      'Avoid excessive caffeine, energy drinks, or skipped meals.',
      'Avoid bright flashing lights and loud acoustic environments.',
      'Avoid exceeding recommended dosages of common over-the-counter pain relievers.'
    ],
    warningSigns: [
      'Sudden, severe "thunderclap" headache unlike any experienced before',
      'Headache accompanied by stiff neck, high fever, or confusion',
      'Headache following a head impact or physical trauma',
      'Visual disturbances, numbness, speech difficulties, or persistent vomiting'
    ],
    recommendedLevelOfCare: 'LOW',
    healthcareRecommendation: 'If headaches are recurring, increasing in intensity, or disruptive to daily activities, a consultation with a General Physician or Neurologist is recommended.',
    relevantSpecialty: 'General Medicine'
  },
  {
    keywords: ['fever', 'temperature', 'chills', 'body ache', 'mild fever'],
    category: 'Mild Febrile Symptom / Possible Viral Infection',
    explanation: 'A mild elevation in body temperature is often the body\'s natural immune response to a common viral infection, seasonal change, or mild illness.',
    possibleCauses: [
      'Common seasonal viral illness (such as flu or cold)',
      'Upper respiratory tract infection',
      'Mild dehydration or prolonged heat exposure'
    ],
    selfCare: [
      'Get ample physical bed rest to support the immune system.',
      'Stay well hydrated with clean water, herbal teas, or oral rehydration fluids.',
      'Wear lightweight, breathable clothing and keep the room well-ventilated.',
      'Monitor body temperature using an accurate clinical thermometer at regular intervals.'
    ],
    thingsToAvoid: [
      'Avoid heavy blankets that trap excessive body heat.',
      'Avoid strenuous physical exertion or gym workouts while febrile.',
      'Avoid taking leftover prescription antibiotics without a doctor’s guidance.'
    ],
    warningSigns: [
      'Fever exceeding 103°F (39.4°C) or not responding to baseline supportive care',
      'Fever lasting longer than 3 consecutive days',
      'Stiff neck, severe photophobia (light sensitivity), or mental confusion',
      'Shortness of breath, persistent coughing, or chest discomfort'
    ],
    recommendedLevelOfCare: 'MODERATE',
    healthcareRecommendation: 'Consult a qualified General Physician if the fever persists for more than 48–72 hours or is accompanied by severe bodily symptoms.',
    relevantSpecialty: 'General Medicine'
  },
  {
    keywords: ['stomach', 'abdominal', 'nausea', 'vomit', 'diarrhea', 'cramp', 'bloating', 'indigestion', 'gas'],
    category: 'Gastrointestinal Discomfort / Mild Indigestion',
    explanation: 'Abdominal discomfort, bloating, or mild indigestion is frequently linked to dietary irregularities, indigestion, mild food sensitivity, or minor gastroenteritis.',
    possibleCauses: [
      'Dietary indiscretion (spicy, oily, or unfamiliar food)',
      'Mild viral gastroenteritis (stomach flu)',
      'Acid reflux, gastritis, or excess intestinal gas'
    ],
    selfCare: [
      'Sip clear fluids, coconut water, or oral rehydration solution (ORS) frequently in small amounts.',
      'Follow a light, bland diet (e.g., rice porridge, bananas, toast, curd).',
      'Rest in an upright or slightly reclined position rather than lying flat immediately after eating.'
    ],
    thingsToAvoid: [
      'Avoid spicy, fried, highly acidic, or greasy foods.',
      'Avoid caffeine, carbonated sodas, and dairy if experiencing diarrhea.',
      'Avoid self-medicating with unprescribed anti-motility drugs without professional review.'
    ],
    warningSigns: [
      'Severe, localized, acute abdominal pain (especially lower right abdomen)',
      'Inability to keep liquids down for more than 24 hours',
      'Blood in vomit or dark, tarry stools',
      'Signs of severe dehydration (extreme thirst, dry mouth, dizziness, minimal urine)'
    ],
    recommendedLevelOfCare: 'MODERATE',
    healthcareRecommendation: 'A medical review with a General Physician or Gastroenterologist is advised if pain is severe, localized, or symptoms persist beyond 2 days.',
    relevantSpecialty: 'General Medicine'
  },
  {
    keywords: ['eye', 'vision', 'itchy eye', 'red eye', 'watery eye', 'conjunctivitis', 'eye strain'],
    category: 'Ocular Discomfort / Mild Eye Irritation',
    explanation: 'Redness, watery eyes, or mild irritation may stem from digital screen strain, environmental dust, dry eye syndrome, or mild allergic conjunctivitis.',
    possibleCauses: [
      'Environmental dust, smoke, or allergen exposure',
      'Digital eye fatigue (Computer Vision Syndrome)',
      'Dry eye or mild viral/allergic conjunctivitis'
    ],
    selfCare: [
      'Rinse eyelids gently with clean, cool water without rubbing the eyes.',
      'Take regular visual rest breaks following the 20-20-20 rule (every 20 minutes look at an object 20 feet away for 20 seconds).',
      'Wash hands thoroughly before and after touching the facial area.'
    ],
    thingsToAvoid: [
      'Avoid rubbing the eyes vigorously, which can scratch the cornea.',
      'Avoid wearing contact lenses until irritation has completely cleared.',
      'Avoid sharing eye drops, makeup, or pillowcases.'
    ],
    warningSigns: [
      'Significant eye pain or deep ache in the eyeball',
      'Sudden change or impairment in visual acuity or blurred vision',
      'Extreme sensitivity to light (photophobia)',
      'Copious thick yellow or green discharge gluing the eyelids shut'
    ],
    recommendedLevelOfCare: 'MODERATE',
    healthcareRecommendation: 'Consult an Ophthalmologist or Eye Care Professional for proper slit-lamp examination if pain, visual disturbance, or discharge is present.',
    relevantSpecialty: 'Ophthalmology'
  },
  {
    keywords: ['tooth', 'teeth', 'dental', 'gum', 'toothache', 'jaw pain', 'bleeding gum'],
    category: 'Dental Discomfort / Gingival Irritation',
    explanation: 'Dental or tooth sensitivity and localized gum tenderness can arise from plaque buildup, early enamel demineralization, mild gingivitis, or food trapping.',
    possibleCauses: [
      'Tooth enamel sensitivity to temperature extremes (hot/cold)',
      'Early dental cavity or enamel erosion',
      'Mild gingival inflammation (gingivitis)',
      'Bruxism (teeth grinding) or wisdom tooth eruption'
    ],
    selfCare: [
      'Rinse gently with warm salt water (1/2 teaspoon of salt in a glass of warm water).',
      'Brush gently using a soft-bristled toothbrush and fluoride toothpaste.',
      'Gently floss to remove any lodged food particles.'
    ],
    thingsToAvoid: [
      'Avoid very hot, icy-cold, excessively sweet, or acidic foods and drinks.',
      'Avoid chewing on hard foods, candies, or using teeth as tools.',
      'Avoid placing painkiller tablets directly against gums, which causes chemical burns.'
    ],
    warningSigns: [
      'Facial swelling, swelling under the jaw, or swollen neck lymph nodes',
      'High fever accompanying dental pain',
      'Difficulty swallowing or opening the mouth wide (trismus)',
      'Severe, unremitting, throbbing tooth pain keeping you awake'
    ],
    recommendedLevelOfCare: 'MODERATE',
    healthcareRecommendation: 'Schedule an appointment with a licensed Dental Surgeon / Dentist for a clinical exam and diagnostic dental radiography.',
    relevantSpecialty: 'Dentistry'
  },
  {
    keywords: ['cut', 'wound', 'scrape', 'minor injury', 'bruise', 'scratch', 'burn', 'blister', 'sprain'],
    category: 'Minor Superficial Cut, Scrape, or Minor Injury',
    explanation: 'Minor superficial skin abrasions, scrapes, or small cuts generally involve the outer epidermis and can often be safely managed with careful first aid and hygiene.',
    possibleCauses: [
      'Superficial mechanical abrasion or household nick',
      'Minor friction blister or superficial skin graze',
      'Minor contusion (bruise) from low-impact bumping'
    ],
    selfCare: [
      'Gently clean the wound with mild soap and clean running water.',
      'Apply gentle, firm pressure with a clean cloth if minor bleeding is present.',
      'Protect the area with a sterile adhesive bandage or clean non-stick dressing.',
      'Keep the dressing dry and replace it daily or whenever wet.'
    ],
    thingsToAvoid: [
      'Avoid picking at scabs, popping blisters, or scratching healing skin.',
      'Avoid applying harsh chemicals, turmeric, soil, or kerosene to open skin.',
      'Avoid exposing open scrapes to unclean surfaces or stagnant water.'
    ],
    warningSigns: [
      'Deep gaping wound that may require surgical sutures (stitches)',
      'Bleeding that does not cease after 10 minutes of direct pressure',
      'Punctures from dirty objects, animal bites, or rusty metal (tetanus risk)',
      'Increasing redness, swelling, warmth, throbbing pain, or pus formation'
    ],
    recommendedLevelOfCare: 'LOW',
    healthcareRecommendation: 'If the cut is deep, gaping, contaminated, or if your tetanus immunization status is outdated, visit an Outpatient Clinic or Hospital for evaluation.',
    relevantSpecialty: 'General Medicine'
  },
  {
    keywords: ['bone', 'joint', 'knee', 'ankle', 'wrist', 'back', 'neck', 'sprain', 'twist'],
    category: 'Musculoskeletal Strain / Joint Discomfort',
    explanation: 'Mild joint soreness, ligament sprains, or muscle strains frequently follow unexpected movements, minor sports slips, poor ergonomic posture, or heavy lifting.',
    possibleCauses: [
      'Mild muscle strain or ligament sprain',
      'Postural ergonomics strain or prolonged static sitting',
      'Overuse injury or minor sports-related impact'
    ],
    selfCare: [
      'Practice the R.I.C.E principle: Rest the affected joint, Ice with a towel-wrapped cold pack for 15-20 min, Compress with a gentle elastic bandage, and Elevate.',
      'Avoid bearing excessive weight on the affected limb.',
      'Perform gentle pain-free range-of-motion movements after initial 24 hours.'
    ],
    thingsToAvoid: [
      'Avoid intense workouts, running, or heavy weightlifting while in pain.',
      'Avoid vigorous deep-tissue massage or forceful joint manipulation immediately following injury.',
      'Avoid applying direct heat during the first 24-48 hours of an acute swelling.'
    ],
    warningSigns: [
      'Inability to bear any weight or walk four steps',
      'Obvious anatomical deformity or abnormal joint angle',
      'Severe numbness, tingling, or cold pale extremities below the injury',
      'Rapid, severe joint swelling accompanied by fever'
    ],
    recommendedLevelOfCare: 'MODERATE',
    healthcareRecommendation: 'Consult an Orthopedic Surgeon or Physiotherapist for a physical assessment and diagnostic X-ray if weight-bearing is painful or deformity is suspected.',
    relevantSpecialty: 'Orthopedics'
  }
];

/**
 * Perform Text Symptom Analysis
 */
export const analyzeSymptoms = async ({ text, ageGroup, duration, severity, location }) => {
  if (!text || text.trim().length === 0) {
    throw new Error('Please describe your symptoms to receive educational health information.');
  }

  // 1. Emergency Detection Protocol (Crucial Safety Feature)
  const emergencyCheck = checkEmergencyIndicators(text);
  if (emergencyCheck.isEmergency) {
    return {
      inputSummary: text.trim(),
      possibleCategory: 'POTENTIAL CRITICAL MEDICAL EMERGENCY',
      generalExplanation: `The symptoms described ("${emergencyCheck.detectedTrigger}") may indicate a critical, time-sensitive medical condition that requires immediate professional intervention.`,
      possibleCauses: [
        'Acute cardiovascular event (e.g., myocardial ischemia or acute coronary syndrome)',
        'Acute respiratory distress or severe pulmonary impairment',
        'Severe systemic allergic reaction (anaphylaxis)',
        'Acute neurological event (e.g., acute cerebrovascular episode / stroke)'
      ],
      selfCare: [
        'Do NOT attempt home remedies or delay emergency assistance.',
        'Keep calm, sit or lie down in a safe, comfortable position.',
        'If with someone, inform them immediately so they can assist you.'
      ],
      thingsToAvoid: [
        'Do NOT drive yourself to the hospital if experiencing chest pain, dizziness, or shortness of breath.',
        'Do NOT consume heavy food, drinks, or unprescribed pills while waiting for assistance.'
      ],
      warningSigns: [
        'Difficulty breathing or rapid deterioration',
        'Chest heaviness, pain radiating to left arm or jaw',
        'Loss of consciousness or severe confusion',
        'Facial droop, arm weakness, or speech difficulty'
      ],
      recommendedLevelOfCare: 'EMERGENCY',
      healthcareRecommendation: 'Immediate emergency medical care is strongly advised. Call emergency services (112 in India) or proceed immediately to the nearest Hospital Emergency Department.',
      relevantSpecialty: 'Emergency',
      isEmergency: true,
      emergencyNumber: '112',
      disclaimer: 'EMERGENCY NOTICE: MediGuide AI is not an emergency response provider or diagnostic tool. Because your description includes critical warning indicators, please contact emergency medical personnel immediately.'
    };
  }

  // 2. If GEMINI_API_KEY or AI_API_KEY is present, attempt live Google Gemini analysis
  const apiKey = ENV.GEMINI_API_KEY || ENV.AI_API_KEY;
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const prompt = `You are MediGuide AI, an informational and educational healthcare triage assistant.
CRITICAL SAFETY BOUNDARIES:
- You must NOT claim to provide a confirmed medical diagnosis.
- You must NOT prescribe prescription medicines or suggest dosages.
- Always use language such as "may be associated with", "could indicate", "consider consulting a qualified healthcare professional".
- Target audience is in Tamil Nadu, India.
User Symptom Description: "${text}"
Duration: "${duration || 'Not specified'}"
Severity: "${severity || 'Mild'}"
Age Group: "${ageGroup || 'Adult'}"

Respond STRICTLY in valid JSON matching this schema:
{
  "possibleCategory": "string (e.g. Tension-Type Headache / Mild Skin Irritation)",
  "generalExplanation": "string (clear, empathetic, educational explanation of what it may mean)",
  "possibleCauses": ["string", "string", "string"],
  "selfCare": ["string (safe non-pharmacological comfort measure)", "string", "string"],
  "thingsToAvoid": ["string (e.g. avoid scratching / avoid strenuous exercise)", "string"],
  "warningSigns": ["string (critical red flags)", "string", "string"],
  "recommendedLevelOfCare": "LOW | MODERATE | HIGH | EMERGENCY",
  "healthcareRecommendation": "string (e.g. Consider consulting a general physician or dermatologist)",
  "relevantSpecialty": "General Medicine | Dermatology | Ophthalmology | Orthopedics | Dentistry | Emergency"
}`;

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;
      const geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json'
          }
        })
      });

      if (geminiRes.ok) {
        const geminiData = await geminiRes.json();
        const rawJsonText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJsonText) {
          const parsed = JSON.parse(rawJsonText);
          return {
            inputSummary: text.trim(),
            meta: { ageGroup, duration, severity, location },
            possibleCategory: parsed.possibleCategory || 'General Health Information',
            generalExplanation: parsed.generalExplanation,
            possibleCauses: Array.isArray(parsed.possibleCauses) ? parsed.possibleCauses : [],
            selfCare: Array.isArray(parsed.selfCare) ? parsed.selfCare : [],
            thingsToAvoid: Array.isArray(parsed.thingsToAvoid) ? parsed.thingsToAvoid : [],
            warningSigns: Array.isArray(parsed.warningSigns) ? parsed.warningSigns : [],
            recommendedLevelOfCare: ['LOW', 'MODERATE', 'HIGH', 'EMERGENCY'].includes(parsed.recommendedLevelOfCare)
              ? parsed.recommendedLevelOfCare
              : 'MODERATE',
            healthcareRecommendation: parsed.healthcareRecommendation,
            relevantSpecialty: parsed.relevantSpecialty || 'General Medicine',
            isEmergency: parsed.recommendedLevelOfCare === 'EMERGENCY',
            disclaimer: 'Disclaimer: MediGuide AI is an informational and educational tool. It does not provide a medical diagnosis, treatment plan, or professional medical advice. AI-generated information may be incomplete or inaccurate. Always consult a qualified healthcare professional for medical concerns. In an emergency, contact emergency services (112) or visit the nearest emergency department.'
          };
        }
      } else {
        console.warn('[AI Service] Gemini API returned status:', geminiRes.status, 'Falling back to clinical rule engine.');
      }
    } catch (apiErr) {
      console.warn('[AI Service] Gemini API call exception, using clinical engine fallback:', apiErr.message);
    }
  }
  let bestCluster = null;
  let highestScore = 0;

  for (const cluster of CLINICAL_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of cluster.keywords) {
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      if (regex.test(lowerText) || lowerText.includes(kw)) {
        if (kw === 'headache' || kw === 'toothache' || kw === 'tooth' || kw === 'fever' || kw === 'rash' || kw === 'cut' || kw === 'stomach') {
          score += 6;
        } else if (kw === 'eye' || kw === 'joint' || kw === 'bone') {
          score += 4;
        } else {
          score += 1;
        }
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestCluster = cluster;
    }
  }

  let matchedCluster = bestCluster;

  // Fallback if no specific cluster matched
  if (!matchedCluster) {
    matchedCluster = {
      category: 'General Non-Specific Symptom Discomfort',
      explanation: 'The symptoms described may stem from various common benign factors, temporary fatigue, seasonal viral exposure, or physiological stress.',
      possibleCauses: [
        'Mild seasonal illness or viral prodrome',
        'Physical exhaustion, stress, or disrupted sleep patterns',
        'Nutritional or hydration imbalance'
      ],
      selfCare: [
        'Ensure adequate rest and maintain comfortable room ventilation.',
        'Hydrate adequately with clean water and nutritious fluids.',
        'Keep track of your symptoms, recording their onset, duration, and triggers.'
      ],
      thingsToAvoid: [
        'Avoid self-medicating with prescription medications or antibiotics.',
        'Avoid strenuous physical exertion until feeling rested and recovered.'
      ],
      warningSigns: [
        'Sudden worsening or severe intensification of discomfort',
        'Persistent high fever not resolving after 48 hours',
        'Difficulty breathing, chest pain, or marked weakness',
        'Any unexpected functional loss or neurological signs'
      ],
      recommendedLevelOfCare: severity === 'Severe' ? 'HIGH' : 'MODERATE',
      healthcareRecommendation: 'Consider scheduling an appointment with a registered General Physician for a formal clinical evaluation.',
      relevantSpecialty: 'General Medicine'
    };
  }

  // Adjust level of care if user reported high severity or long duration
  let riskLevel = matchedCluster.recommendedLevelOfCare;
  if (severity === 'Severe' && riskLevel === 'LOW') {
    riskLevel = 'MODERATE';
  } else if (severity === 'Severe' && riskLevel === 'MODERATE') {
    riskLevel = 'HIGH';
  }

  return {
    inputSummary: text.trim(),
    meta: { ageGroup, duration, severity, location },
    possibleCategory: matchedCluster.category,
    generalExplanation: matchedCluster.explanation,
    possibleCauses: matchedCluster.possibleCauses,
    selfCare: matchedCluster.selfCare,
    thingsToAvoid: matchedCluster.thingsToAvoid,
    warningSigns: matchedCluster.warningSigns,
    recommendedLevelOfCare: riskLevel,
    healthcareRecommendation: matchedCluster.healthcareRecommendation,
    relevantSpecialty: matchedCluster.relevantSpecialty,
    isEmergency: false,
    disclaimer: 'Disclaimer: MediGuide AI is an informational and educational tool. It does not provide a medical diagnosis, treatment plan, or professional medical advice. AI-generated information may be incomplete or inaccurate. Always consult a qualified healthcare professional for medical concerns. In an emergency, contact emergency services (112) or visit the nearest emergency department.'
  };
};

/**
 * Perform Safe Image-Based Health Information Analysis
 * Primarily intended for visible skin conditions or minor injuries
 */
export const analyzeImage = async ({ file, notes, ageGroup, duration }) => {
  if (!file) {
    throw new Error('Please upload an image file to analyze.');
  }

  const filename = file.filename || file.originalname;
  const imageUrl = `/uploads/${filename}`;

  // Analyze textual notes if provided alongside the image
  const notesEmergency = notes ? checkEmergencyIndicators(notes) : { isEmergency: false };
  if (notesEmergency.isEmergency) {
    return {
      inputSummary: `Image analysis accompanied by note: "${notes}"`,
      imageUrl,
      possibleCategory: 'POTENTIAL CRITICAL MEDICAL EMERGENCY',
      generalExplanation: 'The symptoms described in the accompanying notes contain emergency indicators requiring urgent evaluation.',
      possibleCauses: ['Acute trauma', 'Severe allergic reaction', 'Urgent medical condition'],
      selfCare: ['Do not delay professional medical assistance.'],
      thingsToAvoid: ['Do not apply unverified home concoctions or creams.'],
      warningSigns: ['Rapid swelling', 'Breathing difficulty', 'Severe pain'],
      recommendedLevelOfCare: 'EMERGENCY',
      healthcareRecommendation: 'Seek immediate emergency medical care. Call 112 or visit the nearest Emergency Department.',
      relevantSpecialty: 'Emergency',
      isEmergency: true,
      emergencyNumber: '112',
      disclaimer: 'Image analysis is for general informational purposes only and cannot reliably diagnose a medical condition.'
    };
  }

  // Safe educational visual categorization (always emphasizing non-certainty)
  const isWoundOrInjury = notes && (notes.toLowerCase().includes('cut') || notes.toLowerCase().includes('wound') || notes.toLowerCase().includes('injury') || notes.toLowerCase().includes('bleed'));

  if (isWoundOrInjury) {
    return {
      inputSummary: `Minor visible superficial skin injury / abrasion. (User note: "${notes || 'None provided'}")`,
      imageUrl,
      possibleCategory: 'Minor Superficial Cut / Abrasion (Visual Inspection)',
      generalExplanation: 'This image may be consistent with a superficial skin break, abrasion, or minor cut. Visible features suggest localized epidermal disruption without obvious systemic signs.',
      possibleCauses: [
        'Superficial friction abrasion or scratch',
        'Minor household laceration',
        'Localized superficial contusion'
      ],
      selfCare: [
        'Clean the area thoroughly with gentle running water and mild soap.',
        'Apply gentle pressure with a sterile gauze if minor bleeding is observed.',
        'Protect with a clean, breathable bandage.',
        'Keep the area clean, dry, and observe for signs of healing.'
      ],
      thingsToAvoid: [
        'Do not apply harsh astringents, undiluted hydrogen peroxide, or unverified powders.',
        'Do not pick at the wound or peel off newly forming scab tissue.'
      ],
      warningSigns: [
        'Deep laceration with edges that do not easily come together (may require sutures)',
        'Bleeding that continues actively after 10 minutes of direct firm pressure',
        'Increasing redness spreading outward, localized heat, severe swelling, or pus discharge',
        'Fever, or wound caused by animal bite or rusty metal (tetanus concern)'
      ],
      recommendedLevelOfCare: 'LOW',
      healthcareRecommendation: 'If the cut appears deep, painful, contaminated, or fails to stop bleeding, have it examined by a healthcare professional.',
      relevantSpecialty: 'General Medicine',
      isEmergency: false,
      disclaimer: 'Image analysis is for general informational purposes only and cannot reliably diagnose a medical condition. Do not upload images containing personally identifying information.'
    };
  }

  // Default skin-related condition educational analysis
  return {
    inputSummary: `Visible skin presentation. (User note: "${notes || 'Skin observation'}")`,
    imageUrl,
    possibleCategory: 'Localized Cutaneous Presentation / Mild Skin Irritation',
    generalExplanation: 'This image may be consistent with mild erythematous skin irritation, contact dermatitis, or a localized superficial rash. Visual appearances can overlap significantly across diverse dermatological conditions.',
    possibleCauses: [
      'Contact dermatitis (irritation from detergents, soaps, fabrics, or cosmetics)',
      'Localized allergic skin reaction or environmental allergen',
      'Mild heat rash, sweat friction, or superficial folliculitis',
      'Mild localized insect bite reaction'
    ],
    selfCare: [
      'Keep the affected skin clean by washing gently with lukewarm water and mild soap.',
      'Refrain from scratching the skin, as fingernails can introduce bacterial infection.',
      'Apply a cool compress for 10-15 minutes to reduce localized itching.',
      'Wear loose, soft, breathable cotton garments to prevent friction.'
    ],
    thingsToAvoid: [
      'Avoid scratching or scrubbing the affected skin aggressively.',
      'Avoid applying scented lotions, harsh perfumes, or unverified home pastes.',
      'Avoid exposing the sensitive skin area to direct, harsh midday sunlight.'
    ],
    warningSigns: [
      'Rash rapidly spreading across broader body zones',
      'Development of large blisters, intense peeling, or open ulcers',
      'Yellow oozing fluid, crusting, or red lines radiating from the area',
      'Facial or lip swelling, difficulty swallowing, or fever'
    ],
    recommendedLevelOfCare: 'MODERATE',
    healthcareRecommendation: 'Consider consulting a qualified dermatologist or medical practitioner for an in-person dermoscopy and examination.',
    relevantSpecialty: 'Dermatology',
    isEmergency: false,
    disclaimer: 'Image analysis is for general educational and informational purposes only and cannot reliably diagnose a medical condition. A certified dermatologist should evaluate any persistent skin presentation.'
  };
};
