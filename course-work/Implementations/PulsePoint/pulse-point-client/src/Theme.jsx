import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#bfbfbf',
        },
        secondary: {
            main: '#252525',
            contrast: '#bfbfbf',
        },
        accent: {
            main: '#ee3e38',
        },
        background: {
            default: '#252525',
            paper: '#414141',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#D1D1D1',
        },
    },
    typography: {
        fontFamily: "'Russo One', serif",
    },
    spacing: 8,
    customSpacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
    },
});

export default theme;