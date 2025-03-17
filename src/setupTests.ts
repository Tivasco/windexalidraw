import '@testing-library/jest-dom';

// Mock the i18next module
jest.mock('i18next', () => ({
  init: jest.fn().mockResolvedValue({}),
  use: jest.fn().mockReturnThis(),
  t: jest.fn().mockImplementation((key) => key),
  changeLanguage: jest.fn().mockResolvedValue({}),
}));

// Reset all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
}); 