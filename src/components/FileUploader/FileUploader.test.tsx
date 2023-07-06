import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import FileUploader from './FileUploader';

afterEach(cleanup);

describe('FileUploader', () => {
  it('moet de onFileUpload functie aanroepen met het geselecteerde bestand', () => {
    const handleFileUpload = jest.fn();
    const { getByTestId } = render(<FileUploader onFileUpload={handleFileUpload} />);
    const fileInput = getByTestId('file-uploader') as HTMLInputElement; // Type expliciet aangeven
    const file = new File(['dummy'], 'test.xlsx', { type: 'application/vnd.ms-excel' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(handleFileUpload).toHaveBeenCalledWith(file);
  });

  it('moet een waarschuwing weergeven en het bestand invoerveld resetten als er een ongeldig bestandstype is geselecteerd', () => {
    const handleFileUpload = jest.fn();
    const { getByTestId } = render(<FileUploader onFileUpload={handleFileUpload} />);
    const fileInput = getByTestId('file-uploader') as HTMLInputElement; // Type expliciet aangeven
    const file = new File(['dummy'], 'test.txt', { type: 'text/plain' });

    window.alert = jest.fn();
    Object.defineProperty(fileInput, 'value', { writable: true, value: 'fakepath/test.txt' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(window.alert).toHaveBeenCalledWith(
      'Ongeldig bestandstype. Selecteer een XLSX-bestand. (Huidige bestand: .txt)'
    );
    expect(fileInput.value).toBe('');
    expect(handleFileUpload).not.toHaveBeenCalled();
  });
});
