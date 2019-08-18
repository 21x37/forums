import { firebase } from '../firebase/firebase';
import _ from 'lodash';

const setUser = (payload) => ({
    type: 'SET_USER',
    payload
})

const getUpvotes = (username) => {
    return new Promise((resolve, reject) => {
        firebase.database().ref(`/forums`).on('value', (snapshot) => {
            let upvotes = 0;
            snapshot.forEach((childSnapshot) => {
                childSnapshot.forEach((post) => {
                    if (post.val().author.username === username) {
                        if (post.val().upVotes != 0 && post.val().upVotes) {
                            upvotes += post.val().upVotes.length;
                        }
                    }
                    const userPost = post.val();
                    if (userPost.comments) {
                        const postComments = Object.values(userPost.comments);

                        for (let i = 0; i < postComments.length; i++) {
                            if (postComments[i].author.username === username) {
                                if (postComments[i].upvotes.length) {
                                    upvotes += postComments[i].upvotes.length;
                                }
                            }
                        }

                    }
                })
            })
            resolve(upvotes);
        })
    })
}

export const startSetUser = (queriedUsername) => {
    return async (dispatch) => {
        let users;
        await firebase.database().ref(`/users`).on('value', (snapshot) => {
            users = snapshot
        })


        users.forEach( (user) => {
            if (user.val().username && queriedUsername) {
                if (user.val().username.toLowerCase() === queriedUsername.toLowerCase()) {



                    getUserPosts({ user: user.val() })
                        .then((userPosts) => {

                            getUpvotes(queriedUsername).then((upvotes) => {
                                const userObj = {
                                    ...user.val(),
                                    upvotes,
                                    userPosts
                                }
                                let queriedUser = _.omit(userObj, 'notifications');
                                queriedUser = _.omit(queriedUser, 'messages');
                                dispatch(setUser(queriedUser));
                            })



                        });



    
                }
            }
        });
    }
}

const addUserPosts = (payload) => ({
    type: 'ADD_USERS_POSTS',
    payload
})



const getUserPosts = ({ user }) => {
    return new Promise((resolve, reject) => {
        const userPosts = [];

        firebase.database().ref(`/forums`).on('value', (snapshot) => {
            const forumKeys = Object.keys(snapshot.val());
            const categorizedForumPosts = []
    
            forumKeys.forEach((key) => {
    
                const categorizedForumPostsKeys = Object.keys(snapshot.val()[key])
                const categorizedForumPostsValues = Object.values(snapshot.val()[key]);
    
                for (let i = 0; i < categorizedForumPostsValues.length ; i++) {
                    const id = categorizedForumPostsKeys[i]
                    const value = categorizedForumPostsValues[i]
    
                    categorizedForumPosts.push({ ...value, id })
                }
            })
    
            categorizedForumPosts.forEach((post) => {
    
                if (post.author.uid === user.uid) {
                    userPosts.push(post);
                }
            })
            resolve(userPosts);
        })
    })
}





// export const getUserPosts = ({ user }) => {
//     console.log('fired');
//     return (dispatch) => {
//         const userPosts = [];
//         firebase.database().ref(`/forums`).on('value', (snapshot) => {

//             const forumKeys = Object.keys(snapshot.val());
//             const categorizedForumPosts = []

//             forumKeys.forEach((key) => {

//                 const categorizedForumPostsKeys = Object.keys(snapshot.val()[key])
//                 const categorizedForumPostsValues = Object.values(snapshot.val()[key]);

//                 for (let i = 0; i < categorizedForumPostsValues.length ; i++) {
//                     const id = categorizedForumPostsKeys[i]
//                     const value = categorizedForumPostsValues[i]

//                     categorizedForumPosts.push({ ...value, id })
//                 }
//             })

//             categorizedForumPosts.forEach((post) => {

//                 if (post.author.uid === user.uid) {
//                     userPosts.push(post);
//                 }
//             })
//         })

//         dispatch(addUserPosts(userPosts));
//     }
// }
