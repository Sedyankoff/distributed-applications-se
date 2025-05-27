import { useState, useEffect } from "react";
import {
    Container,
    Typography,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    useTheme,
    Snackbar,
    Alert,
    Box,
} from "@mui/material";
import { Add, Delete, Edit, ExitToApp } from "@mui/icons-material";
import { useAuth } from "../components/context/AuthContext";
import { useLoader } from "../components/context/LoaderContext";
import axios from "axios";
import DeleteConfirmationDialog from "../components/dialogs/DeleteConfirmationDialog";

const GoalsPage = () => {
    const theme = useTheme();
    const { user, token } = useAuth();
    const { setIsLoading } = useLoader();

    const [allGoals, setAllGoals] = useState([]);
    const [userGoals, setUserGoals] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteType, setDeleteType] = useState(null);
    const [selectedGoalId, setSelectedGoalId] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        goalType: "",
        targetValue: "",
        startDate: "",
        endDate: "",
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const [searchParams, setSearchParams] = useState({
        goalType: "",
        startDate: ""
    });

    useEffect(() => {
        fetchAllGoals();
        fetchUserGoals();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const { goalType, targetValue, startDate, endDate } = formData;
        if (!goalType || !targetValue || !startDate || !endDate) {
            setSnackbar({ open: true, message: "All fields are required", severity: "error" });
            return false;
        }
        if (isNaN(targetValue)) {
            setSnackbar({ open: true, message: "Target value must be numeric", severity: "error" });
            return false;
        }
        return true;
    };

    const handleSearchChange = (e) => {
        setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
    };

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams();
            if (searchParams.goalType) query.append("goalType", searchParams.goalType);
            if (searchParams.startDate) query.append("startDate", searchParams.startDate);

            const response = await axios.get(`https://localhost:7011/api/goals/search?${query.toString()}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setAllGoals(response.data);
        } catch (error) {
            setSnackbar({ open: true, message: "Search failed", severity: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAllGoals = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("https://localhost:7011/api/goals", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAllGoals(response.data);
        } catch (error) {
            setSnackbar({ open: true, message: "Error fetching all goals", severity: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUserGoals = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://localhost:7011/api/goals/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserGoals(response.data);
        } catch (error) {
            setSnackbar({ open: true, message: "Error fetching user goals", severity: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddGoal = async () => {
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const payload = { ...formData, targetValue: parseFloat(formData.targetValue), userId: user.id };
            if (editMode) {
                await axios.put(`https://localhost:7011/api/goals/${selectedGoalId}`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSnackbar({ open: true, message: "Goal updated successfully", severity: "success" });
            } else {
                await axios.post("https://localhost:7011/api/goals", payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSnackbar({ open: true, message: "Goal added successfully", severity: "success" });
            }
            setOpenDialog(false);
            fetchAllGoals();
        } catch (error) {
            setSnackbar({ open: true, message: "Error saving goal", severity: "error" });
        } finally {
            fetchUserGoals();
            setIsLoading(false);
        }
    };

    const handleAddUserGoal = async (goalId) => {
        setIsLoading(true);
        try {
            await axios.post(
                "https://localhost:7011/api/goals/usergoal",
                { userId: user.id, goalId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSnackbar({ open: true, message: "Goal added to your goals successfully", severity: "success" });
            fetchUserGoals();
        } catch (error) {
            setSnackbar({
                open: true,
                message: "Goal already joined.",
                severity: "error",
            });
        } finally {
            fetchUserGoals();
            setIsLoading(false);
        }
    };


    const handleDeleteGoal = async () => {
        setIsLoading(true);
        try {
            if (deleteType === "global") {
                await axios.delete(`https://localhost:7011/api/goals/${selectedGoalId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSnackbar({ open: true, message: "Goal deleted successfully", severity: "success" });
                fetchAllGoals();
            } else if (deleteType === "user") {
                await axios.delete("https://localhost:7011/api/goals/usergoal", {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { userId: user.id, goalId: selectedGoalId },
                });
                setSnackbar({
                    open: true,
                    message: "Goal removed from your goals successfully",
                    severity: "success",
                });
                fetchUserGoals();
            }
        } catch (error) {
            setSnackbar({ open: true, message: "Error deleting goal", severity: "error" });
        } finally {
            fetchUserGoals();
            setIsLoading(false);
            setDeleteDialogOpen(false);
        }
    };

    const openDeleteDialog = (goalId, type) => {
        setSelectedGoalId(goalId);
        setDeleteType(type);
        setDeleteDialogOpen(true);
    };

    const openEditDialog = (goal) => {
        setFormData({
            goalType: goal.goalType,
            targetValue: goal.targetValue,
            startDate: goal.startDate,
            endDate: goal.endDate,
        });
        setSelectedGoalId(goal.id);
        setEditMode(true);
        setOpenDialog(true);
    };

    const openAddDialog = () => {
        setFormData({ goalType: "", targetValue: "", startDate: "", endDate: "" });
        setEditMode(false);
        setOpenDialog(true);
    };

    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                minHeight: "85vh",
                minWidth: '95vw',
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <Typography variant="h5" sx={{ mb: 2, color: theme.palette.primary.main }}>
                    Search Goals
                </Typography>
                <Box
                    sx=
                    {{
                        display: 'flex',
                        gap: '1rem',
                        marginBottom: '1rem'
                    }}
                >
                    <TextField
                        label="Goal Type"
                        name="goalType"
                        value={searchParams.goalType}
                        onChange={handleSearchChange}
                        size="small"
                    />
                    <TextField
                        label="Start Date"
                        name="startDate"
                        type="date"
                        value={searchParams.startDate}
                        onChange={handleSearchChange}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                    />
                    <Button variant="contained" onClick={handleSearch} sx={{ backgroundColor: theme.palette.primary.main }}>
                        Search
                    </Button>
                </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row"}}>
            {/* All Goals Section */}
            <Paper sx={{ width: "50%", height: '50vh', padding: 3, margin: 3, borderRadius: '10px' }}>
                <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
                    All Goals
                </Typography>
                <TableContainer sx={{ borderTop: `3px solid ${theme.palette.accent.main}`, height: '70%' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow sx={{ borderBottom: `2px solid ${theme.palette.accent.main}` }}>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Goal Type</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Target Value</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Start Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>End Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allGoals.map((goal) => (
                                <TableRow key={goal.id}>
                                    <TableCell>{goal.goalType}</TableCell>
                                    <TableCell>{goal.targetValue}</TableCell>
                                    <TableCell>{new Date(goal.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(goal.endDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => openEditDialog(goal)}>
                                            <Edit sx={{ color: theme.palette.accent.main }} />
                                        </IconButton>
                                        <IconButton onClick={() => openDeleteDialog(goal.id, "global")}>
                                            <Delete sx={{ color: theme.palette.error.main }} />
                                        </IconButton>
                                        <IconButton onClick={() => handleAddUserGoal(goal.id)}>
                                            <Add sx={{ color: theme.palette.primary.main }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={openAddDialog}
                    sx={{
                        backgroundColor: theme.palette.accent.main,
                        mt: 2,
                        width: '95%',
                        "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: `0px 3px 10px ${theme.palette.accent.main}`,
                        },
                    }}
                >
                    Add Goal
                </Button>
            </Paper>
            {/* User Goals Section */}
            <Paper sx={{ width: "50%", height: '50vh', padding: 3, margin: 3, borderRadius: '10px' }}>
                <Typography variant="h4" sx={{ mb: 2, color: theme.palette.primary.main }}>
                    My Goals
                </Typography>
                <TableContainer sx={{ borderTop: `3px solid ${theme.palette.accent.main}`, height: '80%' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow sx={{ borderBottom: `2px solid ${theme.palette.accent.main}` }}>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Goal Type</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Target Value</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Start Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }} >End Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userGoals.map((goal) => (
                                <TableRow key={goal.id}>
                                    <TableCell>{goal.goalType}</TableCell>
                                    <TableCell>{goal.targetValue}</TableCell>
                                    <TableCell>{new Date(goal.startDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(goal.endDate).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => openDeleteDialog(goal.id, "user")}>
                                            <ExitToApp sx={{ color: theme.palette.error.main }} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            </Box>
            {/* Add/Edit Goal Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>{editMode ? "Edit Goal" : "Add Goal"}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Goal Type"
                        name="goalType"
                        value={formData.goalType}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
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
                    <TextField
                        label="Target Value"
                        name="targetValue"
                        value={formData.targetValue}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
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
                    <TextField
                        label="Start Date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        type="date"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
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
                    <TextField
                        label="End Date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        type="date"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddGoal} variant="contained" sx={{
                        backgroundColor: theme.palette.accent.main,
                        '&:hover': {
                            scale: '1.01', transform: 'translateY(-3px)',
                            boxShadow: `0px 3px 10px ${theme.palette.accent.main}`,
                        }
                    }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleDeleteGoal}
                text={deleteType === 'user' ? 'Are you sure you want to leave this goal?' : ''}
            />

            {/* Snackbar Notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
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

export default GoalsPage;