import React from 'react';

/**
 * VERDORA Design System — Card Component
 * Elevated botanical surface with warm editorial borders and subtle transitions.
 */
const Card = ({
  children,
  variant = 'editorial', // 'editorial' | 'bordered' | 'elevated' | 'cream' | 'glass'
  padding = 'md', // 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hoverEffect = false,
  className = '',
  as: Component = 'div',
  onClick,
  ...props
}) => {
  const variantClasses = {
    editorial: 'bg-white border border-forest/10 shadow-subtle',
    bordered: 'bg-transparent border border-forest/20',
    elevated: 'bg-white shadow-elevated border border-forest/5',
    cream: 'bg-cream/60 border border-cream-200/60',
    glass: 'bg-white/80 backdrop-blur-md border border-white/40 shadow-subtle',
  }[variant] || 'bg-white border border-forest/10 shadow-subtle';

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10 md:p-12',
  }[padding] || 'p-6';

  const hoverClasses = hoverEffect
    ? 'transition-all duration-400 hover:-translate-y-1.5 hover:shadow-floating hover:border-forest/20 cursor-pointer'
    : 'transition-colors duration-300';

  return (
    <Component
      onClick={onClick}
      className={`rounded-editorial relative overflow-hidden ${variantClasses} ${paddingClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;

