# TCF CHURCH WEBSITE — DEPLOYMENT GUIDE

**Application**: TCF Church Website  
**Framework**: React 19 + TypeScript + Vite  
**Database**: Supabase PostgreSQL  
**Authentication**: Supabase Auth  
**Hosting**: Vercel (recommended)  
**Status**: Production Ready  

---

## PREREQUISITES

Before deploying, ensure you have:

1. **GitHub Repository** — Project version control
2. **Supabase Project** — PostgreSQL database with RLS
3. **Vercel Account** — Hosting platform (or alternative: Netlify, Railway, etc.)
4. **Domain** (optional) — Custom domain for production URL

---

## ENVIRONMENT VARIABLES

### Local Development

Create `.env.local` in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**These variables are:**
- ✅ Safe to expose in frontend code
- ✅ Public-only Supabase credentials
- ✅ Not secrets (meant for browser)
- ✅ Required for public page data access

**Get these from:**
1. Supabase Dashboard → Project Settings → API
2. Copy URL and anon key only

### Production

In your hosting platform (Vercel environment settings):

```env
VITE_SUPABASE_URL=https://your-production-supabase.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

**NEVER add to production:**
- ❌ `SUPABASE_SERVICE_ROLE_KEY` (backend only, never in browser)
- ❌ `DATABASE_PASSWORD` (backend only)
- ❌ `AUTH_ADMIN_TOKEN` (backend only)
- ❌ Any secrets or private API keys

### Why These Are Safe

- **VITE_SUPABASE_URL**: Public Supabase endpoint, no auth required
- **VITE_SUPABASE_ANON_KEY**: Public anonymous key, same as built into the browser
- **RLS Policies**: Enforce authorization at database level, not frontend

The frontend cannot access data beyond what RLS allows, even if someone reverse-engineers the anon key.

---

## SUPABASE PRODUCTION SETUP

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Name: `tcf-church-prod`
4. Region: Choose closest to Singapore (Asia-Southeast1)
5. Database password: Generate strong password
6. Wait for project to initialize (~2 minutes)

### 2. Run Database Migration

1. Go to Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Copy entire contents of `supabase/migrations/001_init_tcf_schema.sql`
4. Paste into SQL Editor
5. Click "RUN"
6. Verify all tables created:
   - profiles
   - daily_words
   - events
   - sermons
   - prayer_requests

**Verify with:**
```sql
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
```

Expected output: 5 tables

### 3. Verify RLS Enabled

In SQL Editor:

```sql
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'daily_words', 'events', 'sermons', 'prayer_requests');
```

Then check each table's RLS status in Supabase Dashboard → Tables → [table] → Auth.

Expected: **Row Level Security: ON** for all 5 tables

### 4. Verify Policies Exist

In SQL Editor:

```sql
SELECT policyname FROM pg_policies 
WHERE schemaname = 'public';
```

Expected policies (at minimum 12):
- profiles_admin_read
- profiles_self_read
- daily_words_public_read
- daily_words_admin_all
- events_public_read
- events_admin_all
- sermons_public_read
- sermons_admin_all
- prayer_requests_public_insert
- prayer_requests_admin_all

### 5. Get Production Credentials

In Supabase Dashboard:
1. Go to Project Settings → API
2. Copy: Project URL
3. Copy: Anon (public) key
4. **Do NOT copy**: Service Role key (never use in frontend)

---

## ADMIN USER SETUP

### Create First Admin

**Step 1: Create Supabase User**
1. Go to Supabase Dashboard → Authentication
2. Click "Invite" or let user signup (if signup enabled)
3. Or create directly: Authentication → Users → "Add user"
4. Enter email and password
5. Click "Create user"
6. Copy the UUID (User ID)

**Step 2: Create Admin Profile**

In Supabase SQL Editor:

```sql
INSERT INTO public.profiles (id, email, role, full_name)
VALUES (
  '[COPIED_USER_UUID]',
  '[user@email.com]',
  'admin',
  'Pastor Name'
);
```

**Step 3: Verify**

```sql
SELECT id, email, role FROM public.profiles WHERE email = '[user@email.com]';
```

Expected output: 1 row with role='admin'

**Step 4: Test Login**

1. Deploy application to production
2. Go to `/admin/login`
3. Enter email and password created in Step 1
4. Should redirect to `/admin` dashboard
5. Should see content

---

## VERCEL DEPLOYMENT

### 1. Connect GitHub Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import Git Repository
4. Select your GitHub repo
5. Click "Import"

### 2. Configure Project

**Project Name**: `tcf-church`

**Framework**: Vite (auto-detected)

**Build Command**: `npm run build` (should be auto-detected)

**Output Directory**: `dist` (should be auto-detected)

**Environment Variables** (click "Add"):
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Routing Configuration

Because this is a Vite SPA (Single Page Application), Vercel needs a rewrite rule for React Router.

**Create `vercel.json` in project root:**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_SUPABASE_URL": "@vite_supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@vite_supabase_anon_key"
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures React Router handles all routes, not Vercel's filesystem.

### 4. Deploy

1. Click "Deploy"
2. Wait for build to complete (~2 minutes)
3. Get production URL: `https://tcf-church.vercel.app` (or custom domain)

