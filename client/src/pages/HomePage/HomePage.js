import React from 'react';
import Header from '../../components/Header/Header';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container, Typography, Button } from '@material-ui/core';
import dev from './dev.svg';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '9rem',
  },
  devImg: {
    maxWidth: '100%',
  },
  mainHeading: {
    fontFamily: 'Montserrat, sans-serif',
    position: 'relative',
    fontWeight: 300,
    color: '#6f7277',
  },
  mainPara: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 300,
  },
  homebtn: {
    color: '#4889F4',
    borderColor: '#4889F4',
    minWidth: '60%',
  },
  word: {
    display: 'inline-block',
  },
  LBG: {
    position: 'absolute',
    top: 0,
    overflow: 'hidden',
    animation: '$text-rotate 6s linear infinite',
    opacity: 0,
    fontWeight: 500,
  },
  first: {
    animationDelay: '0s',
    color: '#4485F3',
  },
  second: {
    animationDelay: '2s',
    color: '#EA4335',
  },
  third: {
    animationDelay: '4s',
    color: '#35A752',
  },
  '@keyframes text-rotate': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '2%': {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    '30%': {
      opacity: 1,
      transform: 'translateY(0px)',
    },
    '33%': {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
    '100%': {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
  },
}));

export default function HomePage() {
  const classes = useStyles();
  return (
    <Container fixed>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid
            container
            direction="column"
            justify="space-around"
            item
            xs={12}
            md={6}
          >
            <Typography className={classes.mainHeading} variant="h3">
              <div className={classes.word}>
                <span className={classes.LBG + ' ' + classes.first}>Learn</span>
                <span className={classes.LBG + ' ' + classes.second}>
                  Build
                </span>
                <span className={classes.LBG + ' ' + classes.third}>Grow</span>
              </div>
              <span
                style={{
                  width: '8rem',
                  display: 'inline-block',
                }}
              ></span>{' '}
              With DSC JIIT 128
            </Typography>
            <Typography className={classes.mainPara} variant="p">
              This is the online application portal for DSC JIIT128 for the
              roles in core team. Here is your chance for becoming a part of
              community with connections all over the world. Check Out the open
              positions below.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={dev} className={classes.devImg} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button variant="outlined" className={classes.homebtn}>
              Check Out our Roles{' '}
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
