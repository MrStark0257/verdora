import React from 'react';
import { Sparkles, ShieldCheck, Wind, Award, Heart, Leaf } from 'lucide-react';

/**
 * VERDORA Design System — Badge Component
 * Categorical and botanical attribute markers crafted with muted organic hues.
 */
const Badge = ({
  children,
  variant = 'default', // 'bestseller' | 'rare' | 'petsafe' | 'airpurifying' | 'sale' | 'new' | 'default' | 'sage'
  size = 'sm', // 'sm' | 'md'
  icon: CustomIcon,
  className = '',
}) => {
  const variantConfig = {
    bestseller: {
      classes: 'bg-sage/25 text-forest border-sage/40',
      icon: Award,
    },
    rare: {
      classes: 'bg-forest text-cream border-forest-900',
      icon: Sparkles,
    },
    petsafe: {
      classes: 'bg-botanical/15 text-botanical-800 border-botanical/30',
      icon: ShieldCheck,
    },
    airpurifying: {
      classes: 'bg-cream text-charcoal border-cream-300',
      icon: Wind,
    },
    sale: {
      classes: 'bg-earth/15 text-earth-700 border-earth/30',
      icon: null,
    },
    new: {
      classes: 'bg-offwhite text-forest border-forest/25',
      icon: Leaf,
    },
    sage: {
      classes: 'bg-sage-100 text-forest border-sage-200',
      icon: null,
    },
    default: {
      classes: 'bg-cream/80 text-charcoal border-charcoal/15',
      icon: null,
    },
  }[variant] || { classes: 'bg-cream/80 text-charcoal border-charcoal/15', icon: null };

  const sizeClasses = {
    sm: 'text-[10px] px-2.5 py-0.5 tracking-wider uppercase',
    md: 'text-xs px-3.5 py-1 tracking-wider uppercase',
  }[size] || 'text-[10px] px-2.5 py-0.5 tracking-wider uppercase';

  const IconComponent = CustomIcon || variantConfig.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-sans font-medium rounded-pill border ${variantConfig.classes} ${sizeClasses} backdrop-blur-sm transition-colors duration-200 ${className}`}
    >
      {IconComponent && <IconComponent className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
      <span>{children}</span>
    </span>
  );
};

export default Badge;

