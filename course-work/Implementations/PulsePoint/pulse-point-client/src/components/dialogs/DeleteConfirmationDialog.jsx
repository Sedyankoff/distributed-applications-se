import { Dialog, DialogActions, DialogTitle, Button, useTheme } from '@mui/material';

const DeleteConfirmationDialog = ({ open, onClose, onConfirm, text }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose}>
          <DialogTitle>{text ? text : 'Are you sure you want to delete this item?'}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} sx={{color: theme.palette.primary.main}}>Cancel</Button>
        <Button onClick={onConfirm} sx={{
          color: theme.palette.secondary.main, backgroundColor: theme.palette.accent.main, '&:hover': {
            scale: '1.01', transform: 'translateY(-3px)',
            boxShadow: `0px 3px 10px ${theme.palette.accent.main}`,
          } }} variant="contained">{text ? 'Leave' : 'Delete'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;