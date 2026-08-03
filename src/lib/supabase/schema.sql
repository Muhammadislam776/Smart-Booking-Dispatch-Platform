-- TradePro 360 - Database Schema (PostgreSQL / Supabase)
-- Smart Booking & AI Dispatch Platform for UK Tradesmen

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Businesses Table (Multi-tenant)
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  logo TEXT,
  primary_color VARCHAR(50) DEFAULT '#0284c7',
  accent_color VARCHAR(50) DEFAULT '#f59e0b',
  phone VARCHAR(50),
  email VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  postcode VARCHAR(20),
  currency VARCHAR(10) DEFAULT '£',
  vat_rate NUMERIC(5,2) DEFAULT 20.00,
  hourly_rate NUMERIC(10,2) DEFAULT 65.00,
  emergency_multiplier NUMERIC(4,2) DEFAULT 1.50,
  weekend_multiplier NUMERIC(4,2) DEFAULT 1.25,
  call_out_fee NUMERIC(10,2) DEFAULT 45.00,
  google_place_id VARCHAR(255),
  rating NUMERIC(3,2) DEFAULT 4.9,
  review_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'business_owner', 'dispatcher', 'engineer', 'customer')),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  avatar TEXT,
  address TEXT,
  postcode VARCHAR(20),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Engineers Table
CREATE TABLE IF NOT EXISTS public.engineers (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  skills TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  vehicle_registration VARCHAR(50),
  is_available BOOLEAN DEFAULT true,
  current_lat NUMERIC(9,6),
  current_lng NUMERIC(9,6),
  rating NUMERIC(3,2) DEFAULT 5.0,
  completed_jobs_count INT DEFAULT 0,
  active_job_id UUID
);

-- 4. Services Catalog Table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  base_price NUMERIC(10,2) NOT NULL,
  estimated_duration_mins INT DEFAULT 60,
  is_emergency_available BOOLEAN DEFAULT true,
  required_skills TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_ref VARCHAR(50) UNIQUE NOT NULL,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.users(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  service_id UUID REFERENCES public.services(id),
  service_title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'en_route', 'arrived', 'in_progress', 'completed', 'cancelled')),
  scheduled_date DATE NOT NULL,
  scheduled_time VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  postcode VARCHAR(20) NOT NULL,
  lat NUMERIC(9,6),
  lng NUMERIC(9,6),
  issue_description TEXT,
  photos TEXT[] DEFAULT '{}',
  is_emergency BOOLEAN DEFAULT false,
  assigned_engineer_id UUID REFERENCES public.users(id),
  engineer_lat NUMERIC(9,6),
  engineer_lng NUMERIC(9,6),
  eta_mins INT,
  pricing_json JSONB NOT NULL,
  before_photos TEXT[] DEFAULT '{}',
  after_photos TEXT[] DEFAULT '{}',
  materials_used JSONB DEFAULT '[]',
  customer_notes TEXT,
  engineer_notes TEXT,
  signature_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- 6. Invoices Table
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.users(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_address TEXT NOT NULL,
  issue_date DATE NOT NULL,
  due_date DATE NOT NULL,
  items_json JSONB NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  vat_amount NUMERIC(10,2) NOT NULL,
  total_amount NUMERIC(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'unpaid' CHECK (status IN ('unpaid', 'paid', 'overdue', 'refunded')),
  stripe_payment_id VARCHAR(255),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Chat Messages Table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  sender_name VARCHAR(255) NOT NULL,
  sender_role VARCHAR(50) NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.users(id),
  engineer_id UUID REFERENCES public.users(id),
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Live Engineer Locations Table
CREATE TABLE IF NOT EXISTS public.live_locations (
  engineer_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  lat NUMERIC(9,6) NOT NULL,
  lng NUMERIC(9,6) NOT NULL,
  heading NUMERIC(5,2),
  speed NUMERIC(5,2),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Sample Policies
CREATE POLICY "Allow public read access to businesses" ON public.businesses FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to read bookings" ON public.bookings FOR SELECT USING (true);
