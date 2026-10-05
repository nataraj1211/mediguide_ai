# MediGuide AI – RESTful API Specification

Base URL: `http://localhost:5000/api`

---

## 1. Authentication Endpoints

### Register User
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "fullName": "Ramesh Kumar",
    "email": "ramesh@example.com",
    "password": "password123",
    "phone": "+91 9876543210"
  }
  ```
- **Response (201):**
  ```json
  {
    "success": true,
    "message": "Account registered successfully.",
    "token": "jwt_token_string",
    "user": { "id": "uuid", "email": "ramesh@example.com", "fullName": "Ramesh Kumar", "role": "user" }
  }
  ```

### Login User
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "ramesh@example.com",
    "password": "password123"
  }
  ```
- **Response (200):**
  ```json
  {
    "success": true,
    "token": "jwt_token_string",
    "user": { "id": "uuid", "email": "ramesh@example.com", "fullName": "Ramesh Kumar", "role": "user" }
  }
  ```

### Get Profile
- **GET** `/api/auth/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response (200):** User profile object.

---

## 2. Clinical Symptom Analysis

### Analyze Text Symptoms
- **POST** `/api/symptoms/analyze`
- **Headers:** `Authorization: Bearer <token>` (Optional)
- **Body:**
  ```json
  {
    "symptomText": "I have an itchy red skin rash.",
    "ageGroup": "Adult (18-64)",
    "duration": "2 days",
    "severity": "Mild",
    "location": "Dindigul",
    "latitude": 10.3673,
    "longitude": 77.9803
  }
  ```
- **Response (200):**
  ```json
  {
    "success": true,
    "analysisId": "uuid",
    "data": {
      "inputSummary": "I have an itchy red skin rash.",
      "possibleCategory": "Skin Irritation / Allergic-Type Rash",
      "generalExplanation": "Several factors can cause an itchy red rash...",
      "possibleCauses": ["Contact dermatitis", "Mild allergic reaction"],
      "selfCare": ["Avoid identified irritants", "Wash with lukewarm water"],
      "thingsToAvoid": ["Avoid scratching"],
      "warningSigns": ["Rapidly spreading rash", "Facial swelling"],
      "recommendedLevelOfCare": "MODERATE",
      "healthcareRecommendation": "Consider consulting a qualified dermatologist...",
      "relevantSpecialty": "Dermatology",
      "isEmergency": false,
      "disclaimer": "Disclaimer: MediGuide AI is an informational tool...",
      "nearbyFacilities": [ ... ]
    }
  }
  ```

---

## 3. Image-Based Assessment

### Analyze Skin / Injury Photograph
- **POST** `/api/images/analyze`
- **Headers:** `Content-Type: multipart/form-data`
- **Form Data:**
  - `image`: File (JPG, PNG, WebP, max 5MB)
  - `notes`: String (Optional)
  - `duration`: String (Optional)
  - `location`: String (Optional)
- **Response (200):** Structured clinical guidance with image URL and specialty matching.

---

## 4. Healthcare Facilities & Emergency

### Get Nearby Facilities
- **GET** `/api/healthcare/nearby?latitude=10.36&longitude=77.98&city=Dindigul&specialty=Dermatology`
- **Response (200):** List of facilities with Haversine distance calculations and verification statuses.

### Search Facilities
- **GET** `/api/healthcare/search?q=Rajaji&city=Madurai`
- **Response (200):** Filtered list of matching medical centers.

### Get Emergency Resources
- **GET** `/api/healthcare/emergency`
- **Response (200):** National emergency numbers (112, 108, 1075, 14416).

---

## 5. Consultation History

- **GET** `/api/history` – Retrieves user's private consultation history.
- **GET** `/api/history/:id` – Retrieves detailed result for a consultation.
- **DELETE** `/api/history/:id` – Deletes a consultation record.

---

## 6. Feedback & Administration

- **POST** `/api/feedback` – Submit user rating (1-5) and feedback comment.
- **GET** `/api/feedback` – List submitted feedback logs.
- **GET** `/api/admin/stats` – Administrator overview metrics.
- **POST** `/api/admin/facilities` – Add new facility record.
- **PUT** `/api/admin/facilities/:id` – Update facility record.
- **DELETE** `/api/admin/facilities/:id` – Delete facility record.
- **PATCH** `/api/admin/facilities/:id/toggle-verify` – Toggle verified status and source badge.
