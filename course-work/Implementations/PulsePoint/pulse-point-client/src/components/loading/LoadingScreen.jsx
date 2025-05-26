import { Box } from '@mui/material';
import Logo from '../../assets/PulsePointLogo.png';

const LoadingScreen = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                zIndex: 9999,
                background: '#D1D1D1',
            }}
        >
            <Box
                sx={{
                    width: '25vw',
                    height: '25vw',
                    backgroundImage: `url(${Logo})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    animation: 'doubleBounce 0.8s ease-in-out 2',
                }}
            />
        </Box>
    );
};

export default LoadingScreen;