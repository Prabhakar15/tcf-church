-- ============================================================================
-- TCF Church Website - Services & Fellowships Schema
-- ============================================================================
-- This migration creates the services table for recurring weekly services
-- and fellowships.
-- ============================================================================

-- ============================================================================
-- 1. SERVICES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title varchar NOT NULL,
  category varchar NOT NULL,
  description text,
  
  -- Recurrence pattern for weekly services
  day_of_week varchar NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  start_time time NOT NULL,
  end_time time,
  
  -- Timezone for the service
  timezone varchar NOT NULL DEFAULT 'Asia/Singapore',
  
  -- Location information
  location varchar,
  
  -- Display order for grouping
  display_order integer DEFAULT 0,
  
  -- Status control
  status varchar NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_services_status ON public.services(status);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_day_of_week ON public.services(day_of_week);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON public.services(display_order);

-- ============================================================================
-- 2. ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Public: read only published services
CREATE POLICY "services_public_read"
  ON public.services
  FOR SELECT
  USING (status = 'published');

-- Admins: full CRUD access
CREATE POLICY "services_admin_all"
  ON public.services
  FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- 3. GRANTS
-- ============================================================================

GRANT SELECT ON public.services TO anon, authenticated;

-- ============================================================================
-- 4. SUMMARY
-- ============================================================================

-- Table created:
-- - services (recurring weekly services and fellowships)
--
-- RLS enforces:
-- - Public can read published services only
-- - Admins have full CRUD access
--
-- Next steps:
-- 1. Seed initial service data via admin interface or separate seed script
-- 2. Deploy TypeScript frontend with new services query layer
