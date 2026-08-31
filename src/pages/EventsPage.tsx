import { useEffect, useState } from 'react';
import type { Event } from '../types';
import { getPublishedEvents } from '../lib/queries/events';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getPublishedEvents();
        setEvents(data);
      } catch (err) {
        setError('Unable to load events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="events-page">
      <section className="page-header">
        <div className="page-header-container">
          <h1>Events</h1>
          <p>Join us for worship, fellowship, and community events</p>
        </div>
      </section>

      <section className="page-content">
        <div className="page-container">
          {loading ? (
            <div className="loading">Loading events...</div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
            </div>
          ) : events.length > 0 ? (
            <div className="events-grid">
              {events.map((event) => (
                <div key={event.id} className="event-card">
                  <h3>{event.title}</h3>
                  {event.description && <p>{event.description}</p>}
                  <p className="event-details">
                    {new Date(event.eventDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    {event.startTime && ` at ${event.startTime}`}
                  </p>
                  {event.location && <p className="event-location">{event.location}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No upcoming events at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .events-page { width: 100%; }
        .page-header { background-color: #0B1F3A; color: white; padding: 4rem 1.5rem; text-align: center; }
        @media (max-width: 767px) { .page-header { padding: 2rem 1rem; } }
        .page-header-container { max-width: 1280px; margin: 0 auto; }
        .page-header h1 { font-size: 3rem; font-weight: 800; margin: 0; }
        @media (max-width: 767px) { .page-header h1 { font-size: 2rem; } }
        .page-header p { font-size: 1.125rem; color: #E5E7EB; margin: 0.5rem 0 0 0; }
        .page-content { padding: 4rem 1.5rem; background-color: #ffffff; }
        @media (max-width: 767px) { .page-content { padding: 2rem 1rem; } }
        .page-container { max-width: 900px; margin: 0 auto; }
        .loading { text-align: center; padding: 2rem; color: #6B7280; }
        .error-state { background-color: #fee2e2; border: 1px solid #fecaca; color: #dc2626; padding: 1.5rem; border-radius: 12px; text-align: center; }
        .error-state p { margin: 0; }
        .events-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; }
        .event-card { padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #f9fafb; }
        .event-card h3 { font-size: 1.25rem; font-weight: 700; color: #0B1F3A; margin: 0 0 1rem 0; }
        .event-card p { font-size: 0.95rem; color: #6B7280; line-height: 1.7; margin: 0 0 0.5rem 0; }
        .event-details { font-weight: 600; color: #0B1F3A; }
        .event-location { font-size: 0.875rem; color: #9CA3AF; }
        .empty-state { text-align: center; padding: 4rem 2rem; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; }
        .empty-state p { font-size: 1.125rem; color: #6B7280; margin: 0; }
      `}</style>
    </div>
  );
}
