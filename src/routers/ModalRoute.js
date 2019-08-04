import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

export const ModalRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} component={(props) => (
      // If the user doesnt have a username then he can use this modal because he needs to set a username and profile picture
      isAuthenticated.username == undefined ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
          <Redirect to="/" />
        )
    )} />
  );

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth
});

export default connect(mapStateToProps)(ModalRoute);
