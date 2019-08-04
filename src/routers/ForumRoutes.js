import React from 'react';
import PrivateRoute from './PrivateRoute';
import { Redirect, withRouter } from 'react-router-dom';
import ForumPage from '../components/forumPage/ForumPage';
import PostForum from '../components/common/PostForum';
import SubForum from '../components/subForumPage/SubForum';

const subForums = [
    'bmw',
    'programming',
    'food',
    'gym',
    'school'
]



const ForumRoutes = (props) => {
    const subForumName = window.location.href.split('/')[4];

    return subForums.includes(subForumName) ? (
        <div>

        {subForums.map((topic) => (
            <div key={topic}>
                <PrivateRoute path={`/f/${topic}`} component={ForumPage} exact/>
                <PrivateRoute path={`/f/${topic}/post`} component={PostForum} exact/>
                <PrivateRoute path={`/f/${topic}/:subForumId(\w{5,})`} component={SubForum} exact/>
            </div>
        ))}

        </div>
    ) : (
        <div>
            <p>Went to unpermitted forum.</p>
            <p>Redirecting in 5 seconds...</p>
            Error #
            { setTimeout(() => {
                props.history.push(`/dashboard`)
            }, 5000)}

        </div>
    )
}

export default withRouter (ForumRoutes);