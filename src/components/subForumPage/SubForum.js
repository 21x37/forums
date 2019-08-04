import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { fetchCurrentSubForum, startDeleteForum } from '../../actions/forum';
import { startAddNotification, startWipeNotifications } from '../../actions/notifications';
import { startLike } from '../../actions/likes';
import CommentForm from '../comment/CommentForm';
import CommentList from '../comment/CommentList';


// TODO: Setup startDeleteForm

class SubForum extends React.Component {
    constructor(props) {
        super(props)
        // TODO : Convert all of the redux state into a react state for consistency

        this.state = {
            upVotes: this.props.currentSubForum.upVotes ? Object.values(this.props.currentSubForum.upVotes) : [],
            notLoading: true
        }

        this.onClick = this.onClick.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    componentWillMount() {
        const { forumName, subForumId }  = this.props.match.params

        // Setting state when the component will mount with the forumName, and subForumId
        this.setState({ forumName, subForumId })
        this.props.fetchCurrentSubForum(forumName, subForumId);

    }
    componentDidMount() {
        const author = this.props.currentSubForum.author;


        this.setState({ ...this.props.currentSubForum.author })
    }
    async onDelete() {
        this.props.startDeleteForum(this.state.forumName, this.state.subForumId)

        const url = `/t/${this.state.forumName}/${this.state.subForumId}`
        this.props.startWipeNotifications({ url });

        // needs to toggle to loading; because the data gets wiped and current subforum becomes null.
        await this.setState({ notLoading: false })
        this.props.history.push(`/t/${this.state.forumName}`)
    }
    onClick() {
        const notificationSchema = {
            message: `${this.props.auth.username} has liked your post titled ${this.props.currentSubForum.title}.`,
            likedBy: this.props.auth,
            unread: true,
            date: moment().format('MMMM Do YYYY'),
            url: `/t/${this.state.forumName}/${this.state.subForumId}`,
            type: 'POST_LIKE'
        }
        const notification = { userId: this.props.currentSubForum.author.databaseId, notification: notificationSchema }

        this.props.startAddNotification(notification);
        this.props.startLike(this.state.forumName, this.state.subForumId);
    }
    renderForum() {
        return (
            <div>
                <Link to={`/t/${this.state.forumName}`}>Back</Link>
                    {this.props.auth.uid === this.props.authorID && <button onClick={this.onDelete}>Delete</button>}
                    {this.props.currentSubForum.author && 
                    <Link to={`/${this.props.currentSubForum.author.username}`}>
                        <div>
                            <p>{this.props.currentSubForum.author.username}</p>
                            <img src={this.props.currentSubForum.author.profilePicture} style={{ width: '50px', height: '50px' }} />
                        </div>
                    </Link>
                    }
                
                    <h1>{this.props.currentSubForum.title}</h1>
                    <p>{this.props.currentSubForum.text}</p>
                    <p>{this.props.currentSubForum.upVotes.length}</p>
                    
                    <button onClick={this.onClick}>UpVote</button>

                    <CommentList forumName={this.state.forumName} subForumId={this.state.subForumId}/>
                <CommentForm subForumAuthorId={this.props.currentSubForum.author ? this.props.currentSubForum.author.databaseId : '' } forumName={this.state.forumName} subForumId={this.state.subForumId} title={this.props.currentSubForum.title}/>
            </div>
        )
    }
    render() {
        return this.state.notLoading ? this.renderForum() : <div></div>
    }
}

const mapStateToProps = (state) => {
    let currentSubForum;

    if (state.currentSubForum && state.currentSubForum.upVotes) {
        currentSubForum = {...state.currentSubForum, upVotes: Object.values(state.currentSubForum.upVotes)}
    } else {
        currentSubForum = {...state.currentSubForum, upVotes: []}
    }

    return {
        currentSubForum,
        auth: state.auth,
        authorID: state.currentSubForum && state.currentSubForum.author ? state.currentSubForum.author.uid : null
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchCurrentSubForum: (forumName, subForumId) => dispatch(fetchCurrentSubForum(forumName, subForumId)),
    startLike: (forumName, subForumId) => dispatch(startLike(forumName, subForumId)),
    startDeleteForum: (forumName, subForumId) => dispatch(startDeleteForum(forumName, subForumId)),
    startAddNotification: (notification) => dispatch(startAddNotification(notification)),
    startWipeNotifications: (notification) => dispatch(startWipeNotifications(notification))
})

export default connect(mapStateToProps, mapDispatchToProps)(SubForum);