import { useEffect } from 'react';

interface AdminDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function AdminDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
  isLoading = false,
  onConfirm,
  onCancel,
}: AdminDialogProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="admin-dialog-overlay">
      <div className="admin-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <h2 id="dialog-title" className="dialog-title">{title}</h2>
        <p className="dialog-message">{message}</p>
        
        <div className="dialog-actions">
          <button
            className="dialog-btn dialog-btn-cancel"
            onClick={onCancel}
            disabled={isLoading}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className={`dialog-btn ${isDangerous ? 'dialog-btn-danger' : 'dialog-btn-confirm'}`}
            onClick={onConfirm}
            disabled={isLoading}
            type="button"
          >
            {isLoading ? 'Processing...' : confirmText}
          </button>
        </div>

        <style>{`
          .admin-dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
          }

          .admin-dialog {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
          }

          .dialog-title {
            margin: 0 0 1rem 0;
            font-size: 1.25rem;
            font-weight: 700;
            color: #0B1F3A;
          }

          .dialog-message {
            margin: 0 0 1.5rem 0;
            font-size: 0.95rem;
            color: #6B7280;
            line-height: 1.5;
          }

          .dialog-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
          }

          .dialog-btn {
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.95rem;
            transition: all 0.3s ease;
          }

          .dialog-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .dialog-btn-cancel {
            background-color: #e5e7eb;
            color: #0B1F3A;
          }

          .dialog-btn-cancel:hover:not(:disabled) {
            background-color: #d1d5db;
          }

          .dialog-btn-confirm {
            background-color: #C9A227;
            color: #0B1F3A;
          }

          .dialog-btn-confirm:hover:not(:disabled) {
            background-color: #E0B644;
          }

          .dialog-btn-danger {
            background-color: #dc2626;
            color: white;
          }

          .dialog-btn-danger:hover:not(:disabled) {
            background-color: #b91c1c;
          }

          @media (max-width: 480px) {
            .admin-dialog {
              padding: 1.5rem;
            }

            .dialog-actions {
              flex-direction: column-reverse;
            }

            .dialog-btn {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
