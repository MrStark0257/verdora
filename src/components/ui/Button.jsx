import React from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary:
    'bg-forest text-cream hover:bg-forest-800 active:bg-forest-900 shadow-sm hover:shadow-elevated rounded-editorial',
  secondary:
    'border border-forest/30 text-forest bg-transparent hover:border-forest hover:bg-forest/5 active:bg-forest/10 rounded-editorial',
  'secondary-light':
    'border border-cream/50 text-cream bg-cream/10 hover:bg-cream/20 hover:border-cream text-cream backdrop-blur-sm active:bg-cream/25 rounded-editorial shadow-subtle',
  outline:
    'border border-forest/30 text-forest bg-transparent hover:border-forest hover:bg-forest/5 active:bg-forest/10 rounded-editorial',
  editorial:
    'bg-transparent text-forest hover:text-botanical font-serif italic text-base tracking-wide border-b border-forest/40 hover:border-botanical pb-0.5 rounded-none transition-colors',
  earth:
    'bg-earth text-cream hover:bg-earth-600 active:bg-earth-700 shadow-sm rounded-editorial',
  light:
    'bg-cream text-forest hover:bg-offwhite active:bg-cream-200 shadow-sm rounded-editorial',
  ghost:
    'text-forest hover:bg-forest/5 active:bg-forest/10 rounded-editorial',
};

const SIZES = {
  sm: 'px-4 py-2 text-xs tracking-editorial uppercase',
  md: 'px-6 py-3 text-xs md:text-sm tracking-editorial uppercase',
  lg: 'px-8 py-3.5 text-sm md:text-base tracking-editorial uppercase',
  xl: 'px-10 py-4 text-base tracking-editorial uppercase',
};

/**
 * VERDORA Design System — Button Component
 * Supports multiple luxury editorial variants, loading states, and polymorphic routing.
 */
const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'editorial' | 'earth' | 'light' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  icon: Icon,
  iconPosition = 'right',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  to,
  href,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  // Base classes with typography, focus states, and transitions
  const baseClasses = 'inline-flex items-center justify-center font-sans font-medium transition-all duration-300 relative select-none disabled:opacity-50 disabled:cursor-not-allowed group';

  // Variant styling
  const variantClasses = VARIANTS[variant] || VARIANTS.primary;

  // Size padding and font sizing
  const sizeClasses = SIZES[size] || SIZES.md;

  // Don't apply padding to editorial underline button
  const appliedSizeClasses = variant === 'editorial' ? 'px-0 py-1' : sizeClasses;
  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClasses = `${baseClasses} ${variantClasses} ${appliedSizeClasses} ${widthClass} ${className}`;

  const iconElement = Icon && (
    <Icon
      className={`w-4 h-4 transition-transform duration-300 ${
        iconPosition === 'right' ? 'ml-2 group-hover:translate-x-1' : 'mr-2 group-hover:-translate-x-1'
      } ${isLoading ? 'opacity-0' : 'opacity-100'}`}
    />
  );

  const content = (
    <>
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-inherit rounded-inherit">
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        </span>
      )}
      <span className={`inline-flex items-center ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {iconPosition === 'left' && iconElement}
        {children}
        {iconPosition === 'right' && iconElement}
      </span>
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;

