import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * VERDORA Design System — Select Component
 */
const Select = forwardRef(({
  label,
  options = [],
  value,
  onChange,
  error,
  helperText,
  className = '',
  id,
  disabled = false,
  required = false,
  placeholder = 'Select an option',
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={selectId}
          className="block font-sans text-xs uppercase tracking-editorial font-medium text-charcoal/80 mb-2 select-none"
        >
          {label}
          {required && <span className="text-earth ml-1">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          id={selectId}
          ref={ref}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`w-full appearance-none bg-white/90 border rounded-editorial text-charcoal text-sm transition-all duration-200 outline-none
            pl-4 pr-10 py-3
            ${error
              ? 'border-red-500/80 focus:border-red-600 focus:ring-1 focus:ring-red-600/30'
              : 'border-forest/20 hover:border-forest/40 focus:border-forest focus:ring-1 focus:ring-forest/25'
            }
            disabled:bg-cream-100/50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3.5 pointer-events-none text-charcoal/50">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-red-600 font-sans">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-charcoal/60 font-sans">{helperText}</p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;

