//Resubmission -  single-quotes (') over double-quotes (")
//Resubmission -  var style is now at the top of the file
//Resubmission -  file redone

// Initialize the map
var map;
// API Keys
var yelpKey = "E9Pc__XRjHAv3nM0_4lceQ";
var yelpToken = "NsK5cU2jXys1F2FfC0y54tANEvI5CXpe";
var consumerSecret = "PSXmVZnZltTsFX5N2jSm_WZbqb4";
var tokenSecret = "I-D9w0AsSDF4Itc89uwLlZol3aI";

//The style of the map.
var style = [ {
    elementType: "geometry",
    stylers: [ {
        color: "#242f3e"
    } ]
}, {
    elementType: "labels.text.stroke",
    stylers: [ {
        color: "#242f3e"
    } ]
}, {
    elementType: "labels.text.fill",
    stylers: [ {
        color: "746855"
    } ]
}, {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [ {
        color: "#d59563"
    } ]
}, {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [ {
        color: "#d59563"
    } ]
}, {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [ {
        color: "#263c3f"
    } ]
}, {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [ {
        color: "#6b9a76"
    } ]
}, {
    featureType: "road",
    elementType: "geometry",
    stylers: [ {
        color: "#38414e"
    } ]
}, {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [ {
        color: "#212a37"
    } ]
}, {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [ {
        color: "#9ca5b3"
    } ]
}, {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [ {
        color: "#746855"
    } ]
}, {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [ {
        color: "#1f2835"
    } ]
}, {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [ {
        color: "#f3d19c"
    } ]
}, {
    featureType: "transit",
    elementType: "geometry",
    stylers: [ {
        color: "#2f3948"
    } ]
}, {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [ {
        color: "#d59563"
    } ]
}, {
    featureType: "water",
    elementType: "geometry",
    stylers: [ {
        color: "#17263c"
    } ]
}, {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [ {
        color: "#515c6d"
    } ]
}, {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [ {
        color: "#17263c"
    } ]
} ];


// Initialize the default infoWindow
var infoWindow = new google.maps.InfoWindow({
    // default content
    content: '<div><h4 id="place-name"></h4><p id="place-address"></p><p id="yelp"></p></div>'
});

