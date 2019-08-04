import React from 'react';

const IndividualNotification = ({ notification }) => (
    <div hidden={!notification.unread}>
        <img src={notification.likedBy.profilePicture} style={{ width: '22px', height: '22px' }} />
        <p style={{ color: 'white' }}>{notification.message}</p>
        <p style={{ color: 'white' }}>{notification.date}</p>
    </div>
)

export default IndividualNotification;