import React from 'react';
import Container from './Container';

/**
 * PageLayout component for consistent page layouts
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.title - Page title
 * @param {React.ReactNode} props.header - Custom header content
 * @param {React.ReactNode} props.footer - Custom footer content
 * @param {React.ReactNode} props.sidebar - Sidebar content
 * @param {boolean} props.sidebarLeft - Whether the sidebar is on the left
 * @param {string} props.sidebarWidth - Width of the sidebar
 * @param {string} props.maxWidth - Maximum width of the container
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} PageLayout component
 */
const PageLayout = ({
  children,
  title,
  header,
  footer,
  sidebar,
  sidebarLeft = true,
  sidebarWidth = '1/4',
  maxWidth = '7xl',
  className = '',
}) => {
  // Determine sidebar width classes
  const sidebarWidthClasses = {
    '1/4': 'w-1/4',
    '1/3': 'w-1/3',
    '1/5': 'w-1/5',
    '1/6': 'w-1/6',
    '1/2': 'w-1/2',
    '64': 'w-64',
    '72': 'w-72',
    '80': 'w-80',
  }[sidebarWidth] || 'w-1/4';

  // Determine content width classes
  const contentWidthClasses = {
    '1/4': 'w-3/4',
    '1/3': 'w-2/3',
    '1/5': 'w-4/5',
    '1/6': 'w-5/6',
    '1/2': 'w-1/2',
    '64': 'flex-1',
    '72': 'flex-1',
    '80': 'flex-1',
  }[sidebarWidth] || 'w-3/4';

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header */}
      {(header || title) && (
        <header className="bg-white shadow">
          <Container maxWidth={maxWidth} className="py-4">
            {header || (
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            )}
          </Container>
        </header>
      )}
      
      {/* Main content */}
      <Container maxWidth={maxWidth} className="py-6">
        {sidebar ? (
          <div className={`flex ${sidebarLeft ? 'flex-row' : 'flex-row-reverse'} gap-6`}>
            {/* Sidebar */}
            <div className={`${sidebarWidthClasses}`}>
              {sidebar}
            </div>
            
            {/* Main content */}
            <div className={`${contentWidthClasses}`}>
              {children}
            </div>
          </div>
        ) : (
          children
        )}
      </Container>
      
      {/* Footer */}
      {footer && (
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <Container maxWidth={maxWidth} className="py-4">
            {footer}
          </Container>
        </footer>
      )}
    </div>
  );
};

/**
 * PageLayout.Dashboard layout with sidebar and header
 */
PageLayout.Dashboard = ({
  children,
  title,
  sidebar,
  header,
  footer,
  sidebarWidth = '64',
  maxWidth = 'full',
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Header */}
      <header className="bg-white shadow z-10 relative">
        <div className="px-4 sm:px-6 lg:px-8">
          {header || (
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
            </div>
          )}
        </div>
      </header>
      
      <div className="flex">
        {/* Sidebar */}
        <div className={`w-${sidebarWidth} bg-white shadow-md z-10 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto`}>
          {sidebar}
        </div>
        
        {/* Main content */}
        <div className="flex-1 overflow-x-hidden">
          <main className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          
          {/* Footer */}
          {footer && (
            <footer className="bg-white border-t border-gray-200">
              <div className="px-4 sm:px-6 lg:px-8 py-4">
                {footer}
              </div>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * PageLayout.App layout with fixed header and footer
 */
PageLayout.App = ({
  children,
  header,
  footer,
  maxWidth = '7xl',
  className = '',
}) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <Container maxWidth={maxWidth} className="py-4">
          {header}
        </Container>
      </header>
      
      {/* Main content */}
      <main className="flex-1 bg-gray-50">
        <Container maxWidth={maxWidth} className="py-6">
          {children}
        </Container>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <Container maxWidth={maxWidth} className="py-4">
          {footer}
        </Container>
      </footer>
    </div>
  );
};

/**
 * PageLayout.Landing layout for landing pages
 */
PageLayout.Landing = ({
  children,
  header,
  footer,
  hero,
  maxWidth = '7xl',
  className = '',
}) => {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      {/* Header */}
      <header className="bg-white shadow">
        <Container maxWidth={maxWidth} className="py-4">
          {header}
        </Container>
      </header>
      
      {/* Hero section */}
      {hero && (
        <div className="bg-blue-600 text-white">
          {hero}
        </div>
      )}
      
      {/* Main content */}
      <main className="flex-1 bg-white">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <Container maxWidth={maxWidth} className="py-8">
          {footer}
        </Container>
      </footer>
    </div>
  );
};

