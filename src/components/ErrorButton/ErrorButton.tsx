'use client';

import { useState } from 'react';

export const ErrorButton = () => {
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Test error triggered');
  }

  return (
    <button type="button" onClick={handleClick} className="error-button">
      Trigger Error
    </button>
  );
};
