# Code Style Guide

This document outlines the coding standards and style guidelines for contributing to the WebApp Boilerplate.

## General Principles

- **Readability**: Code should be easy to read and understand.
- **Consistency**: Follow established patterns and conventions.
- **Simplicity**: Keep code simple and avoid unnecessary complexity.
- **Documentation**: Document code appropriately.
- **Testing**: Write tests for your code.

## JavaScript/TypeScript Guidelines

### Naming Conventions

- **Variables and Functions**: Use camelCase for variables and functions.
  ```typescript
  const userName = 'John';
  function getUserData() { ... }
  ```

- **Classes and Interfaces**: Use PascalCase for classes, interfaces, types, and enums.
  ```typescript
  class UserProfile { ... }
  interface UserData { ... }
  type UserRole = 'admin' | 'user';
  enum UserStatus { Active, Inactive }
  ```

- **Constants**: Use UPPER_SNAKE_CASE for constants.
  ```typescript
  const MAX_RETRY_COUNT = 3;
  const API_BASE_URL = 'https://api.example.com';
  ```

- **Private Properties**: Use an underscore prefix for private properties.
  ```typescript
  class User {
    private _id: string;
    constructor(id: string) {
      this._id = id;
    }
  }
  ```

- **Boolean Variables**: Use "is", "has", or "should" prefixes for boolean variables.
  ```typescript
  const isActive = true;
  const hasPermission = false;
  const shouldRedirect = true;
  ```

### Formatting

- **Indentation**: Use 2 spaces for indentation.
- **Line Length**: Keep lines under 100 characters.
- **Semicolons**: Always use semicolons at the end of statements.
- **Quotes**: Use single quotes for strings.
- **Trailing Commas**: Use trailing commas in multi-line arrays and objects.
- **Braces**: Opening braces go on the same line as the statement.

```typescript
// Good
function example() {
  const items = [
    'item1',
    'item2',
    'item3',
  ];
  
  if (condition) {
    doSomething();
  } else {
    doSomethingElse();
  }
}

// Bad
function example()
{
  const items = [
    'item1',
    'item2',
    'item3'
  ]
  
  if (condition) {
    doSomething();
  }
  else {
    doSomethingElse();
  }
}
```

### TypeScript Specific

- **Type Annotations**: Use explicit type annotations for function parameters and return types.
  ```typescript
  function getUserById(id: string): User { ... }
  ```

- **Interfaces vs. Types**: Prefer interfaces for object shapes and types for unions, intersections, and mapped types.
  ```typescript
  // For object shapes
  interface User {
    id: string;
    name: string;
  }
  
  // For unions, intersections, etc.
  type UserRole = 'admin' | 'user' | 'guest';
  ```

- **Generics**: Use descriptive names for generic type parameters.
  ```typescript
  function getItem<TItem>(id: string): TItem { ... }
  ```

- **Enums**: Use const enums for better performance.
  ```typescript
  const enum Direction {
    Up,
    Down,
    Left,
    Right
  }
  ```

- **Null and Undefined**: Use undefined for uninitialized values and null for intentionally empty values.

### Best Practices

- **Avoid Any**: Minimize the use of `any` type.
- **Use Optional Chaining**: Use optional chaining (`?.`) and nullish coalescing (`??`) operators.
- **Destructuring**: Use object and array destructuring when appropriate.
- **Async/Await**: Prefer async/await over promise chains.
- **Early Returns**: Use early returns to reduce nesting.
- **Pure Functions**: Write pure functions when possible.
- **Immutability**: Treat data as immutable when possible.

## React Guidelines

### Component Structure

- **Functional Components**: Prefer functional components with hooks over class components.
  ```tsx
  const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    return (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    );
  };
  ```

- **Component Organization**: Organize components in a logical folder structure.
  ```
  components/
  ├── Button/
  │   ├── Button.tsx
  │   ├── Button.test.tsx
  │   ├── Button.module.css
  │   └── index.ts
  ```

