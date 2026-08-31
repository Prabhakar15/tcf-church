# TCF CHURCH WEBSITE — OPERATIONS GUIDE

Simple procedures for TCF church administrators to manage the website.

---

## ADMIN LOGIN

1. Go to `https://tcf-church.vercel.app/admin/login` (or your custom domain)
2. Enter your email address
3. Enter your password
4. Click "Login"
5. You should see the Admin Dashboard

**Forgot Password?**
- Contact church tech lead to reset via Supabase dashboard

---

## DAILY WORD

### Add New Daily Word

1. From Admin Dashboard, click "Daily Words"
2. Click "+ New Daily Word"
3. Fill in the form:
   - **Title** (required): e.g., "Trust in the Lord"
   - **Scripture Reference** (required): e.g., "Proverbs 3:5-6"
   - **Bible Verse** (required): The full verse text
   - **Message** (required): Your devotional message
   - **Author** (optional): Your name
   - **Publish Date** (required): When to publish
   - **YouTube Short URL** (optional): Link to a short video (https://youtube.com/shorts/VIDEO_ID)
   - **Status** (required): "Draft" or "Published"

4. Click "Create"
5. If status="Draft", it will NOT appear on the public website
6. If status="Published", it will appear immediately on `/daily-word`

### Edit Daily Word

1. Click "Daily Words"
2. Find the Daily Word in the list
3. Click "Edit"
4. Make changes
5. Click "Update"

### Delete Daily Word

1. Click "Daily Words"
2. Click "Delete" button
3. Confirm deletion
4. The Daily Word is permanently removed

### Publish/Unpublish Daily Word

1. Click "Daily Words"
2. Click "Edit"
3. Change "Status" from "Draft" to "Published" (or vice versa)
4. Click "Update"
5. Changes appear immediately on public website

---

## EVENTS

### Add New Event

1. From Admin Dashboard, click "Events"
2. Click "+ New Event"
3. Fill in the form:
   - **Title** (required): e.g., "Sunday Service"
   - **Description** (optional): Event details
   - **Event Date** (required): When the event happens
   - **Start Time** (optional): e.g., "09:30"
   - **End Time** (optional): e.g., "10:30"
   - **Location** (optional): e.g., "Main Hall"
   - **Address** (optional): Full address
   - **Status** (required): "Draft", "Published", or "Cancelled"

4. Click "Create"

### Edit Event

1. Click "Events"
2. Click "Edit"
3. Make changes
4. Click "Update"

### Delete Event

1. Click "Events"
2. Click "Delete"
3. Confirm deletion

### Publish Event

1. Edit the event
2. Change Status to "Published"
3. Click "Update"
4. Event appears on public `/events` page

### Cancel Event

1. Edit the event
2. Change Status to "Cancelled"
3. Click "Update"
4. Event still visible in admin but marked as cancelled

---

## SERMONS

### Add New Sermon

1. From Admin Dashboard, click "Sermons"
2. Click "+ New Sermon"
3. Fill in the form:
   - **Title** (required): e.g., "Faith in Jesus"
   - **Speaker** (optional): Pastor name
   - **Sermon Date** (required): Date preached
   - **Description** (optional): Sermon notes
   - **YouTube URL** (required): Link to YouTube video
     - Format: `https://www.youtube.com/watch?v=VIDEO_ID`
     - Or: `https://youtu.be/VIDEO_ID`
   - **Status** (required): "Draft" or "Published"

4. After entering YouTube URL, you'll see a preview
5. Click "Create"

### Edit Sermon

1. Click "Sermons"
2. Click "Edit"
3. Make changes
4. Click "Update"

### Delete Sermon

1. Click "Sermons"
2. Click "Delete"
3. Confirm deletion

### Publish Sermon

1. Edit the sermon
2. Change Status to "Published"
3. Click "Update"
4. Sermon appears on public `/sermons` page with YouTube video embedded

---

## PRAYER REQUESTS

### View Prayer Requests

1. From Admin Dashboard, click "Prayer Requests"
2. You'll see all prayer requests submitted by church members
3. Requests show:
   - Date submitted
   - Submitter's name
   - Prayer request text
   - Whether they want to be contacted
   - Current status (New, Read, Prayed, Archived)

### Filter by Status

1. Click "Prayer Requests"
2. At the top, click a status button:
   - "All" — show all requests
   - "New" — unread requests
   - "Read" — requests you've seen
   - "Prayed" — requests you've prayed over
   - "Archived" — old requests

### Update Request Status

1. Click "Prayer Requests"
2. Find the request
3. Click "Update"
4. A modal will open showing:
   - Prayer request details
   - Current status (dropdown)
   - Notes area (for your private notes)
5. Change status: New → Read → Prayed → Archived
6. Add any private notes for your prayer team
7. Click "Save Changes"

### Delete Request

1. Click "Prayer Requests"
2. Click "Delete"
3. Confirm deletion
4. Request is permanently removed

### Important: Privacy

- Prayer requests are PRIVATE to admins only
- Never published on the public website
- Never shared with non-admin users
- Treat with confidentiality

---

## ADMIN USER MANAGEMENT

### Create New Admin User

**Only the tech lead can create new admins.** Process:

1. Tech lead creates user in Supabase Authentication
2. Tech lead creates admin profile in database
3. New admin receives login credentials
4. New admin can access `/admin/login`

### Remove Admin User

**If someone should no longer be an admin:**

1. Contact your tech lead
2. Tech lead will:
   - Delete or disable the user in Supabase Authentication
   - Or change the profile role to "viewer" (if that role is supported)

**Important**: After removal, the person can no longer login or access admin functionality.

### Compromised Admin Account

**If an admin password is compromised:**

1. Contact your tech lead IMMEDIATELY
2. Tech lead can:
   - Reset the password via Supabase dashboard
   - Or disable the account temporarily

Do not attempt to fix this yourself.

---

## COMMON TASKS

### Add Sunday Sermon

1. After Sunday service, video should be on TCF YouTube channel
2. Go to Admin Dashboard → Sermons
3. Click "+ New Sermon"
4. Enter sermon details and YouTube link
5. Set Status to "Draft" first (to test)
6. Verify YouTube preview works
7. Change Status to "Published"
8. Sermon appears on public website

### Add Upcoming Event

1. Go to Admin Dashboard → Events
2. Click "+ New Event"
3. Enter event details
4. Set Status to "Draft"
5. When event is ready to announce, change to "Published"
6. Event appears on `/events` page

### Post Daily Encouragement

1. Go to Admin Dashboard → Daily Words
2. Click "+ New Daily Word"
3. Enter devotional content
4. Optionally add YouTube Short link
5. Set Publish Date to today
6. Set Status to "Published"
7. Appears immediately on `/daily-word` page

### Monitor Prayer Requests

1. Every day, check Admin Dashboard → Prayer Requests
2. Review new requests (status = "New")
3. Read and pray over each request
4. Update status: New → Read → Prayed
5. Add any notes for your prayer team
6. Periodically archive old requests

---

## TROUBLESHOOTING

### Can't Login

**Problem**: Email or password not accepted
- Solution: Contact tech lead to verify account exists
- Solution: Use "Forgot Password" (tech lead can reset)

### Content Not Appearing on Public Website

**Problem**: Created content but doesn't show
- Solution: Verify Status is "Published" (not "Draft")
- Solution: Refresh your browser (Ctrl+F5 or Cmd+Shift+R)
- Solution: Wait 30 seconds and refresh again

**Problem**: YouTube video not showing on sermon
- Solution: Check that YouTube URL is correct format
- Solution: Verify you clicked outside URL field to see preview
- Solution: Try re-entering the YouTube link

### Prayer Request Disappeared

**Problem**: A prayer request is gone
- Solution: It may have been archived
- Solution: Click "Archived" filter to see it
- Solution: Contact tech lead to check deletion logs

### Admin Dashboard Won't Load

**Problem**: `/admin` page is blank or shows error
- Solution: Logout and login again
- Solution: Clear browser cache (Ctrl+Shift+Delete)
- Solution: Try a different browser

---

## BEST PRACTICES

1. **Always test as Draft first** — Create content as "Draft", verify it looks good, then "Publish"
2. **Use descriptive titles** — Help church members understand content at a glance
3. **Add YouTube links correctly** — Copy full URL from YouTube address bar
4. **Pray over prayer requests** — Respond to the spiritual need
5. **Archive old content** — Keep prayer requests organized
6. **Keep passwords secure** — Don't share your login credentials
7. **Contact tech lead for issues** — Don't try to fix database problems yourself

---

## SUPPORT CONTACTS

- **Technical Issues**: [Tech Lead Email]
- **Account Reset**: [Tech Lead Email]
- **Security Issues**: [Tech Lead Email]

---

Generated: August 31, 2026  
TCF Church Website Operations Guide
