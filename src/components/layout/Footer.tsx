export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Church Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Tabernacle Christ Fellowship</h3>
            <p className="text-gray-400">Singapore</p>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400">
              © {currentYear} Tabernacle Christ Fellowship
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-end">
            <a
              href="https://www.youtube.com/@TCFSingapore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <span className="text-sm font-medium">YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
