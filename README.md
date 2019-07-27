# Giphy-API

### How it works

The page pulls information from the Giphy API.
When pressing one of the buttons it performs a search of the Giphy database for GIFs tagged with that specific search term.

It then pulls the 10 most recent results and outputs those into separate <img> tags along with the link information for the still image and the animated GIF which are stored in the element attributes.

Clicking on the image will then cause it to change the src element from the still image to the animated GIF.

There are also two extra buttons attached to each image, a heart and a copy button.

The heart button will take the details of the selected gif and load it into an array that is contained in the local storage.
This will be available at any time by clicking on the stored favourites button.

The copy button will copy the animated URL of the selected gif to the clipboard so that you can share it with others if you would like to. 