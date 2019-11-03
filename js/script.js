/* Interactive Form Project 3 - TeamTreehouse Full Stack JavaScript Techdegree.
Megan Katherine O'Brien's List Pagination and Filtering Project 3 
as a TeamTreehouse Full Stack JavaScript Talent Path student.*/

//TODO: Delete below when done.
// Project 3 Guide - https://drive.google.com/file/d/1Vw658-9KUiUZ5yHaABvkytC9W2QBYiW_/view?usp=sharing

//TODO: Use the CDN way of getting the jquery.
//TODO: Fill out the read me.
//TODO: Clean up comments
//TODO: Refactor Code
//TODO: css/reset.css or css/normalize.css - Google and add to project (Opt)
//TODO: Add placeholder text to make more usable?
//TODO: Play with CSS.

//Declaring some global variables
//Choosing to store these to make the code more readable.
const $jobRoleSection = $('#title');
const $otherJobSection = $('#other-title');
const $colorOptions = $('#colors-js-puns');
const $nameField = $('#name');
const $emailField = $('#mail');
const $tShirtDesignDropdown = $('#design');
const $activitiesSection = $('.activities');
const $checkboxesActivities = $('.activities input');
const $paymentDropDown = $('#payment');
const $creditCardSection = $('#credit-card');
const $paypalSection = $('#paypal');
const $bitcoinSection = $('#bitcoin');
const $form = $('form');
const $nameBlankHelperText = $('#name-blank-helpertext');
const $nameLettersHelperText = $('#name-letters-helpertext');
const $emailHelperText = $('#email-format-helpertext');
const $oneActivtyHelperText = $('#one-activity-helpertext');
const $ccNumberHelperText = $('#ccnumber-helpertext');
const $ccZipcodeHelperText = $('#zipcode-helpertext');
const $ccCvvHelperText = $('#cvv-helpertext');

//This sets the curser to the first input on page load. Chose to use window.onload for better browser compatability.
window.onload = () => {
    $nameField.focus();
}

//Initially Hidden Items
$otherJobSection.hide();
$colorOptions.hide();
$paypalSection.hide();
$bitcoinSection.hide();
$nameBlankHelperText.hide();
$nameLettersHelperText.hide();
$emailHelperText.hide();
$oneActivtyHelperText.hide();
$ccNumberHelperText.hide();
$ccZipcodeHelperText.hide();
$ccCvvHelperText.hide();

//Setting CC to default selection in payment info dropdown.
$('#payment option[value="Credit Card"]').prop('selected', true);

//Disabling "Select payment Method" in the payment info dropdown so they can't choose it from the list.
$('#payment option[value="select method"]').prop('disabled', true);

//added this code to the html file: <input type="text" id="other-title" name="user_other_jobtitle" placeholder="Your Job Role"></input>
//so that it still shows up when javascript is turned off in the browser.

//validation Requirements//

/* 
- Name field can't be blank.
- Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
- User must select at least one checkbox under the "Register for Activities" section of the form.
- If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.
- Credit Card field should only accept a number between 13 and 16 digits.
- The Zip Code field should accept a 5-digit number.
- The CVV should only accept a number that is exactly 3 digits long.
*/

//Validation Functions//

//Validating the name field function.
function isValidName(nameField) {
    return /\w+/.test(nameField);
}

function isValidEmail(emailField) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailField);
}

function isValidOneCheckbox(checkboxes) {
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            return true;
        } else {
            return false;
        }
    }
}

//TODO: Remove test after.
console.log(isValidOneCheckbox($checkboxesActivities));

function isValidCreditCardNumber(ccField) {
//only if credit card payment option is selected.
return  /\d{13,16}/.test(ccField);
}

function isValidCCZipcode(zipCodeField) {
    return /\d{5}/.test(zipCodeField);
}

function isValidCvv(cvvField) {
    return /\d{3}/.test(cvvField);
}

//Helper Functions to help set-up some event handlers for showing/hiding the helper text.
//added <span> helper text to each validation field section in the html.
function showHideHelperText(show, element) {
    // show element when show is true, hide when false
    if (show) {
      element.style.display = "inherit";
    } else {
      element.style.display = "none";
    }
  }
  
  function createListener(validator) {
    return event => {
      const text = event.target.value;
      const valid = validator(text);
      const showHelperText = text !== "" && !valid;
      const helperText = event.target.nextElementSibling;
      showOrHideTip(showHelperText, helperText);
    };
  }


//Event Handlers//

//This event handler shows the Other Job Role text field when the "other" option is selected.
$jobRoleSection.change( () => {
    const option = $jobRoleSection.find(':selected').text();
    //TODO: Remove test when done.
    console.log(option);
    if (option === 'Other') {
        $otherJobSection.show();
    } else {
        //TODO: Remove console and else statement when done.
        console.log('Something was selected!');
    }
});

