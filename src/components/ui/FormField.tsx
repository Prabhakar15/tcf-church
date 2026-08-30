import React from 'react';

interface FormFieldProps {
  label?: string;
  error?: string;
  help?: string;
  children: React.ReactNode;
}

export default function FormField({
  label,
  error,
  help,
  children,
}: FormFieldProps) {
  return (
    <div className="mb-4">
      {label && <label className="form-label">{label}</label>}
      {children}
      {error && <p className="form-error">{error}</p>}
      {help && <p className="form-help">{help}</p>}
    </div>
  );
}
