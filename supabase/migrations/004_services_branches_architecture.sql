-- ============================================================================
-- TCF Church Website - Services + Branches Architecture (Phase 1)
-- ============================================================================
-- This migration implements the new Services + Branches architecture:
-- 1. Add service classification columns (service_category, region, fellowship_group)
-- 2. Create branches table
-- 3. Migrate existing service data safely
-- 4. Maintain backward compatibility
--
-- IMPORTANT: This migration is designed to be:
-- - Non-destructive (no data loss)
-- - Safe (existing records remain functional)
-- - Backward-compatible (existing queries continue working)
-- ============================================================================

-- ============================================================================
-- PART 1: ADD NEW COLUMNS TO SERVICES TABLE
-- ============================================================================

ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS service_category VARCHAR DEFAULT 'WORSHIP' CHECK (service_category IN ('WORSHIP', 'PRAYER', 'FELLOWSHIP'));

ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS region VARCHAR CHECK (region IS NULL OR region IN ('SINGAPORE', 'INDIA'));

ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS fellowship_group VARCHAR CHECK (fellowship_group IS NULL OR fellowship_group IN ('WOMEN_FELLOWSHIP', 'DOR_BROTHERS'));

-- ============================================================================
-- PART 2: CREATE BRANCHES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Region: SINGAPORE or INDIA
  region varchar NOT NULL CHECK (region IN ('SINGAPORE', 'INDIA')),
  
  -- Branch name: Bartley, PPH, Hyderabad, Visakhapatnam, Rajahmundry
  branch_name varchar NOT NULL,
  
  -- Optional location details
  location varchar,
  address varchar,
  map_url varchar,
  
  -- Display and status
  display_order integer DEFAULT 0,
  status varchar NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  
  -- Unique constraint: only one branch per region/name combination
  UNIQUE(region, branch_name)
);

-- Create indexes for branches
CREATE INDEX IF NOT EXISTS idx_branches_region ON public.branches(region);
CREATE INDEX IF NOT EXISTS idx_branches_status ON public.branches(status);
CREATE INDEX IF NOT EXISTS idx_branches_display_order ON public.branches(display_order);

-- ============================================================================
-- PART 3: MIGRATE EXISTING SERVICE RECORDS
-- ============================================================================
-- Strategy:
-- - Sunday/Saturday → WORSHIP
-- - Prayer → PRAYER (with region based on timezone)
-- - Dormitory Brothers → FELLOWSHIP + DOR_BROTHERS
-- - Women's Fellowship → FELLOWSHIP + WOMEN_FELLOWSHIP

-- Migrate Regular Services (Sunday, Saturday) → WORSHIP
UPDATE public.services 
SET service_category = 'WORSHIP', region = 'SINGAPORE'
WHERE category IN ('Sunday Service', 'Saturday Service');

-- Migrate Prayer Services → PRAYER (with region based on timezone)
UPDATE public.services 
SET service_category = 'PRAYER', region = 'SINGAPORE'
WHERE category = 'Early Morning Prayer' AND timezone = 'Asia/Singapore';

UPDATE public.services 
SET service_category = 'PRAYER', region = 'INDIA'
WHERE category = 'Early Morning Prayer' AND timezone = 'Asia/Kolkata';

-- Migrate Dormitory Brothers → FELLOWSHIP + DOR_BROTHERS
UPDATE public.services 
SET service_category = 'FELLOWSHIP', region = 'SINGAPORE', fellowship_group = 'DOR_BROTHERS'
WHERE category = 'Dormitory Brothers';

-- Migrate Women's Fellowship → FELLOWSHIP + WOMEN_FELLOWSHIP
UPDATE public.services 
SET service_category = 'FELLOWSHIP', region = 'SINGAPORE', fellowship_group = 'WOMEN_FELLOWSHIP'
WHERE category = 'Women''s Fellowship';

-- ============================================================================
-- PART 4: SEED INITIAL BRANCHES
-- ============================================================================
-- Only insert if they don't already exist

INSERT INTO public.branches (region, branch_name, location, display_order, status)
VALUES 
  ('SINGAPORE', 'Bartley', 'Bartley Christian Church', 1, 'published'),
  ('SINGAPORE', 'PPH', 'Pasir Panjang Hill Brethren Church', 2, 'published'),
  ('INDIA', 'Hyderabad', NULL, 3, 'published'),
  ('INDIA', 'Visakhapatnam', NULL, 4, 'published'),
  ('INDIA', 'Rajahmundry', NULL, 5, 'published')
ON CONFLICT (region, branch_name) DO NOTHING;

-- ============================================================================
-- PART 5: ENABLE RLS ON BRANCHES TABLE
-- ============================================================================

ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;

-- Public: read only published branches
DROP POLICY IF EXISTS "branches_public_read" ON public.branches;
CREATE POLICY "branches_public_read"
  ON public.branches
  FOR SELECT
  USING (status = 'published');

-- Admins: full CRUD access
DROP POLICY IF EXISTS "branches_admin_create" ON public.branches;
CREATE POLICY "branches_admin_create"
  ON public.branches
  FOR INSERT
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "branches_admin_read" ON public.branches;
CREATE POLICY "branches_admin_read"
  ON public.branches
  FOR SELECT
  USING (public.is_admin());

DROP POLICY IF EXISTS "branches_admin_update" ON public.branches;
CREATE POLICY "branches_admin_update"
  ON public.branches
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "branches_admin_delete" ON public.branches;
CREATE POLICY "branches_admin_delete"
  ON public.branches
  FOR DELETE
  USING (public.is_admin());

-- ============================================================================
-- PART 6: GRANT PERMISSIONS ON BRANCHES
-- ============================================================================

GRANT SELECT ON public.branches TO anon, authenticated;

-- ============================================================================
-- PART 7: CREATE TRIGGER FOR BRANCHES UPDATED_AT
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_branches_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS branches_updated_at_trigger ON public.branches;
CREATE TRIGGER branches_updated_at_trigger
BEFORE UPDATE ON public.branches
FOR EACH ROW
EXECUTE FUNCTION public.update_branches_updated_at();

-- ============================================================================
-- PART 8: SUMMARY
-- ============================================================================
-- Changes:
-- ✅ Added service_category column (WORSHIP, PRAYER, FELLOWSHIP) with defaults
-- ✅ Added region column (SINGAPORE, INDIA) - nullable where not applicable
-- ✅ Added fellowship_group column (WOMEN_FELLOWSHIP, DOR_BROTHERS) - nullable
-- ✅ Created branches table with region, branch_name, optional location/address
-- ✅ Safely migrated all existing services to new structure
-- ✅ Seeded initial branches for Singapore and India
-- ✅ Enabled RLS on branches table
-- ✅ Created triggers for automatic updated_at
--
-- Backward Compatibility:
-- ✅ Existing 'category' column remains unchanged
-- ✅ All existing services continue to work
-- ✅ New columns have sensible defaults
-- ✅ No data was deleted or duplicated
--
-- Verification:
-- SELECT service_category, region, fellowship_group, COUNT(*) 
-- FROM public.services 
-- GROUP BY service_category, region, fellowship_group;
--
-- SELECT region, branch_name, status 
-- FROM public.branches 
-- ORDER BY region, display_order;


-- ============================================================================
-- PHASE 4 UPDATE: Add optional branchId relationship to services
-- ============================================================================

ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS branch_id uuid REFERENCES public.branches(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_services_branch_id ON public.services(branch_id);

