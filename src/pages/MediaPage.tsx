import { useEffect, useState } from 'react';
import type { Sermon } from '../types';
import { getPublishedSermons } from '../lib/queries/sermons';
import YouTubeEmbed from '../components/youtube/YouTubeEmbed';
import { churchData } from '../data/church';

type MediaTab = 'sermons' | 'selah' | 'youtube';

export default function MediaPage() {
  const [activeTab, setActiveTab] = useState<MediaTab>('sermons');
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

  const tcfSelahs = sermons.filter(s => s.title?.toLowerCase().includes('selah'));

  return (
    <div className="media-page">
      <section className="page-header">
        <div className="page-header-container">
          <p className="media-eyebrow">TCF MEDIA</p>
          <h1>Watch, Listen & Connect</h1>
          <p>Explore sermons, TCF Selah music, and more from the TCF Singapore community.</p>
        </div>
      </section>

      <section className="page-content">
        <div className="page-container">
          {/* Tab Navigation */}
          <div className="media-tabs">
            <button
              className={`tab-button ${activeTab === 'sermons' ? 'active' : ''}`}
              onClick={() => setActiveTab('sermons')}
              aria-selected={activeTab === 'sermons'}
              role="tab"
            >
              Sermons
            </button>
            <button
              className={`tab-button ${activeTab === 'selah' ? 'active' : ''}`}
              onClick={() => setActiveTab('selah')}
              aria-selected={activeTab === 'selah'}
              role="tab"
            >
              TCF Selah
            </button>
            <button
              className={`tab-button ${activeTab === 'youtube' ? 'active' : ''}`}
              onClick={() => setActiveTab('youtube')}
              aria-selected={activeTab === 'youtube'}
              role="tab"
            >
              YouTube / Shorts
            </button>
          </div>

          {/* Sermons Tab */}
          {activeTab === 'sermons' && (
            <div className="tab-content" role="tabpanel">
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
          )}

          {/* TCF Selah Tab */}
          {activeTab === 'selah' && (
            <div className="tab-content" role="tabpanel">
              <div className="selah-content">
                <h2>TCF Selah Music</h2>
                <p className="selah-intro">
                  Enjoy uplifting music and worship from the TCF Selah collection.
                </p>
                {tcfSelahs.length > 0 ? (
                  <div className="selah-grid">
                    {tcfSelahs.map((selah) => (
                      <div key={selah.id} className="selah-card">
                        <h3>{selah.title}</h3>
                        {selah.speaker && <p className="speaker">{selah.speaker}</p>}
                        {selah.description && <p className="selah-description">{selah.description}</p>}
                        {selah.youtubeVideoId && (
                          <div className="youtube-container">
                            <YouTubeEmbed videoId={selah.youtubeVideoId} type={selah.youtubeType} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>TCF Selah music coming soon.</p>
                    <a href={churchData.social.youtube} target="_blank" rel="noopener noreferrer" className="youtube-btn">
                      Visit TCF on YouTube
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* YouTube / Shorts Tab */}
          {activeTab === 'youtube' && (
            <div className="tab-content" role="tabpanel">
              <div className="youtube-tab-content">
                <h2>YouTube & Shorts</h2>
                <p className="youtube-intro">
                  Visit the official TCF Singapore YouTube channel to discover:
                </p>
                <ul className="youtube-features">
                  <li>YouTube Shorts</li>
                  <li>Complete sermons and teachings</li>
                  <li>TCF Selah music</li>
                  <li>Other TCF video content</li>
                </ul>
                <a href={churchData.social.youtube} target="_blank" rel="noopener noreferrer" className="youtube-cta-btn">
                  Visit TCF on YouTube
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .media-page { width: 100%; }
        .page-header { background-color: #0B1F3A; color: white; padding: 4rem 1.5rem; text-align: center; }
        @media (max-width: 767px) { .page-header { padding: 2rem 1rem; } }
        .page-header-container { max-width: 1280px; margin: 0 auto; }
        .media-eyebrow { font-size: 0.875rem; font-weight: 800; text-transform: uppercase; letter-spacing: 2.5px; color: #C9A227; margin: 0 0 1rem 0; }
        .page-header h1 { font-size: 3rem; font-weight: 800; margin: 0 0 1rem 0; }
        @media (max-width: 767px) { .page-header h1 { font-size: 2rem; } }
        .page-header p { font-size: 1.125rem; color: #E5E7EB; margin: 0; max-width: 700px; margin-left: auto; margin-right: auto; }
        .page-content { padding: 4rem 1.5rem; background-color: #ffffff; }
        @media (max-width: 767px) { .page-content { padding: 2rem 1rem; } }
        .page-container { max-width: 1000px; margin: 0 auto; }
        
        .media-tabs { display: flex; gap: 1rem; margin-bottom: 3rem; border-bottom: 2px solid #e5e7eb; }
        @media (max-width: 767px) { .media-tabs { gap: 0.5rem; margin-bottom: 2rem; } }
        
        .tab-button { 
          padding: 1rem 1.5rem; 
          background: none; 
          border: none; 
          border-bottom: 3px solid transparent; 
          font-size: 1rem; 
          font-weight: 600; 
          color: #6B7280; 
          cursor: pointer; 
          transition: all 0.3s ease;
          margin-bottom: -2px;
        }
        @media (max-width: 767px) { .tab-button { padding: 0.75rem 1rem; font-size: 0.95rem; } }
        
        .tab-button:hover { color: #0B1F3A; }
        .tab-button.active { color: #C9A227; border-bottom-color: #C9A227; }
        .tab-button:focus { outline: 2px solid #C9A227; outline-offset: -2px; }
        
        .tab-content { margin-top: 2rem; }
        
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
        
        .youtube-btn { 
          display: inline-block; 
          margin-top: 1.5rem; 
          padding: 0.75rem 1.5rem; 
          background-color: #C9A227; 
          color: white; 
          text-decoration: none; 
          border-radius: 8px; 
          font-weight: 600; 
          transition: all 0.3s ease; 
        }
        .youtube-btn:hover { background-color: #B8921F; transform: translateY(-2px); }
        
        .selah-content h2 { font-size: 2rem; font-weight: 700; color: #0B1F3A; margin: 0 0 1rem 0; }
        .selah-intro { font-size: 1rem; color: #6B7280; margin: 0 0 2rem 0; line-height: 1.6; }
        .selah-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2.5rem; }
        .selah-card { padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #f9fafb; }
        .selah-card h3 { font-size: 1.25rem; font-weight: 700; color: #0B1F3A; margin: 0 0 0.5rem 0; }
        .selah-description { font-size: 0.95rem; color: #6B7280; line-height: 1.6; margin: 0.5rem 0; }
        
        .youtube-tab-content { text-align: center; padding: 3rem 2rem; }
        .youtube-tab-content h2 { font-size: 2rem; font-weight: 700; color: #0B1F3A; margin: 0 0 1.5rem 0; }
        .youtube-intro { font-size: 1rem; color: #6B7280; margin: 0 0 2rem 0; }
        .youtube-features { 
          list-style: none; 
          padding: 0; 
          margin: 0 0 2rem 0; 
          display: inline-block; 
          text-align: left; 
        }
        .youtube-features li { font-size: 1rem; color: #6B7280; padding: 0.5rem 0; margin-left: 2rem; position: relative; }
        .youtube-features li:before { content: '▶'; position: absolute; left: -1.5rem; color: #C9A227; }
        .youtube-cta-btn { 
          display: inline-block; 
          padding: 1rem 2rem; 
          background-color: #C9A227; 
          color: white; 
          text-decoration: none; 
          border-radius: 8px; 
          font-weight: 700; 
          font-size: 1.1rem;
          transition: all 0.3s ease; 
        }
        .youtube-cta-btn:hover { background-color: #B8921F; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(201, 162, 39, 0.25); }
      `}</style>
    </div>
  );
}
