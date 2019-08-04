import { firebase } from '../firebase/firebase';

const setCurrentSubForum = (data) => ({
    type: 'SET_FORUM',
    payload: data
})

export const fetchCurrentSubForum = (forumName, subForumId) => {
    return (dispatch) => {
        firebase.database().ref(`/forums/${forumName}/${subForumId}`).on('value', (snapshot) => {

            if (snapshot.val() && snapshot.val().comments) {
                
                const commentIdArr = Object.keys(snapshot.val().comments);

                let comments = [];

                commentIdArr.forEach((id) => {
                    const firebaseCommentData = snapshot.val().comments[id];
                    const commentId = id;

                    const commentObj = { ...firebaseCommentData, commentId };

                    comments.push(commentObj)

                })

                const currentSubForum = snapshot.val();
                currentSubForum.comments = comments;

                return dispatch(setCurrentSubForum(currentSubForum));
            }
            dispatch(setCurrentSubForum(snapshot.val()))

        })
    }
};

const fillForumList = (forumList) => ({
    type: 'FETCH_FORUMS',
    payload: forumList
})

export const fetchForumList = (forumName) => {
    return (dispatch) => {
        firebase.database().ref(`/forums/${forumName}`).on('value', (snapshot) => {
            const forumList = [];
            snapshot.forEach((childSnapshot) => {
                forumList.push({ ...childSnapshot.val(), id: childSnapshot.key});
            })
            dispatch(fillForumList(forumList));
        })
    }
}

const deleteForm = (subForumId) => ({
    type: 'DELETE_FORUM',
    payload: subForumId
})

export const startDeleteForum = (forumName, subForumId) => {
    return (dispatch) => {
        return firebase.database().ref(`/forums/${forumName}/${subForumId}`).remove().then(() => {
            dispatch(deleteForm);
        })


    }
}