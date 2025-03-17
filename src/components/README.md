# Components Directory Structure

This directory contains all the reusable UI components used throughout the application. The components are organized by their purpose and functionality.

## Directory Structure

### Layout Components (`/layout`)
Components that handle the overall layout and structure of pages:
- `Container.jsx` - Responsive container with max-width settings
- `Grid.jsx` - Flexible grid system for layouts
- `Card.jsx` - Card component for containing content
- `PageLayout.jsx` - Page layout templates (default, dashboard, app, etc.)

### Form Components (`/forms`)
Components used for user input and form handling:
- `Button.jsx` - Button component with various styles and states
- `Input.jsx` - Text input component
- `Select.jsx` - Dropdown select component
- `Checkbox.jsx` - Checkbox input component
- `Form.jsx` - Form container with validation support

### Feedback Components (`/feedback`)
Components that provide feedback to the user:
- `Alert.jsx` - Alert messages for notifications
- `Modal.jsx` - Modal dialog component
- `Toast.jsx` - Toast notification component
- `Drawer.jsx` - Slide-in drawer component

### Display Components (`/display`)
Components for displaying information:
- `Badge.jsx` - Badge component for labels and status indicators

### Data Display Components (`/data-display`)
Components for displaying and visualizing data (not for database storage):
- `Table.jsx` - Table component for displaying structured data
- `List.jsx` - List component for displaying items in a list format

### Navigation Components (`/navigation`)
Components for navigation and user movement:
- `Tabs.jsx` - Tab navigation component
- `Dropdown.jsx` - Dropdown menu component
- `Pagination.jsx` - Pagination component for navigating through pages

## Usage

All components are exported from the `index.js` file in this directory, so you can import them directly from the components directory:

```jsx
import { Button, Input, Card } from '../components';
```

## Component Documentation

Each component is designed to be flexible and customizable through props. For detailed documentation on each component, please refer to the comments in the component files or the Components Showcase page in the application. 