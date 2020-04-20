import React, { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

interface LoginProps {
  handleUserLogin: (username: string, password: string) => void,
  isLoading: boolean,
  loginFailed: boolean,
}

const Login: FC<LoginProps> = ({ handleUserLogin, isLoading, loginFailed }: LoginProps) => {
  const [open, setOpen] = useState(isLoading || loginFailed);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    handleUserLogin(username, password);
  };

  return (
    <>
      <Button color="inherit" onClick={handleOpen}>Login</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent dividers>
          {loginFailed && (
            <Box mb={2}>
              <Typography variant="body2" color="error" component="p">Logging in failed</Typography>
            </Box>
          )}
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="secondary" variant="contained" fullWidth disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