- **Props**: Define prop types using TypeScript interfaces.
  ```tsx
  interface ButtonProps {
    variant: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    onClick: () => void;
    children: React.ReactNode;
  }
  ```

### Hooks

- **Custom Hooks**: Extract reusable logic into custom hooks.
- **Hook Naming**: Prefix custom hooks with `use`.
- **Hook Dependencies**: Keep the dependency array accurate.

```tsx
// Good
const [data, setData] = useState<User[]>([]);
useEffect(() => {
  fetchUsers().then(users => setData(users));
}, []);

// Custom hook
function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .finally(() => setLoading(false));
  }, []);
  
  return { users, loading };
}
```

### JSX

- **Self-closing Tags**: Use self-closing tags for elements without children.
- **Conditional Rendering**: Use ternary operators or logical && for simple conditions.
- **Key Prop**: Always use a unique key prop in lists.
- **Event Handlers**: Use the handle prefix for event handler functions.

```tsx
// Good
return (
  <div>
    <input type="text" />
    {isLoggedIn ? <UserProfile user={user} /> : <LoginButton />}
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
    <button onClick={handleClick}>Click me</button>
  </div>
);
```

## CSS/Styling Guidelines

### CSS Modules

- **File Naming**: Use `.module.css` extension for CSS modules.
- **Class Naming**: Use camelCase for class names in CSS modules.
- **Composition**: Use composition to reuse styles.

```css
/* Button.module.css */
.button {
  padding: 8px 16px;
  border-radius: 4px;
}

.primaryButton {
  composes: button;
  background-color: blue;
  color: white;
}
```

### Tailwind CSS

- **Utility Classes**: Use Tailwind utility classes for styling.
- **Custom Classes**: Extract repeated utility patterns into custom classes.
- **Responsive Design**: Use responsive prefixes for different screen sizes.

```tsx
// Good
<div className="flex flex-col md:flex-row p-4 bg-white shadow rounded">
  <h1 className="text-xl font-bold text-gray-800">Title</h1>
</div>
```

## Testing Guidelines

### Unit Tests

- **Test Naming**: Name tests descriptively.
- **Arrange-Act-Assert**: Structure tests using the AAA pattern.
- **Mocking**: Mock external dependencies.

```tsx
// Good
describe('UserProfile', () => {
  it('should display user name and email', () => {
    // Arrange
    const user = { name: 'John', email: 'john@example.com' };
    
    // Act
    render(<UserProfile user={user} />);
    
    // Assert
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});
```

### Component Tests

- **User Interactions**: Test user interactions using React Testing Library.
- **Accessibility**: Test accessibility using jest-axe.
- **Snapshots**: Use snapshot tests sparingly.

## Documentation Guidelines

### Code Comments

- **Purpose**: Comment on why, not what.
- **JSDoc**: Use JSDoc for functions and classes.
- **TODO/FIXME**: Mark incomplete code with TODO or FIXME comments.

```typescript
/**
 * Fetches user data from the API
 * @param id - The user ID
 * @returns A promise that resolves to the user data
 */
async function fetchUser(id: string): Promise<User> {
  // TODO: Add error handling
  return api.get(`/users/${id}`);
}
```

### README and Documentation

- **README**: Keep the README up to date.
- **Documentation**: Document complex logic and architecture decisions.
- **Examples**: Provide examples for complex components or functions.

## Linting and Formatting

The project uses ESLint and Prettier for linting and formatting. The configuration is in the `.eslintrc` and `.prettierrc` files.

To lint your code:

```bash
npm run lint
```

To format your code:

```bash
npm run format
```

## Pre-commit Hooks

The project uses Husky and lint-staged to run linting and formatting on staged files before committing.

## Next Steps

- [Pull Request Process](./pull-requests.md): How to submit pull requests
- [Issue Guidelines](./issues.md): How to report issues
- [Development Workflow](./workflow.md): Development workflow guidelines 