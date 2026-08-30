import Card from '../components/ui/Card';

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4">About TCF</h1>
        <div className="accent-bar mb-6"></div>
      </div>

      <Card variant="accent">
        <p className="text-base">
          About TCF content will be implemented in a future milestone.
        </p>
      </Card>
    </div>
  );
}
