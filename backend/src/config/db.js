import { createClient } from '@supabase/supabase-js';
import { ENV } from './env.js';
import crypto from 'crypto';

let supabaseClient = null;

if (ENV.SUPABASE_URL && ENV.SUPABASE_ANON_KEY) {
  try {
    supabaseClient = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);
    console.log('[Database] Supabase client initialized.');
  } catch (err) {
    console.warn('[Database] Failed to initialize Supabase client:', err.message);
  }
} else {
  console.log('[Database] Supabase credentials not set. Operating in local demo store mode.');
}

// In-Memory / Local Store with Initial Seed Data
const initialFacilities = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    name: 'Government Rajaji Hospital & Madurai Medical College',
    facility_type: 'Hospital',
    specialty: 'General Medicine',
    address: 'Panagal Road, Shenoy Nagar, Madurai, Tamil Nadu 625020',
    city: 'Madurai',
    latitude: 9.9287,
    longitude: 78.1368,
    phone: '0452-2532535',
    website: 'http://www.mdumc.ac.in',
    rating: null,
    verified: true,
    source: 'Directorate of Medical Education, Government of Tamil Nadu (Official Portal)',
    created_at: new Date().toISOString()
  },
  {
    id: 'a2222222-2222-2222-2222-222222222222',
    name: 'Dindigul Government Medical College Hospital',
    facility_type: 'Hospital',
    specialty: 'Emergency',
    address: 'Nallampatti Road, Adiyanuthu, Dindigul, Tamil Nadu 624003',
    city: 'Dindigul',
    latitude: 10.3673,
    longitude: 77.9803,
    phone: '0451-2460020',
    website: 'https://dindigul.nic.in/departments/health/',
    rating: null,
    verified: true,
    source: 'National Health Mission & District Administration Portal Dindigul',
    created_at: new Date().toISOString()
  },
  {
    id: 'a3333333-3333-3333-3333-333333333333',
    name: 'Coimbatore Medical College Hospital (CMCH)',
    facility_type: 'Hospital',
    specialty: 'General Medicine',
    address: 'Trichy Road, Gopalapuram, Coimbatore, Tamil Nadu 641018',
    city: 'Coimbatore',
    latitude: 11.0016,
    longitude: 76.9673,
    phone: '0422-2301393',
    website: 'http://www.cmc.ac.in',
    rating: null,
    verified: true,
    source: 'Tamil Nadu State Health System Project (Official Directory)',
    created_at: new Date().toISOString()
  },
  {
    id: 'a4444444-4444-4444-4444-444444444444',
    name: 'Aravind Eye Hospital - Madurai',
    facility_type: 'Hospital',
    specialty: 'Ophthalmology',
    address: '1, Anna Nagar, Madurai, Tamil Nadu 625020',
    city: 'Madurai',
    latitude: 9.9248,
    longitude: 78.1456,
    phone: '0452-4356100',
    website: 'https://aravind.org',
    rating: null,
    verified: true,
    source: 'Aravind Eye Care System Official Public Registry',
    created_at: new Date().toISOString()
  },
  {
    id: 'a5555555-5555-5555-5555-555555555555',
    name: 'Government Headquarters Hospital Dindigul',
    facility_type: 'Hospital',
    specialty: 'Emergency',
    address: 'Hospital Road, Near Clock Tower, Dindigul, Tamil Nadu 624001',
    city: 'Dindigul',
    latitude: 10.3624,
    longitude: 77.9695,
    phone: '0451-2423300',
    website: 'https://dindigul.nic.in',
    rating: null,
    verified: true,
    source: 'Tamil Nadu Health Department Official Listing',
    created_at: new Date().toISOString()
  },
  {
    id: 'b1111111-1111-1111-1111-111111111111',
    name: 'Skin Care & Dermatology Center [Demo Entry]',
    facility_type: 'Clinic',
    specialty: 'Dermatology',
    address: 'Demo Lane, Near Collectorate Road, Dindigul, Tamil Nadu',
    city: 'Dindigul',
    latitude: 10.3610,
    longitude: 77.9750,
    phone: '0451-0000000',
    website: '',
    rating: null,
    verified: false,
    source: 'Demo Data – Verify Before Visiting',
    created_at: new Date().toISOString()
  },
  {
    id: 'b2222222-2222-2222-2222-222222222222',
    name: 'Madurai Skin & Allergy Wellness Clinic [Demo Entry]',
    facility_type: 'Clinic',
    specialty: 'Dermatology',
    address: 'Demo Avenue, KK Nagar, Madurai, Tamil Nadu',
    city: 'Madurai',
    latitude: 9.9320,
    longitude: 78.1480,
    phone: '0452-0000000',
    website: '',
    rating: null,
    verified: false,
    source: 'Demo Data – Verify Before Visiting',
    created_at: new Date().toISOString()
  },
  {
    id: 'b3333333-3333-3333-3333-333333333333',
    name: 'Coimbatore Advanced Orthopedic Center [Demo Entry]',
    facility_type: 'Clinic',
    specialty: 'Orthopedics',
    address: 'Demo Road, RS Puram, Coimbatore, Tamil Nadu',
    city: 'Coimbatore',
    latitude: 11.0080,
    longitude: 76.9530,
    phone: '0422-0000000',
    website: '',
    rating: null,
    verified: false,
    source: 'Demo Data – Verify Before Visiting',
    created_at: new Date().toISOString()
  },
  {
    id: 'b4444444-4444-4444-4444-444444444444',
    name: 'City Care Dental & Oral Health Clinic [Demo Entry]',
    facility_type: 'Clinic',
    specialty: 'Dentistry',
    address: 'Demo Street, Simmakkal, Madurai, Tamil Nadu',
    city: 'Madurai',
    latitude: 9.9280,
    longitude: 78.1210,
    phone: '0452-0000000',
    website: '',
    rating: null,
    verified: false,
    source: 'Demo Data – Verify Before Visiting',
    created_at: new Date().toISOString()
  },
  {
    id: 'b5555555-5555-5555-5555-555555555555',
    name: '24x7 Community Medicals & Pharmacy [Demo Entry]',
    facility_type: 'Pharmacy',
    specialty: 'General Medicine',
    address: 'Demo Junction, Palani Road, Dindigul, Tamil Nadu',
    city: 'Dindigul',
    latitude: 10.3690,
    longitude: 77.9620,
    phone: '0451-0000000',
    website: '',
    rating: null,
    verified: false,
    source: 'Demo Data – Verify Before Visiting',
    created_at: new Date().toISOString()
  },
  {
    id: 'b6666666-6666-6666-6666-666666666666',
    name: 'Coimbatore MindCare & Counseling [Demo Entry]',
    facility_type: 'Clinic',
    specialty: 'Psychiatry / Psychology',
    address: 'Demo Square, Gandhipuram, Coimbatore, Tamil Nadu',
    city: 'Coimbatore',
    latitude: 11.0180,
    longitude: 76.9690,
    phone: '0422-0000000',
    website: '',
    rating: null,
    verified: false,
    source: 'Demo Data – Verify Before Visiting',
    created_at: new Date().toISOString()
  }
];

