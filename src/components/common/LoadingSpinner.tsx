import React from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40, fullScreen = false }) => {
  const spinner = <CircularProgress size={size} />;

  if (fullScreen) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        {spinner}
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={3}>
      {spinner}
    </Box>
  );
};

export default LoadingSpinner;
