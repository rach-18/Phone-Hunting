
# PHONE HUNTING API

This project was to help us get used to fetching APIs and build a project where we can search for phones that we want and get their detailed information.

## Working Search Functionality
To achieve this functionality, I created a function where where I took the value of the searched phone from the input. I concatenated this input along with the url and fetched the API from which I received an array of phones and I displayed them to the user using forEach loop and created a card for each phone for which I also have a separate funtion.


## Working Show Details
For this section, I have inserted a "SHOW DETAILS" button on each card. I have created a modal which will appear when I click on the "SHOW DETAILS" button of any of the cards. This modal is initially hidden. Upon clicking the button, a funtion is called where the display is set to "block" and the details of each phone is printed on the screen. This modal also has a "CLOSE" button at the end. Upon clicking this button, the display of the modal is set back to "none", which basically closes the modal and the user can go back to browsing the page.

## Show All Button
When a particualr phone is searched an it has more than 12 phones to show, the "SHOW ALL" button is visible at the end of the phone list. Upon clicking this, the rest of the phones are also visbile. To achieve this, the display of the button is initially set to "none". Since the list of phones is stored in an array, the lenght is checked. If the length is more than 12, only 12 phones are shown on the screen and the display of the button is set to "block". After clicking on it, the rest of the phones are also visible and the display is set back to "none".

## Hosted Link of the Project: https://rach-18.github.io/Phone-Hunting/
