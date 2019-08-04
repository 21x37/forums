import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { Link } from 'react-router-dom';

const NotificationsPage = ({notifications}) => (
    <div>
        {notifications ? notifications.map((notification) => (
           <Link key={uuid()} to={notification.url}>
                <div>
                    <p>{notification.message}</p>
                    <p>{notification.date}</p>
                    <img style={{ width: '100px', height: '100px'}}src={notification.likedBy.profilePicture}/>
                    <p>{notification.likedBy.username}</p>
                </div>
            </Link>
            )) : 
        <div>
            <p>No notifications.</p>
        </div>
    }
    </div>
)

const mapStateToProps = (state) => ({
    notifications: state.auth.notifications
})

export default connect(mapStateToProps)(NotificationsPage)