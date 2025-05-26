import { Box } from '@mui/material';
import ClipLoader from 'react-spinners/ClipLoader';
import { useLoader } from '../context/LoaderContext';

const Loader = () => {
  const { isLoading } = useLoader();

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <ClipLoader size={80} color="#ffffff" />
    </Box>
  );
};

export default Loader;