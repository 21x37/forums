import _ from 'lodash';
import { firebase } from '../firebase/firebase';
import isDuplicateNotification from '../selectors/isDuplicateNotification';


const addNotifcation = (payload) => ({
    type: 'ADD_NOTIFICATION',
    payload
})



export const startAddNotification = ({ userId, notification }) => {
    return async (dispatch) => {
        let notificationsArr = [];
        await firebase.database().ref(`/users/${userId}/notifications`).on('value', (snapshot) => {
            if (snapshot.val()) {
                notificationsArr = snapshot.val();
            }
        });

        let newNotificationsArr;

        isDuplicateNotification(notificationsArr, notification, (isDuplicate) => {
            if (isDuplicate) {
                return newNotificationsArr = notificationsArr;
            }

            newNotificationsArr = [ ...notificationsArr, notification ]
        })

        await firebase.database().ref(`/users/${userId}/notifications`).set(newNotificationsArr);

        if (userId === notification.likedBy.databaseId) {
            dispatch(addNotifcation(newNotificationsArr))
        }
    };
};  

export const startReadNotifications = ({ userId }) => {
    return async (dispatch) => {
        let notifications;

        await firebase.database().ref(`/users/${userId}/notifications`).on('value', (snapshot) => {
            notifications = snapshot.val()
        });

        if (notifications) {
            notifications.forEach((notification) => {
                notification.unread = false
            })
    
            await firebase.database().ref(`/users/${userId}/notifications`).set(notifications);
        }

    }
}

const setNotifications = ({ notifications }) => ({
    type: 'SET_NOTIFICATIONS',
    payload: notifications
})

export const startSetNotification = ({ userId }) => {
    return async (dispatch) => {
        let notifications;
        await firebase.database().ref(`/users/${userId}/notifications`).on('value', (snapshot) => {
            notifications = snapshot.val();
        })
        dispatch(setNotifications({ notifications }));
    }
}

export const startWipeNotifications = ({ url }) => {
    return (dispatch) => {
        firebase.database().ref(`/users`).on('value', (snapshot) => {
            
            snapshot.forEach((childSnapshot) => {
                const userId = childSnapshot.key;
                const notifications = childSnapshot.val().notifications
                
                if (notifications) {
                    const filteredNotifications = notifications.filter((notification) => notification.url !== url);

                    firebase.database().ref(`/users/${userId}/notifications`).set(filteredNotifications);
                }

            });

        })
    }
}