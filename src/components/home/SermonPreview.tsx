import Button from '../ui/Button';
import Card from '../ui/Card';

export default function SermonPreview() {
  return (
    <section className="py-section bg-tcf-light-bg">
      <div className="container-max max-w-content-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Placeholder */}
          <Card variant="default">
            <div className="text-center space-y-4 py-12">
              <div className="text-4xl text-tcf-navy">🎬</div>
              <h3 className="font-semibold text-tcf-navy">
                Watch Messages & Services
              </h3>
              <p className="text-sm text-text-muted">
                Visit our YouTube channel to access our full collection of sermons and messages.
              </p>
            </div>
          </Card>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-4">Watch Our Sermons</h2>
              <div className="accent-bar"></div>
            </div>

            <p className="text-lg text-text-dark leading-relaxed">
              Discover powerful messages that inspire spiritual growth and deepen your walk with Christ. Our sermons explore Scripture, faith, and the transformative power of God&apos;s love.
            </p>

            <p className="text-text-muted leading-relaxed">
              From Pastor Daniel Modi and other teachers, each message is crafted to challenge, encourage, and point you toward Jesus. Access our complete library of messages on the TCF Singapore YouTube channel.
            </p>

            <div className="pt-4">
              <a
                href="https://www.youtube.com/@TCFSingapore"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary">
                  Visit TCF on YouTube
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
