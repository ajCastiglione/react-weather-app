import firebase from 'firebase';
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyBGR9JgwU4Umn0QEUV8r9n1V4YJZ11Ux_k",
    authDomain: "react-weather-application.firebaseapp.com",
    databaseURL: "https://react-weather-application.firebaseio.com",
    projectId: "react-weather-application",
    storageBucket: "",
    messagingSenderId: "763500788117"
  };
  firebase.initializeApp(config);
  export default firebase;