import React from 'react';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import ExcelFilter from './ExcelFilter';
import * as XLSX from 'xlsx';

afterEach(cleanup);

describe('ExcelFilter', () => {
  test('roept de vereiste functies aan wanneer het formulier wordt ingediend', async () => {
    render(<ExcelFilter />);
    const fileUploader = screen.getByTestId('file-uploader');
    const dateSelectorContainer = screen.getByTestId('date-selector-container');
    const dateSelectorInput = dateSelectorContainer.querySelector('input');
    const submitButton = screen.getByTestId('upload-button');

    fireEvent.change(fileUploader, {
      target: {
        files: [
          new File([], 'test.xlsx', {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }),
        ],
      },
    });

    if (dateSelectorInput instanceof HTMLInputElement) {
      fireEvent.input(dateSelectorInput, { target: { value: '2023-06-27' } });
    }

    const readMock = jest.spyOn(XLSX, 'read');
    const sheetToJsonMock = jest.spyOn(XLSX.utils, 'sheet_to_json');
    const filterDataMock = jest.spyOn(require('../../utils/dataUtils'), 'filterData');
    const removeFirstEntryMock = jest.spyOn(require('../../utils/dataUtils'), 'removeFirstEntry');
    const removeLastEntryMock = jest.spyOn(require('../../utils/dataUtils'), 'removeLastEntry');

    // Mock data
    const data = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    // Roep de te testen functie aan
    const workbook = XLSX.read(data, { type: 'array' });

    // Voer je beweringen uit
    // Voorbeeld: Controleer of het workbook object is gemaakt
    expect(workbook).toBeDefined();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(readMock).toHaveBeenCalled();
      expect(sheetToJsonMock).toHaveBeenCalled();
      expect(filterDataMock).toHaveBeenCalled();
      expect(removeFirstEntryMock).toHaveBeenCalled();
      expect(removeLastEntryMock).toHaveBeenCalled();
    });
  });
});
