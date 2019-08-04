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
                <p>Forum Page List</p>
                {   
                    this.props.forumList.map((post) => (
                            <div key={post.author + post.title}>
                                <Link to={`/t/${this.props.forumName}/${post.id}`}><h2>{post.title}</h2></Link>
                                {/* TODO: Get author name/username from firebase with uid */}
                                <p>{post.author.username}</p>
                                <img src={post.author.profilePicture} style={{ width: '30px', height: '30px' }} />
                                {/* TODO: Set date when created using moment. */}
                                <p>{post.date === moment().format('MMMM Do YYYY') ? 'Posted Today' : post.date}</p>
                            </div>
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