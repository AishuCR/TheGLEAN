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
  var email = "";
  var name = "";

  $("#search-data").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();

    
    searchTerm = $("#search-input").val().trim();
    name = $("#name-input").val().trim();
    email = $("#email-input").val().trim();
    slack = $("#slack-input").val().trim();
    // not sure what the id is yet but just a placeholder for now.

    if (input != "") { // input validation.
      $("#alert").text("Not valid info!"); //not working need to work on.
      
      }
    

    database.ref().push({
        
      searchTerm: searchTerm,
      slack: slack,
      name: name,
      email: email,
       // can create additional fields as needed.
        
    });

    console.log(searchTerm);
    console.log(slack);
    console.log(name);
    console.log(email);
    $("tr").last().empty();
    
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
    $("#trending").prepend(newRow); // again not sure what the id will be but a placeholder.
  
 
});


  
  


}); // end of document.ready

