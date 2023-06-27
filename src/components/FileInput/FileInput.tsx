import React, { ChangeEventHandler } from 'react';
import { validateFileExtension } from '../../utils/fileUtils';

interface FileInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file && validateFileExtension(file)) {
      onChange(event);
    } else {
      // Geef een melding of voer andere logica uit voor ongeldige bestanden
      console.log('Ongeldig bestandstype. Selecteer een XLSX-bestand.');
      event.target.value = ''; // Reset de waarde van het bestandsinvoerveld
    }
  };

  return <input type="file" onChange={handleFileChange} accept=".xlsx" aria-label="Selecteer Zuivelhoevelijst" />;
};

export default FileInput;
