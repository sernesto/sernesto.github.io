"use strict";
var subscriptionList=[];
var radioButtons = document.getElementsByName('subscribe');
//form validation
function validateContactForm () {
  var inputElements = document.getElementsByClassName("field");
  var errorMessageDiv = document.getElementById("errorMessage");
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

    //checks if email format is valid
    var emailRegex = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
    if(!validateFieldByRegex('userEmail', emailRegex)){
      areAllFieldsValid = false;
    }

    //checks if first name and last name are valid
    var nameRegx = /^[a-z ,.'-]+$/i; 
    if(!validateFieldByRegex('userFName', nameRegx)){
      areAllFieldsValid = false;
    }

    if(!validateFieldByRegex('userLName', nameRegx)){
      areAllFieldsValid = false;
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
      throw 'Please fill the fields properly';
    }else{
      errorMessageDiv.style.display = "none";
      errorMessageDiv.innerHTML = "";
      alert("You have subscribed to the following Newsletters:\n\n" + subscriptionList.join('\n'));
      return true;
    }
  }catch(message){
    errorMessageDiv.style.display = "block";
    errorMessageDiv.innerHTML = message;
    return false;
  }
}

function validateFieldByRegex(elementId, regex){
  var element = document.getElementById(elementId);
  var value = element.value;
  if(regex.test(value)){
    element.style.background = "white";
    element.style.border = "1px solid rgb(238, 238, 238)";
    return true;
  }else{
    element.style.background = "rgb(255,233,233)";
    element.style.border = "1px solid red";
    return false;
  }
}

//function to register Newsletter Subscription
function submitSubscription(event){
  if (event === undefined) { // get caller element in IE8
      event = window.event;
   }
   var callerElement = event.target || event.srcElement;
   var subscriptionName = callerElement.value
    if(callerElement.checked){
      subscriptionList.push(subscriptionName);
    } else {
      for(var i = 0; i < subscriptionList.length; i++){
        if(subscriptionList[i] === subscriptionName){
          subscriptionList.splice(i,1);
        }
      }
    }
}

//diplays list of options for subcription
function showSubscriptionOptions(event) {
  if (radioButtons[0].checked){
    document.getElementsByClassName("subList")[0].style.display = "block";
  } else {
    document.getElementsByClassName("subList")[0].style.display = "none";
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
//event listener for the validation contactus form
  var submit = document.getElementById("submitButton");
  if(submit.addEventListener){
    submit.addEventListener("click",validateContactForm,false);
  } else if (submit.attachEvent){
    submit.attachEvent("onclick",validateContactForm);
  }
//event listener for checkboxdd subscriptions
   var subscription = document.getElementsByName("subscription");
   if (subscription[0].addEventListener) {
      for (var i = 0; i < subscription.length; i++) {
         subscription[i].addEventListener("change", submitSubscription, false);
      }
   } else if (subscription[0].attachEvent) {
      for (var i = 0; i < subscription.length; i++) {
         subscription[i].attachEvent("onchange", subscription);
      }
   }
//event listener for radio button subscription then shows list of newsletters
  var newsLetterSelector = document.getElementsByName('subscribe');
  if (newsLetterSelector[0].addEventListener){
    for (var i =0; i < newsLetterSelector.length; i++){
      newsLetterSelector[i].addEventListener("change", showSubscriptionOptions, false);
      }
  } else if (newsLetterSelector[0].attachEvent){
    for(vari=0; i< newsLetterSelector.length; i++){
      newsLetterSelector[i].attachEvent("onchange", showSubscriptionOptions);
    }
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