# Supabase Setup Guide for TCF Church Website

## Overview
This guide walks through setting up Supabase for the TCF Church website backend.

## Prerequisites
- Supabase account (free tier at https://supabase.com)
- Git
- Node.js 18+

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign in or create an account
3. Click "New Project"
4. Choose organization → Create new project
5. Fill in:
   - **Project name**: `tcf-church` (or similar)
   - **Database password**: Generate a secure password (save it, but don't commit)
   - **Region**: Choose closest to Singapore (if available) or default
6. Click "Create new project"
7. Wait for project to initialize (2-5 minutes)

## Step 2: Get Connection Strings

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public` → `VITE_SUPABASE_ANON_KEY`
3. Do NOT commit `service_role_key` or database password anywhere

## Step 3: Create Environment Variables

Create `.env.local` in project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ0eXAi...
```

## Step 4: Initialize Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy entire content from `supabase/migrations/001_init_tcf_schema.sql`
4. Paste into query editor
5. Click "Run" (executes all SQL)
6. Verify: Go to **Table Editor** and confirm 5 tables exist:
   - `profiles`
   - `daily_words`
   - `events`
   - `sermons`
   - `prayer_requests`

## Step 5: Create First Admin User

### Via Supabase Dashboard
1. Go to **Authentication** → **Users**
2. Click "Invite user"
3. Enter admin email
4. Check "Auto generate password"
5. Click "Send invite"
6. Note the user's UUID (you'll need it)

### Add Admin Profile

1. Go to **SQL Editor** → **New Query**
2. Run:
   ```sql
   INSERT INTO profiles (id, email, role, full_name)
   VALUES ('USER_UUID_HERE', 'admin@tcf.com', 'admin', 'TCF Admin');
   ```
   Replace `USER_UUID_HERE` with the UUID from step 5.1
3. Click "Run"

## Step 6: Test Connection (Optional)

In project root, run:
```bash
npm run dev
```

Open browser to http://localhost:5173

Check browser console for Supabase connection errors.

## Step 7: Environment Variables for Production

For Vercel deployment, set in **Project Settings** → **Environment Variables**:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

**DO NOT add these to Vercel:**
- `SUPABASE_SERVICE_ROLE_KEY`
- Database passwords
- JWT secrets

## Tables Overview

### profiles
Admin user accounts linked to Supabase Auth.

### daily_words
Devotional content with optional YouTube Shorts.
- Public can read: status = 'published' AND publish_date <= today
- Admin can read/write: all

### events
Church events.
- Public can read: status = 'published'
- Admin can read/write: all

### sermons
Sermon records with YouTube video IDs.
- Public can read: status = 'published'
- Admin can read/write: all

### prayer_requests
Prayer request form submissions (PRIVATE).
- Public can INSERT only
- Admin can SELECT/UPDATE/DELETE

## Security Notes

✅ **RLS is enabled** on all tables
✅ **Public cannot modify** published content
✅ **Prayer requests are private** - public cannot read them
✅ **Admin access** verified via `profiles` table

⚠️ **DO NOT:**
- Commit `.env.local` to Git
- Expose `service_role_key` to frontend
- Allow public registration
- Store passwords in code

## Monitoring & Maintenance

### Check usage
- Supabase Dashboard → **Home** → Storage/API usage
- Free tier: 500 MB storage, 5 GB bandwidth/month

### Backup data
- Supabase automatically backs up daily
- Manual export: Dashboard → **SQL Editor** → Export tools

### Log issues
- Check Supabase **Logs** for database errors
- Browser console for frontend errors

## Troubleshooting

**"Missing Supabase environment variables"**
→ Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local

**"Anonymous user cannot SELECT prayer_requests"**
→ This is correct (by design). Only admins can read prayer requests.

**"RLS policy denied this operation"**
→ Check user authentication status
→ Verify user has admin role in profiles table
→ Check RLS policy for SELECT/INSERT/UPDATE permissions

**"YouTube URL not recognized"**
→ Use full URL: https://www.youtube.com/watch?v=VIDEO_ID
→ Or: https://www.youtube.com/shorts/SHORT_ID
→ Or: https://youtu.be/VIDEO_ID

## Support

- Supabase docs: https://supabase.com/docs
- GitHub issues: Ask in project repo
- Email: (contact TCF leadership)

---

**Setup complete!** Your TCF Church website is now connected to Supabase.

Next: Deploy to Vercel and test admin login.
