import { useEffect, useState } from 'react';
import type { DailyWord } from '../types';
import { getPublishedDailyWords } from '../lib/queries/dailyWords';
import YouTubeEmbed from '../components/youtube/YouTubeEmbed';

export default function DailyWordPage() {
  const [allWords, setAllWords] = useState<DailyWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDailyWords = async () => {
      setLoading(true);
      setError('');
      try {
        const words = await getPublishedDailyWords();
        setAllWords(words);
      } catch (err) {
        setError('Unable to load Daily Word. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadDailyWords();
  }, []);

  const hasWords = allWords && allWords.length > 0;

  return (
    <div className="daily-word-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="page-header-container">
          <h1>Daily Word</h1>
          <p>Daily encouragement and reflection from Scripture</p>
        </div>
      </section>

      {/* Content */}
      <section className="page-content">
        <div className="page-container">
          {loading ? (
            <div className="loading-state">Loading today's Daily Word...</div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
            </div>
          ) : hasWords ? (
            <>
              {/* Latest Word */}
              <div className="latest-word">
                <div className="latest-word-card">
                  <span className="latest-badge">Latest</span>
                  <p className="scripture-ref">{allWords[0].scriptureReference}</p>
                  <h2>{allWords[0].title}</h2>
                  <blockquote className="bible-verse">
                    &ldquo;{allWords[0].bibleVerse}&rdquo;
                  </blockquote>
                  <p className="message">{allWords[0].message}</p>

                  {allWords[0].youtubeVideoId && (
                    <div className="youtube-section">
                      <YouTubeEmbed videoId={allWords[0].youtubeVideoId} type={allWords[0].youtubeType || 'short'} />
                    </div>
                  )}

                  <p className="meta">
                    {new Date(allWords[0].publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    {allWords[0].author && ` • ${allWords[0].author}`}
                  </p>
                </div>
              </div>

              {/* Archive */}
              {allWords.length > 1 && (
                <div className="archive-section">
                  <h3>Previous Daily Words</h3>
                  <div className="archive-grid">
                    {allWords.slice(1).map((word) => (
                      <div key={word.id} className="archive-item">
                        <p className="archive-date">
                          {new Date(word.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                        <h4>{word.title}</h4>
                        <p className="archive-ref">{word.scriptureReference}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <p>No Daily Word is available at the moment. Please check back soon.</p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .daily-word-page {
          width: 100%;
        }

        .page-header {
          background-color: #0B1F3A;
          color: white;
          padding: 4rem 1.5rem;
          text-align: center;
        }

        @media (max-width: 767px) {
          .page-header {
            padding: 2rem 1rem;
          }
        }

        .page-header-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .page-header h1 {
          font-size: 3rem;
          font-weight: 800;
          margin: 0;
        }

        @media (max-width: 767px) {
          .page-header h1 {
            font-size: 2rem;
          }
        }

        .page-header p {
          font-size: 1.25rem;
          color: #E5E7EB;
          margin: 0.5rem 0 0 0;
        }

        .page-content {
          padding: 4rem 1.5rem;
          background-color: #ffffff;
        }

        @media (max-width: 767px) {
          .page-content {
            padding: 2rem 1rem;
          }
        }

        .page-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .loading-state {
          text-align: center;
          padding: 3rem;
          color: #6B7280;
          font-size: 1rem;
        }

        .error-state {
          background-color: #fee2e2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
        }

        .error-state p {
          margin: 0;
        }

        .latest-word {
          margin-bottom: 4rem;
        }

        .latest-word-card {
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 3rem 2rem;
          position: relative;
        }

        @media (max-width: 767px) {
          .latest-word-card {
            padding: 2rem 1.5rem;
          }
        }

        .latest-badge {
          display: inline-block;
          background-color: #C9A227;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
        }

        .scripture-ref {
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #C9A227;
          margin: 0;
        }

        .latest-word-card h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #0B1F3A;
          margin: 1rem 0;
        }

        .bible-verse {
          font-size: 1.125rem;
          color: #1F2937;
          font-style: italic;
          line-height: 1.8;
          margin: 1.5rem 0;
          padding: 1.5rem;
          background-color: white;
          border-left: 3px solid #C9A227;
          border-radius: 4px;
        }

        .message {
          font-size: 1rem;
          color: #6B7280;
          line-height: 1.7;
          margin: 1.5rem 0;
        }

        .youtube-section {
          margin: 2rem 0;
          padding: 1.5rem;
          background-color: white;
          border-radius: 8px;
        }

        .meta {
          font-size: 0.875rem;
          color: #9CA3AF;
          margin: 0;
        }

        .archive-section {
          margin-top: 3rem;
        }

        .archive-section h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0B1F3A;
          margin: 0 0 2rem 0;
        }

        .archive-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }

        .archive-item {
          padding: 1.5rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background-color: #f9fafb;
        }

        .archive-date {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #C9A227;
          margin: 0;
        }

        .archive-item h4 {
          font-size: 1rem;
          font-weight: 700;
          color: #0B1F3A;
          margin: 0.75rem 0;
        }

        .archive-ref {
          font-size: 0.875rem;
          color: #6B7280;
          margin: 0;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        }

        .empty-state p {
          font-size: 1.125rem;
          color: #6B7280;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
