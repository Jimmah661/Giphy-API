var topics = ["Tangled", "Brave", "Hercules"]
var favs = [];

// function to generate the buttons --- Complete
var generateButtons = function () {
    // Clear button list to remove old buttons
    $('#buttonList').empty();
    // Loop for topics length
    for (i = 0; i < topics.length; i++) {
        // for each item in the array create a button
        var newButton = $('<button>' + topics[i] + '</button>');
        // Add the gifSearch class to allow pushing the value into the API query
        newButton.addClass('gifSearch mx-1 my-2 btn btn-secondary');
        // Create Value that will be pushed into the API
        newButton.attr('data-value', topics[i].toLowerCase());
        // Append item to the buttonList Div
        $('#buttonList').append(newButton);
    }
}

// Function to populate the Favorites
var writeFavs = function () {
    $('.gifDiv').empty();
    if (favs) {
        for (i = 0; i < favs.length; i++) {
            var newImgDiv = $('<div>');
            $(newImgDiv).addClass('col-sm-6 col-md-4 mb-2');
            var newImg = $('<img>');
            // Add source to new image
            newImg.attr('src', favs[i][0]);
            newImg.attr('data-static', 'true')
            newImg.attr('data-staticUrl', favs[i][0]);
            newImg.attr('data-animateUrl', favs[i][1]);
            newImg.attr('id', 'gif-' + i);
            newImg.addClass('col-sm-12');
            var removeButton = $('<button class="killMe col-sm-12">Remove</button>');
            removeButton.attr('data-arrayID', i);
            $(newImgDiv).append(newImg);
            $(newImgDiv).append(removeButton);
            $('.gifDiv').append(newImgDiv);
        };
    };
};

//  First call to generate buttons on page load --- complete
generateButtons();

if (localStorage.getItem('favsArray')) {
    favs = JSON.parse(localStorage.getItem('favsArray'));
};

// command to run on the click of a gifSearch button
// Specify $(document) to make sure that it picks up any newly generated buttons
$(document).on('click', '.gifSearch', function (event) {
    event.preventDefault();

    // Assign the clicked buttons data-value to a new variable
    var searchTerm = 'q=' + $(this).attr("data-value");

    // Create the url and attach the searchTerm variable
    var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=oNteX533XbDTTVC9WHZbJ4oXFKeje40v&" + searchTerm + "&limit=10&offset=0&rating=PG-13&lang=en"

    // Start AJAX call on Giphy API
    $.ajax({ url: giphyURL, method: "GET" }).then(function (response) {

        // Push response data into variable to reference easier
        var respData = response.data;

        // Empty any previous gifs from the div
        $('.gifDiv').empty();

        // Run loop through response data to pull out and append Gif in new image element
        for (i = 0; i < respData.length; i++) {

            // Push gif Url into variable
            var staticUrl = respData[i].images.fixed_height_still.url;
            var animateUrl = respData[i].images.fixed_height.url;

            // Create Div to hold outputted information
            var newImgDiv = $('<div>');
            $(newImgDiv).addClass('col-sm-6 col-md-4 mb-2');


            // create new img tag
            var newImg = $('<img>');
            // Add source to new image
            newImg.attr('src', staticUrl);
            newImg.attr('data-static', 'true')
            newImg.attr('data-staticUrl', staticUrl);
            newImg.attr('data-animateUrl', animateUrl);
            newImg.attr('id', 'gif-' + i);
            newImg.addClass('col-sm-12');

            // Create Fav icon
            var favIcon = $('<i class="fas fa-star col-sm-3 fav"></i>');
            favIcon.attr('data-ID', 'gif-' + i);

            //create copy icon
            var copyIcon = $('<i class="fas fa-copy col-sm-3 copyIcon"></i>');
            // Add clipboard copy info
            copyIcon.attr('data-clipboard-text', animateUrl);


            // Append Gif to div
            $(newImgDiv).append(newImg);
            // Append rating to div
            $(newImgDiv).append("<span class='col-sm-6'>Rating: " + respData[i].rating);
            // Append Fav icon
            $(newImgDiv).append(favIcon);
            $(newImgDiv).append(copyIcon);
            // Append div to page
            $('.gifDiv').append(newImgDiv);
        }
    })
})

// Code to create new search buttons --- Complete
$('#gifSubmit').on('click', function (event) {
    event.preventDefault();
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

// code to animate/freeze gifs
$(document).on('click', 'img', function () {
    if (($(this).attr('data-static')) === 'true') {
        $(this).attr('src', $(this).attr('data-animateUrl'));
        $(this).attr('data-static', 'false');
    } else {
        $(this).attr('src', $(this).attr('data-staticUrl'));
        $(this).attr('data-static', 'true');
    }
})

//On click functions for favouriting Gifs

$(document).on('click', '.fav', function () {
    var favID = $('#' + ($(this).attr('data-id')));
    favs.push([favID.attr("data-staticurl"), favID.attr("data-animateurl")]);
    localStorage.setItem('favsArray', JSON.stringify(favs));
});

$(document).on('click', '#favorites', function () {
    writeFavs();
});

$(document).on('click', '.killMe', function () {
    console.log(favs);
    var location = $(this).attr('data-arrayID');
    favs.splice(location, 1);
    console.log(favs);
    localStorage.setItem('favsArray', JSON.stringify(favs));
    writeFavs();
});

// Clipboard intergration
var clipboard = new ClipboardJS('.copyIcon');
