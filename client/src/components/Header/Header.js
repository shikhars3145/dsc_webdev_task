import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CodeIcon from '@material-ui/icons/Code';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import clsx from 'clsx';
import {
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';

import logo from '../../logo.svg';
import LoginDialogue from '../loginDialogue/LoginDialogue';
import { UserContext } from '../../contexts';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logoImg: {
    width: '3rem',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titleDSC: {
    color: '#6f7277',
    fontWeight: 300,
    fontFamily: 'Montserrat, sans-serif',
    textAlign: 'left',
  },
  titleCollege: {
    color: '#6f7277',
    fontWeight: 500,
    fontFamily: 'Montserrat, sans-serif',
    flexGrow: 1,
    marginLeft: theme.spacing(1),
    textAlign: 'left',
  },
  hide: {
    display: 'none',
  },
  list: {
    width: 250,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
}));

function MenuAppBar({ history }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openLogin, setopenLogin] = React.useState(false);

  const { user, setUser } = useContext(UserContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLoginOpen = () => {
    setopenLogin(true);
  };

  const handleSignupOpen = () => {};

  const handleLogout = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/users/logout', {
        withCredentials: true,
      });
      localStorage.removeItem('user');
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Container fixed>
          <Toolbar>
            <img src={logo} className={classes.logoImg} />
            <Typography variant="h6" className={classes.titleDSC}>
              DSC
            </Typography>
            <Typography variant="h6" className={classes.titleCollege}>
              JIIT 128
            </Typography>

            <IconButton
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              className={classes.drawer}
              variant="temporary"
              anchor="right"
              open={open}
              onClose={handleDrawerClose}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronRightIcon />
                </IconButton>
              </div>
              <Divider />

              <List className={classes.list}>
                <ListItem button onClick={() => history.push('/')}>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={() => history.push('/positions')}>
                  <ListItemIcon>
                    <CodeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Positions" />
                </ListItem>

                {/* LOGGED IN / OUT*/}

                {user ? (
                  <>
                    <ListItem
                      button
                      onClick={() => {
                        history.push('/profile');
                      }}
                    >
                      <ListItemIcon>
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </>
                ) : (
                  <>
                    <ListItem button onClick={handleSignupOpen}>
                      <ListItemIcon>
                        <AddCircleOutlineIcon />
                      </ListItemIcon>
                      <ListItemText primary="Signup" />
                    </ListItem>
                    <ListItem button onClick={handleLoginOpen}>
                      <ListItemIcon>
                        <VpnKeyIcon />
                      </ListItemIcon>
                      <ListItemText primary="Login" />
                    </ListItem>
                  </>
                )}
              </List>
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
      <LoginDialogue modalOpen={openLogin} setmodalOpen={setopenLogin} />
    </div>
  );
}

export default withRouter(MenuAppBar);
