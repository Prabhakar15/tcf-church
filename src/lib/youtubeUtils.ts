/**
 * Extracts YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - VIDEO_ID (raw ID)
 */
export function extractYouTubeVideoId(urlOrId: string): string | null {
  if (!urlOrId || typeof urlOrId !== 'string') {
    return null;
  }

  const trimmed = urlOrId.trim();

  // Check if it's already a valid video ID (11 characters, alphanumeric, hyphens, underscores)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    // Try to parse as URL
    const url = new URL(trimmed);
    
    // Handle youtube.com/watch?v=...
    if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
      const videoId = url.searchParams.get('v');
      if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        return videoId;
      }
      
      // Handle youtube.com/shorts/...
      const pathParts = url.pathname.split('/');
      if (pathParts[1] === 'shorts' && pathParts[2]) {
        const shortId = pathParts[2];
        if (/^[a-zA-Z0-9_-]{11}$/.test(shortId)) {
          return shortId;
        }
      }
    }
    
    // Handle youtu.be/...
    if (url.hostname === 'youtu.be') {
      const videoId = url.pathname.slice(1);
      if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
        return videoId;
      }
    }
  } catch {
    // Not a valid URL, might be just an ID
  }

  return null;
}

/**
 * Validates if a string is a valid YouTube video ID
 */
export function isValidYouTubeId(id: string): boolean {
  return /^[a-zA-Z0-9_-]{11}$/.test(id);
}

/**
 * Constructs a YouTube embed URL for an iframe
 */
export function getYouTubeEmbedUrl(videoId: string, type: 'video' | 'short' = 'video'): string {
  if (!isValidYouTubeId(videoId)) {
    throw new Error(`Invalid YouTube video ID: ${videoId}`);
  }

  if (type === 'short') {
    // YouTube Shorts use a different embed URL
    return `https://www.youtube.com/embed/${videoId}?fs=1`;
  }

  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Constructs a YouTube watch URL for links
 */
export function getYouTubeWatchUrl(videoId: string): string {
  if (!isValidYouTubeId(videoId)) {
    throw new Error(`Invalid YouTube video ID: ${videoId}`);
  }
  return `https://www.youtube.com/watch?v=${videoId}`;
}
