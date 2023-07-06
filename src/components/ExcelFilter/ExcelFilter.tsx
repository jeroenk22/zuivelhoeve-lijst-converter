import React from 'react';
import UseExcelFilter from '../UseExcelFilter/UseExcelFilter';
import FileUploader from '../FileUploader/FileUploader';
import DateSelector from '../DateSelector/DateSelector';
import FilteredData from '../FilteredData/FilteredData';
import DownloadButton from '../DownloadButton/DownloadButton';
import { getWeekNumber } from '../../utils/dateUtils';

const ExcelFilter: React.FC = () => {
  const {
    date,
    uploadedFile,
    filteredRowCount,
    tableData,
    colliCount,
    handleDateChange,
    handleFileUpload,
    handleFormSubmit,
  } = UseExcelFilter();

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <FileUploader onFileUpload={handleFileUpload} />
        <DateSelector date={date} onDateChange={handleDateChange} />
        <button type='submit' data-testid="upload-button" disabled={!uploadedFile || !date}>
          Upload Excelbestand
        </button>
      </form>
      {filteredRowCount > 0 && (
        <div data-testid="filtered-data-container">
          <FilteredData
            filteredRowCount={filteredRowCount}
            tableData={tableData}
            colliCount={colliCount}
          />
          <DownloadButton
            data={tableData}
            filename='Zuivelhoevelijst'
            weekNumber={getWeekNumber(date as Date)}
            selectedDate={date}
          />
        </div>
      )}
    </div>
  );
};

export default ExcelFilter;