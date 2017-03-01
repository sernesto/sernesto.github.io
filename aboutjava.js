
//function to diplay cost of application to customer when they select version they want to purchase
function appCost(){
  var premium = 0.99;
  var tax = 0.056
  var totalCost = 0;
//first statement will display a window if both app versions are checked
  if (document.getElementById("standard").checked && document.getElementById("premium").checked) {
    document.getElementById('priceM').value = "Please select only 1 option" ;
  }
  else if (document.getElementById("premium").checked) {
      totalCost = (premium + (premium * tax)).toFixed(2);
      document.getElementById('priceM').value = "$" + totalCost;
  }
  else if (document.getElementById("standard").checked) {
    document.getElementById('priceM').value ="Free!!!";
  }
  else {
    document.getElementById('priceM').value = "Please select 1 option";
  } 
}
var submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", appCost, false);
/*The first error I implemented in my code was a missing closing brace for the "else" on line 20.  I did 2 types of debuging
the first one was I checked the console to see if any errors came up.  There was a uncaught syntax error.  Then I tried commenting out
each section to make sure everything worked correctly on each block of the code. */