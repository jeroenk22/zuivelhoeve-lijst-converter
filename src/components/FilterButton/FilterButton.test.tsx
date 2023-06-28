import React from 'react';
import { cleanup, render } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import FilterButton from './FilterButton';

afterEach(cleanup);

describe('FilterButton', () => {
  it('moet de onClick functie aanroepen wanneer erop wordt geklikt', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<FilterButton onClick={handleClick} />);
    const button = getByText('Upload Excelbestand');

    userEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});


