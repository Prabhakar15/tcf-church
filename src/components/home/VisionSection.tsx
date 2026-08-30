import Card from '../ui/Card';

export default function VisionSection() {
  return (
    <section className="py-section bg-tcf-light-bg">
      <div className="container-max max-w-content-lg">
        <div className="text-center mb-12">
          <h2 className="mb-6">Our Vision</h2>
          <div className="space-y-4 text-2xl font-semibold text-tcf-navy mb-8">
            <p>A Church Without Boundaries</p>
            <p>A Family Over a Community</p>
          </div>
          <div className="w-16 h-1 bg-tcf-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="mb-4 text-tcf-navy">Worship & Presence</h3>
            <p className="text-text-muted">
              We gather together to know Jesus Christ more deeply, worship Him authentically, and experience the presence of God in our midst.
            </p>
          </Card>

          <Card>
            <h3 className="mb-4 text-tcf-navy">Discipleship</h3>
            <p className="text-text-muted">
              Our mission focuses on equipping believers to grow spiritually, understand Scripture, and live out their faith with purpose and conviction.
            </p>
          </Card>

          <Card>
            <h3 className="mb-4 text-tcf-navy">Sharing God&apos;s Love</h3>
            <p className="text-text-muted">
              We are passionate about bringing the good news to family and friends in their hometowns, sharing God&apos;s love, joy, and peace with all.
            </p>
          </Card>

          <Card>
            <h3 className="mb-4 text-tcf-navy">Transformation</h3>
            <p className="text-text-muted">
              Through faith, community, and God&apos;s grace, we seek to inspire, empower, and transform lives—bringing hope and belonging to all who enter.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
