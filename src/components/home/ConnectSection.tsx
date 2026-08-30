import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function ConnectSection() {
  return (
    <section className="py-section-lg bg-tcf-navy text-white">
      <div className="container-max max-w-content-lg text-center">
        <h2 className="text-white mb-6">You Are Welcome Here</h2>
        <div className="accent-bar bg-tcf-gold mx-auto mb-8" style={{height: '0.25rem'}}></div>

        <p className="text-xl leading-relaxed max-w-2xl mx-auto mb-12">
          Whether you&apos;re a longtime believer, exploring faith for the first time, or simply seeking community and belonging, TCF welcomes you. We are more than just a church—we are a family united in faith, service, and love.
        </p>

        <div className="space-y-6 mb-12">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Community & Fellowship</h3>
            <p className="text-gray-100 max-w-xl mx-auto">
              Experience genuine community where faith is shared, struggles are supported, and joy is celebrated together.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Faith & Growth</h3>
            <p className="text-gray-100 max-w-xl mx-auto">
              Deepen your relationship with Jesus Christ through worship, teaching, and discipleship that transforms lives.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Belonging & Purpose</h3>
            <p className="text-gray-100 max-w-xl mx-auto">
              Find your place in a family that values every person and helps you discover your purpose in God&apos;s kingdom.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/about">
            <Button variant="secondary" size="lg">
              Learn More About TCF
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" size="lg">
              Contact TCF
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
