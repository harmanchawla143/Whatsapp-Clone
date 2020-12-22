// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyA_ZCUX8r1-jr8iYDU7oX6ZnGORCgWCD5s",
    authDomain: "whatsapp-d22f7.firebaseapp.com",
    projectId: "whatsapp-d22f7",
    storageBucket: "whatsapp-d22f7.appspot.com",
    messagingSenderId: "274234398085",
    appId: "1:274234398085:web:80bf83afded810d19ba0ec",
    measurementId: "G-PHWCKQKKQX"
  };
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;
