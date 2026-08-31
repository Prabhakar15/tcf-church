import { useEffect, useState } from 'react';
import type { Sermon } from '../types';
import { getPublishedSermons } from '../lib/queries/sermons';
import YouTubeEmbed from '../components/youtube/YouTubeEmbed';
import { churchData } from '../data/church';

export default function SermonsPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSermons = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getPublishedSermons();
        setSermons(data);
      } catch (err) {
        setError('Unable to load sermons. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSermons();
  }, []);

  return (
    <div className="sermons-page">
      <section className="page-header">
        <div className="page-header-container">
          <h1>Sermons</h1>
          <p>Watch TCF messages and teachings</p>
        </div>
      </section>

      <section className="page-content">
        <div className="page-container">
          {loading ? (
            <div className="loading">Loading sermons...</div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
            </div>
          ) : sermons.length > 0 ? (
            <div className="sermons-grid">
              {sermons.map((sermon) => (
                <div key={sermon.id} className="sermon-card">
                  <h3>{sermon.title}</h3>
                  {sermon.speaker && <p className="speaker">{sermon.speaker}</p>}
                  <p className="sermon-date">
                    {new Date(sermon.sermonDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  {sermon.description && <p className="sermon-description">{sermon.description}</p>}
                  {sermon.youtubeVideoId && (
                    <div className="youtube-container">
                      <YouTubeEmbed videoId={sermon.youtubeVideoId} type={sermon.youtubeType} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No sermons available at the moment.</p>
              <p style={{ marginTop: '1rem', fontSize: '0.95rem' }}>
                Watch more on our YouTube channel.
              </p>
              <a href={churchData.social.youtube} target="_blank" rel="noopener noreferrer" className="youtube-btn">
                Visit TCF on YouTube
              </a>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .sermons-page { width: 100%; }
        .page-header { background-color: #0B1F3A; color: white; padding: 4rem 1.5rem; text-align: center; }
        @media (max-width: 767px) { .page-header { padding: 2rem 1rem; } }
        .page-header-container { max-width: 1280px; margin: 0 auto; }
        .page-header h1 { font-size: 3rem; font-weight: 800; margin: 0; }
        @media (max-width: 767px) { .page-header h1 { font-size: 2rem; } }
        .page-header p { font-size: 1.125rem; color: #E5E7EB; margin: 0.5rem 0 0 0; }
        .page-content { padding: 4rem 1.5rem; background-color: #ffffff; }
        @media (max-width: 767px) { .page-content { padding: 2rem 1rem; } }
        .page-container { max-width: 1000px; margin: 0 auto; }
        .loading { text-align: center; padding: 2rem; color: #6B7280; }
        .error-state { background-color: #fee2e2; border: 1px solid #fecaca; color: #dc2626; padding: 1.5rem; border-radius: 12px; text-align: center; }
        .error-state p { margin: 0; }
        .sermons-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2.5rem; }
        .sermon-card { padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #f9fafb; }
        .sermon-card h3 { font-size: 1.25rem; font-weight: 700; color: #0B1F3A; margin: 0 0 0.5rem 0; }
        .speaker { font-size: 0.95rem; color: #C9A227; font-weight: 600; margin: 0 0 0.5rem 0; }
        .sermon-date { font-size: 0.875rem; color: #9CA3AF; margin: 0 0 1rem 0; }
        .sermon-description { font-size: 0.95rem; color: #6B7280; line-height: 1.6; margin: 0.5rem 0; }
        .youtube-container { margin-top: 1rem; padding: 1rem; background-color: white; border-radius: 8px; }
        .empty-state { text-align: center; padding: 4rem 2rem; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; }
        .empty-state p { font-size: 1rem; color: #6B7280; margin: 0; }
        .youtube-btn { display: inline-block; margin-top: 1.5rem; padding: 0.75rem 1.5rem; background-color: #C9A227; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s ease; }
        .youtube-btn:hover { background-color: #B8921F; transform: translateY(-2px); }
      `}</style>
    </div>
  );
}
