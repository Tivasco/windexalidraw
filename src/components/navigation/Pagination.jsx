import React from 'react';

/**
 * Pagination component for navigating through pages of content
 * 
 * @param {Object} props - Component props
 * @param {number} props.currentPage - Current page number (1-based)
 * @param {number} props.totalPages - Total number of pages
 * @param {Function} props.onPageChange - Function to call when page changes
 * @param {boolean} props.showFirstLast - Whether to show first/last page buttons
 * @param {number} props.siblingCount - Number of sibling pages to show on each side
 * @param {string} props.size - Size of pagination buttons (sm, md, lg)
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} Pagination component
 */
const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showFirstLast = true,
  siblingCount = 1,
  size = 'md',
  className = '',
}) => {
  // Ensure currentPage is within valid range
  const page = Math.max(1, Math.min(currentPage, totalPages));

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(1);
    
    // Calculate range of pages to show around current page
    const leftSiblingIndex = Math.max(2, page - siblingCount);
    const rightSiblingIndex = Math.min(totalPages - 1, page + siblingCount);
    
    // Add ellipsis if needed
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
    
    if (shouldShowLeftDots) {
      pageNumbers.push('...');
    }
    
    // Add page numbers between dots
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(i);
      }
    }
    
    if (shouldShowRightDots) {
      pageNumbers.push('...');
    }
    
    // Always show last page if it's not the same as first page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      onPageChange(newPage);
    }
  };

  // Define size-specific styles
  const sizeStyles = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  }[size] || 'h-10 w-10 text-base';

  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center justify-center ${className}`} aria-label="Pagination">
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
          className={`${sizeStyles} flex items-center justify-center rounded-md border ${
            page === 1
              ? 'border-gray-300 bg-white text-gray-300 cursor-not-allowed'
              : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
          } mr-2`}
          aria-label="First page"
        >
          <span className="sr-only">First page</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M8.707 5.293a1 1 0 010 1.414L5.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      )}
      
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`${sizeStyles} flex items-center justify-center rounded-md border ${
          page === 1
            ? 'border-gray-300 bg-white text-gray-300 cursor-not-allowed'
            : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
        } mr-2`}
        aria-label="Previous page"
      >
        <span className="sr-only">Previous page</span>
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      
      <div className="flex items-center space-x-2">
        {getPageNumbers().map((pageNumber, index) => {
          if (pageNumber === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-1">
                &#8230;
              </span>
            );
          }
          
          return (
            <button
              key={`page-${pageNumber}`}
              onClick={() => handlePageChange(pageNumber)}
              className={`${sizeStyles} flex items-center justify-center rounded-md ${
                pageNumber === page
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
              }`}
              aria-current={pageNumber === page ? 'page' : undefined}
              aria-label={`Page ${pageNumber}`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`${sizeStyles} flex items-center justify-center rounded-md border ${
          page === totalPages
            ? 'border-gray-300 bg-white text-gray-300 cursor-not-allowed'
            : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
        } ml-2`}
        aria-label="Next page"
      >
        <span className="sr-only">Next page</span>
        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
      
      {showFirstLast && (
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
          className={`${sizeStyles} flex items-center justify-center rounded-md border ${
            page === totalPages
              ? 'border-gray-300 bg-white text-gray-300 cursor-not-allowed'
              : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
          } ml-2`}
          aria-label="Last page"
        >
          <span className="sr-only">Last page</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            <path fillRule="evenodd" d="M11.293 14.707a1 1 0 010-1.414L14.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </nav>
  );
};

export default Pagination; 