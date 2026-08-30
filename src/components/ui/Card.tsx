import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}

export default function Card({
  children,
  variant = 'default',
  className = '',
}: CardProps) {
  const variantClasses = {
    default: 'card',
    accent: 'card-accent',
  };

  return <div className={`${variantClasses[variant]} ${className}`}>{children}</div>;
}
