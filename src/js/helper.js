/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
replace the %data% placeholder text you see in them.
*/
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<div id="role">%data%</div>';

var HTMLemail = '<li><a href="%data%" target="_top"><i class="fa fa-envelope-square fa-3x"></i></a></li>';
var HTMLtwitter = '<li><a href="%data%" target="_blank"><i class="fa fa-twitter-square fa-3x"></i></a></li>';
var HTMLgithub = '<li><a href="%data%" target="_blank"><i class="fa fa-github-square fa-3x"></i></a></li>';
var HTMLlinkedin = '<li><a href="%data%" target="_blank"><i class="fa fa-linkedin-square fa-3x"></i></a></li>';
var HTMLlocation = '<li class="col-xs-12" style="color:white;font-weight:bold;"><i class="fa fa-map-marker fa-2x"></i><span>  %data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLwelcomeMsg = '<br><span class="welcome-message welcome-text">%data%</span><br>';

var HTMLskillsStart = '<div id="skillsDiv" class="col-xs-6"><a class="btn btn-primary"><h5 id="skills-h5">skills overview</h3></a></div><ul id="skills" class="col-xs-12"></ul>';
var HTMLskills = '<li class="col-xs-12 col-sm-4 text-center"><span class="white-text">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry"></div>';
var HTMLworkEmployerLink = '<a href="%data%" target="_blank">';
var HTMLworkEmployer = '%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text">%data%</div>';
var HTMLworkLocation = '<div class="location-text">%data%</div>';
var HTMLworkDescription = '<p><br>%data%</p>';

var HTMLprojectStart = '<div class="project-entry"></div>';
var HTMLprojectTitleLink = '<a href="%data%" target="_blank">';
var HTMLprojectTitle = '%data%</a>';
var HTMLprojectDates = '<div class="date-text">%data%</div>';
var HTMLprojectDescription = '<p><br>%data%</p>';
var HTMLprojectImage = '<img src="%data%" class="img-responsive">';

var HTMLschoolStart = '<div class="education-entry"></div>';
var HTMLschoolNameLink = '<a href="%data%" target="_blank">';
var HTMLschoolName = '%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text">%data%</div>';
var HTMLschoolLocation = '<div class="location-text">%data%</div>';
var HTMLschoolMajor = '<em><br>Major: %data%</em>';

var HTMLonlineClasses = '<h3 id="col-xs-12 text-center">Online Classes</h3>';
var HTMLonlineTitleLink = '<a href="%data%" target="_blank">';
var HTMLonlineTitle = '%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text">%data%</div>';

var googleMap = '<div id="map"></div>';
/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
clickLocations = [];

function logClicks(element) {
  clickLocations.push(
    {
      x: element.pageX,
      y: element.pageY,
      elementText: element.toElement.outerHTML.slice(0,100).trim(),
      parentId:element.toElement.parentNode.id,
      parentClass:element.toElement.parentNode.className
      
    }
  );
  console.log('x location: ' + element.pageX + '\ny location: ' + element.pageY + '\nelement: ' + element.toElement.outerHTML.slice(0,100).trim() + '\nparent id: ' + element.toElement.parentNode.id + '\nparent classes: ' + element.toElement.parentNode.className);
}

$(document).click(function(loc) {
  // your code goes here!
  console.log(loc);
  logClicks(loc);
});

var map;    // declares a global map variable

/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };
  
  /*will store the last clicked infoWindow when a marker/pin is clicked*/
  var previousInfoWindow = null;
  /* 
  For the map to be displayed, the googleMap var must be
  appended to #mapDiv in resumeBuilder.js. 
  */
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);

  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    locations.push(bio.contacts.location);
    locations.push(birthplace);

    // iterates through school locations and appends each location to
    // the locations array. Note that forEach is used for array iteration
    // as described in the Udacity FEND Style Guide: 
    // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    education.schools.forEach(function(school){
      if (locations.indexOf(school.location) < 0) locations.push(school.location);
    });

    // iterates through work locations and appends each location to
    // the locations array. Note that forEach is used for array iteration
    // as described in the Udacity FEND Style Guide: 
    // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    work.jobs.forEach(function(job){
      if (locations.indexOf(job.location) < 0) locations.push(job.location);
    });
    
    travelLocations.forEach(function(travel){
      if (locations.indexOf(travel) < 0) locations.push(travel);
    });

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });
      
    // Display information when a marker is clicked, 
    // and hide the info window from the marker previously clicked
    google.maps.event.addListener(marker, 'click', function() {
      if (previousInfoWindow) previousInfoWindow.close();
      infoWindow.open(map, marker);
      previousInfoWindow = infoWindow;
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }
  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
      locations.forEach(function(place, index){
      // the search request object
      var request = {
        query: place
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    });
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  // extra note: timeouts are included to deal with the 10 queries per second of the google map API
  pinPoster(locations.slice(0,locations.length/4));
  setTimeout(function() {pinPoster(locations.slice(locations.length/4,locations.length/4*2));}, 2000);
  setTimeout(function() {pinPoster(locations.slice(locations.length/4*2,locations.length/4*3));}, 4000);
  setTimeout(function() {pinPoster(locations.slice(locations.length/4*3));}, 6000);
}

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  //Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});