//chapter3 case
//function shows greeting on the Home Page depending on users time
function showGreeting() {
  var d = new Date();
  var h = d.getHours();
  var title  = "";
  //reads time, depending on time appropiate greeting will appear
  if (h < 12) {
    title = document.getElementById('greet');
    title.innerHTML = "Good Morning, Welcome!";
  }
  else {
   title = document.getElementById('greet');
    title.innerHTML = "Good Afternoon, Welcome!"; 
  }
}

window.addEventListener("load", showGreeting, false);