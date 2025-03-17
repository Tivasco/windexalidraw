import React from 'react';

/**
 * Card component for displaying content in a contained box
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {React.ReactNode} props.header - Card header content
 * @param {React.ReactNode} props.footer - Card footer content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hover - Whether to show hover effects
 * @param {string} props.padding - Padding inside the card
 * @returns {React.ReactElement} Card component
 */
const Card = ({ 
  children, 
  header, 
  footer, 
  className = '', 
  hover = false,
  padding = 'p-6'
}) => {
  return (
    <div className={`
      bg-white rounded-lg shadow-md overflow-hidden
      ${hover ? 'transition-shadow hover:shadow-lg' : ''}
      ${className}
    `}>
      {header && (
        <div className="px-6 py-4 border-b border-gray-200">
          {header}
        </div>
      )}
      
      <div className={padding}>
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card; 