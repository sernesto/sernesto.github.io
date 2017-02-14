
//function to diplay cost of application to customer when they select version they want to purchase
function appCost(){
  var premium = 0.99;
  var tax = 0.056
  var totalCost = 0;
//first statement will display a window if both app versions are checked
  if (document.getElementById("standard").checked && document.getElementById("premium").checked) {
    alert("Please select only 1 option");
  }
  else if (document.getElementById("premium").checked) {
      totalCost = (premium + (premium * tax)).toFixed(2);
      alert("Premium App is $" + premium + " with tax this comes to $" + totalCost);
  }
  else if (document.getElementById("standard").checked) {
    alert("Free!!!");
  }
  else {
    alert("Please select only 1 option");
  }
}
document.getElementById("submit").addEventListener("click", appCost, false);