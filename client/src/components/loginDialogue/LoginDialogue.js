import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';

import FormControl from '@material-ui/core/FormControl';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import React, { useContext } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { UserContext } from '../../contexts';
const useStyles = makeStyles((theme) => ({
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoginDialogue({ modalOpen, setmodalOpen }) {
  const classes = useStyles();

  const { user, setUser } = useContext(UserContext);

  const [openLoginSnackBar, setopenLoginSnackBar] = React.useState(false);

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleClose = () => {
    setmodalOpen(false);
  };

  const handleLoginSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopenLoginSnackBar(false);
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/users/login',
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setopenLoginSnackBar(true);
      setUser(res.data.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.data.user));
    } catch (err) {
      console.log(err);
    }

    setmodalOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={handleChange('email')}
            label="Email Address"
            type="email"
            fullWidth
          />
          <FormControl fullWidth className={clsx(classes.textField)}>
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openLoginSnackBar}
        autoHideDuration={6000}
        onClose={handleLoginSnackBarClose}
      >
        <Alert onClose={handleLoginSnackBarClose} severity="success">
          Login Successful
        </Alert>
      </Snackbar>
    </div>
  );
}
