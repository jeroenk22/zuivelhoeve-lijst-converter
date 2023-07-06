import React, { ChangeEventHandler, useRef } from 'react';

interface FileInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const FileInput: React.FC<FileInputProps> = ({ onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/vnd.ms-excel') {
      onChange(event);
    }
  };

  return (
    <input
      type="file"
      ref={fileInputRef}
      onChange={handleFileChange}
      accept=".xlsx"
      aria-label="Selecteer Zuivelhoevelijst"
    />
  );
};

export default FileInput;
