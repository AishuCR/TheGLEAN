$(document).ready(function() {

    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCEoxS3DAffvPwmi9CA6xRtlLbXos6VsdE",
    authDomain: "thewicketnailers.firebaseapp.com",
    databaseURL: "https://thewicketnailers.firebaseio.com",
    projectId: "thewicketnailers",
    storageBucket: "",
    messagingSenderId: "12069449119"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  database.ref().push({
     // first part is child of database. after : is the value.
  });


}); // end of document.ready

