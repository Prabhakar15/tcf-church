import Card from '../components/ui/Card';

export default function DailyWordPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4">Daily Word</h1>
        <div className="accent-bar mb-6"></div>
      </div>

      <Card variant="accent">
        <p className="text-base">
          TCF Daily Word content will be implemented in a future milestone.
        </p>
      </Card>
    </div>
  );
}
