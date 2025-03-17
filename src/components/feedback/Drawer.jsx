import React, { useEffect, useRef } from 'react';

/**
 * Drawer component for sliding panels from the edge of the screen
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the drawer is open
 * @param {Function} props.onClose - Function to call when the drawer is closed
 * @param {React.ReactNode} props.children - Drawer content
 * @param {string} props.title - Drawer title
 * @param {'left' | 'right' | 'top' | 'bottom'} props.position - Position of the drawer
 * @param {string} props.size - Size of the drawer (sm, md, lg, xl)
 * @param {boolean} props.closeOnOutsideClick - Whether to close the drawer when clicking outside
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} Drawer component
 */
const Drawer = ({
  isOpen,
  onClose,
  children,
  title,
  position = 'right',
  size = 'md',
  closeOnOutsideClick = true,
  className = '',
}) => {
  const drawerRef = useRef(null);

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when drawer is open
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = ''; // Restore scrolling when drawer is closed
    };
  }, [isOpen, onClose]);

  // Handle outside click
  const handleOutsideClick = (e) => {
    if (closeOnOutsideClick && drawerRef.current && !drawerRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Determine drawer size based on position and size
  const getSizeClasses = () => {
    const sizes = {
      left: {
        sm: 'w-64',
        md: 'w-80',
        lg: 'w-96',
        xl: 'w-1/3',
        full: 'w-full',
      },
      right: {
        sm: 'w-64',
        md: 'w-80',
        lg: 'w-96',
        xl: 'w-1/3',
        full: 'w-full',
      },
      top: {
        sm: 'h-1/4',
        md: 'h-1/3',
        lg: 'h-1/2',
        xl: 'h-2/3',
        full: 'h-full',
      },
      bottom: {
        sm: 'h-1/4',
        md: 'h-1/3',
        lg: 'h-1/2',
        xl: 'h-2/3',
        full: 'h-full',
      },
    };

    return sizes[position][size] || (position === 'left' || position === 'right' ? 'w-80' : 'h-1/3');
  };

  // Determine drawer position classes
  const getPositionClasses = () => {
    const positions = {
      left: 'inset-y-0 left-0',
      right: 'inset-y-0 right-0',
      top: 'inset-x-0 top-0',
      bottom: 'inset-x-0 bottom-0',
    };

    return positions[position] || 'inset-y-0 right-0';
  };

  // Determine transform classes for animation
  const getTransformClasses = () => {
    const transforms = {
      left: 'transform-gpu -translate-x-full',
      right: 'transform-gpu translate-x-full',
      top: 'transform-gpu -translate-y-full',
      bottom: 'transform-gpu translate-y-full',
    };

    return transforms[position] || 'transform-gpu translate-x-full';
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden"
      onClick={handleOutsideClick}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        
        <div className={`absolute ${getPositionClasses()} flex max-w-full`}>
          <div 
            ref={drawerRef}
            className={`
              ${getSizeClasses()}
              bg-white shadow-xl transition-transform duration-300 ease-in-out
              ${isOpen ? '' : getTransformClasses()}
              ${className}
            `}
          >
            <div className="flex flex-col h-full">
              {title && (
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={onClose}
                    aria-label="Close"
                  >
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              
              <div className="flex-1 overflow-y-auto p-4">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer; 