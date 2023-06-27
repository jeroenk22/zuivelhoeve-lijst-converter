import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

test('renders App component', () => {
  const { getByText } = render(<App />);
  const filterButton = getByText('Filter en download');

  expect(filterButton).toBeInTheDocument();
});
