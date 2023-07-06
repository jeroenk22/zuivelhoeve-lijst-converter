import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ExcelFilter from './ExcelFilter';
import FilterButton from '../FilterButton/FilterButton';

describe('ExcelFilter', () => {
  test('rendert bestandsuploader, datumselector en verzendknop', () => {
    render(<ExcelFilter />);
    
    // Bestandsuploader
    expect(screen.getByTestId('file-uploader')).toBeInTheDocument();
    
    // Datumselector
    expect(screen.getByLabelText('Datum:')).toBeInTheDocument();

    // Verzendknop
    expect(screen.getByTestId('upload-button')).toBeInTheDocument();
  });

  test('schakelt verzendknop uit wanneer er geen bestand of datum is geselecteerd', () => {
    render(<ExcelFilter />);
    const submitButton = screen.getByTestId('upload-button') as HTMLButtonElement;

    expect(submitButton.disabled).toBe(true);

    // Selecteer een bestand
    const fileInput = screen.getByTestId('file-uploader');
    fireEvent.change(fileInput, { target: { files: [new File([], 'voorbeeld.xlsx')] } });
    expect(submitButton.disabled).toBe(true);

    // Selecteer een datum
    const dateInput = screen.getByLabelText('Datum:');
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    expect(submitButton.disabled).toBe(false);
  }); 
});