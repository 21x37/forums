import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { Link } from 'react-router-dom';

const NotificationsPage = ({notifications}) => (
    <div>
        {notifications ? notifications.map((notification, index) => (
           <Link style={{ textDecoration: 'none', color: 'black' }} key={uuid()} to={notification.url}>
                <div className='notificationPage__container'>
                    {console.log(index)}

                    <div className='notificationPage__wrapper'>
                        <p className='notificationPage__date'>{notification.date}</p>
                        <div className='notificationPage__flex'>
                            <img className='notificationPage__profilePicture' src={notification.likedBy.profilePicture}/>
                            <p>{notification.message}</p>
                        </div>
                        <p className='notificationPage__username'>{notification.likedBy.username}</p>
                    </div>
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