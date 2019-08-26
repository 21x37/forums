import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchList = ({ searchUsers, to }) => (
    <div className='search__list__container'>
      {searchUsers && searchUsers.map((user) => {
          return (
              <div className='individual__search__container' key={user.profilePicture}>
                <Link className='individual__search__link' to={`${to}/${user.username}`}>
                    <img className='individual__search__image' src={user.profilePicture} style={{ width: '50px', height: '50px' }}/>
                    <p className='indivdual__search__username' style={{ color: 'white' }}>{user.username}</p>
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

