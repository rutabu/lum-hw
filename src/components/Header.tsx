import React, { FC, MouseEvent, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AccountCircle, ShoppingCartRounded } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../redux/state';
import Login from './Login';
import { AuthUser } from '../users/interfaces';
import {
  loadStoredAuthUser,
  setUsersLoading,
  userLogin,
  userLogout,
} from '../users/users.actions';
import { isUserAdmin, isUserClient } from '../users/functions';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
}));

export interface HeaderProps {
  dispatch: ThunkDispatch<AppState, void, AnyAction>,
  isLoading: boolean,
  loginFailed: boolean,
  authUser?: AuthUser,
}

const Header: FC<HeaderProps> = (props: HeaderProps) => {
  const {
    isLoading,
    loginFailed,
    authUser,
    dispatch,
  } = props;
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (!authUser) {
    dispatch(loadStoredAuthUser());
  }

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHome = () => {
    history.push('/');
  };

  const handleShoppingCartClick = () => {
    history.push('/order/new');
  };

  const handleUserLogin = (username: string, password: string) => {
    dispatch(setUsersLoading(true));
    dispatch(userLogin(username, password));
  };

  const handleUserLogout = () => {
    dispatch(userLogout());
    history.push('/');
  };

  const isAdmin = isUserAdmin(authUser);
  const isClient = isUserClient(authUser);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" onClick={handleHome}>
              Home
            </Button>
          </Typography>
          {!authUser && (
            <Login
              handleUserLogin={handleUserLogin}
              isLoading={isLoading}
              loginFailed={loginFailed}
            />
          )}
          {authUser && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {isAdmin && (
                  <>
                    <MenuItem onClick={handleClose}><Link to="/books">Books</Link></MenuItem>
                    <MenuItem onClick={handleClose}><Link to="/users">Users</Link></MenuItem>
                  </>
                )}
                {isClient && (
                  <MenuItem onClick={handleClose}><Link to="/profile">Profile</Link></MenuItem>
                )}
                <MenuItem onClick={handleClose}><Link to="/orders">Orders</Link></MenuItem>
                <MenuItem onClick={handleClose}>
                  <Button
                    onClick={handleUserLogout}
                    color="secondary"
                    variant="contained"
                    fullWidth
                  >
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </div>
          )}
          {isClient && (
            <IconButton aria-label="Shopping cart" color="inherit" onClick={handleShoppingCartClick}>
              <Badge badgeContent={4} color="secondary">
                <ShoppingCartRounded />
              </Badge>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

// @TODO add return type
const mapStateToProps = (state: AppState) => ({
  isLoading: state.users.isLoading,
  loginFailed: state.users.loginFailed,
  authUser: state.users.authUser,
});
// @TODO add return type
const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>) => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
