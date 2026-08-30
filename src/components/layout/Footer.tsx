export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-tcf-navy text-white mt-16">
      <div className="container-max py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-white border-opacity-10">
          {/* Church Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-white">Tabernacle Christ Fellowship</h3>
            <p className="text-[#D1D5DB]">Singapore</p>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-[#D1D5DB]">
              © {currentYear} Tabernacle Christ Fellowship
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-end">
            <a
              href="https://www.youtube.com/@TCFSingapore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D1D5DB] hover:text-tcf-gold transition-colors font-medium"
              aria-label="YouTube"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
