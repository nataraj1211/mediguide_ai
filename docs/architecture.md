# MediGuide AI – System Architecture Documentation

## 1. System Overview
**MediGuide AI** is an AI-assisted healthcare information triage and verified hospital/doctor discovery full-stack web application. It allows patients to enter symptom descriptions through text or upload photographs of visible skin rashes/minor abrasions to receive safe educational guidance, first-aid advice, warning signs, and matched medical specialists.

> **CRITICAL MEDICAL DISCLAIMER:** MediGuide AI is an educational and informational tool. It does not provide medical diagnoses or prescription medications. All generated summaries adhere to medical safety boundaries.

---

## 2. High-Level Architecture Diagram

```
+-------------------------------------------------------------------------+
|                              CLIENT LAYER                               |
|   React.js 19 + Vite + Tailwind CSS + Lucide Icons + React-Leaflet Map  |
+------------------------------------+------------------------------------+
                                     |
                                     | HTTP REST & Multipart Form Data
                                     v
+------------------------------------+------------------------------------+
|                             BACKEND API                                 |
|                       Node.js + Express.js 4                            |
+------------------------------------+------------------------------------+
  |               |                  |                  |               |
  v               v                  v                  v               v
Auth Middleware Upload (Multer)  AI Service Engine  Maps Service  Admin Service
  |                                  |                  |               |
  |                        +---------+---------+        |               |
  |                        | Emergency Filter  |        |               |
  |                        | Clinical Triage   |        |               |
  |                        | Gemini/Mock Layer |        |               |
  |                        +-------------------+        |               |
  |                                                     |               |
  +-----------------------------------+-----------------+---------------+
                                      |
                                      v
+-------------------------------------+-----------------------------------+
|                           PERSISTENCE LAYER                             |
|          Supabase PostgreSQL (Profiles, SymptomChecks, Facilities)      |
|           + Resilient In-Memory / File Fallback for Offline Demos       |
+-------------------------------------------------------------------------+
```

---

## 3. Component Breakdown

### 3.1 Frontend (`/frontend`)
- **Framework:** React 19 with Vite 8.
- **Styling:** Tailwind CSS with custom healthcare tokens and light/dark theme toggle.
- **Routing:** React Router v7 with protected routes for user dashboard, consultation history, profile, and admin panel.
- **Map System:** Leaflet / OpenStreetMap with custom SVG hospital and user markers, popups, and direct Google Maps navigation deep links.
- **State Management:** React Context API (`AuthContext`, `ThemeContext`).

### 3.2 Backend (`/backend`)
- **Server:** Express.js REST API with structured controllers, services, middleware, and route handlers.
- **Uploads:** Multer with file type validation (`image/jpeg`, `image/png`, `image/webp`) and 5MB size ceiling.
- **Error Handling:** Centralized user-safe error middleware that shields database credentials, stack traces, and internal secrets from clients.
- **Authentication:** Dual-mode JWT verification + Supabase Auth token integration.

### 3.3 Clinical AI & Triage Service (`/backend/src/services/aiService.js`)
1. **Red-Flag Emergency Detection:** Pre-screens user input for critical terms (e.g., chest pain, shortness of breath, severe bleeding, stroke symptoms). If matched, it immediately triggers the Emergency Protocol (India 112 / 108) and suppresses home remedies.
2. **Weighted Clinical Knowledge Engine:** Categorizes common non-emergency symptom patterns (headache, fever, skin rash, stomach discomfort, eye irritation, dental pain, minor injury, joint strain) using weighted anatomical scoring.
3. **Multi-modal Visual Assessment:** Inspects uploaded skin photos using safe educational wording ("This image may be consistent with...").
4. **Safety Enforcement:** Enforces non-definitive language ("may be associated with", "consider consulting a physician") and suppresses prescription drug advice.

### 3.4 Maps & Healthcare Discovery Service (`/backend/src/services/mapsService.js`)
- Computes real-world distances between patient coordinates and medical centers using the **Haversine Formula**.
- Filters facilities across Tamil Nadu (Dindigul, Madurai, Coimbatore, Chennai, Trichy) by facility type (Hospital, Clinic, Emergency, Pharmacy) and specialty.
- Implements strict data integrity: verified facilities display official government registry sources (Directorate of Medical Education), while simulated test records are explicitly tagged **"DEMO DATA – NOT VERIFIED"**.

---

## 4. Database Design & Security

### Row Level Security (RLS)
The PostgreSQL database enforces RLS policies:
- `profiles`: Users can only read/edit their personal profiles; admins can view all.
- `symptom_checks`: Private to the owning user ID.
- `health_results`: Inherits privacy from parent symptom check.
- `healthcare_facilities`: Publicly readable; writable strictly by administrators.
- `emergency_resources`: Publicly readable.
- `feedback`: Publicly insertable; reviewable strictly by administrators.
