import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const ForumSelection = ({ forumNames }) => (
    <div className='forumList__container'>
        {forumNames.map((topic) => {
            return (
                <div className='topic__container' key={topic}>
                    <Link style={{ textDecoration: 'none' }} to={`/t/${topic}`}><p className='topic__text'>{topic}</p></Link>
                </div>
            )
        })}
    </div>
);

const mapStateToProps = (state) => ({
    forumNames: state.forumNames
})

export default connect(mapStateToProps)(ForumSelection);