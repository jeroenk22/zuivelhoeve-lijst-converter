import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ExcelFilter from './ExcelFilter';

describe('ExcelFilter', () => {
  test('calls necessary functions when form is submitted', async () => {
    const { getByTestId, getByText } = render(<ExcelFilter />);
    const fileUploader = getByTestId('file-uploader');
    const dateSelector = getByTestId('date-selector');
    const submitButton = getByText('Filter en download');

    fireEvent.change(fileUploader, {
      target: {
        files: [
          new File([], 'test.xlsx', {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }),
        ],
      },
    });
    fireEvent.input(dateSelector, { target: { value: '2023-06-27' } });

    const readMock = jest.spyOn(require('xlsx'), 'read');
    const sheetToJsonMock = jest.spyOn(require('xlsx').utils, 'sheet_to_json');
    const filterDataMock = jest.spyOn(require('../../utils/dataUtils'), 'filterData');
    const removeFirstEntryMock = jest.spyOn(require('../../utils/dataUtils'), 'removeFirstEntry');
    const removeLastEntryMock = jest.spyOn(require('../../utils/dataUtils'), 'removeLastEntry');

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
