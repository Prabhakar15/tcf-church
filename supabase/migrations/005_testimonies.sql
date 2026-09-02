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

-- Public: insert only (submit new testimonies) - MUST be draft status only
-- This enforces that anonymous users can only submit testimonies in draft status.
-- Attempts to INSERT with status='published' or status='rejected' will be rejected by the RLS policy.
DROP POLICY IF EXISTS "testimonies_public_insert" ON public.testimonies;
CREATE POLICY "testimonies_public_insert"
  ON public.testimonies
  FOR INSERT
  WITH CHECK (status = 'draft');

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
-- PART 7: SECURITY NOTES
-- ============================================================================
-- Public INSERT Security:
-- - RLS policy enforces: status = 'draft' (WITH CHECK clause)
-- - Anonymous users CANNOT INSERT with status='published' or status='rejected'
-- - Policy is checked at database level before INSERT is applied
-- - Even if column DEFAULT is overridden in client, RLS policy enforces draft-only
--
-- Public SELECT Security:
-- - RLS policy enforces: status = 'published'
-- - Anonymous users cannot read draft or rejected testimonies
-- - Access is enforced at database level via USING clause
--
-- Public UPDATE/DELETE Security:
-- - No RLS policies grant UPDATE or DELETE to anonymous users
-- - Both operations are implicitly denied (default-deny model)
--
-- Admin Access:
-- - is_admin() authorization function provides full CRUD
-- - Admins can INSERT with any valid status
-- - Admins can UPDATE status transitions
-- - Admins can DELETE testimonies
-- - is_admin() is SECURITY DEFINER function (consistent with project pattern)
--
-- Data Integrity:
-- - Deleting a branch sets testimonies.branch_id to NULL (ON DELETE SET NULL)
-- - No orphaned testimonies possible
-- - Status CHECK constraint enforces only valid lifecycle states
-- - Display preference CHECK constraint enforces only valid preference values

-- ============================================================================
-- PART 8: SUMMARY
-- ============================================================================
-- Changes:
-- ✅ Created testimonies table with required and optional fields
-- ✅ Added CHECK constraints on display_preference and status
-- ✅ Added optional foreign key to branches table (ON DELETE SET NULL)
-- ✅ Created indexes on status, branch_id, display_order, and composite published index
-- ✅ Enabled RLS on testimonies table
-- ✅ Public SELECT policy: only status = 'published'
-- ✅ Public INSERT policy: ENFORCED draft status only (WITH CHECK status = 'draft')
-- ✅ Admin policy: full CRUD access via is_admin()
-- ✅ Created trigger for automatic updated_at
--
-- Security Enforcement:
-- - Database-level RLS prevents anonymous users from publishing testimonies
-- - Public INSERT with status='published' or status='rejected' is REJECTED by RLS
-- - Public users cannot SELECT draft/rejected content
-- - Public users cannot UPDATE or DELETE any testimonies
-- - Admin authorization via is_admin() provides complete moderation access
--
-- Verification:
-- SELECT table_name FROM information_schema.tables WHERE table_name='testimonies';
-- SELECT * FROM pg_indexes WHERE tablename = 'testimonies';
