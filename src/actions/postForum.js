import { firebase } from '../firebase/firebase';

export const createPost = (post) => {
    return () => {
        return firebase.database().ref(`/forums/${post.forumName}`).push(post)
    }
}