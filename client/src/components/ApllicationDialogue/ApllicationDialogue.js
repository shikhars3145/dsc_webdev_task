import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    [theme.breakpoints.up('sm')]: {
      width: '1000px',
    },
  },
}));

export default function ApplicationDialogue({ modalOpen, setmodalOpen }) {
  const classes = useStyles();

  const handleClose = () => {
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
          Applying to FullStack Dev Position
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
