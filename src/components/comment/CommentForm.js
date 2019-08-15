import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';
import { firebase } from '../../firebase/firebase';
import { startAddComment } from '../../actions/comments';
import { startAddNotification } from '../../actions/notifications';
import { commentValidator } from '../../selectors/fieldValidator';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            upvotes: 0,
            error: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e) {

        const comment = e.target.value;
        const author = this.props.auth
        const date = moment().format('MMMM Do YYYY')

        this.setState({ comment, author, date })
    }
    onSubmit(e) {
        e.preventDefault();

        const noFieldErrors = commentValidator(this.state)

        if (noFieldErrors === true) {
            this.setState({ error: '' })
            const forumName = this.props.forumName;
            const subForumId = this.props.subForumId;
            const comment = _.omit(this.state, 'error');
            this.setState({ comment: '' })
    
            
            const notificationSchema = {
                text: comment.comment,
                message: `${this.props.auth.username} has commented on your post ${this.props.title}.`,
                likedBy: _.omit(this.props.auth, 'notifications'),
                unread: true,
                date: moment().format('MMMM Do YYYY'),
                url: `/t/${this.props.forumName}/${this.props.subForumId}`,
                type: 'COMMENT'
            }
            const notification = { userId: this.props.subForumAuthorId, notification: notificationSchema }
    
    
            this.props.startAddNotification(notification)
    
    
            this.props.startAddComment({ forumName, subForumId, comment });
        } else {
            this.setState({ error: noFieldErrors })
        }

 
    }
    render() {
        return (
            <div className='commentForm__container'>
                <p>{this.state.error}</p>
                <input className='commentForm__input' type='text' onChange={this.onChange} value={this.state.comment}/>
                <button onClick={this.onSubmit}>Comment</button>
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
    startAddComment: comment => dispatch(startAddComment(comment)),
    startAddNotification: (notification) => dispatch(startAddNotification(notification))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);