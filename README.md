# Neighborhood Map Project

The goal of this project is to develop a single-page application featuring a map of a neighborhood (In my case, Lisbon & Margem Sul)

## What I'll see?
* This project is built using Google Maps API, Google Street View Image API, Yelp API and knockoutJS framework. Features Include:
* A full-screen map to page using the Google Maps API.
* A Street View Image of the location
* Map markers identifying a number of favorite locations in Lisbon & Margem Sul
* Images of the locations, from Google Images
* Reviews from Yelp
* List view of the identified locations.

## How to run?

Desktop:
* Open [inesarmadabras.github.io/nanodegree-neighborhood-map2/dist](https://inesarmadabras.github.io/nanodegree-neighborhood-map2/dist)
or
* Download the repo. Just launch index.html.
* Use the filter box to filter list items: write a name and press SEARCH.
* Click a list item to move to the corresponding map marker and view more info.

Mobile:
* Open [inesarmadabras.github.io/nanodegree-neighborhood-map2/dist](https://inesarmadabras.github.io/nanodegree-neighborhood-map2/dist/)
* Click on the button at the right top corner to see the menu (search and list of localizations)
* Click a list item to move to the corresponding map marker and view more info
* Use the filter box to filter list items: write a name and press SEARCH.



# Resubmission (2)

Note:
After going to the Udacity Forum, StackOverflow and other web sources, I realized that I had many issues related with load & execution order. After arriving at a point almost with no return, I had to redo part of my project, for my sanity! So, I had to do big changes in a short time:

* Due to(too) many problems, app.js was redone
* All the locations are in the file `local.min.js`
* I stop using Material Framework. Now I use only Bootstrap because I'm more comfortable with it.
* Due to problems with the Flickr API now use the Yelp API, because I already knew how to implement it.
* Better mobile optimization
* To call an external font-family, now I use a script, at the bottom of index.php (website performance optimization)

### index.html - Sugestions
(1) Added theme-color
        `<meta name="theme-color" content="#0066FF">`

(2) Added favicon
        `<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">`
        `<link rel="icon" href="/favicon.ico" type="image/x-icon">`

(3) App is usable on small screen devices. Now you can see a menu button at the corner (only at mobile view).
    *Update: New button,mobile menu and mobile search bar.*

(4) More HTML semantic tags. Indentation.

(5) All scripts are now at the bottom of the HTML body for Page Speed Optimization

(7) Moved GoogleMaps API request from app.js to index.html.

### index.html - Required
(6) async atribute removed.

### app.js - redone!
* single-quotes (') over double-quotes (")

* added new locations.Locations are now at the file `local.js`

* `var style` is now at the top of the file

* `initMap` function is now inside of the `ViewModel()`

* API Keys are now at the top of the file.

* Now I've only one instance of the InfoWindow class, that is called when needed with `infowindow.setContent`)

* Loop's helper variable is declared in the for's ( `for (var i = 0; i < len; i++)` )

### app.js - Required
* All locations show  images from Google StreetView API
* All locations show a Yelp review.
* Filter Search now filters the markers too (when you press search)

## UPDATE 09/11
### app.js - Sugestions
`l.4` added `'use strict';`  tag in function definitions to enable the strict mode. This mode helps to write more "secure" codes by preventing things such as marking down a function with a bad syntax to execute or loading unused variables.

`l.8`contants are in capital letters like CONSTANT_VALUE.

`l.132` removed brackets [] from ko.observableArray(). They are not required, because the respective content may not necessarily inherit or have observable attributes/properties.
