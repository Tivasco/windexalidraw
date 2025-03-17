# Component Library Overview

This document provides an overview of the component library used in the WebApp Boilerplate.

## Component Design Philosophy

The component library follows these key principles:

1. **Reusability**: Components are designed to be reusable across the application.
2. **Composability**: Smaller components can be composed to create more complex components.
3. **Separation of Concerns**: Components are focused on specific responsibilities.
4. **Accessibility**: Components are designed with accessibility in mind.
5. **Consistency**: Components follow a consistent design language.
6. **Documentation**: All components are documented with examples and props.

## Component Categories

The component library is organized into the following categories:

### UI Components

Basic UI components that form the building blocks of the application:

- Buttons
- Inputs
- Modals
- Cards
- Alerts
- Badges
- Tooltips
- Icons

See [UI Components](./ui.md) for detailed documentation.

### Form Components

Components for building forms:

- Form
- FormField
- Input
- Select
- Checkbox
- Radio
- DatePicker
- FileUpload
- FormValidation

See [Form Components](./forms.md) for detailed documentation.

### Layout Components

Components for page layout:

- Container
- Grid
- Flex
- Box
- Divider
- Spacer
- Header
- Footer
- Sidebar
- Navigation

See [Layout Components](./layout.md) for detailed documentation.

### Data Display Components

Components for displaying data:

- Table
- List
- DataGrid
- Chart
- Pagination
- Tabs
- Accordion

See [Data Display Components](./data-display.md) for detailed documentation.

### Feedback Components

Components for providing feedback to users:

- Toast
- Spinner
- ProgressBar
- Skeleton
- ErrorBoundary

See [Feedback Components](./feedback.md) for detailed documentation.

## Component Structure

Each component follows a consistent structure:

```
src/components/
├── ComponentName/
│   ├── ComponentName.tsx       # Main component implementation
│   ├── ComponentName.test.tsx  # Component tests
│   ├── ComponentName.module.css # Component styles (if using CSS modules)
│   ├── index.ts                # Export file
│   └── types.ts                # TypeScript types and interfaces
```

## Component Usage Example

Here's an example of how to use a component from the library:

```tsx
import { Button } from '../components/Button';

function MyComponent() {
  return (
    <Button 
      variant="primary" 
      size="medium" 
      onClick={() => console.log('Button clicked')}
    >
      Click Me
    </Button>
  );
}
```

## Component Props Pattern

Components follow a consistent props pattern:

```tsx
interface ButtonProps {
  // Appearance
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  
  // Behavior
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  
  // Content
  children: React.ReactNode;
  
  // Other
  className?: string;
  id?: string;
}
```

## Styling Approach

The component library uses a combination of:

- CSS Modules for component-specific styles
- Tailwind CSS for utility classes
- CSS variables for theming

## Accessibility

All components are designed with accessibility in mind:

- Proper ARIA attributes
- Keyboard navigation
- Focus management
- Color contrast
- Screen reader support

## Testing

Components are tested using:

- Jest for unit tests
- React Testing Library for component tests
- Storybook for visual testing

## Using Storybook

The component library is documented using Storybook. To view the component documentation:

```bash
npm run storybook
```

This will start Storybook on [http://localhost:6006](http://localhost:6006).

## Contributing New Components

When creating new components, follow these guidelines:

1. Follow the component structure outlined above
2. Ensure the component is fully typed with TypeScript
3. Write tests for the component
4. Document the component in Storybook
5. Ensure the component is accessible

See the [Contributing Guidelines](../contributing/code-style.md) for more details.

## Next Steps

- [UI Components](./ui.md): Basic UI components
- [Form Components](./forms.md): Form-related components
- [Layout Components](./layout.md): Layout components 