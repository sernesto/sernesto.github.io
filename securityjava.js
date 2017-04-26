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
  getWeatherByLocation(position);
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

function fail(error) {
  getLocationbByIpInfoAPI();
}

/* If default browser's location feature
is not working, an AJAX request is made to
get the location based on the IP address of the current computer*/
function getLocationbByIpInfoAPI(){
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      var location = response.loc.split(",");
      var position = {
        coords: {
          latitude: parseFloat(location[0]),
          longitude: parseFloat(location[1])
        }
      }
      getLocation(position);
    }
  };
  xmlhttp.open("GET", "https://ipinfo.io/json", true);
  xmlhttp.send();
}

/* Makes an AJAX request to get weather information
about the current location*/
function getWeatherByLocation(position){
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      var temperature = (response.main.temp * (9/5) - 459.67).toFixed(2);
      var weatherData = "City: "+ response.name +". Temperature: " + temperature + "&#176; F  "  + response.weather[0].description;
      document.getElementById("weatherInfo").innerHTML = weatherData;
    }
  };
  xmlhttp.open("GET", "http://api.openweathermap.org/data/2.5/weather?lat="+ position.coords.latitude +"&lon=" + position.coords.longitude + "&APPID=b5862e8ac23a45851f3a14ad25f38c72", true);
  xmlhttp.send();
}

// run geoInformatin() function when page finishes loading
window.addEventListener("load", geoInformation, false);