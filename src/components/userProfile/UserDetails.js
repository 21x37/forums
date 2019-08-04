import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const UserDetails = ({ user, auth }) => (
    <div>
        <img style={{width: '200px', height: '200px'}} src={user.profilePicture}/>
        <h3>{user.username}</h3>
        <p>{user.upvotes} 🎙</p>
        {auth.username !== user.username && <Link to={`/messages/${user.username}`}><button>Message</button></Link>}
    </div>
);

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect(mapStateToProps)(UserDetails);