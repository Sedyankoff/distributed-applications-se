import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import Header from '../src/components/layout/Header';
import Footer from '../src/components/layout/Footer';
import Dashboard from '../src/pages/Dashboard';
import HealthLogs from '../src/pages/HealthLogs';
import Goals from '../src/pages/Goals';
import Profile from '../src/pages/Profile';
import Auth from '../src/pages/Login';
import Theme from './Theme';
import Loader from './components/loading/Loader';
import { LoaderProvider } from './components/context/LoaderContext';
import { AuthProvider } from './components/context/AuthContext';
import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicRoute from './components/routes/PublicRoute';
import './App.css';
import LoadingScreen from '../src/components/loading/LoadingScreen';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <ThemeProvider theme={Theme}>
                <LoadingScreen />
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={Theme}>
            <LoaderProvider>
                <AuthProvider>
                    <Router>
                        <Header />
                        <Loader />
                        <Routes>
                            <Route element={<PublicRoute />}>
                                <Route path="/login" element={<Auth />} />
                            </Route>

                            <Route element={<ProtectedRoute />}>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/health-logs" element={<HealthLogs />} />
                                <Route path="/goals" element={<Goals />} />
                                <Route path="/profile" element={<Profile />} />
                            </Route>

                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                        <Footer />
                    </Router>
                </AuthProvider>
            </LoaderProvider >
        </ThemeProvider>
    );
}

export default App;