// now initialize map function is inside the ViewModel
var ViewModel = function() {
    "use strict";
    var self = this;
    self.placeList = ko.observableArray([]);
    self.filteredPlaceList = ko.observableArray([]);

    self.initMap = function() {
        var mapCanvas = document.getElementById("map");
        var cenLatLng = new google.maps.LatLng(38.6766764, -9.184167);
        var mapOptions = {
            center: cenLatLng,
            zoom: 13,
            styles: style,
            disableDefaultUI: false
        };
        map = new google.maps.Map(mapCanvas, mapOptions);
    };
    // Create the list of place locations from the model
    self.buildPlaceLocations = function() {
        placeLocations.forEach(function(brewItem) {
            self.placeList.push(new Place(brewItem));
        });
    };
    // Set up an event listener for clicks for each place
    self.setPlaceClickFunctions = function() {
        self.placeList().forEach(function(place) {
            google.maps.event.addListener(place.marker(), "click", function() {
                self.placeClick(place);
            });
        });
    };
    // Function to handle clicking on a place (either in list or marker)
    self.placeClick = function(place) {
        // Set the content of the infoWindow
        var infoContent = '<div><h4 id="place-name">' + place.name() + "</h4>" + '<h5 id="place-address">' + place.address() + "</h5>" + '<h6 id="place-type">' + place.type() + "</h6>" + '<p id="text">Rating on <a id="yelp-url">yelp</a>: ' + '<img id="yelp"></p></div><br>' + '<img class="images" src= http://maps.googleapis.com/maps/api/streetview?size=200x100&location=' + place.lat() + "," + place.lng() + ">";
        infoWindow.setContent(infoContent);
        self.getYelpData(place);
        // Make the clicked on place the center of the map
        map.panTo(new google.maps.LatLng(place.lat(), place.lng()));
        // Open the infoWindow at the marker location
        infoWindow.open(map, place.marker());
        // Current place marker bounces once when clicked
        self.toggleBounce(place);
    };
    // Animate marker on click
    // ref: https://developers.google.com/maps/documentation/javascript/examples/marker-animations
    self.toggleBounce = function(place) {
        place.marker().setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            place.marker().setAnimation(null);
        }, 1500);
    };
    // filter
    self.filterPlaces = function() {
        // Set the filtered place list to an empty array
        self.filteredPlaceList([]);
        // Get the search string and the length of the original place list
        var searchString = $("#search-str").val().toLowerCase();
        var len = self.placeList().length;
        // Loop through each place in the place list
        for (var i = 0; i < len; i++) {
            // Get the current place name & type
            var placeName = self.placeList()[i].name().toLowerCase();
            // If the name or type match the search string,
            // add the place to the filtered place list
            if (placeName.indexOf(searchString) > -1) {
                self.filteredPlaceList.push(self.placeList()[i]);
                // Set the map property of the marker to the map
                self.placeList()[i].marker().setMap(map);
            } else {
                // Set the map property of the marker to null so it won't be visible
                self.placeList()[i].marker().setMap(null);
            }
        }
    };
    self.getYelpData = function(place) {
        // Uses the oauth-signature package installed with bower per https://github.com/bettiolo/oauth-signature-js
        // Use the GET method for the request
        var httpMethod = "GET";
        // Yelp API request url
        var yelpURL = "https://api.yelp.com/v2/search/";
        // nonce generator
        // function credit of: https://blog.nraboy.com/2015/03/create-a-random-nonce-string-using-javascript/
        var nonce = function(length) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
        // Set required parameters for authentication & search
        var parameters = {
            oauth_consumer_key: yelpKey,
            oauth_token: yelpToken,
            oauth_nonce: nonce(20),
            oauth_timestamp: Math.floor(Date.now() / 1e3),
            oauth_signature_method: "HMAC-SHA1",
            oauth_version: "1.0",
            callback: "cb",
            term: place.name(),
            location: "Portugal",
            limit: 1
        };
        // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
        var signature = oauthSignature.generate(httpMethod, yelpURL, parameters, consumerSecret, tokenSecret);
        // Add signature to list of parameters
        parameters.oauth_signature = signature;
        // Set up the ajax settings
        var ajaxSettings = {
            url: yelpURL,
            data: parameters,
            cache: true,
            dataType: "jsonp",
            success: function(response) {
                // Update the infoWindow to display the yelp rating image
                $("#yelp").attr("src", response.businesses[0].rating_img_url);
                $("#yelp-url").attr("href", response.businesses[0].url);
            },
            error: function() {
                $("#text").html("Data could not be retrieved from yelp.");  //display error mensage inside the infoWindow
            }
        };
        // Send off the ajaz request to Yelp
        $.ajax(ajaxSettings);
    };
    // Add the listener for loading the page
    google.maps.event.addDomListener(window, "load", function() {
        self.initMap();
        self.buildPlaceLocations();
        self.setPlaceClickFunctions();
        self.filteredPlaceList(self.placeList());
    });
};

var Place = function(data) {
    "use strict";
    // Set all the properties as knockout observables
    var marker;
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.address = ko.observable(data.address);
    this.type = ko.observable(data.type);
    // Google Maps Marker for this location
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.lat(), this.lng()),
        map: map,
        title: this.name()
    });
    // Set the marker as a knockout observable
    this.marker = ko.observable(marker);
};

// Load Knockout.js or fail gracefully with error message and page reload link
if (typeof ko === 'object') {
    var vm = new ViewModel();
    ko.applyBindings(vm);
} else {
    alert('Error: Knockout.js did not load.Please reload to try again.');

}

// If google maps is not working, throw and error message.
function mapError() {
    window.alert("Google Maps request error");
}