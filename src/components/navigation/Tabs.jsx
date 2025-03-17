import React, { useState, useEffect } from 'react';

/**
 * Tabs component for organizing content into tabbed sections
 * 
 * @param {Object} props - Component props
 * @param {Array} props.tabs - Array of tab objects with id, label, and content
 * @param {string} props.activeTab - ID of the active tab
 * @param {Function} props.onChange - Function to call when a tab is selected
 * @param {'default' | 'pills' | 'underline'} props.variant - Tab style variant
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement} Tabs component
 */
const Tabs = ({
  tabs = [],
  activeTab: externalActiveTab,
  onChange,
  variant = 'default',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(externalActiveTab || (tabs[0]?.id || ''));

  // Sync with external active tab if provided
  useEffect(() => {
    if (externalActiveTab && externalActiveTab !== activeTab) {
      setActiveTab(externalActiveTab);
    }
  }, [externalActiveTab]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  // Define variant-specific styles
  const variantStyles = {
    default: {
      container: 'border-b border-gray-200',
      tabList: 'flex -mb-px',
      tab: (isActive) => 
        `py-2 px-4 text-sm font-medium ${
          isActive 
            ? 'border-b-2 border-blue-500 text-blue-600' 
            : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`,
    },
    pills: {
      container: '',
      tabList: 'flex space-x-2',
      tab: (isActive) => 
        `py-2 px-4 text-sm font-medium rounded-md ${
          isActive 
            ? 'bg-blue-100 text-blue-700' 
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`,
    },
    underline: {
      container: '',
      tabList: 'flex space-x-8',
      tab: (isActive) => 
        `py-2 px-1 text-sm font-medium border-b-2 ${
          isActive 
            ? 'border-blue-500 text-blue-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`,
    },
  }[variant] || variantStyles.default;

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      <div className={variantStyles.container}>
        <nav className={variantStyles.tabList} role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              className={variantStyles.tab(activeTab === tab.id)}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">
        {tabs.map((tab) => (
          <div
            key={`tabpanel-${tab.id}`}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            className={activeTab === tab.id ? '' : 'hidden'}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs; 