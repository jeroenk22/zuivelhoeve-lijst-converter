import React, { ChangeEvent } from 'react';

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div>
      <input type='file' data-testid="file-uploader" accept='.xlsx' onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
