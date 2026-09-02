# Services & Fellowships - Duplicate Data Fix

## Problem
The services table has duplicate records because the seed script was run multiple times without checking for existing data.

## Solution

### Step 1: Clean Up Duplicates in Supabase

Go to Supabase Dashboard → SQL Editor and run this script:

```sql
-- Remove all duplicate services, keeping only the first instance of each
DELETE FROM public.services s1 
WHERE s1.id NOT IN (
  SELECT DISTINCT ON (s2.title, s2.day_of_week, s2.start_time, s2.timezone) s2.id
  FROM public.services s2
  ORDER BY s2.title, s2.day_of_week, s2.start_time, s2.timezone, s2.created_at ASC
);

-- Verify: should show exactly 15 services
SELECT COUNT(*) as total_services FROM public.services;

-- Verify the structure
SELECT 
  category,
  COUNT(*) as count
FROM public.services
GROUP BY category
ORDER BY category;
```

Expected output:
```
Total services: 15

Category breakdown:
- Dormitory Brothers: 4
- Early Morning Prayer: 8
- Saturday Service: 1
- Sunday Service: 1
- Women's Fellowship: 1
```

### Step 2: Verify the Data

The script in `seed_services.sql` is now idempotent (safe to run multiple times). If you need to re-seed or reset, you can use the updated script which includes a DELETE statement to clean first.

### Step 3: Expected Services Structure

```
REGULAR SERVICES (2)
├─ Sunday Service (Sunday, 20:00-21:00 SGT)
└─ Saturday Service (Saturday, 19:45-20:45 SGT)

DORMITORY BROTHERS (4)
├─ Changi (Tuesday, 21:00-22:00 SGT)
├─ Tuas (Wednesday, 21:00-22:00 SGT)
├─ Woodlands (Thursday, 21:00-22:00 SGT)
└─ Ubi (Friday, 21:00-22:00 SGT)

WOMEN'S FELLOWSHIP (1)
└─ Thursday, 12:00-14:00 SGT

EARLY MORNING PRAYER (8)
├─ Singapore (4 sessions: Tue-Fri, 05:00-06:00 SGT)
└─ India (4 sessions: Tue-Fri, 07:00-08:30 IST)
```

### Step 4: Refresh Your Browser

After running the cleanup script:
1. Go to `/services` page - should show correct structure
2. Go to `/admin/services` - should show 15 records (not duplicated)
3. Homepage preview - should show representative services

## Files Updated

- `supabase/seed_services.sql` - Now includes DELETE statement to be idempotent

## Future Prevention

The seed script is now idempotent - it will delete existing services with display_order 1-15 before re-inserting. This prevents duplicates if the script is run again.

