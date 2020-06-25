//Sets focus on name form elements once page loads
const focus = document.getElementById('name').focus();

//Selection of Job Filed and Other TextField Element
const jobRoleSelected = document.getElementById("title");
const otherTextField = document.getElementById("other-title");
otherTextField.style.display = "none";

//Manipulation of the "Other" text field for the Job Role to show text input once "Other" is selected
jobRoleSelected.addEventListener("change", (event)=> {
    for(let i=0; i<jobRoleSelected.length;i++){
        if(event.target.value == "other"){
            otherTextField.style.display = "";
        }
        else{
            otherTextField.style.display = "none";
        }
    }
});

//T-shirt Info Section - selection of html elements
const themeSelected = document.getElementById("design");
const colorsAvailable = document.getElementById("color").getElementsByTagName("option");

//Sets the default color value to "Please select a T-shirt theme"
hideAllColours();

//Updates the color list based on the Design Theme Selected
themeSelected.addEventListener("change", (event)=> {
    for(let i=0; i<themeSelected.length;i++){
        
        if(event.target.value == "js puns"){
            colorsAvailable.item(1).selected = true;
            hideJSColor();
        }
        else if (event.target.value == "heart js"){
            colorsAvailable.item(4).selected = true;
            hideJSPunsColor();
        }
        else{
            colorsAvailable.item(0).selected = true;
            hideAllColours();
        }
    }
});

//functions to dynamically change colors based on theme selection
//funtion to hide the JS colors
function hideJSColor(){
    for(let i=0; i<colorsAvailable.length;i++){
        if(colorsAvailable.item(i).value == "tomato" ||colorsAvailable.item(i).value == "steelblue" 
        ||colorsAvailable.item(i).value == "dimgrey"
           ||colorsAvailable.item(i).value == "default"){
            colorsAvailable.item(i).style.display = "none";
        }
        else{
            colorsAvailable.item(i).style.display = "";
        }
    }
}

//funtion to hide the JS Puns colors
function hideJSPunsColor(){
    for(let i=0; i<colorsAvailable.length;i++){
        if(colorsAvailable.item(i).value == "cornflowerblue" ||colorsAvailable.item(i).value == "darkslategrey" 
        ||colorsAvailable.item(i).value == "gold"
          ||colorsAvailable.item(i).value == "default"){
                colorsAvailable.item(i).style.display = "none";
        }
        else{
            colorsAvailable.item(i).style.display = "";
        }
    }
}

//funtion to hide all colors
function hideAllColours(){
    for(let i=0; i<colorsAvailable.length;i++){
        colorsAvailable.item(i).style.display = "none";
    }   
}

//Payment Info
//Selection of DOM payment elements
const paymentMethods = document.getElementById("payment");
const creditCardSection = document.getElementById("credit-card").getElementsByTagName("div");
const creditCardSection2 = document.getElementById("credit-card").getElementsByTagName("select");
const creditCardSection3 =document.getElementById("credit-card");


//for loop to fill out the creditSections array
var creditSections = [];
function hideCreditCardSection(){
    for(let i=0;i<creditCardSection.length;i++){
        creditCardSection.item(i).style.display = "none";
    }
    for(let j=0; j<creditCardSection2.length;j++){
        creditCardSection2.item(j).style.display = "none";
    }
    creditCardSection3.style.display = "none";  
}

//function to show Credit Card section
function showCreditCardSection(){
    for(let i=0;i<creditCardSection.length;i++){
        creditCardSection.item(i).style.display = "";
    }
    for(let j=0; j<creditCardSection2.length;j++){
        creditCardSection2.item(j).style.display = "";
    }
     creditCardSection3.style.display = "";
}

//selection of PayPal & Bitcoin HTML elements
const payPalSection = document.getElementById("paypal");
const bitcoinSection = document.getElementById("bitcoin");


//hides paypal and bitcoin options prior on page load
payPalSection.style.display = "none";
bitcoinSection.style.display = "none";

