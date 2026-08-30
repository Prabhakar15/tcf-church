import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="mb-4">Tabernacle Christ Fellowship</h1>
        <p className="text-3xl text-[#6B7280] mb-2">A Church Without Boundaries</p>
        <p className="text-3xl text-[#6B7280] mb-8">A Family Over a Community</p>
        <p className="text-base text-[#6B7280] mb-12">TCF Singapore</p>
      </section>

      {/* Placeholder Card */}
      <Card variant="accent">
        <p className="text-base">
          Homepage content will be implemented in Step 4.
        </p>
      </Card>

      {/* Button Examples Section */}
      <section className="mt-12">
        <h2 className="mb-8">Design System</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="space-y-4">
              <h3>Button Styles</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <h3>Color Palette</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-tcf-navy rounded"></div>
                  <span>Deep Navy: #0B1F3A</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-tcf-gold rounded"></div>
                  <span>Warm Gold: #C9A227</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-tcf-light-bg rounded border border-gray-300"></div>
                  <span>Light Background: #F8F7F3</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
