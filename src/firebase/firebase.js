import * as firebase from 'firebase';
import 'firebase/firestore';
import * as admin from 'firebase-admin';
// import serviceAccount from './serviceAccountKey';
const serviceAccount = require('./serviceAccountKey.json');

const config = {
  apiKey: 'AIzaSyDi_8sI88gv-0g11ZINAQaa20a13UmksMY',
  authDomain: 'natural20-cfddf.firebaseapp.com',
  databaseURL: 'https://natural20-cfddf.firebaseio.com',
  projectId: 'natural20-cfddf',
  storageBucket: 'natural20-cfddf.appspot.com',
  messagingSenderId: '898317003391',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://natural20-cfddf.firebaseio.com',
  });
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db, admin };
