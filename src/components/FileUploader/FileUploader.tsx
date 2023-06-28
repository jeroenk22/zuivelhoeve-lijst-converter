import React, { ChangeEvent } from 'react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      if (validateFileExtension(file)) {
        onFileUpload(file);
      } else {
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        alert(`Ongeldig bestandstype. Selecteer een XLSX-bestand. (Huidige bestand: .${fileExtension})`);
        resetFileInput(event.target);
      }
    }
  };

  const resetFileInput = (fileInput: HTMLInputElement) => {
    fileInput.value = '';
  };

  const validateFileExtension = (file: File): boolean => {
    const allowedExtensions = ['xlsx'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return allowedExtensions.includes(fileExtension || '');
  };

  return (
    <div>
      <input type="file" data-testid="file-uploader" accept=".xlsx" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
