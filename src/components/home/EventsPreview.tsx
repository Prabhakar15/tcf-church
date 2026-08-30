import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function EventsPreview() {
  return (
    <section className="py-section bg-white">
      <div className="container-max max-w-content-lg">
        <div className="text-center mb-12">
          <h2 className="mb-6">Upcoming Events</h2>
          <div className="accent-bar mx-auto mb-8"></div>
        </div>

        <Card variant="accent">
          <div className="text-center space-y-6 py-12">
            <div className="text-4xl">📅</div>
            <h3 className="text-xl font-semibold text-tcf-navy">
              Check back soon for upcoming TCF gatherings and events
            </h3>
            <p className="text-text-muted max-w-md mx-auto">
              We&apos;re planning meaningful times of fellowship, worship, and service. Check back regularly for announcements about special events, gatherings, and community activities.
            </p>
            <div className="pt-4">
              <Link to="/events">
                <Button variant="primary">
                  View Events
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
