import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const UserDetails = ({ user, auth }) => (
    <div className='profile__container'>
        <img className='profile__picture' src={user.profilePicture}/>
        <h3 className='profile__username'>{user.username}</h3>
        <p className='profile__upvotes'>{user.upvotes} 🏆</p>
        {auth.username !== user.username && <Link to={`/messages/${user.username}`}><button className='profile__message'>Message</button></Link>}
    </div>
);

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect(mapStateToProps)(UserDetails);