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

//This event hadler shows the Other Job Role text field when the "other" option is selected.
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


//disable color options like in the warmp up with the attr() method.

$tShirtDesignDropdown.change( () => {
    const option = $tShirtDesignDropdown.find(':selected').text();
    //TODO: Remove when done.
    console.log(option);

    if (option === 'Theme - JS Puns') {
        //disable ones that should not be in the list for this theme
        $colorOptions.show()
    }

});