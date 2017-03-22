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