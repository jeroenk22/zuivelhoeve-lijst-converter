import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';

afterEach(cleanup);

test('renders App component', () => {
  const { getByText } = render(<App />);
  const filterButton = getByText('Upload Excelbestand');

  expect(filterButton).toBeInTheDocument();
});
