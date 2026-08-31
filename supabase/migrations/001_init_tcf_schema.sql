-- ============================================================================
-- TCF Church Website - Initial Database Schema
-- ============================================================================
-- This migration script creates all necessary tables, indexes, RLS policies,
-- and security functions for the TCF Church website.
--
-- Run this in Supabase SQL Editor to initialize the database.
-- ============================================================================

-- ============================================================================
-- 1. ENABLE EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 2. PROFILES TABLE (Admin Users)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email varchar NOT NULL UNIQUE,
  role varchar NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  full_name varchar,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- ============================================================================
-- 3. DAILY_WORDS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.daily_words (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar NOT NULL,
  scripture_ref varchar NOT NULL,
  bible_verse text NOT NULL,
  message text NOT NULL,
  publish_date date NOT NULL,
  author varchar,
  
  youtube_video_id varchar,
  youtube_type varchar CHECK (youtube_type IN ('short', 'video')),
  
  status varchar NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_daily_words_status ON public.daily_words(status);
CREATE INDEX IF NOT EXISTS idx_daily_words_publish_date ON public.daily_words(publish_date DESC);
CREATE INDEX IF NOT EXISTS idx_daily_words_created_at ON public.daily_words(created_at DESC);

-- ============================================================================
-- 4. EVENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar NOT NULL,
  description text,
  event_date date NOT NULL,
  start_time time,
  end_time time,
  location varchar,
  address text,
  image_url varchar,
  
  status varchar NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled')),
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON public.events(event_date ASC);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON public.events(created_at DESC);

-- ============================================================================
-- 5. SERMONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.sermons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar NOT NULL,
  description text,
  speaker varchar,
  sermon_date date NOT NULL,
  
  youtube_video_id varchar NOT NULL,
  youtube_type varchar NOT NULL DEFAULT 'video' CHECK (youtube_type = 'video'),
  
  status varchar NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sermons_status ON public.sermons(status);
CREATE INDEX IF NOT EXISTS idx_sermons_sermon_date ON public.sermons(sermon_date DESC);
CREATE INDEX IF NOT EXISTS idx_sermons_created_at ON public.sermons(created_at DESC);

-- ============================================================================
-- 6. PRAYER_REQUESTS TABLE (Private)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.prayer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  name varchar NOT NULL,
  email varchar NOT NULL,
  prayer_request text NOT NULL,
  contact_requested boolean NOT NULL DEFAULT false,
  
  status varchar NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'prayed', 'archived')),
  notes text,
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_prayer_requests_status ON public.prayer_requests(status);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_created_at ON public.prayer_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_prayer_requests_contact_requested ON public.prayer_requests(contact_requested);

-- ============================================================================
-- 7. SECURITY HELPER FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- 8. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prayer_requests ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 8a. PROFILES RLS
-- ============================================================================

-- Admins can read profiles (for authorization checks)
CREATE POLICY "profiles_admin_read"
  ON public.profiles
  FOR SELECT
  USING (public.is_admin());

-- Users can read their own profile
CREATE POLICY "profiles_self_read"
  ON public.profiles
  FOR SELECT
  USING (id = auth.uid());

-- ============================================================================
-- 8b. DAILY_WORDS RLS
-- ============================================================================

-- Public: read only published daily words that are published on or before today
CREATE POLICY "daily_words_public_read"
  ON public.daily_words
  FOR SELECT
  USING (status = 'published' AND publish_date <= CURRENT_DATE);

-- Admins: full CRUD access
CREATE POLICY "daily_words_admin_all"
  ON public.daily_words
  FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- 8c. EVENTS RLS
-- ============================================================================

-- Public: read only published events
CREATE POLICY "events_public_read"
  ON public.events
  FOR SELECT
  USING (status = 'published');

-- Admins: full CRUD access
CREATE POLICY "events_admin_all"
  ON public.events
  FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- 8d. SERMONS RLS
-- ============================================================================

-- Public: read only published sermons
CREATE POLICY "sermons_public_read"
  ON public.sermons
  FOR SELECT
  USING (status = 'published');

-- Admins: full CRUD access
CREATE POLICY "sermons_admin_all"
  ON public.sermons
  FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- 8e. PRAYER_REQUESTS RLS
-- ============================================================================

-- Public: INSERT only (submit prayer requests)
CREATE POLICY "prayer_requests_public_insert"
  ON public.prayer_requests
  FOR INSERT
  WITH CHECK (true);

-- Public: NO SELECT, UPDATE, or DELETE
-- (implicitly blocked by default when RLS is enabled without a policy)

-- Admins: full CRUD access (SELECT, UPDATE, DELETE)
CREATE POLICY "prayer_requests_admin_all"
  ON public.prayer_requests
  FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- 9. GRANTS
-- ============================================================================

-- Grant basic access to authenticated users and anonymous users
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.daily_words TO anon, authenticated;
GRANT SELECT ON public.events TO anon, authenticated;
GRANT SELECT ON public.sermons TO anon, authenticated;
GRANT INSERT ON public.prayer_requests TO anon, authenticated;
GRANT SELECT ON public.profiles TO authenticated;

-- ============================================================================
-- 10. SUMMARY
-- ============================================================================

-- Tables created:
-- - profiles (admin users)
-- - daily_words (devotionals with optional YouTube Shorts)
-- - events (church events)
-- - sermons (with YouTube video IDs)
-- - prayer_requests (form submissions, private)

-- RLS enforces:
-- - Public can read published daily_words, events, sermons
-- - Public can INSERT prayer_requests but never SELECT
-- - Admins have full CRUD on all tables (except profiles: no INSERT/DELETE)
-- - Non-admin authenticated users get minimal access

-- Function:
-- - is_admin() helper for consistent authorization checks

-- Next steps:
-- 1. Create first admin user via Supabase Auth
-- 2. Add that user's ID to profiles table with role = 'admin'
-- 3. Deploy TypeScript/React frontend with environment variables
