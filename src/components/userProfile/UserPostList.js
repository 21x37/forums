import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserPosts } from '../../actions/userProfile';

class UserPostList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notRendered: true
        }

        this.getPosts = this.getPosts.bind(this);
    }
    componentWillUnmount() {
        this.setState({ notRendered: true })
    }
    getPosts() {
        this.props.getUserPosts({ user: this.props.user })
        this.setState({ notRendered: false })
    }
    render() {
        // if (this.props.user.uid && this.state.notRendered) {
        //     this.getPosts();
        // }
        return (
            <div>
                {this.props.user.userPosts && this.props.user.userPosts.map((post) => {
                    return (
                        <Link to={`/t/${post.forumName}/${post.id}`} key={uuid()}>
                            <div className='profile__posts--container'>
                                <p className='profile__text'>{post.title}</p>
                                <p className='profile__text profile__list--upvotes'>{post.upVotes ? `${post.upVotes.length}   🏆`  : '0 🏆'}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        )
    }
}



const mapDispatchToProps = (dispatch) => ({
    getUserPosts: (user) => dispatch(getUserPosts(user))
})

export default connect(undefined, mapDispatchToProps)(UserPostList);