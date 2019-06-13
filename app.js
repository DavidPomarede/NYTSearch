// insert JS code here

//ajax request to NY Times

var searchTerm = $("#searchTerm");
var numberResults = $("#numberResults");
var startYear = $("#startYear");
var endYear = $("#endYear");
var apiKey = 'oUlj6bawKiSgHWGI168bvqe95viZG8AW'
// example call: https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey
// example article: /articlesearch.json?q={query}&fq={filter}
var apiWebsite = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' 

// ="searchButton"
// ="clear"
// ="displayResults"

//create the onlick function
$("#searchButton").on("click", function() {
    var searchValue = $("#searchTerm").val();
    var apiLookupValue = searchValue; //this is what we'll need to change each call (right now set to look up "Kevin Durant")
    var queryURL = apiWebsite + apiLookupValue + '&api-key='+ apiKey;

    console.log(startYear.val());
    console.log(endYear.val());
    var numResults = 1;
    numResults = $("#numberResults").val();
    if (numResults > 10) {
        numResults = 10      
    }
    else if (numResults <= 0) {
        numResults = 1
    }
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.response.docs[1].headline.main);
        console.log(response.response.docs[1].abstract);
        console.log(response.response.docs[1].byline.original);
        console.log(response.response.docs[1].pub_date);

        var result = response.response;     
        var allHTMl = result.docs // list of 10 searches

        console.log(result);
        // create a loop to populate each of the articles
        for (var index = 0; index < numResults; index++) {
            console.log("link " + allHTMl[index].web_url);
            var numberDiv = $('<p>');
            numberDiv.text(index + 1);

            var headlineDiv = $('<p>');
            headlineDiv.text(allHTMl[index].headline.main)

            var dateDiv = $('<p>');
            dateDiv.text(allHTMl[index].pub_date);

            var linkDiv = $('<a>');
            var urlLink = allHTMl
            [index].web_url;
            linkDiv.attr("href", urlLink);
            linkDiv.html(urlLink);
            console.log("linkDiv " + linkDiv);
            var spacer = $('<br>');
            
            $("#displayResults").append(numberDiv);
            $("#displayResults").append(headlineDiv);
            $("#displayResults").append(dateDiv);
            $("#displayResults").append(linkDiv);
            $("#displayResults").append(spacer);
        }
    });



});

$("#clear").on("click", function() {
    $("#searchTerm").empty();
    $("#numberResults").empty();
    $("#startYear").empty();
    $("#endYear").empty();
    $("#displayResults").empty();
});
