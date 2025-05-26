import { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent, LinearProgress, Box, useTheme } from "@mui/material";
import { useAuth } from "../components/context/AuthContext";

const DashboardPage = () => {
    const { fetchDashboardData } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        const loadDashboard = async () => {
            const data = await fetchDashboardData();
            console.log("Dashboard API Response:", data);
            setDashboardData(data || { goalsProgress: [] });
        };
        loadDashboard();
    }, []);

    if (!dashboardData) {
        return <Typography variant="h5" sx={{ mt: 5, textAlign: "center", color: "red" }}>Failed to load dashboard data.</Typography>;
    }

    return (
        <Container sx={{ padding: 4, color: theme.palette.primary.main, display: 'flex', justifyContent: 'center', flexDirection: 'column', minHeight: '85vh', minWidth: '80%' }}>
            <Typography variant="h3" sx={{ mb: 3, color: theme.pale }}>Dashboard</Typography>

            <Box sx={{ display: 'flex', width: '100%', gap: 3 }}>
            {/* Today's Health Log */}
                <Card sx={{
                    mb: 3,
                    borderTop: `3px solid ${theme.palette.accent.main}`,
                    borderBottom: `3px solid ${theme.palette.accent.main}`,
                    width: '50%',
                    height: '50vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <CardContent sx={{ width: "100%" }}>
                        <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>Today's Health Log</Typography>

                        {dashboardData.todaysHealthLog ? (
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                gap: 1.5
                            }}>
                                <Typography sx={{ fontSize: '1.3rem' }}>
                                    <span style={{ color: theme.palette.primary.main, fontWeight: "bold" }}>Steps:</span>
                                    <span style={{ color: theme.palette.accent.main }}> {dashboardData.todaysHealthLog.stepsTaken}</span>
                                </Typography>
                                <Typography sx={{ fontSize: '1.3rem' }}>
                                    <span style={{ color: theme.palette.primary.main, fontWeight: "bold" }}>Water Intake:</span>
                                    <span style={{ color: theme.palette.accent.main }}> {dashboardData.todaysHealthLog.waterIntake} L</span>
                                </Typography>
                                <Typography sx={{ fontSize: '1.3rem' }}>
                                    <span style={{ color: theme.palette.primary.main, fontWeight: "bold" }}>Sleep:</span>
                                    <span style={{ color: theme.palette.accent.main }}> {dashboardData.todaysHealthLog.sleepHours} hours</span>
                                </Typography>
                                <Typography sx={{ fontSize: '1.3rem' }}>
                                    <span style={{ color: theme.palette.primary.main, fontWeight: "bold" }}>Calories Intake:</span>
                                    <span style={{ color: theme.palette.accent.main }}> {dashboardData.todaysHealthLog.caloriesIntake || 0}</span>
                                </Typography>
                                <Typography sx={{ fontSize: '1.3rem' }}>
                                    <span style={{ color: theme.palette.primary.main, fontWeight: "bold" }}>Exercise Minutes:</span>
                                    <span style={{ color: theme.palette.accent.main }}> {dashboardData.todaysHealthLog.exerciseMinutes}</span>
                                </Typography>
                            </Box>
                        ) : (
                            <Typography sx={{ mt: '17vh', fontSize: '1rem', textAlign: 'center' }}>No health log for today.</Typography>
                        )}
                    </CardContent>
                </Card>


            {/* Goals Progress */}
            <Card sx={{
                borderTop: `3px solid ${theme.palette.accent.main}`,
                    borderBottom: `3px solid ${theme.palette.accent.main}`,
                    width: '50%',
                    height: '50vh',
                }}>
                    <CardContent sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        textAlign: "center"
                    }}>
                        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                            Goals Progress
                        </Typography>

                        {dashboardData.goalsProgress && dashboardData.goalsProgress.length > 0 ? (
                            dashboardData.goalsProgress.map(goal => (
                                <Box key={goal.goalId}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "80%",
                                        backgroundColor: theme.palette.background.paper,
                                        padding: 2,
                                        borderRadius: 2,
                                        boxShadow: `0px 4px 10px ${theme.palette.accent.main}`,
                                        mb: 3
                                    }}>

                                    {/* Goal Name & Target */}
                                    <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold", color: theme.palette.primary.main }}>
                                        {goal.goalName}:
                                        <span style={{ color: theme.palette.accent.main }}> {goal.currentValue.toFixed(2)} / {goal.targetValue.toFixed(2)}</span>
                                    </Typography>

                                    {/* Progress Bar */}
                                    <LinearProgress
                                        variant="determinate"
                                        value={goal.completionPercentage}
                                        sx={{
                                            height: 12,
                                            width: "100%",
                                            borderRadius: 5,
                                            backgroundColor: theme.palette.secondary.main,
                                            "& .MuiLinearProgress-bar": { backgroundColor: theme.palette.accent.main }
                                        }}
                                    />

                                    {/* Progress Percentage */}
                                    <Typography sx={{ mt: 1, fontSize: "0.875rem", fontWeight: "bold", color: goal.isCompleted ? "green" : theme.palette.text.secondary }}>
                                        {goal.isCompleted ? "Goal Completed!" : `Progress: ${goal.completionPercentage.toFixed(2)}%`}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography sx={{ mt: "17vh", fontSize: "1rem", color: theme.palette.text.secondary }}>
                                No active goals.
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default DashboardPage;