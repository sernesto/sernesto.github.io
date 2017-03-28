"use strict";

//form validation
function validateContactForm () {
  var inputElements = document.getElementsByClassName("field");
  var errorMessageDiv = document.getElementById("errorMessage");
  var radioButtons = document.getElementsByName('subscribe');
  var areAllFieldsValid = true;
  var isRadioButtonSelected = false;
  try{
    //checks if fields are filled
    for (var i = 0; i < inputElements.length; i++) {
      var element = inputElements[i];
      if (element.value === "") {
        element.style.background = "rgb(255,233,233)";
        element.style.border = "1px solid red";
        areAllFieldsValid = false;
      } else {
        element.style.background = "white";
        element.style.border = "1px solid rgb(238, 238, 238)";
      }
    }
    //checks if a radio button is checked
    if(radioButtons[0].checked || radioButtons[1].checked){
      isRadioButtonSelected = true;
      radioButtons[0].style.outline = "1px solid rgb(255,233,233)";
      radioButtons[1].style.outline = "1px solid rgb(255,233,233)";
    }else{
      radioButtons[0].style.outline = "1px solid red";
      radioButtons[1].style.outline = "1px solid red";
    }
    //if form is not valid will display an error message
    if (areAllFieldsValid === false || isRadioButtonSelected === false) {
      throw "Please fill out all the fields";
    }else{
      errorMessageDiv.style.display = "none";
      errorMessageDiv.innerHTML = "";
      return true;
    }
  }catch(message){
    errorMessageDiv.style.display = "block";
    errorMessageDiv.innerHTML = message;
    return false;
  }
}
/*This function grabs dates entered by user and shows the time lapsed in Days, Months, and Years*/
function elapsedTime(){
  var startDateString = document.getElementById("startDate").value;
  var endDateString = document.getElementById("endDate").value;
  
  if(startDateString !== "" && endDateString !== ""){
      var startDate = new Date(startDateString);
      var endDate = new Date(endDateString);
      var difference = endDate.getTime() - startDate.getTime();
      var days = difference/(1000*60*60*24);
      var months = Math.floor(days/31);//per the book instructions every 31 days equals a month
      var year = Math.floor(months/12); //per the book instructions every 12 months equals a year
    if(startDate < endDate) {
      document.getElementById("daysElapsed").value = days;
      document.getElementById("monthsElapsed").value = months;
      document.getElementById("yearsElapsed").value = year;
      document.getElementById("elapsedErrorMessage").innerHTML = "";

    } else {//if start date is greater than end date will throw error
      document.getElementById("elapsedErrorMessage").innerHTML = "Please Ensure your Start Date is less then your End Date";
    } 
    
  }else{ //if one of the dates is missing error will display
      if(startDateString === "" && endDateString === ""){
        document.getElementById("elapsedErrorMessage").innerHTML = "Please fill in both dates";
        document.getElementById("startDate").style.background="rgb(255,233,233)";
        document.getElementById("endDate").style.background="rgb(255,233,233)";
      } else if(endDateString === "") {
        document.getElementById("elapsedErrorMessage").innerHTML = "Please fill in both dates";
        document.getElementById("endDate").style.background="rgb(255,233,233)";
      }else{
        document.getElementById("elapsedErrorMessage").innerHTML = "Please fill in both dates";
        document.getElementById("startDate").style.background="rgb(255,233,233)";
      }
  }
}

function createEventListeners() {
//event listenr for the contactus form
  var submit = document.getElementById("submitButton");
  if(submit.addEventListener){
    submit.addEventListener("click",validateContactForm,false);
  } else if (submit.attachEvent){
    submit.attachEvent("onclick",validateContactForm);
  }
//event listener for the elapsed time form
  var timeSubmit = document.getElementById("elapsedButton");
  if(timeSubmit.addEventListener){
    timeSubmit.addEventListener("click",elapsedTime, false);
  }  else if (timeSubmit.attachEvent) {
    timeSubmit.attachEvent("onclick", elapsedTime);
  }
}

if (window.addEventListener) {
  window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", createEventListeners);
}