//This event handler finds the option that is being clicked in the list and then dictates what colors are shown in the color dropdown.
// TODO: decide to leave in or take out. added <option value="selectacolor">Select a Color</option> may take it out when I fix the bug
//TODO: fix the bug when you select one theme and then try to change your mind and select another the list does not show up correctly.
$tShirtDesignDropdown.change( () => {
    //Grabbing the selected option and storing it to use in the conditional statements.
    const option = $tShirtDesignDropdown.find(':selected').text();
    //TODO: Remove when done.
    console.log(option);
    //Declaring some color variables.
    const $colorTomato = $('#color option[value="tomato"]');
    const $colorSteelBlue = $('#color option[value="steelblue"]');
    const $colorDimGrey = $('#color option[value="dimgrey"]');
    const $colorCornflowerBlue = $('#color option[value="cornflowerblue"]');
    const $colorDarkSlateGrey = $('#color option[value="darkslategrey"]');
    const $colorGold = $('#color option[value="gold"]');
    
    if (option === 'Theme - JS Puns') {
        //trying to empty and reload or refresh the design dropdown
        //doesn't seem to work either.trigger('chosen:updated');
        // basically gives an error saying it's not allowed $colorOptions.empty().load(location.href + '#colors-js-puns > *');
        //Disable colors that should not be in the list for this theme.
        $colorTomato.attr('hidden', true).attr('disabled', true);
        $colorSteelBlue.attr('hidden', true).attr('disabled', true);
        $colorDimGrey.attr('hidden', true).attr('disabled', true);
        $colorOptions.show()
    } else if (option === 'Theme - I ♥ JS') {
        //TODO: Remove test.
        console.log('Test');
        //Disable colors that should not be in the list for this theme.
        $colorCornflowerBlue.attr('hidden', true).attr('disabled', true);
        $colorDarkSlateGrey.attr('hidden', true).attr('disabled', true);
        $colorGold.attr('hidden', true).attr('disabled', true);
        $colorOptions.show();
    }
});

//This event handler doesn't allow events of the same day/time to be selected. 
//Disable the same events and time after one is selected so that the user cannot
//double book themselves.
//As a user selects make a running total of the dollar amounts and then display it 
//below the list of checkboxes.

//TODO: Try to fix class/options for line through when disabled. Seems to work but nothing is showing in the browser.

$activitiesSection.change( (event) => {
    //When clicked store what was clicked -- get data day and time -- get cost
    const clicked = event.target;
    //TODO: Remove test after.
    console.log(clicked);
    const $clickedTime = $(clicked).attr("data-day-and-time");
    //TODO: Remove test after.
    console.log($clickedTime);
    const $clickedCost = parseInt($(clicked).attr("data-cost").replace("$", ""));
    //TODO: Remove test after.
    console.log(typeof $clickedCost);
    let totalCost = 0;

    //Use the checkboxes to loop through each check box and if it matches clickedtime grey it out.

    //TODO: Remove test after.
    console.log($checkboxesActivities);

    //TODO: Need to get Total Cost string to show/add correctly.
    if (clicked.checked) {
        totalCost += $clickedCost;
    } else {
        totalCost -= $clickedCost;
    }
    //What if I put this and the variable outside of this event listener and append it after the event listener?
    $('.activities').append('Total Cost: $' + totalCost);

    // if what is checked is a specific date and time loop through and if date and time match others disable them.
    for (let i = 0; i < $checkboxesActivities.length; i++) {
        const currentCheckbox = $checkboxesActivities[i];
        const currentCheckboxDayTime = $(currentCheckbox).attr("data-day-and-time");
        //TODO: Remove test after.
        //console.log(currentCheckbox);
        //console.log(currentCheckboxDayTime);
        if (currentCheckboxDayTime === $clickedTime && currentCheckbox !== clicked) {
            if (clicked.checked) {
                //if clicked was checked set the matching activities elements to disabled true 
                $(currentCheckbox).prop('disabled', true).addClass('.disabled-activities');
                console.log(currentCheckbox);
            } else {
                //set the matching disabled property to disabled false
                $(currentCheckbox).prop('disabled', false).removeClass('.disabled-activities');
            }
        }
    }
    //TODO: Remove test after.
    //console.log('Hi');
});


//show corresponding sections when they are chosen and hide cc info section.
$paymentDropDown.change( (event) => {
    const option = event.target;
    const $optionValue = $(option).prop("value");
    //TODO: Remove test after.
    console.log('Option: ' + option);
    console.log('Option Value: ' + typeof $optionValue);

    //declaring payment option variables for if statements.
    const $paypalOption = $('#payment option[value="PayPal"]').text();
    //TODO: Remove test after.
    console.log(typeof $paypalOption);
    const $bitcoinOption = $('#payment option[value="Bitcoin"]').text();
    const $creditCardOption = $('#payment option[value="Credit Card"]').text();
    
    if ($optionValue === $paypalOption) {
        $creditCardSection.hide();
        $bitcoinSection.hide();
        $paypalSection.show();
    }

    if ($optionValue === $bitcoinOption) {
        $creditCardSection.hide();
        $paypalSection.hide();
        $bitcoinSection.show();
    }

    if ($optionValue === $creditCardOption) {
        $paypalSection.hide();
        $bitcoinSection.hide();
        $creditCardSection.show();
    }

});

//submit event handler if statements for validation messages.
$form.on('submit', (event) => {
    //event.preventDefault();
    console.log('Register/Submit button was clicked!');

});
