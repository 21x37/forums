import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import errorReducer from '../reducers/errors';
import currentSubForumReducer from '../reducers/currentSubForum';
import forumListReducer from '../reducers/forumListReducer';
import notificationReducer from '../reducers/notificationReducer';
import userProfileReducer from '../reducers/userProfileReducer';
import searchUsersReducer from '../reducers/searchUsersReducer';
import messagesReducer from '../reducers/messagesReducer';
import forumNamesReducer from '../reducers/forumNamesReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      error: errorReducer,
      currentSubForum: currentSubForumReducer,
      forumList: forumListReducer,
      notifications: notificationReducer,
      userProfile: userProfileReducer,
      searchUsers: searchUsersReducer,
      messages: messagesReducer,
      forumNames: forumNamesReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
