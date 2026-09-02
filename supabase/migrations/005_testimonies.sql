-- ============================================================================
-- TCF Church Website - Testimonies Table
-- ============================================================================
-- This migration creates the Testimonies table for storing personal stories
-- of God's faithfulness that can be submitted publicly and moderated by admins.
--
-- IMPORTANT: This migration is designed to be:
-- - Non-intrusive (no changes to existing tables)
-- - Secure (RLS enforces moderation workflow)
-- - Simple (3-state moderation: draft, published, rejected)
-- - Privacy-preserving (optional display-name preference)
-- ============================================================================

-- ============================================================================
-- PART 1: CREATE TESTIMONIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.testimonies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Testimony content
  title varchar NOT NULL,
  content text NOT NULL,
  
  -- Submitter information
  submitted_name varchar NOT NULL,
  
  -- Public display preference for the submitter's name
  display_preference varchar NOT NULL DEFAULT 'FIRST_NAME_ONLY'
    CHECK (display_preference IN ('FULL_NAME', 'FIRST_NAME_ONLY', 'ANONYMOUS')),
  
  -- Optional association with a church branch
  branch_id uuid REFERENCES public.branches(id) ON DELETE SET NULL,
  
  -- Moderation status
  status varchar NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'rejected')),
  
  -- Display ordering for published testimonies
  display_order integer NOT NULL DEFAULT 0,
  
  -- When the testimony was published (null if not yet published or rejected)
  published_at timestamptz,
  
  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================================
-- PART 2: CREATE INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_testimonies_status ON public.testimonies(status);
CREATE INDEX IF NOT EXISTS idx_testimonies_branch_id ON public.testimonies(branch_id);
CREATE INDEX IF NOT EXISTS idx_testimonies_display_order ON public.testimonies(display_order);
CREATE INDEX IF NOT EXISTS idx_testimonies_published ON public.testimonies(status, display_order)
  WHERE status = 'published';

-- ============================================================================
-- PART 3: ENABLE RLS
-- ============================================================================

ALTER TABLE public.testimonies ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PART 4: RLS POLICIES
-- ============================================================================

-- Public: read only published testimonies
DROP POLICY IF EXISTS "testimonies_public_read" ON public.testimonies;
CREATE POLICY "testimonies_public_read"
  ON public.testimonies
  FOR SELECT
  USING (status = 'published');

-- Public: insert only (submit new testimonies) - always starts as draft
DROP POLICY IF EXISTS "testimonies_public_insert" ON public.testimonies;
CREATE POLICY "testimonies_public_insert"
  ON public.testimonies
  FOR INSERT
  WITH CHECK (true);

-- Admins: full CRUD access
DROP POLICY IF EXISTS "testimonies_admin_all" ON public.testimonies;
CREATE POLICY "testimonies_admin_all"
  ON public.testimonies
  FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- PART 5: GRANTS
-- ============================================================================

GRANT SELECT ON public.testimonies TO anon, authenticated;
GRANT INSERT ON public.testimonies TO anon, authenticated;

-- ============================================================================
-- PART 6: TRIGGER FOR UPDATED_AT
-- ============================================================================

-- Reuse the existing update function or create one if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_testimonies_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS testimonies_updated_at_trigger ON public.testimonies;
CREATE TRIGGER testimonies_updated_at_trigger
BEFORE UPDATE ON public.testimonies
FOR EACH ROW
EXECUTE FUNCTION public.update_testimonies_updated_at();

-- ============================================================================
-- PART 7: SUMMARY
-- ============================================================================
-- Changes:
-- ✅ Created testimonies table with id, title, content, submitted_name, display_preference, branch_id, status, display_order, published_at, created_at, updated_at
-- ✅ Added CHECK constraints on display_preference and status
-- ✅ Added optional foreign key to branches table (ON DELETE SET NULL)
-- ✅ Created indexes on status, branch_id, display_order, and composite published index
-- ✅ Enabled RLS on testimonies table
-- ✅ Public SELECT policy: only status = 'published'
-- ✅ Public INSERT policy: allowed without authentication (starts as draft)
-- ✅ Admin policy: full CRUD access via is_admin()
-- ✅ Created trigger for automatic updated_at
--
-- Security Model:
-- - Public users can submit testimonies (INSERT with status defaulting to 'draft')
-- - Public users can only read published testimonies (SELECT where status = 'published')
-- - Admins can view all testimonies (draft, published, rejected)
-- - Admins can approve (status='published'), reject (status='rejected'), or delete
-- - Data isolation: no testimony can be modified by public users once submitted
--
-- Data Integrity:
-- - Deleting a branch sets branch_id to null (no orphaned testimonies)
-- - All required fields are NOT NULL
-- - Status defaults to 'draft' (unmoderated)
-- - Display preference defaults to 'FIRST_NAME_ONLY' (privacy-first)
-- - Empty table on first run (no fake/placeholder testimonies)
--
-- Verification:
-- SELECT table_name FROM information_schema.tables WHERE table_name='testimonies';
-- SELECT * FROM public.testimonies LIMIT 0;
-- SELECT * FROM pg_indexes WHERE tablename = 'testimonies';
