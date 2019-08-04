import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchList = ({ searchUsers, to }) => (
    <div>
      {searchUsers && searchUsers.map((user) => {
          return (
              <div key={user.profilePicture}>
                <Link to={`${to}/${user.username}`}>
                    <img src={user.profilePicture} style={{ width: '50px', height: '50px' }}/>
                    <p style={{ color: 'white' }}>{user.username}</p>
                </Link>
              </div>
          )
      })}  
    </div>
);

const mapStateToProps = (state) => ({
    searchUsers: state.searchUsers.splice(0,10)
});

export default connect(mapStateToProps)(SearchList);

