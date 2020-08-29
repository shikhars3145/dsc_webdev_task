import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Button,
  Chip,
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ApplicationDialogue from '../ApllicationDialogue/ApllicationDialogue';
import { UserContext } from '../../contexts';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  paper: {
    display: 'flex',
    flexWrap: 'no-wrap',
    overflow: 'auto',
    padding: theme.spacing(0.5),
    margin: '1rem auto 0 auto',
  },
  desc: {
    height: '6rem',
    overflowY: 'auto',
  },
  chip: {
    margin: 'auto',
  },
  chipContainer: {
    padding: theme.spacing(0.5),
  },
  applyBtn: {
    color: '#4889F4',
    borderColor: '#4889F4',
    width: '50%',
    margin: 'auto',
  },
}));

export default function CustomCard({
  team,
  position,
  desc,
  techs,
  img,
  postId,
  disabled,
}) {
  const classes = useStyles();
  const [modalOpen, setmodalOpen] = useState(false);
  const [applicationDetails, setapplicationDetails] = useState({});
  const [snackbarOpen, setsnackbarOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackbarOpen(false);
  };

  const handleApply = (e, postid) => {
    console.log(postId, position);
    if (!user) return setsnackbarOpen(true);

    setapplicationDetails({
      postId,
      position,
      userId: user._id,
    });
    setmodalOpen(true);
  };
  return (
    <>
      <Card variant="outlined" className={classes.root}>
        <CardHeader
          title={position}
          subheader={team}
          // action={
          //   // <IconButton aria-label="notification">
          //   //   <NotificationsIcon />
          //   // </IconButton>
          // }
        />
        <CardMedia
          className={classes.media}
          image={`./assets/${img}`}
          title={img.split('.').slice(0, -1).join('.')}
        />
        <CardContent>
          <Typography
            variant="body2"
            className={classes.desc}
            color="textSecondary"
            component="p"
          >
            {desc}
          </Typography>
          <div className={classes.paper}>
            {techs.map((tech, idx) => {
              return (
                <div key={idx} className={classes.chipContainer}>
                  <Chip label={tech} className={classes.chip} />
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            disabled={disabled}
            variant="outlined"
            className={classes.applyBtn}
            onClick={(e) => handleApply(e, postId, position)}
          >
            APPLY
          </Button>
        </CardActions>
      </Card>
      <ApplicationDialogue
        applicationDetails={applicationDetails}
        modalOpen={modalOpen}
        setmodalOpen={setmodalOpen}
      ></ApplicationDialogue>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert onClose={handleSnackBarClose} severity="warning">
          You need to be logged in to be able to apply
        </Alert>
      </Snackbar>
    </>
  );
}
