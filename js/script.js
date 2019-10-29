/* Interactive Form Project 3 - TeamTreehouse Full Stack JavaScript Techdegree.
Megan Katherine O'Brien's List Pagination and Filtering Project 3 
as a TeamTreehouse Full Stack JavaScript Talent Path student.*/

// Project 3 Guide - https://drive.google.com/file/d/1Vw658-9KUiUZ5yHaABvkytC9W2QBYiW_/view?usp=sharing

//TODO: Use the CDN way of getting the jquery.
//TODO: Fill out the read me.
//TODO: Clean up comments
//TODO: Refactor Code
//TODO: css/reset.css or css/normalize.css - Google and add to project (Opt)
//TODO: Add placeholder text to make more usable?


//This sets the curser to the first input on page load.
window.onload = () => {
    $('#name').focus();
}

//Initially Hidden Items
$('#other-title').hide();
$('#colors-js-puns').hide();

//added this code to the html file: <input type="text" id="other-title" name="user_other_jobtitle" placeholder="Your Job Role"></input>


//Event Handlers
$('#title').change( (event) => {
    const otherOption = $('#title').find(':selected').text();
    //TODO: Remove test when done.
    console.log(otherOption);
    if (otherOption === 'Other') {
        $('#other-title').show();
    } else {
        console.log('Something was selected!');
    }
});

