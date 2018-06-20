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

  var searchTerm = "";
  var slack = "";

  $("#submit-info").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    
    searchTerm = $("#search-name").val().trim();
    slack = $("#slack-id").val().trim();
    // not sure what the id is yet but just a placeholder for now.
    

    database.ref().push({
        
      searchTerm: searchTerm,
      slack: slack,
       // can create additional fields as needed.
        
    });

    console.log(searchTerm);
    console.log(slack);
    

  });

  database.ref().limitToLast(5).on("child_added", function(snapshot) { 
    // limit to last limits the display to 5 results.

    var newRow = $("<tr>");

    // Add database data to table data elements
    var newSearch = $("<td>").text(snapshot.val().searchTerm);
    var newSlack = $("<td>").text(snapshot.val().slack);
    
    

    // Add table data elements with database info to the table row
    newRow.prepend(newSearch, newSlack);

    // Add the filled table row to the table
    $("#search-data").prepend(newRow); // again not sure what the id will be but a placeholder.
  
 
});


  
  


}); // end of document.ready

