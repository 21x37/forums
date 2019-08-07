import { firebase } from '../firebase/firebase';
import _ from 'lodash';

export const startSendMessage = (message) => {
    return (dispatch) => {
        if (message.recipient) {
            message.recipient.messages = null;
            message.recipient.notifications = null;
        }
        // TODO: Remove the specific message and reset the message.

        firebase.database().ref(`/users/${message.authorId}/messages/${message.recipient.username}`).push(message);
        firebase.database().ref(`/users/${message.recipient.databaseId}/messages/${message.authorUsername}`).push(message);

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
        console.log('fetch messsage')
        firebase.database().ref(`/users/${message.authorId}/messages/${message.recipient.username}`)
            .on('value', (snapshot) => {    
                let messages = [];

                snapshot.forEach((childSnapshot) => {
                    messages.push({ ...childSnapshot.val(), databaseId: childSnapshot.key })
                })

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
                const unRead = Object.values(messagesSnapshot.val()[user]).reverse()[0].unRead
                const messageId = Object.keys(messagesSnapshot.val()[user]).reverse()[0]
                const recipientUsername = Object.values(messagesSnapshot.val()[user]).reverse()[0].recipient.username
                const date = Object.values(messagesSnapshot.val()[user]).reverse()[0].date

                console.log(Object.values(messagesSnapshot.val()[user]).reverse()[0].date);

                snapshot.forEach((childSnapshot) => {
                    if (childSnapshot.val().username === user) {
                        userMessagesList.push({

                            ...childSnapshot.val(),
                            lastMessage,
                            databaseId: childSnapshot.key,
                            messageId,
                            unRead,
                            recipientUsername,
                            date

                        });
                    };
                });
            });
        });
    });
    return userMessagesList;
}

export const startReadMessage = ({ message }) => {
    return () => {
        firebase.database().ref(`/users/${message.auth.databaseId}/messages/${message.username}/${message.messageId}`).update({ unRead: false })
    }
}