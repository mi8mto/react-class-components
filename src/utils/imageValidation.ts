export const validateImage = (file: File | undefined) => {
  if (!file) {
    return 'Image is required';
  }

  const allowedTypes = ['image/png', 'image/jpeg'];

  if (!allowedTypes.includes(file.type)) {
    return 'Only PNG and JPEG images are allowed';
  }

  const maxSize = 2 * 1024 * 1024;

  if (file.size > maxSize) {
    return 'Image size must be less than 2MB';
  }

  return true;
};
