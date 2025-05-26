import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, useTheme } from '@mui/material';

const LogoutConfirmationDialog = ({ open, onClose, onConfirm }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to log out?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: theme.palette.primary.main }}>Cancel</Button>
        <Button onClick={onConfirm} sx={{
          color: theme.palette.secondary.main, backgroundColor: theme.palette.accent.main, '&:hover': {
            scale: '1.01', transform: 'translateY(-3px)',
            boxShadow: `0px 3px 10px ${theme.palette.accent.main}`,
          }
        }} variant="contained">Log out</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutConfirmationDialog;
