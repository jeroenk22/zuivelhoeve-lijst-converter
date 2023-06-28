import { useState } from 'react';
import * as XLSX from 'xlsx';
import { filterData, removeFirstEntry, removeLastEntry } from '../../utils/dataUtils';
import { getWeekNumber } from '../../utils/dateUtils';

const UseExcelFilter = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [filteredRowCount, setFilteredRowCount] = useState<number>(0);
  const [tableData, setTableData] = useState<any[][]>([]);

  // Handler voor wijzigingen in de geselecteerde datum
  const handleDateChange = (selectedDate: Date | null) => {
    setDate(selectedDate);
  };

  // Handler voor het uploaden van het bestand
  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
  };

  // Handler voor het indienen van het formulier
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (uploadedFile && date) {
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Filter de data op basis van kolom I
        const filteredData = filterData(jsonData);

        // Verwijder de eerste rij (koppen) en de laatste rij uit de gefilterde data
        const trimmedData = removeFirstEntry(removeLastEntry(filteredData));

        // Tel het aantal overgebleven rijen
        const rowCount = trimmedData.length;
        setFilteredRowCount(rowCount);

        // Maak een nieuw werkblad met de gewenste kolommen en koppen
        const newHeaders = [
          'Gewenst (lossen)',
          'Bedrijf (lossen)',
          'Straat (lossen)',
          'Postcode (lossen)',
          'Plaats (lossen)',
          'Uw kenmerk (lossen)',
          'Notities (lossen)',
          'Aantal',
          'Verpakking',
        ];

        const newWorksheetData = [
          newHeaders,
          ...trimmedData.map((row: any[]) => [
            date?.toLocaleDateString('nl-NL'),
            `Zuivelhoeve ${row[0]}`, // Voeg het voorvoegsel "Zuivelhoeve" toe aan de gegevens in de 2e kolom
            ...row.slice(1, 4),
            `Week ${getWeekNumber(date as Date)} ${date?.getFullYear()}`,
            'Gekoeld vervoeren',
            row[8],
            'Colli',
          ]),
        ];

        // Werk de tabelgegevens bij voor weergave in de <table>
        setTableData(newWorksheetData);
      };

      reader.readAsArrayBuffer(uploadedFile);
    }
  };

  return {
    date,
    uploadedFile,
    filteredRowCount,
    tableData,
    handleDateChange,
    handleFileUpload,
    handleFormSubmit,
  };
};

export default UseExcelFilter;
