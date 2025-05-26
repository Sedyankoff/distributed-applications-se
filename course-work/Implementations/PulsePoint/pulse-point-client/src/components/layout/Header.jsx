import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, Box, Drawer, ListItemIcon, useTheme, Divider, useMediaQuery } from '@mui/material';
import Logo from '../../assets/PulsePointLogo.png';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dashboard, Favorite, Flag, BarChart, Close, Logout, Person, Menu } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import LogoutConfirmationDialog from '../dialogs/LogoutConfirmationDialog';

export default function Header() {
    const { isAuthenticated } = useAuth();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        setLogoutDialogOpen(false);
        await logout();
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: theme.palette.secondary.main, width: '100vw', borderBottom: `2px solid ${theme.palette.primary.main}` }}>
            <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: isAuthenticated ? 'space-between' : 'center', alignItems: 'center' }}>
                {isAuthenticated && (
                    <IconButton edge="start" aria-label="menu" onClick={() => setDrawerOpen(true)} sx={{
                        color: theme.palette.primary.main, '&:hover': {
                            backgroundColor: theme.palette.accent.main,
                            color: theme.palette.secondary.main,
                        }, }}>
                        <Menu />
                    </IconButton>
                )}
                <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', pt: 1, pl: 3 }}>
                    <img src={Logo} alt="PulsePoint Logo" style={{ height: '6vh', cursor: 'pointer' }} />
                </Box>
                {isAuthenticated && (
                    <Box sx={{ display: 'flex', mr: 0 }}>
                        <IconButton component={Link} to="/profile" edge="start" color="inherit" aria-label="menu"
                            sx={{
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: theme.palette.accent.main,
                                    color: theme.palette.secondary.main,
                                },
                                padding: 1,
                            }}>
                            <Person />
                        </IconButton>
                        <IconButton
                            edge="start"
                            aria-label="menu"
                            onClick={() => setLogoutDialogOpen(true)}
                            sx={{
                                color: theme.palette.primary.main,
                                '&:hover': {
                                    backgroundColor: theme.palette.accent.main,
                                    color: theme.palette.secondary.main,
                                },
                                padding: 1,
                                marginLeft: '1px'
                            }}
                        >
                            <Logout />
                        </IconButton>
                    </Box>
                )}
            </Toolbar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.text.primary,
                        width: isMobile ? '100vw' : '25rem',
                        padding: 2,
                        transition: 'width 0.3s ease-in-out',
                        borderRight: `2px solid ${theme.palette.secondary.main}`,
                        position: 'relative',
                    },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton
                        onClick={() => setDrawerOpen(false)}
                        sx={{ color: theme.palette.text.primary, mb: 3 }}
                    >
                        <Close />
                    </IconButton>
                </Box>

                <List sx={{ padding: 0 }}>
                    {[
                        { text: 'DASHBOARD', icon: <Dashboard />, link: '/' },
                        { text: 'HEALTH LOGS', icon: <Favorite />, link: '/health-logs' },
                        { text: 'GOALS', icon: <Flag />, link: '/goals' },
                        ...(isMobile
                            ? [
                                { divider: true },
                                { text: 'PROFILE', icon: <Person />, link: '/profile' },
                                { text: 'LOG OUT', icon: <Logout />, link: '/logout' },
                            ]
                            : []),
                    ].map((item, index) =>
                        item.divider ? (
                            <Divider key={`divider-${index}`} sx={{ marginBottom: 2, backgroundColor: 'white'}} />
                        ) : (
                            <ListItem
                                component={Link}
                                to={item.link}
                                key={index}
                                onClick={() => setDrawerOpen(false)}
                                sx={{
                                    backgroundColor: theme.palette.accent.main,
                                    color: theme.palette.text.primary,
                                    borderRadius: '8px',
                                    marginBottom: 2,
                                    paddingY: 1.5,
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: theme.palette.accent.dark,
                                        transform: 'scale(1.02)',
                                        boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.3)`,
                                    },
                                    height: '5vh',
                                }}
                            >
                                <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    sx={{
                                        fontWeight: 'bold',
                                        '& span': {
                                            fontSize: '1rem',
                                        },
                                    }}
                                />
                            </ListItem>
                        )
                    )}
                </List>
            </Drawer>

            <LogoutConfirmationDialog
                open={logoutDialogOpen}
                onClose={() => setLogoutDialogOpen(false)}
                onConfirm={handleLogout}
            />
        </AppBar>
    );
}