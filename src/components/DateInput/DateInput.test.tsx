import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import DateInput from './DateInput';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

describe('DateInput', () => {
  test('rendert zonder problemen', () => {
    render(<DateInput value="" onChange={() => {}} />);
  });

  test('toont de juiste initiële waarde', () => {
    const { getByDisplayValue } = render(<DateInput value="2023-06-28" onChange={() => {}} />);
    const inputElement = getByDisplayValue('2023-06-28');
    expect(inputElement).toBeInTheDocument();
  });

  test('roept onChange aan wanneer de invoerwaarde verandert', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<DateInput value="" onChange={handleChange} />);
    const inputElement = getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: '2023-06-28' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
