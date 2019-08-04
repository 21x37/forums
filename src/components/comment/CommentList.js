import React from 'react';
import { connect } from 'react-redux';
import IndividualComment from './IndividualComment';
import userEmailSelector from '../../selectors/userEmailSelector';
import { startAddComment } from '../../actions/comments';

class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.comments.map((comment) => {
                    if (!comment.upvotes) {
                        comment.upvotes = []
                    } 
                    return (
                        <IndividualComment key={comment.comment + comment.author} comment={comment} forumName={this.props.forumName} subForumId={this.props.subForumId}/>
                    )
                })}
            </div>
        );
    };
};

const mapStateToProps = (state) => ({
    comments: state.currentSubForum && state.currentSubForum.comments ? Object.values(state.currentSubForum.comments) : []
})



export default connect(mapStateToProps)(CommentList);