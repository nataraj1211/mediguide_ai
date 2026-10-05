-- ====================================================================
-- MediGuide AI – Database Schema (PostgreSQL / Supabase)
-- ====================================================================

-- 1. Create Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLE: profiles
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE, -- References auth.users(id) in Supabase
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(50) DEFAULT 'user', -- 'user' or 'admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. TABLE: symptom_checks
CREATE TABLE IF NOT EXISTS symptom_checks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    input_type VARCHAR(50) NOT NULL CHECK (input_type IN ('text', 'image')),
    symptom_text TEXT,
    image_url TEXT,
    duration VARCHAR(100),
    severity VARCHAR(50),
    ai_summary TEXT NOT NULL,
    risk_level VARCHAR(50) NOT NULL CHECK (risk_level IN ('LOW', 'MODERATE', 'HIGH', 'EMERGENCY')),
    recommendation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. TABLE: health_results
CREATE TABLE IF NOT EXISTS health_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    symptom_check_id UUID REFERENCES symptom_checks(id) ON DELETE CASCADE,
    category VARCHAR(255) NOT NULL,
    explanation TEXT NOT NULL,
    possible_causes JSONB NOT NULL DEFAULT '[]'::jsonb,
    self_care JSONB NOT NULL DEFAULT '[]'::jsonb,
    warning_signs JSONB NOT NULL DEFAULT '[]'::jsonb,
    healthcare_recommendation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. TABLE: healthcare_facilities
CREATE TABLE IF NOT EXISTS healthcare_facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    facility_type VARCHAR(100) NOT NULL, -- 'Hospital', 'Clinic', 'Emergency', 'Pharmacy'
    specialty VARCHAR(150) NOT NULL,    -- 'General Medicine', 'Dermatology', 'Ophthalmology', etc.
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,         -- 'Dindigul', 'Madurai', 'Coimbatore', etc.
    latitude DECIMAL(10, 7) NOT NULL,
    longitude DECIMAL(10, 7) NOT NULL,
    phone VARCHAR(50),
    website VARCHAR(255),
    rating DECIMAL(2, 1) DEFAULT NULL,  -- null for unverified/demo or genuine verified metric
    verified BOOLEAN DEFAULT FALSE,     -- TRUE if verified with official registry
    source VARCHAR(255) NOT NULL,       -- official source or 'DEMO DATA - NOT VERIFIED'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. TABLE: emergency_resources
CREATE TABLE IF NOT EXISTS emergency_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country VARCHAR(100) NOT NULL DEFAULT 'India',
    service_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50) NOT NULL,
    description TEXT
);

-- 7. TABLE: feedback
CREATE TABLE IF NOT EXISTS feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    analysis_id UUID REFERENCES symptom_checks(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ====================================================================
-- Indexes for Performance
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_symptom_checks_user ON symptom_checks(user_id);
CREATE INDEX IF NOT EXISTS idx_health_results_check ON health_results(symptom_check_id);
CREATE INDEX IF NOT EXISTS idx_facilities_city ON healthcare_facilities(city);
CREATE INDEX IF NOT EXISTS idx_facilities_specialty ON healthcare_facilities(specialty);
CREATE INDEX IF NOT EXISTS idx_facilities_verified ON healthcare_facilities(verified);

-- ====================================================================
-- Row Level Security (RLS)
-- ====================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptom_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE healthcare_facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view their own profile" 
ON profiles FOR SELECT USING (auth.uid() = user_id OR role = 'admin');

CREATE POLICY "Users can update their own profile" 
ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- Policies for symptom_checks & results: only owner can read/write their private checks
CREATE POLICY "Users can view their own symptom checks" 
ON symptom_checks FOR SELECT USING (user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can insert their own symptom checks" 
ON symptom_checks FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can delete their own symptom checks" 
ON symptom_checks FOR DELETE USING (user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

CREATE POLICY "Users can view health results of their checks" 
ON health_results FOR SELECT USING (
    symptom_check_id IN (
        SELECT id FROM symptom_checks WHERE user_id IN (
            SELECT id FROM profiles WHERE user_id = auth.uid()
        )
    )
);

-- Policies for healthcare_facilities & emergency: public read access
CREATE POLICY "Anyone can view healthcare facilities" 
ON healthcare_facilities FOR SELECT USING (true);

CREATE POLICY "Admins can manage healthcare facilities" 
ON healthcare_facilities FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin')
);

CREATE POLICY "Anyone can view emergency resources" 
ON emergency_resources FOR SELECT USING (true);

-- Feedback policies
CREATE POLICY "Users can submit feedback" 
ON feedback FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view feedback" 
ON feedback FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'admin')
);
