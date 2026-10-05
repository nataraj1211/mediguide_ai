# MediGuide AI – Smart Symptom & Healthcare Assistant

> **MCA Final Project & Academic Healthcare Demonstration**  
> A modern, responsive full-stack web application for safe, educational healthcare information triage and verified hospital/doctor discovery across Dindigul, Madurai, Coimbatore, and Tamil Nadu.

---

## ⚠️ Important Mandatory Medical Disclaimer

> **Disclaimer:** MediGuide AI is strictly an informational and educational tool. It does **NOT** provide a medical diagnosis, treatment plan, or professional medical advice. It does **NOT** prescribe prescription medications or provide medication dosages. AI-generated information may be incomplete or inaccurate and is not a substitute for a qualified healthcare professional. In a medical emergency, immediately contact national emergency services (**112 in India**) or visit the nearest emergency department.

---

## 🌟 Key Features

1. **Text Symptom Analysis & Clinical Triage**
   - Natural language symptom input with optional duration, severity, and regional selection.
   - Structured educational output: possible symptom category, general explanation ("What It May Mean"), common causes, basic self-care, things to avoid, warning signs, and suggested level of care (`LOW`, `MODERATE`, `HIGH`, `EMERGENCY`).
   - 1-click test presets for instant viva demonstrations (Headache, Mild Fever, Skin Rash, Stomach Discomfort, Red-Flag Emergency).

2. **Visible Skin & Minor Injury Image Assessment**
   - Upload JPG, JPEG, PNG, or take a photo via mobile camera.
   - Strict privacy safeguards: clear notices warning against uploading personally identifying information.
   - Non-certainty visual phrasing: *"This image may be consistent with..."* rather than definitive claims.

3. **Critical Red-Flag Emergency Detection System**
   - Automated detection of acute emergency keywords (chest pain, shortness of breath, severe bleeding, stroke signs, anaphylaxis).
   - High-visibility Red Emergency Alert banner that suppresses home remedies and directs users to call **112 / 108**.

4. **Specialist & Hospital Recommendation Engine**
   - Maps symptoms directly to clinical specialties (Dermatology, General Medicine, Ophthalmology, Orthopedics, Dentistry, Emergency).
   - Real-world distance calculations via the **Haversine formula**.
   - Verified public hospitals (Government Rajaji Hospital Madurai, Dindigul Government Medical College Hospital, Coimbatore Medical College Hospital) with official government registry sources.
   - Strict transparency: non-verified development entries are clearly labelled **"DEMO DATA – NOT VERIFIED"**.

5. **Interactive Location Map**
   - Interactive OpenStreetMap via Leaflet with custom hospital markers, user geolocation marker, and popups.
   - 1-click "Open in Maps" directions button linking to Google Maps navigation.

6. **Authentication & User Dashboard**
   - Supabase Auth integration + JWT fallback.
   - Role-based access control (`user` vs `admin`).
   - Protected user dashboard with recent consultations and profile management.
   - Private consultation history with view and delete capabilities protected by Row Level Security (RLS).

7. **Administrator Management Console**
   - Real-time overview metrics: total users, symptom checks, image analyses, emergency alerts, healthcare facilities.
   - Facility CRUD (Add, Edit, Delete, Toggle Verified status).
   - User feedback logs and rating analytics.

8. **Inclusive, Responsive UX & Dark Mode**
   - Mobile-first responsive design tested on desktop, tablet, and mobile screens.
   - Dynamic Dark / Light theme toggle.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 8, Tailwind CSS, React Router v7, Lucide Icons, Leaflet, OpenStreetMap |
| **Backend** | Node.js, Express.js 4, Multer, CORS, Morgan, Dotenv |
| **Database** | Supabase PostgreSQL, Row Level Security (RLS), UUID extensions, Foreign Keys |
| **AI Layer** | Multi-tiered Clinical Rule Engine + optional Google Gemini / OpenAI API integration |
| **Maps** | Leaflet with OpenStreetMap tiles (no paid API key required) + Google Maps directions deep links |

---

## 📁 Project Directory Structure

```
/ai health care
├── frontend/                     # React + Vite + Tailwind Client
│   ├── src/
│   │   ├── components/           # Navbar, Footer, MapView, FacilityCard, DisclaimerBanner
│   │   ├── contexts/             # AuthContext, ThemeContext
│   │   ├── layouts/              # MainLayout with scroll-to-top
│   │   ├── pages/                # Landing, SymptomChecker, ImageChecker, Result, Nearby, etc.
│   │   ├── services/             # API client methods
│   │   └── App.jsx               # Router & routes configuration
│   ├── index.html                # SEO metadata & viewport settings
│   └── vite.config.js            # Tailwind v4 plugin & API proxy
├── backend/                      # Node.js + Express API Server
│   ├── src/
│   │   ├── config/               # Database client & environment variables
│   │   ├── controllers/          # Auth, Symptoms, Images, Healthcare, History, Admin
│   │   ├── middleware/           # Auth, Upload, Safe Error Handler
│   │   ├── routes/               # Modular Express API routers
│   │   ├── services/             # Clinical AI triage engine, Maps distance service
│   │   └── server.js             # Server bootstrap & middleware setup
│   ├── tests/
│   │   └── api.test.js           # 10 automated clinical safety & unit tests
│   └── uploads/                  # Secure image uploads directory
├── database/
│   ├── schema.sql                # Complete Supabase PostgreSQL schema with RLS & indexes
│   └── seed.sql                  # Verified Tamil Nadu hospitals & labeled demo clinics
├── docs/
│   ├── architecture.md           # System architecture & component design
│   └── api.md                    # REST API endpoints & payloads specification
├── .env.example                  # Environment configuration template
├── start-dev.js                  # Single command runner for backend & frontend
└── package.json                  # Root scripts & dependencies
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18 or higher recommended, tested on Node v24)
- **npm** (v9 or higher)

### 1. Installation
Clone or navigate to the project directory and run:

```bash
# In the project root directory
npm run dev
```

> **Note:** The root script automatically launches both the **Backend API (port 5000)** and the **Frontend Web App (port 5173)** simultaneously!

Alternatively, you can run them in separate terminal windows:

```bash
# Terminal 1 - Backend Server
cd backend
npm install
npm run dev

