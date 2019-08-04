import { firebase, storageRef } from '../firebase/firebase';

export const startSetUserInfo = ({ uid, photo, username, email }) => {
    return async (dispatch) => {
        await storageRef.child(`${uid}/${photo.name}`).put(photo)
           
        const profilePicture = await storageRef.child(`${uid}/${photo.name}`).getDownloadURL();

        const user = {
            uid,
            profilePicture,
            username,
            email
        }

        firebase.database().ref(`/users`).push(user);
    }
}