//logic to show the correct payment method depending on payment method selection
paymentMethods.addEventListener("change", (event)=> {
        showCreditCardSection();
        payPalSection.style.display = "none";
        bitcoinSection.style.display = "none";
    
        if(event.target.value == "paypal"){
            payPalSection.style.display = "";
            hideCreditCardSection();
            bitcoinSection.style.display = "none";
        }
        if(event.target.value == "bitcoin"){
            bitcoinSection.style.display = "";
            hideCreditCardSection();
            payPalSection.style.display = "none";
        }
});

//Validation of checkbox selection - "Register for Activities Section"

//Selection of checkbox elements
const listActivities = document.getElementsByClassName("activities").item(0).getElementsByTagName("input");


//populating the activities array with all activities html elements
const activitiesArray = [];
for(let i=0; i<listActivities.length;i++){
    activitiesArray.push(listActivities.item(i)); 
}
//code to determine if two activities are in conflicting time zones and to calculate the total price of the activities selected
var totalPrice =0;
const totalCostLabel = document.getElementById("total-cost");

for(let i=0; i<listActivities.length;i++){
    listActivities.item(i).addEventListener("change", (event)=>{
        var timeSelected = event.target.getAttribute("data-day-and-time");
        var priceActivity = event.target.getAttribute("data-cost");
        if(event.target.checked){
            for(let j=0; j<activitiesArray.length;j++){
                if(event.target != activitiesArray[j] && activitiesArray[j].getAttribute("data-day-and-time") == timeSelected){
                  activitiesArray[j].disabled = true;
                  }
            }
            totalPrice += parseInt(priceActivity);
        }
        else{
                        for(let j=0; j<activitiesArray.length;j++){
                if(event.target != activitiesArray[j] && activitiesArray[j].getAttribute("data-day-and-time") == timeSelected){
                  activitiesArray[j].disabled = false;
                  }
            }
                        totalPrice -= parseInt(priceActivity);
        }
        if(totalPrice>0){
            totalCostLabel.textContent = "Total Cost of Activities = " + totalPrice;
        }
        else{
            totalCostLabel.textContent = "";
        }
    });
}

