import Card from '../ui/Card';

export default function CommunitySection() {
  return (
    <section className="py-section bg-white">
      <div className="container-max max-w-content-lg">
        <div className="text-center mb-12">
          <h2 className="mb-6">Who We Serve</h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            TCF serves expatriate communities in Singapore, creating a welcoming space for people from diverse backgrounds to gather, worship, and belong.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="text-center">
              <h3 className="mb-4 text-tcf-navy">Telugu Community</h3>
              <p className="text-text-muted">
                Serving Telugu-speaking believers with culturally relevant ministry and fellowship.
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <h3 className="mb-4 text-tcf-navy">Tamil Community</h3>
              <p className="text-text-muted">
                Serving Tamil-speaking believers with culturally relevant ministry and fellowship.
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <h3 className="mb-4 text-tcf-navy">A Welcoming Family</h3>
              <p className="text-text-muted">
                All are welcome. We believe faith transcends boundaries, and community embraces everyone seeking connection and belonging.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
