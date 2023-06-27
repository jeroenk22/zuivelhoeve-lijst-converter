export const validateFileExtension = (file: File): boolean => {
    const allowedExtensions = ['.xlsx'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return fileExtension ? allowedExtensions.includes(fileExtension) : false;
  };
  