//Functions to validate user input
//validate usarname field - it cannot be empty
function isValidUserName(username){
    return /^\S/.test(username);
}
//validate correct e-mail format
function isValidEmail(email){
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

//validate validate credit card - field should only accept a number between 13 and 16 digits
function isCreditCardValid(creditCard){
    return /^\d{13,16}$/.test(creditCard);
}
//validate validate zip-code - accept a 5-digit number
function isCreditZipCodeValid(zipcode){
    return /^\d{5}$/.test(zipcode);
}
//validate validate zip-code - accept a number that is exactly 3 digits long
function isCVVValid(cvv){
    return /^\d{3}$/.test(cvv);
}


//Creation of hidden error messages

//selection of user input for each of the fields

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("mail");
const cardInput = document.getElementById("cc-num");
const zipcodeInput = document.getElementById("zip");
const cvvInput = document.getElementById("cvv");
const activitiesInput = document.getElementsByTagName("legend").item(2);


//Creation of label elements for error messages
//creation of name error message
var nameError = document.createElement("LABEL");
nameError.id= "name_error";
nameError.style.color = "red";
nameError.innerHTML = "Name field cannot be blank";
nameInput.insertAdjacentElement("beforebegin", nameError);

//creation of email error message
var emailError = document.createElement("LABEL");
emailError.id= "email_error";
emailError.style.color = "red";
emailError.innerHTML = "Invalid email format";
emailInput.insertAdjacentElement("beforebegin", emailError);

//creation of activities error message
var activitiesError = document.createElement("LABEL");
activitiesError.id= "activities_error";
activitiesError.style.color = "red";
activitiesError.innerHTML = "Select at least 1 activity";
activitiesInput.insertAdjacentElement("beforebegin", activitiesError);

//creation of card number error message
var cardError = document.createElement("LABEL");
cardError.id= "card_error";
cardError.style.color = "red";
cardError.innerHTML = "Invalid card, please enter a 13-16 digit number";
cardInput.insertAdjacentElement("beforebegin", cardError);

//creation of zipcode error message
var zipcodeError = document.createElement("LABEL");
zipcodeError.id= "zipcode_error";
zipcodeError.style.color = "red";
zipcodeError.innerHTML = "Invalid zipcode, please enter a 5 digit number";
zipcodeInput.insertAdjacentElement("beforebegin", zipcodeError);

//creation of cvv error message
var cvvError = document.createElement("LABEL");
cvvError.id= "cvv_error";
cvvError.style.color = "red";
cvvError.innerHTML = "Invalid cvv, please enter a 3 digit number";
cvvInput.insertAdjacentElement("beforebegin", cvvError);

//Code to show or hide error messages upon validation of user input.

//code to show name error message if name is not valid
nameInput.addEventListener("change", (event)=> {
    if(isValidUserName(event.target.value)){
       nameError.style.display = "none";
    }
    else{
        nameError.style.display = "";
    }
});

//code to show email error message if email is not valid
emailInput.addEventListener("change", (event)=> {
    if(isValidEmail(event.target.value)){
       emailError.style.display = "none";
    }
    else{
        emailError.style.display = "";
    }
});

//code to know how many checkboxes are selected
var selectedCheckboxes = 0;
//code to know when a checkbox is selected and to validate that at least 1 has been selected, if not error message is displayed.

for(let i=0; i<listActivities.length;i++){
    listActivities.item(i).addEventListener("change", (event)=> {
        if(event.target.checked){
            selectedCheckboxes += 1;
        }
        if(event.target.checked ==false){
            selectedCheckboxes -= 1;
        }
        if(selectedCheckboxes>0){
           activitiesError.style.display = "none";
        }
        else{
            activitiesError.style.display = "";
        }
    });
}

//code to show credit card error message if credit card is not valid
//validation for credit card inputs - card number
cardInput.addEventListener("change", (event)=> {
    if(isCreditCardValid(event.target.value)){
       cardError.style.display = "none";
    }
    else{
        cardError.style.display = "";
    }
});

//validation for credit card inputs - zip code
zipcodeInput.addEventListener("change", (event)=> {
    if(isCreditZipCodeValid(event.target.value)){
       zipcodeError.style.display = "none";
    }
    else{
        zipcodeError.style.display = "";
    }
});

//validation for credit card inputs - cvv code
cvvInput.addEventListener("change", (event)=> {
    if(isCVVValid(event.target.value)){
       cvvError.style.display = "none";
        
    }
    else{
        cvvError.style.display = "";
    }
});

//test of error message display, default display for error messages
nameError.style.display = "none";
emailError.style.display = "none";
activitiesError.style.display = "none";
cardError.style.display = "none";
zipcodeError.style.display = "none";
cvvError.style.display = "none";

//function to determine what error message to unhide
function showErrorMessage(errorType){
    if(errorType == "name"){
        nameError.style.display = "";
        return;
    }
    if(errorType == "email"){
        emailError.style.display = "";
        return;
    }
    if(errorType == "activities"){
        activitiesError.style.display = "";
    }
    if(errorType == "card"){
        cardError.style.display = "";
    }
    if(errorType == "zipcode"){
        zipcodeError.style.display = "";
    }
    if(errorType == "cvv"){
        cvvError.style.display = "";
    } 
}

//Code to prevent form submission upon error encounter
//selection of submit DOM button
const submitButton = document.getElementsByTagName("button");

//creation of general submission error message
var submitError = document.createElement("LABEL");
submitError.id= "submit_error";
submitError.style.color = "red";
submitError.innerHTML = "Please fill in all the information and be sure to use a valid format";
submitButton.item(0).insertAdjacentElement("beforebegin", submitError);

//setting default display of general submission error mesage to hidden
submitError.style.display ="none";

//event handler for form submission - forbids submission if errors exists and displays general submission error message
const form = document.getElementsByTagName("form").item(0);
form.addEventListener("submit", (event)=>{
    if(isValidUserName(nameInput.value)==false||
        isValidEmail(emailInput.value)==false||
        isCreditCardValid(cardInput.value)==false||
        isCreditZipCodeValid(zipcodeInput.value)==false||
        isCVVValid(cvvInput.value)==false||
        selectedCheckboxes == 0){
            submitError.style.display ="";
            event.preventDefault();
    }
    else{
        submitError.style.display ="none";
    }
});