const initialEmergencyResources = [
  {
    id: 'e1',
    country: 'India',
    service_name: 'National Emergency Number',
    phone_number: '112',
    description: 'Single national emergency response service across India for Police, Fire, and Ambulance.'
  },
  {
    id: 'e2',
    country: 'India',
    service_name: 'Medical Ambulance Emergency',
    phone_number: '108',
    description: 'Free 24x7 emergency medical transport and immediate trauma response service.'
  },
  {
    id: 'e3',
    country: 'India',
    service_name: 'National Health Helpline',
    phone_number: '1075',
    description: 'Toll-free national health inquiry and public health emergency helpline.'
  },
  {
    id: 'e4',
    country: 'India',
    service_name: 'Tele-MANAS Mental Health',
    phone_number: '14416',
    description: 'Tele Mental Health Assistance and Networking Across States – 24/7 counseling support.'
  }
];

// In-Memory Database store
export const localStore = {
  profiles: [
    {
      id: 'demo-user-1',
      user_id: 'demo-user-1',
      full_name: 'Dr. Ramesh Kumar (Admin)',
      email: 'admin@mediguide.ai',
      password_hash: '$2a$10$w8T9cQ0E5m9lQ8oFfJz49O9q/W2bM4E.kG7D/XJ2L.ZfL7H2q3Z0q', // DemoAdmin123!
      phone: '+91 9876543210',
      role: 'admin',
      created_at: new Date().toISOString()
    },
    {
      id: 'demo-user-2',
      user_id: 'demo-user-2',
      full_name: 'Ananya Sharma',
      email: 'user@mediguide.ai',
      password_hash: '$2a$10$w8T9cQ0E5m9lQ8oFfJz49O9q/W2bM4E.kG7D/XJ2L.ZfL7H2q3Z0q', // DemoUser123!
      phone: '+91 9876500000',
      role: 'user',
      created_at: new Date().toISOString()
    }
  ],
  symptomChecks: [],
  healthResults: [],
  healthcareFacilities: [...initialFacilities],
  emergencyResources: [...initialEmergencyResources],
  feedback: []
};

export const getSupabase = () => supabaseClient;
