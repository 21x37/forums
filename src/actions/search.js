import { firebase } from '../firebase/firebase';

const searchUsers = (payload) => ({
    type: 'SEARCH_USERS',
    payload
})

export const startSearchUsers = (query) => {
    return (dispatch) => {
        firebase.database().ref('/users').on('value', (snapshot) => {
            const users = [];
            snapshot.forEach((childSnapshot) => {
                if (query) {
                    if (childSnapshot.val() && childSnapshot.val().username) {
                        if (childSnapshot.val().username.toLowerCase().includes(query.toLowerCase())) {
                            users.push(childSnapshot.val())
                        }
                    }

                } else {
                    dispatch(startClearUsers())
                }

            })

            dispatch(searchUsers(users))
        })
    }
}

export const startClearUsers = () => ({
    type: 'CLEAR_USERS'
})

const fillForumList = (forumList) => ({
    type: 'FETCH_FORUMS',
    payload: forumList
})


export const startSearchForums = ({ subForumName, query }) => {
    return (dispatch) => {
        firebase.database().ref(`/forums/${subForumName}`).on('value', (snapshot) => {
            const subForums = [];
            snapshot.forEach((childSnapshot) => {

                if (childSnapshot.val().title.toLowerCase().includes(query.toLowerCase().trim())) {
                    const subForum = { ...childSnapshot.val(), id: childSnapshot.key }
                    subForums.push(subForum);
                }
            })

            if (subForums.length > 0 || query && query.trim().length > 0) {
                dispatch(fillForumList(subForums));
            } else {
                const forumArr = [];

                snapshot.forEach((childSnapshot) => {
                    const subForum = { ...childSnapshot.val(), id: childSnapshot.key }
                    forumArr.push(subForum);
                })

                dispatch(fillForumList(forumArr));
            }
        })
    }
}