/**
 * PageLayout.Auth layout for authentication pages
 */
PageLayout.Auth = ({
  children,
  logo,
  footer,
  maxWidth = 'md',
  className = '',
}) => {
  return (
    <div className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 ${className}`}>
      {/* Logo */}
      {logo && (
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
          <div className="flex justify-center">
            {logo}
          </div>
        </div>
      )}
      
      {/* Main content */}
      <Container maxWidth={maxWidth} className="sm:mx-auto sm:w-full">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </Container>
      
      {/* Footer */}
      {footer && (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md text-center text-sm text-gray-500">
          {footer}
        </div>
      )}
    </div>
  );
};

/**
 * PageLayout.Skeleton component for loading states
 */
PageLayout.Skeleton = ({
  type = 'default',
  headerHeight = 'h-16',
  contentRows = 3,
  withSidebar = false,
  sidebarWidth = '1/4',
  className = '',
}) => {
  // Determine sidebar width classes
  const sidebarWidthClasses = {
    '1/4': 'w-1/4',
    '1/3': 'w-1/3',
    '1/5': 'w-1/5',
    '1/6': 'w-1/6',
    '1/2': 'w-1/2',
    '64': 'w-64',
    '72': 'w-72',
    '80': 'w-80',
  }[sidebarWidth] || 'w-1/4';

  // Determine content width classes
  const contentWidthClasses = {
    '1/4': 'w-3/4',
    '1/3': 'w-2/3',
    '1/5': 'w-4/5',
    '1/6': 'w-5/6',
    '1/2': 'w-1/2',
    '64': 'flex-1',
    '72': 'flex-1',
    '80': 'flex-1',
  }[sidebarWidth] || 'w-3/4';

  // Default skeleton
  if (type === 'default') {
    return (
      <div className={`min-h-screen bg-gray-50 animate-pulse ${className}`}>
        {/* Header */}
        <div className={`bg-white shadow ${headerHeight}`}>
          <Container className="py-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          </Container>
        </div>
        
        {/* Main content */}
        <Container className="py-6">
          {withSidebar ? (
            <div className="flex gap-6">
              {/* Sidebar */}
              <div className={`${sidebarWidthClasses}`}>
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/5 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              
              {/* Main content */}
              <div className={`${contentWidthClasses}`}>
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
                  {Array.from({ length: contentRows }).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded mb-4"></div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-4">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              {Array.from({ length: contentRows }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded mb-4"></div>
              ))}
            </div>
          )}
        </Container>
      </div>
    );
  }

  // Dashboard skeleton
  if (type === 'dashboard') {
    return (
      <div className={`min-h-screen bg-gray-50 animate-pulse ${className}`}>
        {/* Header */}
        <div className="bg-white shadow z-10 relative">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="h-8 bg-gray-200 rounded-full w-8"></div>
            </div>
          </div>
        </div>
        
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white shadow-md z-10 h-[calc(100vh-4rem)] p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-3/5 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          
          {/* Main content */}
          <div className="flex-1 overflow-x-hidden">
            <main className="py-6 px-4 sm:px-6 lg:px-8">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-white shadow rounded-lg p-4">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white shadow rounded-lg p-4">
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                {Array.from({ length: contentRows }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded mb-4"></div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  // Auth skeleton
  if (type === 'auth') {
    return (
      <div className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 animate-pulse ${className}`}>
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
          <div className="flex justify-center">
            <div className="h-12 bg-gray-200 rounded-full w-12"></div>
          </div>
        </div>
        
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-8"></div>
            
            <div className="space-y-6">
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              
              <div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Landing skeleton
  if (type === 'landing') {
    return (
      <div className={`min-h-screen flex flex-col animate-pulse ${className}`}>
        {/* Header */}
        <div className="bg-white shadow">
          <Container className="py-4 flex justify-between items-center">
            <div className="h-8 bg-gray-200 rounded w-32"></div>
            <div className="flex space-x-4">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </Container>
        </div>
        
        {/* Hero section */}
        <div className="bg-gray-200 py-16">
          <Container>
            <div className="h-12 bg-gray-300 rounded w-1/2 mb-6"></div>
            <div className="h-6 bg-gray-300 rounded w-2/3 mb-8"></div>
            <div className="h-10 bg-gray-300 rounded w-32"></div>
          </Container>
        </div>
        
        {/* Main content */}
        <main className="flex-1 bg-white py-12">
          <Container>
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-4">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          </Container>
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-200 py-8">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <div className="h-5 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </footer>
      </div>
    );
  }

  return null;
};

export default PageLayout; 