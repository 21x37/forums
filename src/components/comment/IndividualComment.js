import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { startUpVoteComment, startDeleteComment } from '../../actions/comments';
import { startAddNotification } from '../../actions/notifications';

class IndividualComment extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    onDelete() {
        // TODO: wire up forumName, subforumId, commentId
        const forumName = this.props.forumName;
        const subForumId = this.props.subForumId;
        const commentId = this.props.comment.commentId;

        this.props.startDeleteComment({ forumName, subForumId, commentId })
    }
    onClick() {
        const notificationSchema = {
            message: `${this.props.auth.username} has liked your comment ${this.props.comment.comment}.`,
            likedBy: this.props.comment.author,
            unread: true,
            date: moment().format('MMMM Do YYYY'),
            url: `/t/${this.props.forumName}/${this.props.subForumId}`,
            type: 'COMMENT'
        }
        const notification = { userId: this.props.comment.author.databaseId, notification: notificationSchema };


        this.props.startAddNotification(notification)
        this.props.startUpVoteComment({ forumName: this.props.forumName, subForumId: this.props.subForumId, commentId: this.props.comment.commentId })
    }
    render() {
        return (
        <div key={this.props.comment.comment}>
            <Link to={`/${this.props.comment.author.username}`}>
                    {this.props.comment.author.uid === this.props.auth.uid && <button onClick={this.onDelete}>Delete</button> }
                    <p>{this.props.comment.comment}</p>
                    <p>{this.props.comment.date}</p>
                    <p>{this.props.comment.author.username}</p>
                    <img src={this.props.comment.author.profilePicture} style={{ width: '50px', height: '50px'}}/>
                    <p>{this.props.comment.upvotes.length}</p>
            </Link>
            <button onClick={this.onClick}>UpVote</button>
        </div>

        );
    };
};

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
    startUpVoteComment: (forumDetails) => dispatch(startUpVoteComment(forumDetails)),
    startAddNotification: (notification) => dispatch(startAddNotification(notification)),
    startDeleteComment: (comment) => dispatch(startDeleteComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(IndividualComment);