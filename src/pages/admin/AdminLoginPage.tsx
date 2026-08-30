import Card from '../../components/ui/Card';

export default function AdminLoginPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-4">Admin Login</h1>
        <div className="accent-bar mb-6"></div>
      </div>

      <Card variant="accent">
        <p className="text-base">
          Admin authentication will be implemented in a future milestone.
        </p>
      </Card>
    </div>
  );
}
