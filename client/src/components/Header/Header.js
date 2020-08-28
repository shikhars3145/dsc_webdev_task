import React from 'react';
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
import AccountCircle from '@material-ui/icons/AccountCircle';
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

export default function MenuAppBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openLogin, setopenLogin] = React.useState(false);
  //   const [auth, setAuth] = React.useState(true);

  //   const handleChange = (event) => {
  //     setAuth(event.target.checked);
  //   };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLoginOpen = () => {
    setopenLogin(true);
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

              {/* LOGGED IN */}
              <List className={classes.list}>
                <ListItem button>
                  <ListItemIcon>
                    <CodeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Roles" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>

              {/* LOGGED OUT */}
              <List className={classes.list}>
                <ListItem button>
                  <ListItemIcon>
                    <CodeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Roles" />
                </ListItem>
                <ListItem button onClick={handleLoginOpen}>
                  <ListItemIcon>
                    <VpnKeyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItem>
              </List>
            </Drawer>
          </Toolbar>
        </Container>
      </AppBar>
      <LoginDialogue modalOpen={openLogin} setmodalOpen={setopenLogin} />
    </div>
  );
}
