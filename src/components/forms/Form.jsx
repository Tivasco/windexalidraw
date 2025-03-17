import React from 'react';

/**
 * Form component to wrap form elements
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Form content
 * @param {Function} props.onSubmit - Submit handler
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} Form component
 */
const Form = ({
  children,
  onSubmit,
  className = '',
  ...rest
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={className}
      {...rest}
    >
      {children}
    </form>
  );
};

/**
 * Form.Group component to group form elements
 */
Form.Group = ({ children, className = '', ...rest }) => (
  <div className={`mb-6 ${className}`} {...rest}>
    {children}
  </div>
);

/**
 * Form.Actions component for form action buttons
 */
Form.Actions = ({ children, className = '', ...rest }) => (
  <div className={`flex items-center justify-end space-x-3 mt-6 ${className}`} {...rest}>
    {children}
  </div>
);

/**
 * Form.Divider component for separating form sections
 */
Form.Divider = ({ label, className = '', ...rest }) => (
  <div className={`relative my-6 ${className}`} {...rest}>
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-300"></div>
    </div>
    {label && (
      <div className="relative flex justify-center">
        <span className="px-3 bg-white text-sm text-gray-500">
          {label}
        </span>
      </div>
    )}
  </div>
);

export default Form; 