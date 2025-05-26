import { Typography, Box, Container, Link, useTheme } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';

export default function Footer() {
    const theme = useTheme();

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.secondary.main,
                position: 'fixed',
                bottom: 0,
                height: '6vh',
                width: '100%',
                textAlign: 'center',
                color: 'white',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>&copy; {new Date().getFullYear()} PulsePoint. All rights reserved.</Typography>
                <Box display="flex" justifyContent="center" gap={2}>
                    <Link href="#" sx={{ display: 'inline-flex', alignItems: 'center', color: theme.palette.primary.main }}>
                        <Instagram />
                    </Link>
                    <Link href="#" sx={{ display: 'inline-flex', alignItems: 'center', color: theme.palette.primary.main }}>
                        <Twitter />
                    </Link>
                    <Link href="#" sx={{ display: 'inline-flex', alignItems: 'center', color: theme.palette.primary.main }}>
                        <Facebook />
                    </Link>
                </Box>
            </Container>
        </Box>
    );
}