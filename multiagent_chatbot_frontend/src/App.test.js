import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand title', () => {
  render(<App />);
  const brand = screen.getByText(/Multi-Agent Chat/i);
  expect(brand).toBeInTheDocument();
});
