import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Badge,
  MenuItem,
  Menu,
  IconButton,
  Button,
  Typography,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import { ShoppingCartRounded, AccountCircle } from '@material-ui/icons';
import { useHistory, Link } from 'react-router-dom';

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

export default function ButtonAppBar() {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHome = () => {
    history.push('/');
  };

  const handleShoppingCart = () => {
    history.push('/order');
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" onClick={handleHome}>
              Home
            </Button>
          </Typography>
          <Button color="inherit">Login</Button>
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
              <MenuItem onClick={handleClose}><Link to="/">Books</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link to="/users">Users</Link></MenuItem>
              <MenuItem onClick={handleClose}><Link to="/users">Orders</Link></MenuItem>
            </Menu>
          </div>
          <IconButton aria-label="Shopping cart" color="inherit" onClick={handleShoppingCart}>
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartRounded />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
