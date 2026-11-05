import React, { forwardRef } from 'react';

/**
 * VERDORA Design System — Input Component
 * Elegant text input with warm botanical focus states and subtle error styling.
 */
const Input = forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  id,
  type = 'text',
  disabled = false,
  required = false,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block font-sans text-xs uppercase tracking-editorial font-medium text-charcoal/80 mb-2 select-none"
        >
          {label}
          {required && <span className="text-earth ml-1">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && iconPosition === 'left' && (
          <div className="absolute left-3.5 pointer-events-none text-charcoal/40">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          ref={ref}
          type={type}
          disabled={disabled}
          required={required}
          className={`w-full bg-white/90 border rounded-editorial text-charcoal placeholder:text-charcoal/35 text-sm transition-all duration-200 outline-none
            ${Icon && iconPosition === 'left' ? 'pl-10' : 'pl-4'}
            ${Icon && iconPosition === 'right' ? 'pr-10' : 'pr-4'}
            py-3
            ${error
              ? 'border-red-500/80 focus:border-red-600 focus:ring-1 focus:ring-red-600/30'
              : 'border-forest/20 hover:border-forest/40 focus:border-forest focus:ring-1 focus:ring-forest/25'
            }
            disabled:bg-cream-100/50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />

        {Icon && iconPosition === 'right' && (
          <div className="absolute right-3.5 pointer-events-none text-charcoal/40">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-red-600 font-sans tracking-wide">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-charcoal/60 font-sans tracking-wide">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

