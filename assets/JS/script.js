var topics = ["Tangled", "Brave", "Hercules"]

// function to generate the buttons --- Complete
var generateButtons = function () {
    // Clear button list to remove old buttons
    $('#buttonList').empty();
    // Loop for topics length
    for (i = 0; i < topics.length; i++) {
        // for each item in the array create a button
        var newButton = $('<button>' + topics[i] + '</button>');
        // Add the gifSearch class to allow pushing the value into the API query
        newButton.addClass('gifSearch');
        // Create Value that will be pushed into the API
        newButton.attr('data-value', topics[i].toLowerCase());
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

// command to run on the click of a gifSearch button
// Specify $(document) to make sure that it picks up any newly generated buttons
$(document).on('click', '.gifSearch', function () {
    // Assign the clicked buttons data-value to a new variable
    var searchTerm = 'q=' + $(this).attr("data-value");
    // Create the url and attach the searchTerm variable
    var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=oNteX533XbDTTVC9WHZbJ4oXFKeje40v&" + searchTerm + "&limit=10&offset=0&rating=PG-13&lang=en"
    console.log(giphyURL)
    // Start AJAX call on Giphy API
    $.ajax({ url: giphyURL, method: "GET" }).then(function (response) {
        // Push response data into variable to reference easier
        var respData = response.data;
        // Empty any previous gifs from the div
        $('.gifDiv').empty();
        // Run loop through response data to pull out and append Gif in new image element
        for (i = 0; i < respData.length; i++) {
            // Push gif Url into variable
            var sourceUrl = respData[i].images.fixed_height.url;
            // create new img tag
            var newImg = $('<img>');
            // Add source to new image
            newImg.attr('src', sourceUrl)
            // Append gif to page
            $('.gifDiv').append(newImg);
        }
    })
})

// Code to create new search buttons --- Complete
$('#gifSubmit').on('click', function () {
    // Check if there is a value in the text box
    if ($('#newGif').val()) {
        // put that value into a variable
        var nbDV = ($('#newGif').val());
        // Push that variable into the string array
        topics.push(nbDV);
        // Clear input field
        $('#newGif').val("");
        //regenerate the buttons
        generateButtons();
    }
})

