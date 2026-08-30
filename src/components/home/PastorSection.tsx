import Card from '../ui/Card';

export default function PastorSection() {
  return (
    <section className="py-section bg-tcf-light-bg">
      <div className="container-max max-w-content-lg">
        <h2 className="text-center mb-12">Meet Our Pastor</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Photo Placeholder */}
          <div className="flex items-center justify-center">
            <Card variant="default" className="w-full aspect-square flex items-center justify-center bg-white">
              <div className="text-center space-y-4">
                <div className="text-6xl text-tcf-gold">✝</div>
                <h3 className="text-xl font-semibold text-tcf-navy">Pastor Daniel Modi</h3>
                <p className="text-sm text-text-muted italic">
                  Photo coming soon
                </p>
              </div>
            </Card>
          </div>

          {/* Pastor Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-tcf-navy mb-2">
                Pastor Daniel Modi
              </h3>
              <div className="accent-bar mb-4"></div>
            </div>

            <p className="text-text-dark leading-relaxed">
              Pastor Daniel Modi founded Tabernacle Christ Fellowship in 2010 alongside his wife, Lalitha Modi. His heart for ministry extends beyond the pulpit—he serves as a father figure and mentor to many brothers and sisters who find themselves far from their families.
            </p>

            <p className="text-text-dark leading-relaxed">
              Recognizing the unique challenges faced by expatriate communities, particularly those from worker backgrounds, Pastor Daniel has created an environment where people experience genuine family and belong. His pastoral heart focuses on discipleship, authentic worship, and helping believers encounter the presence of God in meaningful ways.
            </p>

            <p className="text-text-dark leading-relaxed">
              Under his leadership, TCF has become more than just a church—it&apos;s a community where faith, fellowship, and the love of Jesus Christ transform lives and create lasting bonds of family.
            </p>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-text-muted italic">
                Learn more about TCF&apos;s ministry by connecting with us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
