interface PaginationControlsProps {
  currentPage: number;
  pageCount: number;
  onPreviousClick: () => void;
  onNextClick: () => void;
  show: boolean;
}

export default function PaginationControls({
  currentPage,
  pageCount,
  onPreviousClick,
  onNextClick,
  show,
}: PaginationControlsProps) {
  if (!show) return null;

  return (
    <div className="pagination-container">
      <button
        className="pagination-btn"
        onClick={onPreviousClick}
        disabled={currentPage === 0}
        aria-label="Previous page"
      >
        ← Previous
      </button>
      <span className="pagination-info">
        Page {currentPage + 1} of {pageCount}
      </span>
      <button
        className="pagination-btn"
        onClick={onNextClick}
        disabled={currentPage >= pageCount - 1}
        aria-label="Next page"
      >
        Next →
      </button>
      <style>{`
        .pagination-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          padding: 1.5rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .pagination-btn {
          padding: 0.75rem 1.5rem;
          background-color: #C9A227;
          color: #0B1F3A;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .pagination-btn:hover:not(:disabled) {
          background-color: #E0B644;
          transform: translateY(-2px);
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-info {
          font-size: 0.95rem;
          color: #6B7280;
          font-weight: 500;
          min-width: 120px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
