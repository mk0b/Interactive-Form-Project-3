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

//Declaring some global variables
//Choosing to store these to make the code more readable.
const $jobRoleSection = $('#title');
const $otherJobSection = $('#other-title');
const $colorOptions = $('#colors-js-puns');
const $nameField = $('#name');
const $tShirtDesignDropdown = $('#design');
const $activitiesSection = $('.activities');

//This sets the curser to the first input on page load. Chose to use window.onload for better browser compatability.
window.onload = () => {
    $nameField.focus();
}

//Initially Hidden Items
$otherJobSection.hide();
$colorOptions.hide();

//added this code to the html file: <input type="text" id="other-title" name="user_other_jobtitle" placeholder="Your Job Role"></input>
//so that it still shows up when javascript is turned off in the browser.

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
        //trying to empty and reload
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

$activitiesSection.change( (event) => {
    const clicked = event.target;
    //TODO: Remove test after.
    console.log(clicked);
    let totalCost;
    const $clickedTime = $(clicked).data('datadayandtime');
    console.log($clickedTime);
    //const $tuesdayAM = $('input [type="checkbox"] [data-day-and-time="Tuesday-T09:00:00-T12:00:00]').val();
    //console.log($tuesdayAM); 
    //store time frame's to match against
    //how can I make it simpler. if any tuesday at same time is clicked disable any other tuesday?

    //if statement for times

    //separate if statement for money?
});