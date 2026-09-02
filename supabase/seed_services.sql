-- ============================================================================
-- TCF Services & Fellowships - Initial Seed Data
-- ============================================================================
-- This script seeds the initial service data for the TCF website.
-- Run this in Supabase SQL Editor after the migration is applied.
-- Idempotent: Safe to run multiple times (existing records not duplicated)
-- ============================================================================

-- First, delete existing services to ensure clean state
DELETE FROM public.services WHERE display_order BETWEEN 1 AND 15;

INSERT INTO public.services (
  title, category, day_of_week, start_time, end_time, 
  timezone, location, display_order, status
) VALUES
  -- Regular Services
  ('Sunday Service', 'Sunday Service', 'Sunday', '20:00'::time, '21:00'::time, 'Asia/Singapore', 'Pasir Panjang Hill Brethren Church', 1, 'published'),
  ('Saturday Service', 'Saturday Service', 'Saturday', '19:45'::time, '20:45'::time, 'Asia/Singapore', 'Bartley Christian Church', 2, 'published'),
  
  -- Dormitory Brothers Fellowship
  ('Ubi Dorm Brothers Fellowship', 'Dormitory Brothers', 'Friday', '21:00'::time, '22:00'::time, 'Asia/Singapore', 'Ubi', 3, 'published'),
  ('Woodlands Dorm Brothers Fellowship', 'Dormitory Brothers', 'Thursday', '21:00'::time, '22:00'::time, 'Asia/Singapore', 'Woodlands', 4, 'published'),
  ('Tuas Dorm Brothers Fellowship', 'Dormitory Brothers', 'Wednesday', '21:00'::time, '22:00'::time, 'Asia/Singapore', 'Tuas', 5, 'published'),
  ('Changi Dorm Brothers Fellowship', 'Dormitory Brothers', 'Tuesday', '21:00'::time, '22:00'::time, 'Asia/Singapore', 'Changi', 6, 'published'),
  
  -- Women's Fellowship
  ('Women''s Fellowship', 'Women''s Fellowship', 'Thursday', '12:00'::time, '14:00'::time, 'Asia/Singapore', NULL, 7, 'published'),
  
  -- Early Morning Prayer - Singapore
  ('Early Morning Prayer (Singapore)', 'Early Morning Prayer', 'Tuesday', '05:00'::time, '06:00'::time, 'Asia/Singapore', NULL, 8, 'published'),
  ('Early Morning Prayer (Singapore)', 'Early Morning Prayer', 'Wednesday', '05:00'::time, '06:00'::time, 'Asia/Singapore', NULL, 9, 'published'),
  ('Early Morning Prayer (Singapore)', 'Early Morning Prayer', 'Thursday', '05:00'::time, '06:00'::time, 'Asia/Singapore', NULL, 10, 'published'),
  ('Early Morning Prayer (Singapore)', 'Early Morning Prayer', 'Friday', '05:00'::time, '06:00'::time, 'Asia/Singapore', NULL, 11, 'published'),
  
  -- Early Morning Prayer - India
  ('Early Morning Prayer (India)', 'Early Morning Prayer', 'Tuesday', '07:00'::time, '08:30'::time, 'Asia/Kolkata', NULL, 12, 'published'),
  ('Early Morning Prayer (India)', 'Early Morning Prayer', 'Wednesday', '07:00'::time, '08:30'::time, 'Asia/Kolkata', NULL, 13, 'published'),
  ('Early Morning Prayer (India)', 'Early Morning Prayer', 'Thursday', '07:00'::time, '08:30'::time, 'Asia/Kolkata', NULL, 14, 'published'),
  ('Early Morning Prayer (India)', 'Early Morning Prayer', 'Friday', '07:00'::time, '08:30'::time, 'Asia/Kolkata', NULL, 15, 'published');

-- ============================================================================
-- Summary
-- ============================================================================
-- Inserted 15 service records:
-- - 2 Regular Services (Sunday, Saturday)
-- - 4 Dormitory Brothers Fellowships (Ubi, Woodlands, Tuas, Changi)
-- - 1 Women's Fellowship
-- - 4 Early Morning Prayer sessions (Singapore)
-- - 4 Early Morning Prayer sessions (India)
