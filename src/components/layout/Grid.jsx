import React from 'react';

/**
 * Grid component for responsive layouts
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {number} props.cols - Number of columns (1-12)
 * @param {string} props.gap - Gap between grid items
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} Grid component
 */
const Grid = ({ 
  children, 
  cols = { 
    default: 1, 
    sm: 2, 
    md: 3, 
    lg: 4 
  }, 
  gap = '4', 
  className = '' 
}) => {
  // Convert cols object to tailwind classes
  const getColsClass = () => {
    if (typeof cols === 'number') {
      return `grid-cols-${cols}`;
    }
    
    const { default: defaultCols, sm, md, lg, xl } = cols;
    
    return [
      defaultCols && `grid-cols-${defaultCols}`,
      sm && `sm:grid-cols-${sm}`,
      md && `md:grid-cols-${md}`,
      lg && `lg:grid-cols-${lg}`,
      xl && `xl:grid-cols-${xl}`,
    ].filter(Boolean).join(' ');
  };

  return (
    <div className={`grid ${getColsClass()} gap-${gap} ${className}`}>
      {children}
    </div>
  );
};

export default Grid; 