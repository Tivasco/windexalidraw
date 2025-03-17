import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  Button,
  Input,
  Select,
  Checkbox,
  Form,
  Alert,
  Modal,
  Toast,
  Drawer,
  Badge,
  Tabs,
  Dropdown,
  Pagination,
  Table,
  List,
  PageLayout
} from '../components';

const ComponentsShowcase = () => {
  // State for interactive components
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastVariant, setToastVariant] = useState('info');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Sample data for components
  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const tabsData = [
    { id: 'tab1', label: 'Tab 1', content: <p>Content for Tab 1</p> },
    { id: 'tab2', label: 'Tab 2', content: <p>Content for Tab 2</p> },
    { id: 'tab3', label: 'Tab 3', content: <p>Content for Tab 3</p> },
  ];

  const dropdownItems = [
    { label: 'Profile', onClick: () => console.log('Profile clicked') },
    { label: 'Settings', onClick: () => console.log('Settings clicked') },
    { type: 'divider' },
    { label: 'Logout', onClick: () => console.log('Logout clicked') },
  ];

  // Sample data for Table
  const tableColumns = [
    { id: 'name', header: 'Name', accessor: 'name' },
    { id: 'email', header: 'Email', accessor: 'email' },
    { id: 'role', header: 'Role', accessor: 'role' },
    { 
      id: 'status', 
      header: 'Status', 
      accessor: 'status',
      cell: (value) => (
        <Badge 
          variant={value === 'Active' ? 'success' : value === 'Pending' ? 'warning' : 'danger'} 
          type="pill"
        >
          {value}
        </Badge>
      )
    },
    { 
      id: 'actions', 
      header: 'Actions', 
      accessor: (row) => row.id,
      cell: (value) => (
        <div className="flex space-x-2">
          <Button size="xs" variant="outline">Edit</Button>
          <Button size="xs" variant="danger">Delete</Button>
        </div>
      )
    },
  ];

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Pending' },
  ];

  // Sample data for List
  const listItems = [
    { id: 1, title: 'Complete project proposal', subtitle: 'Due tomorrow' },
    { id: 2, title: 'Review pull requests', subtitle: '5 pending reviews' },
    { id: 3, title: 'Update documentation', subtitle: 'API reference needs updating' },
    { id: 4, title: 'Team meeting', subtitle: 'Discuss sprint planning' },
  ];

  // Show toast with specified variant
  const showToast = (variant) => {
    setToastVariant(variant);
    setIsToastVisible(true);
  };

  return (
    <Container maxWidth="6xl" className="py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Components Showcase</h1>

      {/* Layout Components */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Layout Components</h2>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Card</h3>
        <Grid cols={{ default: 1, md: 3 }} gap="6">
          <Card header="Basic Card">
            <p>This is a basic card with a header.</p>
          </Card>
          
          <Card 
            header={<h3 className="text-lg font-medium">Card with Footer</h3>}
            footer={<p className="text-sm text-gray-500">Last updated: Today</p>}
          >
            <p>This card has both a header and footer.</p>
          </Card>
          
          <Card hover={true}>
            <p>This card has hover effects enabled.</p>
          </Card>
        </Grid>

        <h3 className="text-xl font-medium mt-6 mb-3">Page Layouts</h3>
        <Card>
          <div className="mb-4">
            <h4 className="font-medium mb-2">Page Layout Skeletons</h4>
            <Grid cols={{ default: 1, md: 2 }} gap="4">
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <PageLayout.Skeleton type="default" headerHeight="h-12" contentRows={2} className="max-h-64" />
              </div>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                <PageLayout.Skeleton type="dashboard" contentRows={2} className="max-h-64" />
              </div>
            </Grid>
          </div>
          <div className="mt-4">
            <Link to="/page-layouts">
              <Button>
                View Full Page Layout Examples
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Form Components */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Form Components</h2>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Buttons</h3>
        <Card>
          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="info">Info</Button>
            <Button variant="outline">Outline</Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <Button fullWidth>Full Width</Button>
          </div>
        </Card>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Form Fields</h3>
        <Card>
          <Form onSubmit={(e) => console.log('Form submitted')}>
            <Form.Group>
              <Input
                label="Text Input"
                placeholder="Enter some text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="This is a helper text"
              />
            </Form.Group>
            
            <Form.Group>
              <Select
                label="Select Input"
                options={selectOptions}
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                placeholder="Choose an option"
              />
            </Form.Group>
            
            <Form.Group>
              <Checkbox
                label="Checkbox Input"
                checked={checkboxChecked}
                onChange={(e) => setCheckboxChecked(e.target.checked)}
                helperText="Check this box if you agree"
              />
            </Form.Group>
            
            <Form.Divider label="Form Section" />
            
            <Form.Group>
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </Form.Group>
            
            <Form.Group>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                error="Password must be at least 8 characters"
              />
            </Form.Group>
            
            <Form.Actions>
              <Button variant="secondary">Cancel</Button>
              <Button variant="primary" type="submit">Submit</Button>
            </Form.Actions>
          </Form>
        </Card>
      </section>

      {/* Feedback Components */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Feedback Components</h2>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Alerts</h3>
        <Grid cols={{ default: 1, md: 2 }} gap="4">
          <Alert variant="info" title="Information">
            This is an informational alert.
          </Alert>
          
          <Alert variant="success" title="Success">
            This is a success alert.
          </Alert>
          
          <Alert variant="warning" title="Warning">
            This is a warning alert.
          </Alert>
          
          <Alert variant="error" title="Error" dismissible onDismiss={() => console.log('Alert dismissed')}>
            This is an error alert with dismiss button.
          </Alert>
        </Grid>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Modal</h3>
        <Card>
          <div className="flex gap-2">
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
          </div>
          
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Sample Modal"
            size="md"
          >
            <p className="mb-4">This is a sample modal dialog.</p>
            <div className="flex justify-end">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Close</Button>
            </div>
          </Modal>
        </Card>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Drawer</h3>
        <Card>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setIsDrawerOpen(true)}>Open Drawer</Button>
          </div>
          
          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            title="Drawer Example"
            position="right"
            size="md"
          >
            <div className="space-y-4">
              <p>This is a drawer component that slides in from the edge of the screen.</p>
              <p>It can be positioned on any side: left, right, top, or bottom.</p>
              <Button onClick={() => setIsDrawerOpen(false)}>Close Drawer</Button>
            </div>
          </Drawer>
        </Card>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Toast</h3>
        <Card>
          <div className="flex flex-wrap gap-2">
            <Button variant="info" onClick={() => showToast('info')}>Info Toast</Button>
            <Button variant="success" onClick={() => showToast('success')}>Success Toast</Button>
            <Button variant="warning" onClick={() => showToast('warning')}>Warning Toast</Button>
            <Button variant="danger" onClick={() => showToast('error')}>Error Toast</Button>
          </div>
          
          <Toast
            isVisible={isToastVisible}
            onClose={() => setIsToastVisible(false)}
            variant={toastVariant}
            title={`${toastVariant.charAt(0).toUpperCase() + toastVariant.slice(1)} Toast`}
            position="top-right"
            autoHideDuration={3000}
          >
            This is a {toastVariant} toast notification.
          </Toast>
        </Card>
      </section>

      {/* Data Components */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Data Components</h2>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Table</h3>
        <Card>
          <Table
            columns={tableColumns}
            data={tableData}
            striped
            hoverable
            bordered
            onRowClick={(row) => console.log('Row clicked:', row)}
            className="mb-4"
          />
          
          <Table.Pagination
            currentPage={currentPage}
            totalPages={5}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            totalItems={50}
            pageSizeOptions={[5, 10, 25, 50]}
            onPageSizeChange={setPageSize}
          />
        </Card>
        
        <h3 className="text-xl font-medium mt-6 mb-3">List</h3>
        <Grid cols={{ default: 1, md: 2 }} gap="6">
          <Card>
            <h4 className="font-medium mb-2">Basic List</h4>
            <List
              items={listItems}
              renderItem={(item) => (
                <List.Item
                  title={item.title}
                  subtitle={item.subtitle}
                  onClick={() => console.log('Item clicked:', item)}
                />
              )}
              hoverable
              divided
            />
          </Card>
          
          <Card>
            <h4 className="font-medium mb-2">List with Sections</h4>
            <List
              items={[]}
              emptyMessage="Custom empty message"
              className="mb-4"
            >
              <List.Section title="Today">
                <List.Item
                  title="Complete project proposal"
                  subtitle="Due today at 5 PM"
                  leading={
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">1</span>
                    </div>
                  }
                  trailing={
                    <Badge variant="warning" type="pill">Urgent</Badge>
                  }
                />
                <List.Item
                  title="Team meeting"
                  subtitle="3:00 PM - 4:00 PM"
                  leading={
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">2</span>
                    </div>
                  }
                />
              </List.Section>
              
              <List.Section title="Tomorrow">
                <List.Item
                  title="Review pull requests"
                  subtitle="5 pending reviews"
                  leading={
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-sm">3</span>
                    </div>
                  }
                />
                <List.Item
                  title="Update documentation"
                  subtitle="API reference needs updating"
                  leading={
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 text-sm">4</span>
                    </div>
                  }
                  trailing={
                    <Badge variant="info" type="pill">In Progress</Badge>
                  }
                />
              </List.Section>
            </List>
          </Card>
        </Grid>
      </section>

      {/* Display Components */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Display Components</h2>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Badges</h3>
        <Card>
          <div className="flex flex-wrap gap-4 mb-4">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <Badge variant="primary" type="pill">Pill</Badge>
            <Badge variant="success" type="pill">Pill</Badge>
            <Badge variant="danger" type="pill">Pill</Badge>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <Badge variant="primary" outline>Outline</Badge>
            <Badge variant="success" outline>Outline</Badge>
            <Badge variant="danger" outline>Outline</Badge>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Badge variant="primary" type="dot">Status Active</Badge>
            <Badge variant="success" type="dot">Status Online</Badge>
            <Badge variant="danger" type="dot">Status Offline</Badge>
          </div>
        </Card>
      </section>

      {/* Navigation Components */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Navigation Components</h2>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Tabs</h3>
        <Card>
          <h4 className="font-medium mb-2">Default Tabs</h4>
          <Tabs tabs={tabsData} className="mb-6" />
          
          <h4 className="font-medium mb-2">Pills Tabs</h4>
          <Tabs tabs={tabsData} variant="pills" className="mb-6" />
          
          <h4 className="font-medium mb-2">Underline Tabs</h4>
          <Tabs tabs={tabsData} variant="underline" />
        </Card>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Dropdown</h3>
        <Card>
          <div className="flex gap-4">
            <Dropdown
              trigger={<Button>Click me</Button>}
              items={dropdownItems}
              align="left"
            />
            
            <Dropdown
              trigger={<Button variant="outline">With Dividers</Button>}
              items={dropdownItems}
              align="right"
              withDividers
            />
          </div>
        </Card>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Pagination</h3>
        <Card>
          <div className="mb-4">
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
              showFirstLast
              siblingCount={1}
            />
          </div>
          
          <div className="mb-4">
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
              showFirstLast={false}
              size="sm"
            />
          </div>
          
          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
              size="lg"
            />
          </div>
        </Card>
      </section>
    </Container>
  );
};

export default ComponentsShowcase; 