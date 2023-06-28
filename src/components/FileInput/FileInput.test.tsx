import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FileInput from './FileInput';

afterEach(cleanup);

describe('FileInput', () => {
  it('moet de onChange functie aanroepen wanneer een bestand wordt geselecteerd', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(<FileInput onChange={handleChange} />);
    const fileInput = getByLabelText('Selecteer Zuivelhoevelijst');

    fireEvent.change(fileInput, { target: { files: [new File(['dummy'], 'test.xlsx', { type: 'application/vnd.ms-excel' })] } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('moet alleen .xlsx-bestanden accepteren', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(<FileInput onChange={handleChange} />);
    const fileInput = getByLabelText('Selecteer Zuivelhoevelijst');

    fireEvent.change(fileInput, { target: { files: [new File(['dummy'], 'test.txt', { type: 'text/plain' })] } });

    expect(handleChange).not.toHaveBeenCalled();
  });
});
