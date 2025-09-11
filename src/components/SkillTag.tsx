import React from 'react';
import { X } from 'lucide-react';

interface SkillTagProps {
  skill: string;
  onRemove?: () => void;
  variant?: 'default' | 'required' | 'missing' | 'strength';
  size?: 'sm' | 'md';
}

const SkillTag: React.FC<SkillTagProps> = ({ skill, onRemove, variant = 'default', size = 'md' }) => {
  const baseClasses = 'inline-flex items-center rounded-full font-medium transition-all duration-200';
  
  const variantClasses = {
    default: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    required: 'bg-orange-100 text-orange-800 border border-orange-200',
    missing: 'bg-red-100 text-red-800 border border-red-200',
    strength: 'bg-green-100 text-green-800 border border-green-200'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {skill}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1.5 h-3 w-3 rounded-full hover:bg-black hover:bg-opacity-20 flex items-center justify-center"
          aria-label={`Remove ${skill}`}
        >
          <X className="h-2 w-2" />
        </button>
      )}
    </span>
  );
};

export default SkillTag;