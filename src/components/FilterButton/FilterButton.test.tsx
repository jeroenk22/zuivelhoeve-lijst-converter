import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterButton from './FilterButton';

describe('FilterButton', () => {
  it('moet de onClick functie aanroepen wanneer erop wordt geklikt', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<FilterButton onClick={handleClick} />);
    const button = getByText('Upload Excelbestand');

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});
