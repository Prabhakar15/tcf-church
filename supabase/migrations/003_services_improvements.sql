-- ============================================================================
-- TCF Church Website - Services Improvements
-- ============================================================================
-- This migration adds:
-- 1. Updated_at trigger for automatic timestamp updates
-- 2. Explicit admin RLS policy with USING and WITH CHECK
-- 3. Better documentation
-- ============================================================================

-- ============================================================================
-- 1. CREATE TRIGGER FOR UPDATED_AT
-- ============================================================================

CREATE OR REPLACE FUNCTION public.update_services_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER services_updated_at_trigger
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_services_updated_at();

-- ============================================================================
-- 2. IMPROVE ADMIN RLS POLICY
-- ============================================================================

-- Drop the existing admin policy (if it exists) and replace with more explicit version
DROP POLICY IF EXISTS "services_admin_all" ON public.services;

CREATE POLICY "services_admin_create"
  ON public.services
  FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "services_admin_read"
  ON public.services
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "services_admin_update"
  ON public.services
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "services_admin_delete"
  ON public.services
  FOR DELETE
  USING (public.is_admin());

-- ============================================================================
-- 3. SUMMARY
-- ============================================================================
-- Changes:
-- - Added automatic updated_at trigger for all service updates
-- - Split admin policy into granular CREATE, READ, UPDATE, DELETE policies
-- - Better security model with explicit USING and WITH CHECK clauses
