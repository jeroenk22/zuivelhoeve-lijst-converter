import React from 'react';
import * as XLSX from 'xlsx';

interface DownloadButtonProps {
  data: any[][];
  filename: string;
  weekNumber: number;
  selectedDate: Date | null;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  data,
  filename,
  weekNumber,
  selectedDate,
}) => {
  const getFormattedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  const handleDownload = () => {
    if (selectedDate) {
      const formattedDate = getFormattedDate(selectedDate);
      const fullFilename = `${filename} - ${formattedDate} (week ${weekNumber})`;

      const worksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Data');
      XLSX.writeFile(workbook, `${fullFilename}.xlsx`);
    }
  };

  return (
    <button data-testid='download-button' onClick={handleDownload} disabled={!selectedDate}>
      Download MendriX importbestand
    </button>
  );
};

export default DownloadButton;
