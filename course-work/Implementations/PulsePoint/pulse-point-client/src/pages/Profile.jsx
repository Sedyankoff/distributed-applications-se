import { useState } from 'react';
import {
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
  useTheme,
  Box
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useAuth } from '../components/context/AuthContext';
import { useLoader } from '../components/context/LoaderContext';

const ProfilePage = () => {
  const theme = useTheme();
  const { user, updateProfile } = useAuth();
  const { setIsLoading } = useLoader();

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
    };

  const [formData, setFormData] = useState({
    username: user?.userName || user?.username || '',
    password: '',
    height: user?.height || '',
    weight: user?.weight || '',
    gender: user?.gender || '',
    dateOfBirth: formatDate(user?.dateOfBirth) || '',
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await updateProfile(formData);
      if (response === true) {
        setSnackbar({ open: true, message: 'Profile updated successfully.', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: response, severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'An error occurred. Please try again.', severity: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        minHeight: '85vh',
        backgroundColor: theme.palette.background.default,
        padding: 4,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Avatar
        sx={{
          bgcolor: theme.palette.accent.main,
          width: 100,
          height: 100,
          fontSize: '2rem',
          marginBottom: 2,
        }}
      >
        {user?.userName?.charAt(0).toUpperCase() || 'U'}
      </Avatar>
      <Typography
        variant="h4"
        sx={{ color: theme.palette.primary.main, marginBottom: 3 }}
      >
        Hello, {user?.userName || user?.username} !
      </Typography>
      </Box>
      {/* Editable Fields */}
      <Box sx={{ width: '30vw' }}>
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
        sx={{
          input: { color: theme.palette.text.primary },
          '& label.Mui-focused': { color: theme.palette.accent.main },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: theme.palette.primary.main },
            '&:hover fieldset': { borderColor: theme.palette.accent.main },
            '&.Mui-focused fieldset': { borderColor: theme.palette.accent.main },
          },
        }}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        sx={{
          input: { color: theme.palette.text.primary },
          '& label.Mui-focused': { color: theme.palette.accent.main },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: theme.palette.primary.main },
            '&:hover fieldset': { borderColor: theme.palette.accent.main },
            '&.Mui-focused fieldset': { borderColor: theme.palette.accent.main },
          },
        }}
      />

      <TextField
        label="Height (cm)"
        name="height"
        type="number"
        value={formData.height}
        onChange={handleChange}
        fullWidth
        margin="normal"
          sx={{
            input: { color: theme.palette.text.primary },
            '& label.Mui-focused': { color: theme.palette.accent.main },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: theme.palette.primary.main },
              '&:hover fieldset': { borderColor: theme.palette.accent.main },
              '&.Mui-focused fieldset': { borderColor: theme.palette.accent.main },
            },
            '& input[type=number]': {
              '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0,
              },
              '&[type="number"]': {
                color: theme.palette.primary.main,
              },
            },
          }}
      />

      <TextField
        label="Weight (kg)"
        name="weight"
        type="number"
        value={formData.weight}
        onChange={handleChange}
        fullWidth
        margin="normal"
          sx={{
            input: { color: theme.palette.text.primary },
            '& label.Mui-focused': { color: theme.palette.accent.main },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: theme.palette.primary.main },
              '&:hover fieldset': { borderColor: theme.palette.accent.main },
              '&.Mui-focused fieldset': { borderColor: theme.palette.accent.main },
            },
            '& input[type=number]': {
              '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                '-webkit-appearance': 'none',
                margin: 0,
              },
              '&[type="number"]': {
                color: theme.palette.primary.main,
              },
            },
          }}
      />

      <TextField
        select
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        fullWidth
        margin="normal"
          sx={{
            input: { color: theme.palette.text.primary },
            '& label.Mui-focused': { color: theme.palette.accent.main },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: theme.palette.primary.main },
              '&:hover fieldset': { borderColor: theme.palette.accent.main },
              '&.Mui-focused fieldset': { borderColor: theme.palette.accent.main },
            },
            '& .MuiSvgIcon-root': {
              color: theme.palette.primary.main,
            },
          }}
      >
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
      </TextField>

      <TextField
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        value={formData.dateOfBirth}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
          sx={{
            input: { color: theme.palette.text.primary },
            '& label.Mui-focused': { color: theme.palette.accent.main },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: theme.palette.primary.main },
              '&:hover fieldset': { borderColor: theme.palette.accent.main },
              '&.Mui-focused fieldset': { borderColor: theme.palette.accent.main },
            },
            '& input[type="date"]::-webkit-calendar-picker-indicator': {
              filter: 'invert(60%)',
              cursor: 'pointer',
            },
          }}
      />

      <Button
        variant="contained"
        onClick={handleSave}
        sx={{
          marginTop: 3,
          backgroundColor: theme.palette.accent.main,
          color: theme.palette.text.primary,
          paddingY: 1.5,
          paddingX: 3,
          borderRadius: 2,
          width: '100%',
          fontSize: '1rem',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: `0px 4px 10px ${theme.palette.accent.main}`,
          },
        }}
      >
        Save Changes
      </Button>
        </Box>
      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfilePage;