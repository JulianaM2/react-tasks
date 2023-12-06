import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the navbar', () => {
  render(<App />);

  const addTaskNavbarOption = screen.getByText('Add task');
  const listTasksNavbarOption = screen.getByText('List tasks');

  expect(addTaskNavbarOption).toBeInTheDocument();
  expect(listTasksNavbarOption).toBeInTheDocument();
});
