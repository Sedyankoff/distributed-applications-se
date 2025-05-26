import { useState, useEffect } from 'react';
import {
    Container, Typography, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog,
    DialogTitle, DialogContent, DialogActions, TextField, useTheme, Snackbar, Alert
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useAuth } from '../components/context/AuthContext';
import { useLoader } from '../components/context/LoaderContext';
import axios from 'axios';
import DeleteConfirmationDialog from '../components/dialogs/DeleteConfirmationDialog';

const HealthLogsPage = () => {
    const { user, token } = useAuth();
    const theme = useTheme();
    const [healthLogs, setHealthLogs] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedLogId, setSelectedLogId] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const { setIsLoading } = useLoader();

    const [formData, setFormData] = useState({
        weight: '',
        stepsTaken: '',
        waterIntake: '',
        sleepHours: '',
        caloriesIntake: '',
        exerciseMinutes: '',
    });

    const [editingLog, setEditingLog] = useState(null);

    useEffect(() => {
        fetchHealthLogs();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        if (
            !formData.weight ||
            !formData.stepsTaken ||
            !formData.waterIntake ||
            !formData.sleepHours ||
            !formData.exerciseMinutes
        ) {
            setSnackbar({ open: true, message: 'All fields are required', severity: 'error' });
            return false;
        }

        if (isNaN(formData.weight) || isNaN(formData.stepsTaken) || isNaN(formData.waterIntake) || isNaN(formData.sleepHours) || isNaN(formData.exerciseMinutes)) {
            setSnackbar({ open: true, message: 'Please enter valid numeric values', severity: 'error' });
            return false;
        }

        return true;
    };

    const fetchHealthLogs = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://localhost:7011/api/healthlogs/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setHealthLogs(response.data);
        } catch (error) {
            setSnackbar({ open: true, message: 'Error fetching health logs', severity: 'error' });
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        setIsLoading(true);
        try {
            await axios.delete(`https://localhost:7011/api/healthlogs/${selectedLogId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchHealthLogs();
            setSnackbar({ open: true, message: 'Health log deleted successfully', severity: 'success' });
            setDeleteDialogOpen(false);
        } catch (error) {
            setSnackbar({ open: true, message: 'Error deleting health log', severity: 'error' });
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const dataToSend = {
                weight: parseFloat(formData.weight),
                stepsTaken: parseInt(formData.stepsTaken),
                waterIntake: parseFloat(formData.waterIntake),
                sleepHours: parseFloat(formData.sleepHours),
                caloriesIntake: formData.caloriesIntake ? parseInt(formData.caloriesIntake) : null,
                exerciseMinutes: parseInt(formData.exerciseMinutes),
                userId: user.id
            };

            if (editingLog) {
                await axios.put(`https://localhost:7011/api/healthlogs/${editingLog.logId}`, dataToSend, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSnackbar({ open: true, message: 'Health log updated successfully', severity: 'success' });
            } else {
                await axios.post('https://localhost:7011/api/healthlogs', dataToSend, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSnackbar({ open: true, message: 'Health log added successfully', severity: 'success' });
            }

            setOpenDialog(false);
            setFormData({ weight: '', stepsTaken: '', waterIntake: '', sleepHours: '', caloriesIntake: '', exerciseMinutes: '' });
            setEditingLog(null);
            fetchHealthLogs();
        } catch (error) {
            setSnackbar({ open: true, message: 'Daily health log already added.', severity: 'error' });
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            minHeight: '75vh',
            flexDirection: 'column',
        }}>
            <Typography variant="h4" sx={{ color: theme.palette.primary.main, mb: 5, textAlign: 'center' }}>
                Daily Health Logs
            </Typography>
            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setOpenDialog(true)}
                sx={{
                    backgroundColor: theme.palette.accent.main,
                    width: '60vw',
                    '&:hover': { transform: 'scale(1.05)', boxShadow: `0px 3px 10px ${theme.palette.accent.main}` }
                }}
            >
                Add New Log
            </Button>
            <TableContainer component={Paper} sx={{
                mt: 3, borderTop: `3px solid ${theme.palette.accent.main}`, maxHeight: '50vh', overflowY: 'auto',
            }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{borderBottom: `2px solid ${theme.palette.accent.main}`}}>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Weight (kg)</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Steps</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Water (L)</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Sleep (hrs)</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Calories</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Exercise (min)</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {healthLogs.map((log) => (
                            <TableRow key={log.logId} hover>
                                <TableCell>{new Date(log.date).toLocaleDateString()}</TableCell>
                                <TableCell>{log.weight}</TableCell>
                                <TableCell>{log.stepsTaken}</TableCell>
                                <TableCell>{log.waterIntake}</TableCell>
                                <TableCell>{log.sleepHours}</TableCell>
                                <TableCell>{log.caloriesIntake}</TableCell>
                                <TableCell>{log.exerciseMinutes}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => { setEditingLog(log); setFormData(log); setOpenDialog(true); }}>
                                        <Edit sx={{ color: theme.palette.accent.main }} />
                                    </IconButton>
                                    <IconButton onClick={() => { setSelectedLogId(log.logId); setDeleteDialogOpen(true); }}>
                                        <Delete sx={{ color: theme.palette.error.main }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>{editingLog ? 'Edit Health Log' : 'Add New Health Log'}</DialogTitle>
                <DialogContent>
                    <TextField sx={{
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
                    }} fullWidth margin="normal" label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} />
                    <TextField sx={{
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
                    }} fullWidth margin="normal" label="Steps Taken" name="stepsTaken" value={formData.stepsTaken} onChange={handleChange} />
                    <TextField sx={{
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
                    }} fullWidth margin="normal" label="Water Intake (L)" name="waterIntake" value={formData.waterIntake} onChange={handleChange} />
                    <TextField sx={{
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
                    }} fullWidth margin="normal" label="Sleep Hours" name="sleepHours" value={formData.sleepHours} onChange={handleChange} />
                    <TextField sx={{
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
                    }} fullWidth margin="normal" label="Calories Intake" name="caloriesIntake" value={formData.caloriesIntake} onChange={handleChange} />
                    <TextField sx={{
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
                    }} fullWidth margin="normal" label="Exercise Minutes" name="exerciseMinutes" value={formData.exerciseMinutes} onChange={handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained" sx={{
                        backgroundColor: theme.palette.accent.main,
                        '&:hover': {
                            scale: '1.01', transform: 'translateY(-3px)',
                            boxShadow: `0px 3px 10px ${theme.palette.accent.main}`,
                        }
                    }}>Save</Button>
                </DialogActions>
            </Dialog>
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
            <DeleteConfirmationDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={handleDeleteConfirm} />
        </Container>
    );
};

export default HealthLogsPage;