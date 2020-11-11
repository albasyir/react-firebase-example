import firebase from 'firebase';
import 'firebase/firestore';

const settings = { timestampsInSnapshots : true}

let config = {
    apiKey: "AIzaSyCrvFbFO3Ll-0nWWY-a-ytQOxuJpZgBixQ",
    authDomain: "realtime-database-bbbf9.firebaseapp.com",
    databaseURL: "https://realtime-database-bbbf9.firebaseio.com",
    projectId: "realtime-database-bbbf9",
    storageBucket: "realtime-database-bbbf9.appspot.com",
    messagingSenderId: "1006241571577",
    appId: "1:1006241571577:web:b98e8447770df2ccd0b828"
}

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase.firestore();