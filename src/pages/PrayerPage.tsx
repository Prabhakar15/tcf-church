import Card from '../components/ui/Card';

export default function PrayerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4">Prayer</h1>
        <div className="accent-bar mb-6"></div>
      </div>

      <Card variant="accent">
        <p className="text-base">
          Prayer request functionality will be implemented in a future milestone.
        </p>
      </Card>
    </div>
  );
}
