import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import { startSetNotification } from './actions/notifications';
import LoadingPage from './components/LoadingPage';
import { startSetForumNames } from './actions/forumNames';

const store = configureStore();
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

const checkIfUserInfoSet = (loggedInUser) => {
  store.dispatch(startSetForumNames());
  firebase.database().ref('/users').on('value', (snapshot) => {
    // Fetching all users and putting them in an array of objects.

    const userKeys = snapshot.val() ? Object.keys(snapshot.val()) : [];
    const users = snapshot.val() ? Object.values(snapshot.val()) : [];
    const uid = loggedInUser.uid;
    // Comparing each user in the array to the logged in user to check if the user has set a username, and pic.
    for ( let i = 0; i < users.length; i++ ) {
      if (users[i].uid === uid) {
        const databaseId = userKeys[i]
        const currentUser = users[i];
        const currentUserOmitted = _.omit(currentUser, 'messages');
        store.dispatch(login({...currentUserOmitted, uid, databaseId }))

        // Filling redux state with the notifications saved on firebase.
        store.dispatch(startSetNotification({ userId: databaseId }))

          if (history.location.pathname === '/') {
            history.push('/dashboard');
          }

        return renderApp();
      } 
    }  
    // If this code is reached the for loop was not able to find a user in which case the current user needs to set a username and pic.
    store.dispatch(login(uid));
    renderApp();
    history.push('/set-user-info')



  })
}


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    checkIfUserInfoSet(user);
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
})







// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     store.dispatch(login(user.uid));
//     renderApp();
//     if (history.location.pathname === '/') {
//       history.push('/dashboard');
//     }
//   } else {
//     store.dispatch(logout());
//     renderApp();
//     history.push('/');
//   }
// });
