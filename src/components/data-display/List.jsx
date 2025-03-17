import React from 'react';

/**
 * List component for displaying lists of items
 * 
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of items to display
 * @param {Function} props.renderItem - Function to render each item
 * @param {boolean} props.divided - Whether to show dividers between items
 * @param {boolean} props.hoverable - Whether to show hover effect on items
 * @param {Function} props.onItemClick - Function to call when an item is clicked
 * @param {string} props.emptyMessage - Message to display when there are no items
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} List component
 */
const List = ({
  items = [],
  renderItem,
  divided = true,
  hoverable = false,
  onItemClick,
  emptyMessage = 'No items to display',
  className = '',
}) => {
  // Handle empty state
  if (items.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-md p-6 text-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <ul className={`bg-white rounded-md shadow overflow-hidden ${className}`}>
      {items.map((item, index) => (
        <li 
          key={index}
          className={`
            ${divided && index !== items.length - 1 ? 'border-b border-gray-200' : ''}
            ${hoverable ? 'hover:bg-gray-50' : ''}
            ${onItemClick ? 'cursor-pointer' : ''}
          `}
          onClick={() => onItemClick && onItemClick(item, index)}
        >
          {renderItem ? renderItem(item, index) : item.toString()}
        </li>
      ))}
    </ul>
  );
};

/**
 * List.Item component for standard list items
 */
List.Item = ({
  children,
  title,
  subtitle,
  leading,
  trailing,
  onClick,
  className = '',
}) => {
  return (
    <div 
      className={`flex items-center px-4 py-3 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {leading && (
        <div className="flex-shrink-0 mr-4">
          {leading}
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        {title && (
          <div className="text-sm font-medium text-gray-900 truncate">
            {title}
          </div>
        )}
        
        {subtitle && (
          <div className="text-sm text-gray-500 truncate">
            {subtitle}
          </div>
        )}
        
        {children}
      </div>
      
      {trailing && (
        <div className="flex-shrink-0 ml-4">
          {trailing}
        </div>
      )}
    </div>
  );
};

/**
 * List.Section component for grouping list items
 */
List.Section = ({
  children,
  title,
  className = '',
}) => {
  return (
    <div className={className}>
      {title && (
        <div className="px-4 py-2 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

export default List; 