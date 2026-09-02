// Static Church Information
export interface ChurchInfo {
  name: string;
  shortName: string;
  establishedYear: number;
  pastorName: string;
  vision: string;
  community: string;
  description: string;
  location: string;
}

// Service Information (static)
export interface Service {
  id: string;
  day: string;
  time: string;
  timezone: string;
  venue: string;
  address: string;
  mapsUrl: string;
}

// Social Links
export interface SocialLinks {
  youtube: string;
  instagram: string;
  facebook: string;
}

// Dynamic Content Types

// Daily Word (with YouTube Short support)
export interface DailyWord {
  id: string;
  title: string;
  scriptureReference: string;
  bibleVerse: string;
  message: string;
  publishDate: string;
  author?: string;
  youtubeVideoId?: string;
  youtubeType?: 'short' | 'video';
  status: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
}

// Event
export interface Event {
  id: string;
  title: string;
  description?: string;
  eventDate: string;
  startTime?: string;
  endTime?: string;
  location?: string;
  address?: string;
  imageUrl?: string;
  status: 'draft' | 'published' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

// Recurring Service (weekly fellowships and services)
export interface RecurringService {
  id: string;
  title: string;
  category: string;
  description?: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string;
  endTime?: string;
  timezone: string;
  location?: string;
  displayOrder: number;
  status: 'draft' | 'published';
  
  // New service classification fields
  serviceCategory?: 'WORSHIP' | 'PRAYER' | 'FELLOWSHIP';
  region?: 'SINGAPORE' | 'INDIA';
  fellowshipGroup?: 'WOMEN_FELLOWSHIP' | 'DOR_BROTHERS';
  branchId?: string;
  
  createdAt?: string;
  updatedAt?: string;
}

// Branch (location/region presence)
export interface Branch {
  id: string;
  region: 'SINGAPORE' | 'INDIA';
  branchName: string;
  location?: string;
  address?: string;
  mapUrl?: string;
  displayOrder: number;
  status: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
}

// Sermon (with YouTube video support)
export interface Sermon {
  id: string;
  title: string;
  description?: string;
  speaker?: string;
  sermonDate: string;
  youtubeVideoId: string;
  youtubeType: 'video';
  status: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
}

// Admin User Profile
export interface AdminProfile {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  fullName?: string;
  createdAt: string;
  updatedAt: string;
}

// Announcement (optional, for future use)
export interface Announcement {
  id: string;
  title: string;
  content: string;
  publishDate: string;
  status: 'draft' | 'published';
  createdAt?: string;
  updatedAt?: string;
}

// Prayer Request (form submission + admin management)
export interface PrayerRequest {
  id: string;
  name: string;
  email: string;
  prayerRequest: string;
  contactRequested: boolean;
  status: 'new' | 'read' | 'prayed' | 'archived';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Prayer Request Form (what public users submit)
export interface PrayerRequestForm {
  name: string;
  email: string;
  prayerRequest: string;
  contactRequested: boolean;
}

// Testimony (personal story of God's faithfulness)
export interface Testimony {
  id: string;
  title: string;
  content: string;
  submittedName: string;
  displayPreference: 'FULL_NAME' | 'FIRST_NAME_ONLY' | 'ANONYMOUS';
  branchId?: string;
  status: 'draft' | 'published' | 'rejected';
  displayOrder: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Testimony Form (what public users submit)
export interface TestimonyForm {
  title: string;
  content: string;
  submittedName: string;
  displayPreference: 'FULL_NAME' | 'FIRST_NAME_ONLY' | 'ANONYMOUS';
  branchId?: string;
}
