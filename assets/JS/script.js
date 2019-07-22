
$('button').on('click', function () {
    var giphyURL = "https://api.giphy.com/v1/gifs/random?api_key=oNteX533XbDTTVC9WHZbJ4oXFKeje40v";
    $.ajax({
        url: giphyURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var newImg = $("<img>");
        var imgSrc = response.data.image_url
        newImg.attr("src", imgSrc);
        $('.gifDiv').append(newImg);
    })
})