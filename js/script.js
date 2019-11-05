/* Interactive Form Project 3 - TeamTreehouse Full Stack JavaScript Techdegree.
Megan Katherine O'Brien's List Pagination and Filtering Project 3 
as a TeamTreehouse Full Stack JavaScript Talent Path student.*/


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
const $creditCardOption = $('#payment option[value="Credit Card"]').text();
const $creditCardSection = $('#credit-card');
const $creditCardNumberField = $('#cc-num');
const $creditCardZipCodeField = $('#zip');
const $creditCardCvvField = $('#cvv');
const $paypalSection = $('#paypal');
const $bitcoinSection = $('#bitcoin');
const $form = $('form');
const $nameBlankHelperText = $('#name-blank-helpertext');
const $emailBlankHelperText = $('#email-not-blank');
const $emailHelperText = $('#email-format-helpertext'); 
const $oneActivtyHelperText = $('#one-activity-helpertext');
const $ccNumberHelperText = $('#ccnumber-helpertext');
const $ccZipcodeHelperText = $('#zipcode-helpertext');
const $ccCvvHelperText = $('#cvv-helpertext');
let totalCost = 0;
const totalCostDiv = document.createElement('div');

//Adding some color and bold to the totalCostDiv
$(totalCostDiv).addClass('total-cost');

/* This sets the curser to the first input on page load. Chose to use window.onload 
for better browser compatability. */
window.onload = () => {
    $nameField.focus();
}

//Initially Hidden Items
$otherJobSection.hide();
$colorOptions.hide();
$paypalSection.hide();
$bitcoinSection.hide();
$nameBlankHelperText.hide();
$emailBlankHelperText.hide();
$emailHelperText.hide();
$oneActivtyHelperText.hide();
$ccNumberHelperText.hide();
$ccZipcodeHelperText.hide();
$ccCvvHelperText.hide();

//Setting CC to default selection in payment info dropdown.
$('#payment option[value="Credit Card"]').prop('selected', true);

//Disabling "Select payment Method" in the payment info dropdown so they can't choose it from the list.
$('#payment option[value="select method"]').prop('disabled', true);

/*Note: Added this code to the html file: <input type="text" id="other-title" name="user_other_jobtitle" placeholder="Your Job Role"></input>
so that it still shows up when javascript is turned off in the browser. */

//Validation Functions//

function isValidNameBlank(nameField){
    if (nameField === '') {
        return true;
    } else  {
        return false;
    }
}

