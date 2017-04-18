//variables global
var waitForUser;

document.getElementById('field1').value = navigator.appName;
document.getElementById('field2').value = navigator.appVersion;
document.getElementById('field3').value = navigator.platform;
document.getElementById('field4').value = navigator.userAgent;
document.getElementById('field5').value = screen.height;
document.getElementById('field6').value = screen.colorDepth;

//function to get geographicla infomation from user
function geoInformation() {
  waitForUser = setTimeout(fail, 10000);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getLocation, fail, {timeout: 10000});
  } else {
    fail();
  }
}

//gets elevation based on location and displays in input
function displayLocationElevation(location, elevator) {
	elevator.getElevationForLocations({
		'locations': [location]
	}, function(results, status) {
		if (status === 'OK') {
			if (results[0]) {
				document.getElementById("altitude").value = results[0].elevation;
			}
		}
	});
}

//gets users position and calls elevation function to show altitude
function getLocation(position) {
  clearTimeout(waitForUser);
  var currPosLat = position.coords.latitude;
  var currPosLng = position.coords.longitude;
  var currposAlt;
  var mapOptions = {
    center: new google.maps.LatLng(currPosLat, currPosLng), zoom: 12
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  document.getElementById("latitude").value = currPosLat;
  document.getElementById("longitude").value = currPosLng;
  var elevator = new google.maps.ElevationService;
  displayLocationElevation({lat:currPosLat, lng:currPosLng}, elevator);
}

function fail() {
  document.getElementById("map").innerHTML = "Unable to access your current location";
}

// run geoInformatin() function when page finishes loading
window.addEventListener("load", geoInformation, false);