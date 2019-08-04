import { firebase } from '../firebase/firebase';
import _ from 'lodash';

export const startLike = (forumName, subForumId) => {
    return async (dispatch) => {
        let likesArr = [];

        // Retrieving the current likes and likers on the post.
        await firebase.database().ref(`/forums/${forumName}/${subForumId}/upVotes`).on('value', (snapshot) => {
            // Checking to make sure it is not null, and then converting the object into a array of pure uids.
            likesArr = snapshot.val() ? Object.values(snapshot.val()) : []; 
        })
        // Getting the user that liked the post.
        const user = firebase.auth().currentUser.uid;
        // Getting a array filtered of the users uid to test if the user has already liked the post.
        const control = likesArr.filter((like) => like != user);

        // If no user was filtered out of the control then user must of not liked it and will be added to the array.
        // Using lodash to compare arrays.
        const newLikesArr = _.isEqual(likesArr, control) ? [...likesArr, user] : control;
        firebase.database().ref(`/forums/${forumName}/${subForumId}/upVotes`).set(newLikesArr)
    }
}