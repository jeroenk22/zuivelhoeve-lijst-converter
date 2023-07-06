import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DateSelector from './DateSelector';

afterEach(cleanup);

describe('DateSelector', () => {
  it('render zonder fouten', () => {
    render(<DateSelector date={null} onDateChange={() => {}} />);
  });

  it('toont het juiste label', () => {
    const { getByLabelText } = render(<DateSelector date={null} onDateChange={() => {}} />);
    const labelElement = getByLabelText('Datum:');
    expect(labelElement).toBeInTheDocument();
  });

  it('roept onDateChange aan met de geselecteerde datum', () => {
    const mockOnDateChange = jest.fn();
    const { getByLabelText } = render(<DateSelector date={null} onDateChange={mockOnDateChange} />);
    const dateInput = getByLabelText('Datum:');
    fireEvent.change(dateInput, { target: { value: '01-01-2023' } });
    expect(mockOnDateChange).toHaveBeenCalledWith(new Date(2023, 0, 1));
  });
});