function isValidEmailBlank(emailField) {
    if (emailField === '') {
        return true;
    } else {
        return false;
    }
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


//Event Handlers//

//This event handler shows the Other Job Role text field when the "other" option is selected.
$jobRoleSection.change( () => {
    const option = $jobRoleSection.find(':selected').text();
    if (option === 'Other') {
        $otherJobSection.show();
    }
});

//This event handler finds the option that is being clicked in the list and then dictates what colors are shown in the color dropdown.
$tShirtDesignDropdown.change( () => {
    //Grabbing the selected option and storing it to use in the conditional statements.
    const option = $tShirtDesignDropdown.find(':selected').text();
    //Declaring some color variables.
    const $colorTomato = $('#color option[value="tomato"]');
    const $colorSteelBlue = $('#color option[value="steelblue"]');
    const $colorDimGrey = $('#color option[value="dimgrey"]');
    const $colorCornflowerBlue = $('#color option[value="cornflowerblue"]');
    const $colorDarkSlateGrey = $('#color option[value="darkslategrey"]');
    const $colorGold = $('#color option[value="gold"]');
    const $firstSelect = $('#color option:first');
    
    if (option === 'Theme - JS Puns') {
        //trying to empty and reload or refresh the design dropdown
        //doesn't seem to work either.trigger('chosen:updated');
        // basically gives an error saying it's not allowed $colorOptions.empty().load(location.href + '#colors-js-puns > *');
        $firstSelect.prop('selected', true);
        //Disable colors that should not be in the list for this theme.
        $colorTomato.attr('hidden', true).attr('disabled', true);
        $colorSteelBlue.attr('hidden', true).attr('disabled', true);
        $colorDimGrey.attr('hidden', true).attr('disabled', true);
        //Show these
        $colorCornflowerBlue.attr('hidden', false).attr('disabled', false);
        $colorDarkSlateGrey.attr('hidden', false).attr('disabled', false);
        $colorGold.attr('hidden', false).attr('disabled', false);
        $colorOptions.show();
    } else if (option === 'Theme - I ♥ JS') {
        $firstSelect.prop('selected', true);
        //Disable colors that should not be in the list for this theme.
        $colorCornflowerBlue.attr('hidden', true).attr('disabled', true);
        $colorDarkSlateGrey.attr('hidden', true).attr('disabled', true);
        $colorGold.attr('hidden', true).attr('disabled', true);
        //Show these
        $colorTomato.attr('hidden', false).attr('disabled', false);
        $colorSteelBlue.attr('hidden', false).attr('disabled', false);
        $colorDimGrey.attr('hidden', false).attr('disabled', false);
        $colorOptions.show();
    }
});

/*This event handler doesn't allow events of the same day and time to be selected. 
As a user selects activites it makes a running total of the dollar amounts and then display it 
below the list of checkboxes.*/

$activitiesSection.change( (event) => {
    //When clicked store what was clicked -- get data day and time -- get cost
    const clicked = event.target;
    const $clickedTime = $(clicked).attr("data-day-and-time");
    const $clickedCost = parseInt($(clicked).attr("data-cost").replace("$", ""));

    //If an activity is checked/unchecked add/subtract from totalCost and append the total cost div.
    if (clicked.checked) {
        totalCost += $clickedCost;
        $activitiesSection.append($(totalCostDiv).text('Total Cost: $' + totalCost));
    } else {
        totalCost -= $clickedCost;
        $activitiesSection.append($(totalCostDiv).text('Total Cost: $' + totalCost));
    }

    //If what is checked is a specific date and time loop through and if date and time match others disable them.
    for (let i = 0; i < $checkboxesActivities.length; i++) {
        const currentCheckbox = $checkboxesActivities[i];
        const currentCheckboxDayTime = $(currentCheckbox).attr("data-day-and-time");
        if (currentCheckboxDayTime === $clickedTime && currentCheckbox !== clicked) {
            if (clicked.checked) {
                //If clicked was checked set the matching activities elements to disabled true 
                $(currentCheckbox).prop('disabled', true);
            } else {
                //Set the matching disabled property to disabled false
                $(currentCheckbox).prop('disabled', false);
            }
        }
    }
});

//Show corresponding payment sections when they are chosen and hide cc info section.
$paymentDropDown.change( (event) => {
    const option = event.target;
    const $optionValue = $(option).prop("value");

    //Declaring payment option variables for if statements.
    const $paypalOption = $('#payment option[value="PayPal"]').text();
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

//Real time listener for email field not being correct email format.
$emailField.on('input', (event) => {
    const text = event.target.value;
    if (isValidEmail(text)) {
        $emailHelperText.hide();
    } else {
        $emailHelperText.show();
    }
});

//Submit event handler if statements for validation messages.
$form.on('submit', (event) => {

    //If name field is blank prevent submit and show helper text.
    if (isValidNameBlank($nameField.val())) {
        event.preventDefault();
        $nameBlankHelperText.show();
        $nameField.toggleClass('input-border-red');
    } else {
        //To set it back to hide after it's been shown (if they fixed an error)
        $nameBlankHelperText.hide();
        $nameField.toggleClass('input-border-red');
    }

    //If email field is blank prevent submit and show helper text.
    if (isValidEmailBlank($emailField.val())) {
        event.preventDefault();
        $emailBlankHelperText.show();
        $emailField.toggleClass('input-border-red');
    } else {
        $emailBlankHelperText.hide();
        $emailField.toggleClass('input-border-red');
    }

    //If email field is not the correct format prevent submit and show helper text.
    //I had to change this field to just a reguler input field because the browser was doing this validation for me.
    if (isValidEmail($emailField.val())) {
        $emailHelperText.hide();
        $emailField.toggleClass('input-border-red');
    } else {
        event.preventDefault();
        $emailHelperText.show();
        $emailField.toggleClass('input-border-red');
    }

    //If no activities are checked off prevent submit and show helper text.
    if (isValidOneCheckbox($checkboxesActivities)) {
        $oneActivtyHelperText.hide();
    } else {
        event.preventDefault();
        $oneActivtyHelperText.show();
    }

    //If Credit Card is selected in payment - validate these.
    if ($paymentDropDown.val() === $creditCardOption) {
        //Require these
        //Credit Card format between 13 and 16 digits. If it doesn't match prevent submit and show helper text.
        if (isValidCreditCardNumber($creditCardNumberField.val())) {
            $ccNumberHelperText.hide();
            $creditCardNumberField.toggleClass('input-border-red');
        } else {
            event.preventDefault();
            $ccNumberHelperText.show();
            $creditCardNumberField.toggleClass('input-border-red');
        }

        //Zipcode for CC needs to be 5 digits. If it isn't prevent submit and show helper text.
        if (isValidCCZipcode($creditCardZipCodeField.val())) {
            $ccZipcodeHelperText.hide();
            $creditCardZipCodeField.toggleClass('input-border-red');
        } else {
            event.preventDefault();
            $ccZipcodeHelperText.show();
            $creditCardZipCodeField.toggleClass('input-border-red');
        }

        //CVV must be 3 digits. If not then prevent submit and show helper text.
        if (isValidCvv($creditCardCvvField.val())) {
            $ccCvvHelperText.hide();
            $creditCardCvvField.toggleClass('input-border-red');
        } else {
            event.preventDefault();
            $ccCvvHelperText.show();
            $creditCardCvvField.toggleClass('input-border-red');
        }
    }
});
