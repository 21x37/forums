import { firebase } from '../firebase/firebase';
import _ from 'lodash';

export const addComment = (payload) => ({
    type: 'ADD_COMMENT',
    payload
})

export const startAddComment = ({ forumName, subForumId, comment }) => {
    return (dispatch) => {

        return firebase.database().ref(`/forums/${forumName}/${subForumId}/comments`).push(comment)
            .then(() => {
                dispatch(addComment(comment));
            })
    };
};

export const startDeleteComment = ({ forumName, subForumId, commentId }) => {
    return (dispatch) => {
        firebase.database().ref(`/forums/${forumName}/${subForumId}/comments/${commentId}`).remove();
    };
};

export const startUpVoteComment = ({ forumName, subForumId, commentId }) => {
    return (dispatch) => {
        let likesArr;
        firebase.database().ref(`forums/${forumName}/${subForumId}/comments/${commentId}/upvotes`).on('value', (snapshot) => {
            likesArr = snapshot.val() ? Object.values(snapshot.val()) : [];
        });
        const user = firebase.auth().currentUser.uid;

        const control = likesArr.filter((like) => like != user);

        const newLikesArr = _.isEqual(likesArr, control) ? [...likesArr, user] : control;

        firebase.database().ref(`forums/${forumName}/${subForumId}/comments/${commentId}/upvotes`).set(newLikesArr);
    }
}