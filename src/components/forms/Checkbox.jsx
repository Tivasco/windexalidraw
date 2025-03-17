import React from 'react';

/**
 * Checkbox component for forms
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Checkbox ID
 * @param {string} props.name - Checkbox name
 * @param {string} props.label - Checkbox label
 * @param {boolean} props.checked - Whether the checkbox is checked
 * @param {Function} props.onChange - Change handler
 * @param {string} props.error - Error message
 * @param {string} props.helperText - Helper text
 * @param {boolean} props.disabled - Whether the checkbox is disabled
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} Checkbox component
 */
const Checkbox = ({
  id,
  name,
  label,
  checked,
  onChange,
  error,
  helperText,
  disabled = false,
  className = '',
  ...rest
}) => {
  const checkboxId = id || name;
  
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={checkboxId}
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className={`
              h-4 w-4 rounded border-gray-300 text-blue-600
              focus:ring-blue-500
              ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
            `}
            {...rest}
          />
        </div>
        
        <div className="ml-3 text-sm">
          {label && (
            <label 
              htmlFor={checkboxId} 
              className={`font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}
            >
              {label}
            </label>
          )}
          
          {helperText && !error && (
            <p className="text-gray-500">{helperText}</p>
          )}
          
          {error && (
            <p className="text-red-600">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkbox; 