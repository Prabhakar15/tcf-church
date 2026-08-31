import { getYouTubeEmbedUrl } from '../../lib/youtubeUtils';

interface YouTubeEmbedProps {
  videoId: string;
  type?: 'video' | 'short';
  title?: string;
  className?: string;
}

export default function YouTubeEmbed({ videoId, type = 'video', title, className = '' }: YouTubeEmbedProps) {
  try {
    const embedUrl = getYouTubeEmbedUrl(videoId, type);

    return (
      <div className={`youtube-embed ${type === 'short' ? 'short' : 'video'} ${className}`}>
        <iframe
          src={embedUrl}
          title={title || 'YouTube Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  } catch (error) {
    console.error('Invalid YouTube video ID:', error);
    return null;
  }
}

export const youtubeEmbedStyles = `
  .youtube-embed {
    width: 100%;
    margin: 1.5rem 0;
  }

  .youtube-embed.video {
    aspect-ratio: 16 / 9;
  }

  .youtube-embed.short {
    aspect-ratio: 9 / 16;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .youtube-embed iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
  }
`;
