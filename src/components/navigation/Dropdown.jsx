import React, { useState, useRef, useEffect } from 'react';

/**
 * Dropdown component for displaying a menu of options
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.trigger - Element that triggers the dropdown
 * @param {Array} props.items - Array of dropdown items
 * @param {string} props.align - Alignment of the dropdown menu (left, right)
 * @param {boolean} props.withDividers - Whether to show dividers between items
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} Dropdown component
 */
const Dropdown = ({
  trigger,
  items = [],
  align = 'left',
  withDividers = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown when pressing escape
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  // Define alignment styles
  const alignmentStyles = {
    left: 'left-0',
    right: 'right-0',
  }[align] || 'left-0';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={toggleDropdown}>
        {trigger}
      </div>

      {isOpen && (
        <div 
          className={`absolute z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${alignmentStyles}`}
          role="menu"
          aria-orientation="vertical"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {items.map((item, index) => {
              if (item.type === 'divider') {
                return <div key={`divider-${index}`} className="border-t border-gray-100 my-1"></div>;
              }

              if (item.type === 'header') {
                return (
                  <div 
                    key={`header-${index}`} 
                    className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    {item.label}
                  </div>
                );
              }

              const itemClasses = `${
                item.disabled 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              } block px-4 py-2 text-sm`;

              return (
                <React.Fragment key={`item-${index}`}>
                  {withDividers && index > 0 && items[index - 1].type !== 'divider' && items[index - 1].type !== 'header' && (
                    <div className="border-t border-gray-100 my-1"></div>
                  )}
                  <button
                    className={itemClasses}
                    role="menuitem"
                    tabIndex="-1"
                    onClick={() => !item.disabled && handleItemClick(item)}
                    disabled={item.disabled}
                  >
                    <div className="flex items-center">
                      {item.icon && <span className="mr-3">{item.icon}</span>}
                      <span>{item.label}</span>
                    </div>
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
