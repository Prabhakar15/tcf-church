import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-tcf-navy to-tcf-navy bg-opacity-95 text-white py-20 md:py-28">
      <div className="container-max text-center">
        <p className="text-sm font-semibold tracking-widest mb-4 opacity-90">
          TABERNACLE CHRIST FELLOWSHIP
        </p>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          A Church Without Boundaries
        </h1>
        <p className="text-3xl md:text-4xl font-light mb-12 text-gold opacity-95">
          A Family Over a Community
        </p>
        <p className="text-lg max-w-2xl mx-auto mb-12 text-gray-100 leading-relaxed">
          Tabernacle Christ Fellowship is a welcoming church family serving expatriate communities in Singapore. We gather to worship Jesus Christ, experience God&apos;s presence, and share His love with all who seek belonging.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/about">
            <Button variant="secondary" size="lg">
              Learn About TCF
            </Button>
          </Link>
          <a href="https://www.youtube.com/@TCFSingapore" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg">
              Watch Sermons
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
