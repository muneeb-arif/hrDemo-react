import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useAppSelector } from '../../store/hooks';

const TopBar: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#ffffff',
        color: '#212121',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <img src="/logo_text.svg" alt="Logo" style={{ width: 'auto', height: 70 }} />
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
            <Typography variant="body2" color="text.secondary">
              Welcome, {user.username}
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
