import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function DailyWordPreview() {
  return (
    <section className="py-section bg-white">
      <div className="container-max max-w-content-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-4">Today&apos;s Word</h2>
              <div className="accent-bar"></div>
            </div>

            <p className="text-lg text-text-dark leading-relaxed">
              Start your day with encouragement and reflection from Scripture. TCF&apos;s Daily Word provides spiritual nourishment and biblical insight to guide your journey of faith.
            </p>

            <p className="text-text-muted leading-relaxed">
              Each day, we share a fresh word of hope and wisdom to inspire your walk with Jesus Christ. Whether you&apos;re facing challenges, seeking clarity, or simply wanting to deepen your faith, let God&apos;s word transform your day.
            </p>

            <div className="pt-4">
              <Link to="/daily-word">
                <Button variant="primary">
                  View Daily Word
                </Button>
              </Link>
            </div>
          </div>

          {/* Placeholder Card */}
          <Card variant="accent">
            <div className="text-center space-y-4 py-12">
              <div className="text-4xl text-tcf-navy font-light">📖</div>
              <h3 className="font-semibold text-tcf-navy">
                Daily encouragement and reflection
              </h3>
              <p className="text-sm text-text-muted">
                The Daily Word will appear here once it becomes available.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