---

## CUSTOM DOMAIN (OPTIONAL)

1. Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Update DNS records (Vercel provides instructions)
4. Wait for DNS propagation (~24 hours)

---

## POST-DEPLOYMENT VERIFICATION CHECKLIST

### Public Routes
- [ ] `/` loads without 404
- [ ] `/about` loads without 404
- [ ] `/daily-word` loads and shows Supabase data
- [ ] `/events` loads and shows Supabase data
- [ ] `/sermons` loads and shows Supabase data
- [ ] `/prayer` loads form without 404
- [ ] `/contact` loads without 404
- [ ] `/pastor` loads without 404

### Admin Routes
- [ ] `/admin/login` loads without 404
- [ ] Can login with correct credentials
- [ ] Cannot login with incorrect credentials
- [ ] `/admin` dashboard shows after login
- [ ] `/admin/daily-words` accessible and shows content
- [ ] `/admin/events` accessible and shows content
- [ ] `/admin/sermons` accessible and shows content
- [ ] `/admin/prayer-requests` accessible and shows content

### Functionality
- [ ] Can create Daily Word (draft)
- [ ] Draft doesn't appear on public page
- [ ] Can publish Daily Word
- [ ] Published appears on `/daily-word` immediately
- [ ] Can submit prayer request on `/prayer`
- [ ] Prayer request appears in `/admin/prayer-requests`
- [ ] Can update prayer request status
- [ ] Public cannot see prayer requests

### Mobile
- [ ] Navigation works on mobile
- [ ] Forms work on mobile
- [ ] Tables scroll horizontally on mobile
- [ ] YouTube embeds display correctly on mobile

### Security
- [ ] Unauthenticated cannot access `/admin/*`
- [ ] Non-admin authenticated cannot perform admin operations
- [ ] Prayer requests remain private
- [ ] Only published content visible publicly

---

## TROUBLESHOOTING

### Build Fails

**Error**: `Module not found`
- Solution: Run `npm install` locally, commit `package-lock.json`

**Error**: `VITE_SUPABASE_URL is undefined`
- Solution: Verify environment variables in Vercel project settings

### Deployment Stuck at 404

**Issue**: All routes return 404
- Solution: Verify `vercel.json` exists with SPA rewrite rule
- Or: Use Vercel's CLI: `vercel env pull`

### Admin Can't Login

**Issue**: "Not authorized as admin"
- Solution: Verify admin profile exists:
  ```sql
  SELECT * FROM public.profiles WHERE email = 'admin@email.com';
  ```
- Solution: Verify profile has `role='admin'`

### Supabase Connection Fails

**Issue**: "Cannot connect to database"
- Solution: Verify `VITE_SUPABASE_URL` is correct
- Solution: Verify `VITE_SUPABASE_ANON_KEY` is correct
- Solution: Verify Supabase project is not paused

---

## MONITORING

### Basic Monitoring
1. **Vercel Dashboard** — Check build logs, deployment status
2. **Supabase Dashboard** — Check database logs for errors
3. **Browser DevTools** — Check console for JavaScript errors
4. **Network Tab** — Check API response times

### Error Logging
For production, consider adding:
- Sentry (error tracking)
- LogRocket (session replay)
- Plausible Analytics (privacy-respecting)

Keep setup minimal for a church website.

---

## ROLLBACK PROCEDURE

If deployment has critical issues:

1. **Immediate**: Go to Vercel Dashboard → Deployments
2. Click the previous good deployment
3. Click "Promote to Production"
4. Wait for redeploy (~1 minute)
5. Test to verify functionality

Database is unchanged during rollback (only frontend code changes).

---

## MAINTENANCE

### Monthly
- [ ] Check `npm audit` for vulnerabilities
- [ ] Review Supabase error logs
- [ ] Verify admin users still have access
- [ ] Check database backup status (automatic via Supabase)

### Quarterly
- [ ] Update dependencies (test locally first)
- [ ] Review RLS policies still work correctly
- [ ] Verify backups are restorable

### As Needed
- [ ] Create new admin users (follow admin user setup)
- [ ] Remove compromised admin users (delete from profiles table)
- [ ] Restore from backup if data corruption occurs

---

## SUPPORT

For issues:
1. Check Vercel build logs
2. Check Supabase database logs
3. Check browser console errors
4. Run `npm run build` locally to reproduce

Contact: [Church Tech Lead]

---

Generated: August 31, 2026  
TCF Church Website Deployment Guide
