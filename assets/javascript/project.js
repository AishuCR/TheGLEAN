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
  var alert = "Not valid input!";

  $("#search-data").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();
    

    searchTerm = $("#search-input").val().trim();
    name = $("#name-input").val().trim();
    email = $("#email-input").val().trim();
    slack = $("#slack-input").val().trim();

    validate();


  });

  database.ref().limitToLast(5).on("child_added", function(snapshot) { 
    // limit to last limits the display to 5 results.
    event.preventDefault();
    var newRow = $("<tr>");

    // Add database data to table data elements
    var newSearch = $("<td>").text(snapshot.val().searchTerm);
    var newSlack = $("<td>").text(snapshot.val().slack);
    
    

    // Add table data elements with database info to the table row
    newRow.prepend(newSearch, newSlack);

    // Add the filled table row to the table
    $("#trending").prepend(newRow); // again not sure what the id will be but a placeholder.
    
    
  
 
});


function validate() {
  

  // Get the value of the input field with id="numb"
  searchTerm = $("#search-input").val().trim();
  name = $("#name-input").val().trim();
  email = $("#email-input").val().trim();
  slack = $("#slack-input").val().trim();

  if (((typeof searchTerm != "undefined") &&
     (typeof searchTerm.valueOf() == "string")) &&
    (searchTerm.length > 0) && (typeof name != "undefined") &&
    (typeof name.valueOf() == "string") &&
   (name.length > 0) && (typeof email != "undefined") &&
   (typeof email.valueOf() == "string") &&
  (email.length > 0) && (typeof slack != "undefined") &&
  (typeof slack.valueOf() == "string") &&
 (slack.length > 0)) {
   if (validateEmail(email) === true) {
    pushData();
   }
     else {
      text = "Not valid email.";
      $("#alert").append(text);
      two = setTimeout(function twoSeconds(){
        $("#alert").empty();
      }, 2000);
     }

  } else {
    text = "Fields not completed.";
    $("#alert").append(text);
    two = setTimeout(function twoSeconds(){
      $("#alert").empty();
    }, 2000);
      
  }


}

function pushData() {

  searchTerm = $("#search-input").val().trim();
  name = $("#name-input").val().trim();
  email = $("#email-input").val().trim();
  slack = $("#slack-input").val().trim();


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

}



function validateEmail(email) {
  var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
  console.log(email);
  return re.test(email);

};

//Need to Limit to 10 and fix frame
//Then pull simplified list to results div 

        

        // <!-- <script type="text/javascript">
        //     // $("#myFrame").attr('src', 'http://www.google.com/');
        //     $("#myFrame").attr('src', "https://api.gdeltproject.org/api/v2/doc/doc?query=%22Trump%20President%22 sourcelang:english sourcecountry:US&mode=Artlist&TIMELINESMOOTH&TIMESPAN=1d=5&Sort=DateDesc&Maxrecords=10&FORMAT=html");
        // </script> 


        // <!-- JSON FORMAT -->
        // <!-- https://api.gdeltproject.org/api/v2/doc/doc?query=%22Trump%20President%22%20sourcelang:english%20sourcecountry:US&mode=ArtList&TimelineVolInfo&TIMELINESMOOTH&TIMESPAN=1440=5&FORMAT=JSON -->
    
        


// window.twttr = (function(d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0],
//       t = window.twttr || {};
//     if (d.getElementById(id)) return t;
//     js = d.createElement(s);
//     js.id = id;
//     js.src = "https://platform.twitter.com/widgets.js";
//     fjs.parentNode.insertBefore(js, fjs);
  
//     t._e = [];
//     t.ready = function(f) {
//       t._e.push(f);
//     };
// var twitterdm = "email-input"
//     <a href="https://twitter.com/messages/compose?recipient_id=3805104374&text=Hello%20world"
//   class="twitter-dm-button" data-screen-name="@davekubo">
// Message @davekubo</a>
 

  //   return t;
  // }(document, "script", "twitter-wjs"));



});// end of document.ready
