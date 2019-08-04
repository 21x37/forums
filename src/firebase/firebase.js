import * as firebase from 'firebase';
// import { firebaseConfig } from './firebaseConfig';

firebase.initializeApp({
    apiKey: "AIzaSyAUSVlbqhGGsGhcU4C5sAfl7pB2CBCqX78",
    authDomain: "author-de337.firebaseapp.com",
    databaseURL: "https://author-de337.firebaseio.com",
    projectId: "author-de337",
    storageBucket: "author-de337.appspot.com",
    messagingSenderId: "1026750865733",
    appId: "1:1026750865733:web:cd0e295745682576"
});

const database = firebase.database();
const storageService = firebase.storage();
const storageRef = storageService.ref();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, storageRef, storageService, database as default };
