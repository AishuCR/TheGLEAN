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

  var searchTerm = "";
 

  $("#search-data").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();
    

    searchTerm = $("#search-input").val().trim();
    

    validate();


  });

  database.ref().limitToLast(5).on("child_added", function (snapshot) {
    // limit to last limits the display to 5 results.
    event.preventDefault();
    var newRow = $("<tr>");

    // Add database data to table data elements
    var newSearch = $("<td>").text(snapshot.val().searchTerm);
    
    
    

    // Add table data elements with database info to the table row
    newRow.prepend(newSearch);

    // Add the filled table row to the table
    $("#trending").prepend(newRow); // again not sure what the id will be but a placeholder.
    
    
  
 
});


function validate() {
  

  // Get the value of the input field with id="numb"
  searchTerm = $("#search-input").val().trim();
  

  if (((typeof searchTerm != "undefined") &&
     (typeof searchTerm.valueOf() == "string")) &&
    (searchTerm.length > 0)) {
   
    pushData();
    displayInfo();
    displaytweets();
   }
     
   else {
    text = "Search not valid.";
    $("#alert").append(text);
    two = setTimeout(function twoSeconds(){
      $("#alert").empty();
    }, 2000);
      
  }


}

function pushData() {

  searchTerm = $("#search-input").val().trim();
  


  database.ref().push({
        
    searchTerm: searchTerm,
    
     // can create additional fields as needed.

      
  });

  console.log(searchTerm);
  

}




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
      //console.log(response);
      $("#results").append(response);

    });
  }

  function displaytweets() {
    $("#tweets").empty();

    
    searchTerm = $("#search-input").val().trim();
    console.log(searchTerm + "log");
    var key = "&api-key=11a88ca9be994975831753129dc04cf5";

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "=&sort=newest" + key;
    

    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
       console.log(response);
       var results = response.response.docs;

       for(var i = 0; i < results.length; i++){
        var articles = results[i];

//Appends the the Articles in a list.
        $("#tweets").append('<li class="article">'+
                '<a href="'+articles.web_url+'">'+articles.headline.main+'</a>'+
                '<p>' + articles.snippet + '</p>'+
            '</li>');

      };


    //    for (var i = 0; i < results.length; i++) {
        
    //     var topicImage = $("<img>");
    //     topicImage.attr("src", results[i].multimedia[1].url);

        
          
    //       $("#tweets").prepend(topicImage);
    //    }


      
    })






    // var queryURL = "https://api.twitter.com/1.1/search/tweets.json?q=" + searchTerm;

    // console.log(queryURL);
    // $.ajax({
    //   url: queryURL,
      
       
      
    //   method: "GET"
    // }).then(function (response) {
    //   console.log(response);
      

    // });

}






});// end of document.ready

