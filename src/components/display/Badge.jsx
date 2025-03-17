import React from 'react';

/**
 * Badge component for displaying status indicators or counts
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Badge content
 * @param {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'} props.variant - Badge variant
 * @param {'default' | 'pill' | 'dot'} props.type - Badge type
 * @param {boolean} props.outline - Whether to use outline style
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} Badge component
 */
const Badge = ({
  children,
  variant = 'primary',
  type = 'default',
  outline = false,
  className = '',
}) => {
  // Define variant-specific styles
  const variantStyles = {
    primary: outline 
      ? 'bg-transparent text-blue-600 border border-blue-600' 
      : 'bg-blue-100 text-blue-800',
    secondary: outline 
      ? 'bg-transparent text-gray-600 border border-gray-600' 
      : 'bg-gray-100 text-gray-800',
    success: outline 
      ? 'bg-transparent text-green-600 border border-green-600' 
      : 'bg-green-100 text-green-800',
    danger: outline 
      ? 'bg-transparent text-red-600 border border-red-600' 
      : 'bg-red-100 text-red-800',
    warning: outline 
      ? 'bg-transparent text-yellow-600 border border-yellow-600' 
      : 'bg-yellow-100 text-yellow-800',
    info: outline 
      ? 'bg-transparent text-indigo-600 border border-indigo-600' 
      : 'bg-indigo-100 text-indigo-800',
  }[variant] || 'bg-blue-100 text-blue-800';

  // Define type-specific styles
  const typeStyles = {
    default: 'px-2.5 py-0.5 text-xs font-medium rounded',
    pill: 'px-2.5 py-0.5 text-xs font-medium rounded-full',
    dot: 'flex items-center',
  }[type] || 'px-2.5 py-0.5 text-xs font-medium rounded';

  if (type === 'dot') {
    const dotColor = {
      primary: outline ? 'border border-blue-600 bg-transparent' : 'bg-blue-600',
      secondary: outline ? 'border border-gray-600 bg-transparent' : 'bg-gray-600',
      success: outline ? 'border border-green-600 bg-transparent' : 'bg-green-600',
      danger: outline ? 'border border-red-600 bg-transparent' : 'bg-red-600',
      warning: outline ? 'border border-yellow-600 bg-transparent' : 'bg-yellow-600',
      info: outline ? 'border border-indigo-600 bg-transparent' : 'bg-indigo-600',
    }[variant] || 'bg-blue-600';

    return (
      <span className={`inline-flex items-center ${className}`}>
        <span className={`h-2 w-2 rounded-full ${dotColor}`}></span>
        {children && <span className="ml-2 text-sm text-gray-700">{children}</span>}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center ${typeStyles} ${variantStyles} ${className}`}>
      {children}
    </span>
  );
};

export default Badge; 