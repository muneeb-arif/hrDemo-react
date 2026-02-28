import { createTheme } from '@mui/material/styles';

// Color scheme based on logo gradient: deep blues → cyan → teal → purples
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0A2463', // Deep blue
      light: '#1a237e',
      dark: '#000051',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7B1FA2', // Purple
      light: '#ae52d4',
      dark: '#4a0072',
      contrastText: '#ffffff',
    },
    info: {
      main: '#00BCD4', // Cyan
      light: '#62efff',
      dark: '#008ba3',
    },
    success: {
      main: '#009688', // Teal
      light: '#52c7b8',
      dark: '#00675b',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

export { theme };
