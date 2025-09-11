import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', message }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-blue-200 border-t-blue-600`}></div>
      {message && (
        <p className="mt-3 text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;