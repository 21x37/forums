import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/logInPage/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import ModalRoute from './ModalRoute';
import RegisterPage from '../components/registerPage/RegisterPage';
import ForumRoutes from './ForumRoutes';
import ForumPage from '../components/forumPage/ForumPage';
import PostForum from '../components/common/PostForum';
import SubForum from '../components/subForumPage/SubForum';
import SetUserInfo from '../components/setUserInfo/SetUserInfo';
import routerParamsParse from '../selectors/routerParamsParse';
import UserProfile from '../components/userProfile/UserProfile';
import NotificationsPage from '../components/notifications/NotificationsPage';
import Messages from '../components/messages/Messages';
import MessageUserPage from '../components/messageUser/MessageUserPage';
import { firebase } from '../firebase/firebase';


export const history = createHistory();


const AppRouter = ({ forumNames }) => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact/>
        <PublicRoute path="/register" component={RegisterPage} exact/>
        <ModalRoute path='/set-user-info' component={SetUserInfo} exact/>
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        {/* routerParamsParse is a function that takes a array of acceptable params and parses it into a react param string */}
        {/* param1|param2|param3|param4| */}
        <PrivateRoute path={`/t/:forumName(${routerParamsParse(forumNames)})`} component={ForumPage} exact/>
        <PrivateRoute path={`/t/:forumName/post`} component={PostForum} exact/>
        <PrivateRoute path={`/t/:forumName/:subForumId`} component={SubForum} exact/>
        <PrivateRoute path='/notifications' component={NotificationsPage} exact/>
        <PrivateRoute path='/messages/:recipient' component={MessageUserPage} exact/>
        <PrivateRoute path='/messages' component={Messages} exact/>
        <PrivateRoute path={`/:username`} component={UserProfile} exact/>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

const mapStateToProps = (state) => ({
  forumNames: state.forumNames
})


export default connect(mapStateToProps)(AppRouter);
