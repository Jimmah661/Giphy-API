var gifArray = ["Tangled", "Brave", "Hercules"]

// function to generate the buttons --- Complete
var generateButtons = function () {
    // Clear button list to remove old buttons
    $('#buttonList').empty();
    // Loop for gifArray length
    for (i = 0; i < gifArray.length; i++) {
        // for each item in the array create a button
        var newButton = $('<button>' + gifArray[i] + '</button>');
        // Add the gifSearch class to allow pushing the value into the API query
        newButton.addClass('gifSearch');
        // Create Value that will be pushed into the API
        newButton.attr('data-value', gifArray[i].toLowerCase());
        // Append item to the buttonList Div
        $('#buttonList').append(newButton);
    }
}
//  First call to generate buttons on page load --- complete
generateButtons();

// Prevent submit button from refreshing page --- Complete
$("#newGifForm").submit(function (e) {
    e.preventDefault();
});

// Specify $(document) to make sure that it picks up any newly generated buttons
$(document).on('click', '.gifSearch', function () {
    // Assign the clicked buttons data-value to a new variable
    var searchTerm = 'q=' + $(this).attr("data-value");
    // Create the url and attach the searchTerm variable
    var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=oNteX533XbDTTVC9WHZbJ4oXFKeje40v&" + searchTerm + "&limit=10&offset=0&rating=PG-13&lang=en"
    console.log(giphyURL)
    // Start AJAX call on Giphy API
    $.ajax({ url: giphyURL, method: "GET" }).then(function (response) {

        // Push response data into variable to reverence easier
        var respData = response.data;
        //Console log the response
        console.log(respData);
    })
})

// Code to create new search buttons --- Complete
$('#gifSubmit').on('click', function () {
    // Check if there is a value in the text box
    if ($('#newGif').val()) {
        // put that value into a variable
        var nbDV = ($('#newGif').val());
        // Push that variable into the string array
        gifArray.push(nbDV);
        //regenerate the buttons
        generateButtons();
    }
})

