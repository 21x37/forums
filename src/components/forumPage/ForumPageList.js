import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchForumList } from '../../actions/forum';

class ForumPageList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        // This will be NOT be an individual forum rather a page showing all of the forums that have been posted.

        this.props.fetchForumList(this.props.forumName)
    }
    render() {
        return (
            <div>
                {   
                    this.props.forumList.map((post) => (
                        <Link style={{ color: '#0079D3', textDecoration: 'none'}} to={`/t/${this.props.forumName}/${post.id}`}>
                            <div className='forumPage__list__post__container' key={post.author + post.title}>
                                <div className='forumPage__list__wrapper'>
                                    <h2 className='forumPage__list__title'>{post.title}</h2>
                                    {/* TODO: Get author name/username from firebase with uid */}
                                    <div className='forumPage__list__profilePicture__username__wrapper'>
                                        <img className='forumPage__list__profilePicture' src={post.author.profilePicture} style={{ width: '30px', height: '30px' }} />
                                        <p className='forumPage__list__username'>{post.author.username}</p>
                                    </div>
                                    <div className='clearfix'></div>

                                    {/* TODO: Set date when created using moment. */}
                                    <p className='forumPage__list__date'>{post.date === moment().format('MMMM Do YYYY') ? 'Posted Today' : post.date}</p>
                                </div>
                            </div>
                        </Link>
                        )
                    )
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    forumList: state.forumList
})

const mapDispatchToProps = (dispatch) => ({
    fetchForumList: forumName => dispatch(fetchForumList(forumName))
})

export default connect(mapStateToProps, mapDispatchToProps)(ForumPageList);