import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDi_8sI88gv-0g11ZINAQaa20a13UmksMY",
  authDomain: "natural20-cfddf.firebaseapp.com",
  databaseURL: "https://natural20-cfddf.firebaseio.com",
  projectId: "natural20-cfddf",
  storageBucket: "natural20-cfddf.appspot.com",
  messagingSenderId: "898317003391"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};