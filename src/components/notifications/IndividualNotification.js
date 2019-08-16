import React from 'react';
import { Link } from 'react-router-dom';

const IndividualNotification = ({ notification }) => (
    <Link style={{ textDecoration: 'none' }} to={notification.url}>
        <div className='individual__notification__container' hidden={!notification.unread}>
            <div className='individual__notification__wrapper'>
                <div className='individual__notification__flex'>
                    <img className='individual__notification__picture' src={notification.likedBy.profilePicture}/>
                    <p className='individual__notification__message' style={{ color: 'black' }}>{notification.message.length > 38 ? `${notification.message.substring(0,38)}...` : notification.message}</p>
                </div>
                <p className='individual__notification__date' style={{ color: 'black' }}>{notification.date}</p>
            </div>
        </div>
    </Link>
)

export default IndividualNotification;