import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Backdrop, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { loadUsers, setUsersLoading } from './users.actions';
import { AppState, UsersState } from '../redux/state';

export interface UsersWrapperProps {
  users: UsersState,
  dispatch: ThunkDispatch<AppState, void, AnyAction>,
}

class Users extends Component<UsersWrapperProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setUsersLoading(true));
    dispatch(loadUsers());
  }

  render() {
    const {
      users: {
        list: usersList,
        isLoading,
      },
    } = this.props;

    if (isLoading) {
      return (
        <Backdrop open addEndListener={() => null}>
          <CircularProgress color="primary" />
        </Backdrop>
      );
    }

    if (!usersList) {
      return <Alert variant="filled" severity="error">Failed to fetch users</Alert>;
    }

    return (
      <ul>
        {usersList.map(({
          id,
          name,
          surname,
          role,
        }) => (
          <li key={id}>{name} {surname} - {role}</li>
        ))}
      </ul>
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
