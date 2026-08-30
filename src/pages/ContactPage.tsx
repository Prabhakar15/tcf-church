import Card from '../components/ui/Card';

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4">Contact</h1>
        <div className="accent-bar mb-6"></div>
      </div>

      <Card variant="accent">
        <p className="text-base">
          Contact form will be implemented in a future milestone.
        </p>
      </Card>
    </div>
  );
}
