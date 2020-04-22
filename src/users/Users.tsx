import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  Backdrop,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import { loadUsers, setUsersLoading, deleteUser } from './users.actions';
import { AppState, UsersState } from '../redux/state';
import { isUserAdmin } from './functions';

export interface UsersWrapperProps {
  users: UsersState,
  dispatch: ThunkDispatch<AppState, void, AnyAction>,
}

class Users extends Component<UsersWrapperProps> {
  constructor(props: UsersWrapperProps) {
    super(props);

    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  componentDidMount() {
    const { dispatch, users } = this.props;
    if (!users.list) {
      dispatch(setUsersLoading(true));
      dispatch(loadUsers());
    }
  }

  handleDeleteUser(id: number) {
    const { dispatch } = this.props;
    dispatch(setUsersLoading(true));
    dispatch(deleteUser(id));
  }

  render() {
    const {
      users: {
        list: usersList,
        isLoading,
        authUser,
      },
    } = this.props;

    if (!isUserAdmin(authUser)) {
      return <Alert variant="filled" severity="error">Only admin can view users list</Alert>;
    }

    if (!usersList) {
      return <Alert variant="filled" severity="error">Failed to fetch users</Alert>;
    }

    if (usersList.length === 0 && !isLoading) {
      return <Alert variant="filled" severity="info">No users available</Alert>;
    }

    return (
      <>
        {isLoading && (
          <Backdrop open style={{ zIndex: 1 }}>
            <CircularProgress color="primary" />
          </Backdrop>
        )}
        {usersList?.length > 0 && (
          <TableContainer component={Paper}>
            <Table aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Id</strong></TableCell>
                  <TableCell align="center"><strong>Name</strong></TableCell>
                  <TableCell align="center"><strong>Surname</strong></TableCell>
                  <TableCell align="center"><strong>Role</strong></TableCell>
                  <TableCell align="center"><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersList.map(({
                  id,
                  name,
                  surname,
                  role,
                }) => (
                  <TableRow key={id}>
                    <TableCell component="th" scope="row">
                      {id}
                    </TableCell>
                    <TableCell align="center">{name}</TableCell>
                    <TableCell align="center">{surname}</TableCell>
                    <TableCell align="center">{role}</TableCell>
                    <TableCell align="center" size="small">
                      <Button
                        onClick={
                          () => this.handleDeleteUser(id)
                        }
                        color="secondary"
                        variant="outlined"
                        endIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </>
    );
  }
}

// @TODO add return type
const mapStateToProps = (state: AppState) => ({
  users: state.users,
});

// @TODO add return type
const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>): any => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users);
