$(document).ready(function () {

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
  //declaring variables for the sign up details
  var searchTerm = "";
  var slack = "";
  var email = "";
  var name = "";
  var alert = "Not valid input!";
  //calling the submit button using the id
  $("#search-data").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();
    //assigning the input values to the variables
    searchTerm = $("#search-input").val().trim();
    name = $("#name-input").val().trim();
    email = $("#email-input").val().trim();
    slack = $("#slack-input").val().trim();
    //name validate
    //$("#name-input").blur(function(){
    //if($("#name-input").val().match('^[a-zA-Z]{3,16}$')){
    //$("#alert").text("valid info :D");
    //}
    //else{
    //$("#alert").text("Not valid name!");
    //}
    //})
    //validating email
    function validateEmail(email) {
      var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
      console.log(email);
      return re.test(email);
    };
    validateEmail(email);
    console.log(email);
    if (validateEmail(email) != true) {
      $("#alert").text("Not valid email!"); //this works (mostly) if you enter a valid email and submit it works, if you then change to an invalid, it works, 
      //now if you fix the email it still reports invalid. if you start with an invalid and fix it still shows invalid so the div usn't refreshing.
    }
    else {
      $("#alert").text("Valid info :D"); //ok this fixes the above issue
    }
//redit api
function displayImage() {
  $("#tweets").empty();
  var limit = 5;
  searchTerm = $("#search-input").val().trim();
  console.log(searchTerm + "log");
  var twitterURL = "http://search.twitter.com/search.json?q=searchterm&rpp=10&lang=en&callback=?";
  console.log(twitterURL);
  $.ajax({
    url: imageURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    $("#tweets").append(response);
  });
}

    //gdelt api linking
    function displayInfo() {
      $("#results").empty();
      var limit = 10;
      searchTerm = $("#search-input").val().trim();
      console.log(searchTerm + "log");
      var queryURL = "https://api.gdeltproject.org/api/v2/doc/doc?query=" + searchTerm + " sourcelang:english sourcecountry:US&mode=Artlist&TIMELINESMOOTH&TIMESPAN=1d=5&Sort=DateDesc&Maxrecords=" + limit + "&FORMAT=html";
      console.log(queryURL);
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        $("#results").append(response);
      });
    }
    
    displayInfo();
    database.ref().push({
      searchTerm: searchTerm,
      slack: slack,
      name: name,
      email: email,
      // can create additional fields as needed.
    });
    // console.log(searchTerm);
    // console.log(slack);
    // console.log(name);
    // console.log(email);
    $("tr").last().empty();
  });
  //twitter api link
  
  database.ref().limitToLast(5).on("child_added", function (snapshot) {
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

