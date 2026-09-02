import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTodaysDailyWord } from '../../lib/queries/dailyWords';
import type { DailyWord } from '../../types';

export default function DailyWordPreview() {
  const [todayWord, setTodayWord] = useState<DailyWord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadDailyWord = async () => {
      setLoading(true);
      setError(false);
      try {
        const word = await getTodaysDailyWord();
        setTodayWord(word);
      } catch (err) {
        console.error('Error loading Daily Word:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadDailyWord();
  }, []);

  return (
    <section className="daily-word-preview">
      <div className="daily-word-container">
        {/* Header */}
        <div className="daily-word-preview-header">
          <p className="daily-word-label">Daily Inspiration</p>
          <h2>Today&apos;s Word</h2>
        </div>

        {/* Content Card */}
        {loading ? (
          <div className="daily-word-card daily-word-loading">
            <p>Loading today's Daily Word...</p>
          </div>
        ) : error || !todayWord ? (
          <div className="daily-word-card daily-word-empty">
            <p>No Daily Word available at the moment. Please check back soon.</p>
          </div>
        ) : (
          <>
            <div className="daily-word-card">
              {/* Scripture Reference */}
              <p className="scripture-ref">{todayWord.scriptureReference}</p>

              {/* Title */}
              <h3 className="daily-word-title">{todayWord.title}</h3>

              {/* Verse */}
              <blockquote className="bible-verse">
                &ldquo;{todayWord.bibleVerse}&rdquo;
              </blockquote>

              {/* Message */}
              <p className="daily-word-message">{todayWord.message}</p>

              {/* Divider */}
              <div className="daily-word-preview-divider"></div>

              {/* CTA */}
              <Link to="/daily-word" className="daily-word-read-btn">
                Read Full Daily Word
              </Link>
            </div>

            {/* Quote attribution */}
            <div className="daily-word-footer">
              <p>New word daily &middot; Encouraging your faith journey</p>
            </div>
          </>
        )}
      </div>

      <style>{`
        .daily-word-preview {
          padding: 4rem 1.5rem;
          background-color: #f9fafb;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 767px) {
          .daily-word-preview {
            padding: 2.5rem 1rem;
          }
        }

        .daily-word-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .daily-word-preview-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .daily-word-label {
          font-size: 0.875rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: #C9A227;
          margin: 0;
          margin-bottom: 1rem;
        }

        .daily-word-preview-header h2 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #0B1F3A;
          margin: 0;
          line-height: 1.2;
        }

        @media (max-width: 767px) {
          .daily-word-preview-header h2 {
            font-size: 2rem;
          }
        }

        .daily-word-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 3rem 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        @media (max-width: 767px) {
          .daily-word-card {
            padding: 2rem 1.5rem;
          }
        }

        .daily-word-loading,
        .daily-word-empty {
          text-align: center;
          color: #6B7280;
          font-size: 1rem;
        }

        .scripture-ref {
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #C9A227;
          margin: 0 0 1rem 0;
        }

        .daily-word-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #0B1F3A;
          margin: 0 0 1.5rem 0;
          line-height: 1.3;
        }

        .bible-verse {
          font-size: 1.125rem;
          color: #1F2937;
          font-style: italic;
          line-height: 1.8;
          margin: 0 0 1.5rem 0;
          padding: 1.5rem;
          background-color: #f3f4f6;
          border-left: 3px solid #C9A227;
          border-radius: 4px;
        }

        .daily-word-message {
          font-size: 1rem;
          color: #6B7280;
          line-height: 1.7;
          margin: 0 0 2rem 0;
        }

        .daily-word-preview-divider {
          height: 1px;
          background-color: #e5e7eb;
          margin: 2rem 0;
        }

        .daily-word-read-btn {
          display: inline-block;
          padding: 0.875rem 1.75rem;
          background-color: #0B1F3A;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 700;
          transition: all 0.3s ease;
          border: 2px solid #0B1F3A;
        }

        .daily-word-read-btn:hover {
          background-color: #1a3a52;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(11, 31, 58, 0.15);
        }

        .daily-word-footer {
          text-align: center;
          margin-top: 2rem;
        }

        .daily-word-footer p {
          font-size: 0.875rem;
          color: #9CA3AF;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
