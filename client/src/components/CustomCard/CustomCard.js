import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

export default function CustomCard() {
  const classes = useStyles();
  const [modalOpen, setmodalOpen] = useState(false);
  const handleApply = () => {
    setmodalOpen(true);
  };
  return (
    <>
      <Card variant="outlined" className={classes.root}>
        <CardHeader
          title="FullStack Dev"
          subheader="Technical"
          action={
            <IconButton aria-label="settings">
              <NotificationsIcon />
            </IconButton>
          }
        />
        <CardMedia
          className={classes.media}
          image="./assets/core.svg"
          title="web-dev"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
          <div className={classes.paper}>
            <div className={classes.chipContainer}>
              <Chip label="React" className={classes.chip} />
            </div>
            <div className={classes.chipContainer}>
              <Chip label="React" className={classes.chip} />
            </div>
            <div className={classes.chipContainer}>
              <Chip label="React" className={classes.chip} />
            </div>
            <div className={classes.chipContainer}>
              <Chip label="React" className={classes.chip} />
            </div>
            <div className={classes.chipContainer}>
              <Chip label="React" className={classes.chip} />
            </div>
            <div className={classes.chipContainer}>
              <Chip label="React" className={classes.chip} />
            </div>
          </div>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            variant="outlined"
            className={classes.applyBtn}
            onClick={handleApply}
          >
            APPLY
          </Button>
        </CardActions>
      </Card>
      <ApplicationDialogue
        modalOpen={modalOpen}
        setmodalOpen={setmodalOpen}
      ></ApplicationDialogue>
    </>
  );
}
