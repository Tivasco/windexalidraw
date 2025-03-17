import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout, Button, Card, Grid, List, Table, Badge } from '../components';

const PageLayoutsShowcase = () => {
  // Sample data for sidebar
  const sidebarLinks = [
    { id: 'default', label: 'Default Layout', href: '#default' },
    { id: 'dashboard', label: 'Dashboard Layout', href: '#dashboard' },
    { id: 'app', label: 'App Layout', href: '#app' },
    { id: 'landing', label: 'Landing Layout', href: '#landing' },
    { id: 'auth', label: 'Auth Layout', href: '#auth' },
  ];

  // Sample data for table
  const tableColumns = [
    { id: 'name', header: 'Name', accessor: 'name' },
    { id: 'email', header: 'Email', accessor: 'email' },
    { id: 'role', header: 'Role', accessor: 'role' },
  ];

  const tableData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ];

  // Render sidebar content
  const renderSidebar = () => (
    <div className="py-4">
      <div className="px-4 mb-4">
        <h3 className="text-lg font-medium text-gray-900">Page Layouts</h3>
        <p className="text-sm text-gray-500">Examples of different page layouts</p>
      </div>
      <nav className="space-y-1">
        {sidebarLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );

  // Render header content
  const renderHeader = () => (
    <div className="flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-900">Page Layouts</h1>
      <div className="flex items-center space-x-4">
        <Link to="/components">
          <Button variant="outline" size="sm">Back to Components</Button>
        </Link>
      </div>
    </div>
  );

  // Render footer content
  const renderFooter = () => (
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-500">© 2023 Your Company</p>
      <div className="flex space-x-4">
        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Privacy</a>
        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Terms</a>
        <a href="#" className="text-sm text-gray-500 hover:text-gray-900">Contact</a>
      </div>
    </div>
  );

  return (
    <div>
      {/* Default Layout */}
      <section id="default" className="mb-16">
        <PageLayout
          title="Default Layout"
          sidebar={renderSidebar()}
          footer={renderFooter()}
        >
          <Card className="mb-6">
            <h2 className="text-lg font-medium mb-4">Default Layout with Sidebar</h2>
            <p className="mb-4">
              This is the default page layout with a sidebar, header, and footer. 
              It's suitable for content-focused pages where navigation is important.
            </p>
            <p>
              The sidebar can be positioned on either the left or right side, and its width is customizable.
            </p>
          </Card>
          
          <Grid cols={{ default: 1, md: 2 }} gap="6">
            <Card>
              <h3 className="font-medium mb-2">Features</h3>
              <List
                items={[
                  { title: 'Customizable sidebar width' },
                  { title: 'Left or right sidebar positioning' },
                  { title: 'Optional header and footer' },
                  { title: 'Responsive design' },
                ]}
                renderItem={(item) => (
                  <List.Item title={item.title} />
                )}
                divided
              />
            </Card>
            
            <Card>
              <h3 className="font-medium mb-2">Sample Data</h3>
              <Table
                columns={tableColumns}
                data={tableData}
                striped
                hoverable
              />
            </Card>
          </Grid>
        </PageLayout>
      </section>

      {/* Dashboard Layout */}
      <section id="dashboard" className="mb-16">
        <PageLayout.Dashboard
          title="Dashboard Layout"
          sidebar={
            <div className="py-4">
              <div className="px-4 mb-6">
                <h3 className="text-lg font-medium text-gray-900">Dashboard</h3>
              </div>
              <nav className="space-y-1">
                {['Dashboard', 'Projects', 'Team', 'Calendar', 'Reports', 'Settings'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          }
          footer={renderFooter()}
        >
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-4">Dashboard Layout</h2>
            <p>
              This layout is optimized for admin dashboards with a fixed sidebar and header.
              The sidebar remains visible as you scroll through the content.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {['Total Users', 'Active Projects', 'Revenue'].map((title, index) => (
              <Card key={index}>
                <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  {index === 0 ? '1,234' : index === 1 ? '42' : '$12,345'}
                </p>
                <p className="mt-1 text-sm text-green-600">
                  <span>↑ 12%</span> <span className="text-gray-500">from last month</span>
                </p>
              </Card>
            ))}
          </div>
          
          <Card>
            <h3 className="font-medium mb-4">Recent Activity</h3>
            <Table
              columns={[
                { id: 'user', header: 'User', accessor: 'user' },
                { id: 'action', header: 'Action', accessor: 'action' },
                { id: 'time', header: 'Time', accessor: 'time' },
                { 
                  id: 'status', 
                  header: 'Status', 
                  accessor: 'status',
                  cell: (value) => (
                    <Badge 
                      variant={value === 'Completed' ? 'success' : value === 'In Progress' ? 'warning' : 'info'} 
                      type="pill"
                    >
                      {value}
                    </Badge>
                  )
                },
              ]}
              data={[
                { id: 1, user: 'John Doe', action: 'Created project', time: '2 hours ago', status: 'Completed' },
                { id: 2, user: 'Jane Smith', action: 'Updated document', time: '4 hours ago', status: 'Completed' },
                { id: 3, user: 'Bob Johnson', action: 'Reviewing pull request', time: '1 day ago', status: 'In Progress' },
                { id: 4, user: 'Alice Brown', action: 'Deployed to production', time: '2 days ago', status: 'Completed' },
              ]}
              striped
              hoverable
            />
          </Card>
        </PageLayout.Dashboard>
      </section>

      {/* App Layout */}
      <section id="app" className="mb-16">
        <PageLayout.App
          header={
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold">App Layout</span>
                <nav className="hidden md:flex space-x-8">
                  {['Home', 'Features', 'Pricing', 'About'].map((item) => (
                    <a key={item} href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
              <div>
                <Button size="sm">Sign In</Button>
              </div>
            </div>
          }
          footer={renderFooter()}
        >
          <Card className="mb-6">
            <h2 className="text-lg font-medium mb-4">App Layout</h2>
            <p>
              This layout is designed for web applications with a fixed header and footer.
              The header remains visible as you scroll, providing easy access to navigation.
            </p>
          </Card>
          
          <Grid cols={{ default: 1, md: 3 }} gap="6">
            {['Feature 1', 'Feature 2', 'Feature 3'].map((title, index) => (
              <Card key={index}>
                <h3 className="font-medium mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </Card>
            ))}
          </Grid>
        </PageLayout.App>
      </section>

      {/* Landing Layout */}
      <section id="landing" className="mb-16">
        <PageLayout.Landing
          header={
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">Landing Layout</div>
              <nav className="hidden md:flex space-x-8">
                {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
                  <a key={item} href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          }
          hero={
            <div className="py-16 px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-4">
                Welcome to Our Platform
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-blue-100 mb-8">
                The all-in-one solution for your business needs.
              </p>
              <div className="flex justify-center space-x-4">
                <Button size="lg">Get Started</Button>
                <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Learn More
                </Button>
              </div>
            </div>
          }
          footer={
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Product</h3>
                <ul className="space-y-2">
                  {['Features', 'Pricing', 'Testimonials', 'FAQ'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-gray-300 hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Company</h3>
                <ul className="space-y-2">
                  {['About', 'Team', 'Careers', 'Press'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-gray-300 hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Resources</h3>
                <ul className="space-y-2">
                  {['Blog', 'Documentation', 'Guides', 'Support'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-gray-300 hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">Legal</h3>
                <ul className="space-y-2">
                  {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-gray-300 hover:text-white">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          }
        >
          <div className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4">
                Key Features
              </h2>
              <p className="max-w-2xl mx-auto text-xl text-gray-500">
                Everything you need to succeed in one place.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { title: 'Easy Integration', description: 'Connect with your favorite tools and services.' },
                { title: 'Powerful Analytics', description: 'Gain insights with comprehensive reporting.' },
                { title: 'Secure Platform', description: 'Your data is protected with enterprise-grade security.' },
              ].map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 text-2xl">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button size="lg">Start Your Free Trial</Button>
            </div>
          </div>
        </PageLayout.Landing>
      </section>

      {/* Auth Layout */}
      <section id="auth" className="mb-16">
        <PageLayout.Auth
          logo={
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xl font-bold">A</span>
            </div>
          }
          footer={
            <div>
              <p className="mb-2">© 2023 Your Company. All rights reserved.</p>
              <div className="flex justify-center space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-900">Privacy</a>
                <a href="#" className="text-gray-500 hover:text-gray-900">Terms</a>
                <a href="#" className="text-gray-500 hover:text-gray-900">Contact</a>
              </div>
            </div>
          }
        >
          <div>
            <h2 className="text-2xl font-bold text-center mb-6">Sign in to your account</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <Button type="submit" fullWidth>
                  Sign in
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <Button variant="outline" fullWidth>
                    Google
                  </Button>
                </div>
                <div>
                  <Button variant="outline" fullWidth>
                    GitHub
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </PageLayout.Auth>
      </section>

      <div className="fixed bottom-4 right-4">
        <Link to="/components">
          <Button variant="primary">Back to Components</Button>
        </Link>
      </div>
    </div>
  );
};

export default PageLayoutsShowcase; 