export const validateFileExtension = (file: File): boolean => {
  const allowedExtensions = ['xlsx'];
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  const isValidExtension = fileExtension ? allowedExtensions.includes(fileExtension) : false;
  return isValidExtension;
};
