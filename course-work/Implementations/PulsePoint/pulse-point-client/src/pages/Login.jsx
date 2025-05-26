import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Container, Paper, FormControl, useTheme, InputAdornment } from '@mui/material';
import { useAuth } from '../components/context/AuthContext';
import { useLoader } from '../components/context/LoaderContext';
import { AccountCircle, Email, Lock } from '@mui/icons-material';

const AuthPage = () => {
    const { login, register, token } = useAuth();
    const { setIsLoading } = useLoader();
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        dateOfBirth: '',
        gender: '',
    });
    const [error, setError] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        if (token != null) {
            setIsLoading(true);
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = isRegistering
                ? await register(formData)
                : await login(formData.username, formData.password);

            if (response !== true) {
                setError(response);
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '85vh' }}>
            <Paper elevation={10} sx={{
                padding: 5,
                borderRadius: '16px',
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.text.primary,
                borderTop: `3px solid ${theme.palette.accent.main}`,
                borderBottom: `3px solid ${theme.palette.accent.main}`,
            }}>
                <Box sx={{ textAlign: 'center', mt: 1, width: '100vw' }}>
                    <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: theme.palette.primary.main }}>
                        {isRegistering ? 'REGISTER' : 'LOGIN'}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                label="Username"
                                name="username"
                                onChange={handleChange}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle sx={{ color: theme.palette.accent.main }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    input: {
                                        color: theme.palette.primary.main,
                                        '&:-webkit-autofill': {
                                            WebkitBoxShadow: `0 0 0 100px ${theme.palette.secondary.main} inset`,
                                            WebkitTextFillColor: theme.palette.primary.main,
                                            transition: 'background-color 5000s ease-in-out 0s',
                                        },
                                    },
                                    label: { color: theme.palette.primary.main },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: theme.palette.primary.main,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: theme.palette.text.primary,
                                            borderWidth: '2px',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: theme.palette.text.primary,
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: theme.palette.accent.main,
                                    }
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <TextField
                                label="Password"
                                name="password"
                                type="password"
                                onChange={handleChange}
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock sx={{ color: theme.palette.accent.main }} />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    input: {
                                        color: theme.palette.primary.main,
                                        '&:-webkit-autofill': {
                                            WebkitBoxShadow: `0 0 0 100px ${theme.palette.secondary.main} inset`,
                                            WebkitTextFillColor: theme.palette.primary.main,
                                            transition: 'background-color 5000s ease-in-out 0s',
                                        },
                                    },
                                    label: {color: theme.palette.primary.main },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: theme.palette.primary.main,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: theme.palette.text.primary,
                                            borderWidth: '2px',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: theme.palette.text.primary,
                                        },
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: theme.palette.accent.main,
                                    }
                                }}
                            />
                        </FormControl>
                        {isRegistering && (
                            <>
                                <FormControl fullWidth margin="normal">
                                    <TextField
                                        label="Email"
                                        name="email"
                                        onChange={handleChange}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Email sx={{ color: theme.palette.accent.main }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            input: {
                                                color: theme.palette.primary.main,
                                                '&:-webkit-autofill': {
                                                    WebkitBoxShadow: `0 0 0 100px ${theme.palette.secondary.main} inset`,
                                                    WebkitTextFillColor: theme.palette.primary.main,
                                                    transition: 'background-color 5000s ease-in-out 0s',
                                                },
                                            },
                                             label: {color: theme.palette.primary.main },
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: theme.palette.primary.main,
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: theme.palette.text.primary,
                                                    borderWidth: '2px',
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: theme.palette.text.primary,
                                                },
                                            },
                                            '& .MuiInputLabel-root.Mui-focused': {
                                                color: theme.palette.accent.main,
                                            }
                                        }}
                                    />
                                </FormControl>
                            </>
                        )}
                        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
                        <Button type="submit" variant="contained" fullWidth sx={{
                            mt: 3, backgroundColor: theme.palette.accent.main, height: '5vh', transition: 'all 0.3s ease-in-out', color: 'white', '&:hover': {
                                scale: '1.01', transform: 'translateY(-3px)',
                                boxShadow: `0px 3px 10px ${theme.palette.accent.main}`, } }}>
                            {isRegistering ? 'Register' : 'Login'}
                        </Button>
                    </form>
                    <Button color="secondary" sx={{ mt: 2, color: theme.palette.primary.main }} onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AuthPage;