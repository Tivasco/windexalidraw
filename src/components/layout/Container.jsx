import React from 'react';

/**
 * Container component for layout with responsive width control
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.maxWidth - Maximum width of the container (sm, md, lg, xl, full)
 * @param {string} props.padding - Padding of the container
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} Container component
 */
const Container = ({ 
  children, 
  maxWidth = 'lg', 
  padding = 'px-4 sm:px-6 lg:px-8', 
  className = '' 
}) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    '7xl': 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className={`mx-auto ${maxWidthClasses[maxWidth] || 'max-w-7xl'} ${padding} ${className}`}>
      {children}
    </div>
  );
};

export default Container; 