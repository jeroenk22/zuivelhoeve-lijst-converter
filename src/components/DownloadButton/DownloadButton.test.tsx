import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import * as XLSX from 'xlsx';

import DownloadButton from './DownloadButton';

jest.mock('xlsx', () => ({
  utils: {
    json_to_sheet: jest.fn(() => 'dummySheet'),
    book_new: jest.fn(() => 'dummyWorkbook'),
    book_append_sheet: jest.fn(),
  },
  writeFile: jest.fn(),
}));

describe('DownloadButton', () => {
  test('roept handleDownload aan wanneer er wordt geklikt en een geselecteerde datum is', () => {
    const { getByText } = render(
      <DownloadButton
        data={[]}
        filename="test"
        weekNumber={1}
        selectedDate={new Date()}
      />
    );

    const downloadButton = getByText('Download MendriX importbestand');
    fireEvent.click(downloadButton);

    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledTimes(1);
    expect(XLSX.utils.book_new).toHaveBeenCalledTimes(1);
    expect(XLSX.utils.book_append_sheet).toHaveBeenCalledTimes(1);
    expect(XLSX.writeFile).toHaveBeenCalledTimes(1);
  });
});
