import { firebase, googleAuthProvider } from '../firebase/firebase';
import { authError } from './errors';

// -----------
// Login Actions
// -----------

export const login = (payload) => ({
  type: 'LOGIN',
  payload
});

export const startLogin = ({ email, password }) => {
  return (dispatch) => {
    console.log('fired');
    return firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        dispatch(authError(error))
      });
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};

// -----------
// Register Actions
// -----------

export const startRegisterUser = ({ email, password }) => {
  return (dispatch) => {
    try {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          dispatch(authError(error));
        })
    } catch (error) {
      dispatch(authError(error))
    }
  };
};