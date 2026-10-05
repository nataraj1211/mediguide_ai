-- ====================================================================
-- MediGuide AI – Seed Data
-- ====================================================================

-- 1. Emergency Resources (India Official Numbers)
INSERT INTO emergency_resources (country, service_name, phone_number, description) VALUES
('India', 'National Emergency Number', '112', 'Single emergency response number across India for Police, Fire, and Ambulance.'),
('India', 'Medical Ambulance Emergency', '108', 'Free 24x7 emergency medical transport and immediate trauma response service.'),
('India', 'National Health Helpline', '1075', 'Toll-free national health inquiry and public health emergency helpline.'),
('India', 'Tele-MANAS Mental Health', '14416', 'Tele Mental Health Assistance and Networking Across States – 24/7 counseling support.'),
('India', 'Disaster Management Services', '1078', 'National Disaster Management Authority (NDMA) emergency control helpline.')
ON CONFLICT DO NOTHING;

-- 2. Verified Public Healthcare Facilities (Tamil Nadu: Dindigul, Madurai, Coimbatore)
-- Real Government Medical Colleges & District Hospitals with public verified sources
INSERT INTO healthcare_facilities (id, name, facility_type, specialty, address, city, latitude, longitude, phone, website, rating, verified, source) VALUES
(
    'a1111111-1111-1111-1111-111111111111',
    'Government Rajaji Hospital & Madurai Medical College',
    'Hospital',
    'General Medicine',
    'Panagal Road, Shenoy Nagar, Madurai, Tamil Nadu 625020',
    'Madurai',
    9.9287000,
    78.1368000,
    '0452-2532535',
    'http://www.mdumc.ac.in',
    NULL,
    TRUE,
    'Directorate of Medical Education, Government of Tamil Nadu (Official Portal)'
),
(
    'a2222222-2222-2222-2222-222222222222',
    'Dindigul Government Medical College Hospital',
    'Hospital',
    'Emergency',
    'Nallampatti Road, Adiyanuthu, Dindigul, Tamil Nadu 624003',
    'Dindigul',
    10.3673000,
    77.9803000,
    '0451-2460020',
    'https://dindigul.nic.in/departments/health/',
    NULL,
    TRUE,
    'National Health Mission & District Administration Portal Dindigul'
),
(
    'a3333333-3333-3333-3333-333333333333',
    'Coimbatore Medical College Hospital (CMCH)',
    'Hospital',
    'General Medicine',
    'Trichy Road, Gopalapuram, Coimbatore, Tamil Nadu 641018',
    'Coimbatore',
    11.0016000,
    76.9673000,
    '0422-2301393',
    'http://www.cmc.ac.in',
    NULL,
    TRUE,
    'Tamil Nadu State Health System Project (Official Directory)'
),
(
    'a4444444-4444-4444-4444-444444444444',
    'Aravind Eye Hospital - Madurai',
    'Hospital',
    'Ophthalmology',
    '1, Anna Nagar, Madurai, Tamil Nadu 625020',
    'Madurai',
    9.9248000,
    78.1456000,
    '0452-4356100',
    'https://aravind.org',
    NULL,
    TRUE,
    'Aravind Eye Care System Official Public Registry'
),
(
    'a5555555-5555-5555-5555-555555555555',
    'Government Headquarters Hospital Dindigul',
    'Hospital',
    'Emergency',
    'Hospital Road, Near Clock Tower, Dindigul, Tamil Nadu 624001',
    'Dindigul',
    10.3624000,
    77.9695000,
    '0451-2423300',
    'https://dindigul.nic.in',
    NULL,
    TRUE,
    'Tamil Nadu Health Department Official Listing'
);

-- 3. Clearly Labelled Demo Healthcare Facilities (Specialties: Dermatology, Dentistry, Orthopedics, Pharmacy)
-- Note: As per safety specification, these are clearly flagged as DEMO DATA with non-misleading indicators
INSERT INTO healthcare_facilities (id, name, facility_type, specialty, address, city, latitude, longitude, phone, website, rating, verified, source) VALUES
(
    'b1111111-1111-1111-1111-111111111111',
    'Skin Care & Dermatology Center [Demo Entry]',
    'Clinic',
    'Dermatology',
    'Demo Lane, Near Collectorate Road, Dindigul, Tamil Nadu',
    'Dindigul',
    10.3610000,
    77.9750000,
    '0451-0000000',
    '',
    NULL,
    FALSE,
    'Demo Data – Verify Before Visiting'
),
(
    'b2222222-2222-2222-2222-222222222222',
    'Madurai Skin & Allergy Wellness Clinic [Demo Entry]',
    'Clinic',
    'Dermatology',
    'Demo Avenue, KK Nagar, Madurai, Tamil Nadu',
    'Madurai',
    9.9320000,
    78.1480000,
    '0452-0000000',
    '',
    NULL,
    FALSE,
    'Demo Data – Verify Before Visiting'
),
(
    'b3333333-3333-3333-3333-333333333333',
    'Coimbatore Advanced Orthopedic Center [Demo Entry]',
    'Clinic',
    'Orthopedics',
    'Demo Road, RS Puram, Coimbatore, Tamil Nadu',
    'Coimbatore',
    11.0080000,
    76.9530000,
    '0422-0000000',
    '',
    NULL,
    FALSE,
    'Demo Data – Verify Before Visiting'
),
(
    'b4444444-4444-4444-4444-444444444444',
    'City Care Dental & Oral Health Clinic [Demo Entry]',
    'Clinic',
    'Dentistry',
    'Demo Street, Simmakkal, Madurai, Tamil Nadu',
    'Madurai',
    9.9280000,
    78.1210000,
    '0452-0000000',
    '',
    NULL,
    FALSE,
    'Demo Data – Verify Before Visiting'
),
(
    'b5555555-5555-5555-5555-555555555555',
    '24x7 Community Medicals & Pharmacy [Demo Entry]',
    'Pharmacy',
    'General Medicine',
    'Demo Junction, Palani Road, Dindigul, Tamil Nadu',
    'Dindigul',
    10.3690000,
    77.9620000,
    '0451-0000000',
    '',
    NULL,
    FALSE,
    'Demo Data – Verify Before Visiting'
),
(
    'b6666666-6666-6666-6666-666666666666',
    'Coimbatore MindCare & Counseling [Demo Entry]',
    'Clinic',
    'Psychiatry / Psychology',
    'Demo Square, Gandhipuram, Coimbatore, Tamil Nadu',
    'Coimbatore',
    11.0180000,
    76.9690000,
    '0422-0000000',
    '',
    NULL,
    FALSE,
    'Demo Data – Verify Before Visiting'
);
