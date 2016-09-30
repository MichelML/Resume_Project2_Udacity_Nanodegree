$.getJSON("../mmoreauCV.json", function(data) {

    // Building and displaying the header section
    data.bio.display = function(cvObj) {
        //function displaying header
        function displayHeader() {
            $('#header').prepend(HTMLheaderName.replace('%data%', cvObj.bio.name), HTMLheaderRole.replace('%data%', cvObj.bio.role));
        }

        //function displaying contact
        function displayContact() {
            $('#topContacts').append(HTMLlocation.replace('%data%', cvObj.bio.contacts.location) + '<hr>',
                HTMLemail.replace('%data%', cvObj.bio.contacts.email),
                HTMLtwitter.replace('%data%', cvObj.bio.contacts.twitter),
                HTMLgithub.replace('%data%', cvObj.bio.contacts.github),
                HTMLlinkedin.replace('%data%', cvObj.bio.contacts.linkedin));
        }

        //function displaying bio info and skills
        function displayBioAndSkills() {
          
            $('#topContacts').before(HTMLbioPic.replace('%data%', cvObj.bio.biopic), HTMLstatus);
            $('.welcomeTitle').after(HTMLwelcomeMsg.replace('%data%', cvObj.bio.welcomeMessage));
          
        }

        //call three bio related functions
        displayHeader();
        displayContact();
        displayBioAndSkills();
        $("#header").show();
        $("#topContacts").show();
    };

    // Building and displaying the projects section 
    data.projects.display = function(cvObj) {
        var i = 0,
            j,
            newHTMLprojects = '',
            newHTMLimages;

        function createImages(i, j) {
            newHTMLimages = '';
            j = 0;
            for (; j < cvObj.projects.projects[i].images.length; j++) {
                newHTMLimages += HTMLprojectImage.replace('%data%', cvObj.projects.projects[i].images[j]);
            }
            return newHTMLimages;
        }

        for (; i < cvObj.projects.projects.length; i++) {
            newHTMLprojects += HTMLprojectStart.replace('</div>', '');
            newHTMLprojects += HTMLprojectTitleLink.replace('%data%', cvObj.projects.projects[i].link);
            newHTMLprojects += HTMLprojectTitle.replace('%data%', cvObj.projects.projects[i].title);
            newHTMLprojects += HTMLprojectDates.replace('%data%', cvObj.projects.projects[i].dates);
            newHTMLprojects += HTMLprojectDescription.replace('%data%', cvObj.projects.projects[i].description);
            newHTMLprojects += createImages(i, j);
            newHTMLprojects += '</div>';
        }

        $('#projects').append(newHTMLprojects).show();
    };

    // Building and displaying the bottom contacts section
    data.bio.displayBottomContacts = function(cvObj) {
        $('#footerContacts').append(HTMLemail.replace('%data%', cvObj.bio.contacts.email),
            HTMLtwitter.replace('%data%', cvObj.bio.contacts.twitter),
            HTMLgithub.replace('%data%', cvObj.bio.contacts.github),
            HTMLlinkedin.replace('%data%', cvObj.bio.contacts.linkedin));
        $('#lets-connect').show();
    };

    // calling all displaying functions
    data.bio.display(data);
    data.projects.display(data);
    data.bio.displayBottomContacts(data);
    $("#skills").hide();
    $("#skills-h5").click(function() {
        $("#skills").toggle();
    });
}); // END OF AJAX CALL

// We need to call this function once the document is loaded otherwise
// the map won't appear on the site
$(document).ready(function() {
    $("#mapDiv").append(googleMap).show();
});
