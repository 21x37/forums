import { firebase } from '../firebase/firebase';

const setForumNames = (payload) => ({
    type: 'SET_FORUM_NAMES',
    payload
})

export const startSetForumNames = () => {
    return (dispatch) => {
        firebase.database().ref(`/forumNames`).on('value', (snapshot) => {
           const forumNames = Object.values(snapshot.val()); 

           dispatch(setForumNames(forumNames));
        });
    }
}

