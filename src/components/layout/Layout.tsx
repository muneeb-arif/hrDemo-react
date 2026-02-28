import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          mt: { xs: 7, sm: 8 },
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          width: { xs: '100%', sm: `calc(100% - 280px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
