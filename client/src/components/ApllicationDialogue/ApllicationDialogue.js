import React, { useState, useContext } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { UserContext } from '../../contexts';

const useStyles = makeStyles((theme) => ({
  modal: {
    [theme.breakpoints.up('sm')]: {
      width: '1000px',
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ApplicationDialogue({
  modalOpen,
  setmodalOpen,
  applicationDetails,
}) {
  const classes = useStyles();
  const [notes, setnotes] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const handleClose = () => {
    setmodalOpen(false);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleApply = async () => {
    try {
      const res = await axios.post(
        'http://localhost:3000/api/applications/',
        {
          post: applicationDetails.postId,
          applicant: applicationDetails.userId,
          notes,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);

      const userRes = await axios.get(
        'http://localhost:3000/api/users/currUser',
        { withCredentials: true }
      );
      console.log(userRes);
      setUser(userRes.data.data.user);
      setOpenSnackbar(true);
    } catch (err) {
      console.log(err);
    }

    setmodalOpen(false);
  };

  return (
    <div>
      <Dialog
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.modal}> </div>
        <DialogTitle id="form-dialog-title">
          Applying to {applicationDetails.position}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Why do you think you are a good fit for the role?
          </DialogContentText>
          <TextField
            autoFocus
            id="note"
            multiline
            rows="10"
            placeholder="Mention in detail what relevant skill or past experience you have for this role."
            fullWidth
            value={notes}
            onChange={(e) => setnotes(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApply} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert onClose={handleSnackBarClose} severity="success">
          Application Successful
        </Alert>
      </Snackbar>
    </div>
  );
}
