import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCly7Qb3EFlCSk7T111W66Vd8CaoLorQfs',
  authDomain: 'chit-chat-app-e7722.firebaseapp.com',
  projectId: 'chit-chat-app-e7722',
  storageBucket: 'chit-chat-app-e7722.appspot.com',
  messagingSenderId: '214668072599',
  appId: '1:214668072599:web:1125dbb5c16f419fac7bd2',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
