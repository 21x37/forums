import { firebase } from '../firebase/firebase';
import _ from 'lodash';

export const startSendMessage = (message) => {
    return (dispatch) => {
        if (message.recipient) {
            message.recipient.messages = null;
            message.recipient.notifications = null;
        }


        firebase.database().ref(`/users/${message.authorId}/messages/${message.recipient.username}`).push(message);
        firebase.database().ref(`/users/${message.recipient.databaseId}/messages/${message.authorUsername}`).push(message);

        console.log(`/users/${message.authorId}/messages/${message.recipient.username}`);
        console.log(`/users/${message.recipient.databaseId}/messages/${message.authorUsername}`);


        dispatch(fetchMessages(message));
    }
}

// Set on login
const setMessage = (payload) => ({
    type: 'SET_MESSAGE',
    payload
})


export const fetchMessages = (message) => {
    return (dispatch) => {
        firebase.database().ref(`/users/${message.authorId}/messages/${message.recipient.username}`)
            .on('value', (snapshot) => {    
                let messages = snapshot.val();

                dispatch(setMessage(messages));
            })
    }
}

export const fetchRecipient = async () => {
    const recipientUsername = window.location.href.split('/').reverse()[0];

    let recipient = null;

    await firebase.database().ref(`/users`)
        .on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if (childSnapshot.val().username === recipientUsername) {
                    recipient = {
                        ...childSnapshot.val(),
                        databaseId: childSnapshot.key
                    }
                };
            });
        });
        
    return recipient;
}

export const setUserMessagesList = async ({ userId }) => {
    const userMessagesList = [];

    await firebase.database().ref(`/users/${userId}/messages`).on('value', (messagesSnapshot) => {
        let users = [];
        if (messagesSnapshot.val()) {
            users = Object.keys(messagesSnapshot.val());
        }
        
        users.forEach((user) => {
            firebase.database().ref(`/users`).on('value', (snapshot) => {

                const lastMessage = Object.values(messagesSnapshot.val()[user]).reverse()[0].message

                snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.val().username === user) {
                        userMessagesList.push({
                            ...childSnapshot.val(),
                            lastMessage
                        });
                    }
                })
            })
        })
       
    })

    return userMessagesList;
}