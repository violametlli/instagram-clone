import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC7mAv-hzcw7ZJX_ZZN8YXx3JZ346cM8Cg",
    authDomain: "instagram-clone-react-2df48.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-2df48-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-react-2df48",
    storageBucket: "instagram-clone-react-2df48.appspot.com",
    messagingSenderId: "276461355004",
    appId: "1:276461355004:web:c6c3bd228cba551af93c79"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

//export default db;