# Terminal 2 - Frontend Client
cd frontend
npm install
npm run dev
```

Access the web application in your browser at:  
👉 **http://localhost:5173**

---

## 🧪 Quick 1-Click Demo Accounts (For Viva & Reviewers)

On the **Login page (`/login`)**, click the instant demo buttons or use:

| Role | Email | Password | Access Privileges |
|---|---|---|---|
| **Demo User** | `user@mediguide.ai` | `DemoUser123!` | Symptom checks, image uploads, private history, feedback |
| **Demo Admin** | `admin@mediguide.ai` | `DemoAdmin123!` | Full Admin Console (`/admin`), facility CRUD, verification toggle |

---

## 🔬 Automated Testing & Clinical Verification

MediGuide AI includes an automated test suite verifying all 8 clinical cases specified in medical safety protocols:

1. **Headache:** Tension/mild headache educational care and eye strain rest advice.
2. **Mild Fever:** Febrile guidance, hydration, and 103°F warning sign check.
3. **Skin Irritation:** Rash non-scratch self-care and dermatology specialist matching.
4. **Minor Visible Injury:** Superficial cut hygiene and sterile dressing instructions.
5. **Stomach Discomfort:** Mild indigestion and ORS hydration advice.
6. **Eye Discomfort:** Conjunctival redness and ophthalmology referral.
7. **Dental Discomfort:** Tooth sensitivity, warm saltwater rinse, and dental referral.
8. **Emergency Scenario:** Critical detection (chest pain + dyspnea) -> **112 Hotline**.
9. **Safety Policy:** Non-definitive phrasing enforcement (no prescription drugs).
10. **Maps & Distance:** Haversine great-circle distance algorithm validation.

To run the automated tests:

```bash
cd backend
npm test
```

Expected output:
```
========================================================
Running MediGuide AI Clinical Safety & API Test Suite
========================================================

✅ [PASS] Case 1: Tension/Mild Headache Educational Guidance
✅ [PASS] Case 2: Mild Febrile Symptom / Viral Prodrome
✅ [PASS] Case 3: Skin Rash / Irritation (Example Case from Specification)
✅ [PASS] Case 4: Minor Superficial Cut / Scrape First Aid
✅ [PASS] Case 5: Stomach Discomfort / Mild Indigestion
✅ [PASS] Case 6: Eye Discomfort / Conjunctival Redness
✅ [PASS] Case 7: Dental / Tooth Sensitivity Discomfort
✅ [PASS] Case 8: Critical Emergency Scenario Detection (Chest Pain & Shortness of Breath)
✅ [PASS] Safety Policy: No Definitive Diagnosis or Prescriptions in AI Output
✅ [PASS] Location & Maps: Haversine Distance Calculation & Search

========================================================
Test Results: 10/10 Passed (100%)
========================================================
```

---

## 🗄️ Supabase PostgreSQL Setup (Optional / Production)

MediGuide AI is designed to run seamlessly **out-of-the-box** using its resilient built-in local store. To connect a live Supabase database:

1. Create a project at [supabase.com](https://supabase.com).
2. In the Supabase SQL Editor, copy and execute [`database/schema.sql`](./database/schema.sql).
3. Next, copy and execute [`database/seed.sql`](./database/seed.sql) to populate verified public hospitals and emergency resources.
4. Create a `.env` file in the root directory (based on `.env.example`):
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   ```
5. Restart the server. MediGuide AI will now synchronize with your remote Supabase cloud PostgreSQL!

---

## 🔒 Security & Privacy Implementation

- **No Public API Key Leaks:** All API keys and secrets reside strictly in server environment variables.
- **Input Sanitization:** Multi-layered input validation across text lengths and image mime types.
- **Shielded Error Handling:** The server never leaks SQL errors, stack traces, or internal server paths to the frontend.
- **Row Level Security (RLS):** Supabase database policies ensure patients can strictly access their own private medical consultation logs.

---

## 🎓 Academic Demonstration Highlights (MCA Project)

- **Comprehensive End-to-End User Flow:** Landing Page ➔ Authentication ➔ Dashboard ➔ Text/Image Input ➔ Clinical Rule Triage ➔ Result Page with Specialty Triage ➔ Interactive Map Discovery.
- **Zero External Dependencies Required to Run:** Built-in Leaflet OpenStreetMap requires no paid Google Maps billings; integrated clinical rule engine functions with or without an OpenAI/Gemini API key.
- **Responsible AI Design:** Adheres to WHO and global health informatics guidelines on medical AI transparency, patient safety boundaries, and red-flag emergency screening.

---

## 📄 License
This project is developed for educational and academic evaluation purposes under the ISC License.
