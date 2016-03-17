$.getJSON("../mmoreauCV.json", function(data) {
  bio = data.bio;
  work = data.work;
  education = data.education;
  travelLocations = data.travellocations;
  birthplace = data.birthplace;
 
  // Building and displaying the header section
  data.bio.display = function (cvObj) {
     //function displaying header
     function displayHeader () {
       $('#header').prepend(HTMLheaderName.replace('%data%', cvObj.bio.name), HTMLheaderRole.replace('%data%', cvObj.bio.role), HTMLheaderRole.replace('%data%', cvObj.bio.secondaryrole));
     }

     //function displaying contact
     function displayContact () {
       $('#topContacts').append(HTMLlocation.replace('%data%', cvObj.bio.contacts['location'])+'<hr>',
                                HTMLemail.replace('%data%', cvObj.bio.contacts['email']),
                                HTMLtwitter.replace('%data%', cvObj.bio.contacts['twitter']),
                                HTMLgithub.replace('%data%', cvObj.bio.contacts['github']),
                                HTMLlinkedin.replace('%data%', cvObj.bio.contacts['linkedin']))
     }

     //function displaying bio info and skills
     function displayBioAndSkills () {
        $('#topContacts').before(HTMLbioPic.replace('%data%', cvObj.bio.biopic));
        $('.welcomeTitle').after(HTMLwelcomeMsg.replace('%data%', cvObj.bio.welcomeMessage));
        $('#welcomeDiv').after(
           //function building the skills list section on the fly
           (function () { 
             var i = 0,
                 newHTMLskills = HTMLskillsStart.replace('</ul>', '');
             for (;i < cvObj.bio.skills.length;i++) {
               newHTMLskills += HTMLskills.replace('%data%', cvObj.bio.skills[i]);
             }
             newHTMLskills += '</ul>';
             return newHTMLskills;
           })()
          );
     }

     //call three bio related functions
     displayHeader();
     displayContact();
     displayBioAndSkills();
     $("#header").show();
     $("#topContacts").show();
  };
  
  // Building and displaying the work section
  data.work.display = function (cvObj) {
     var i = 0,
         newHTMLwork = '';

     for (;i < cvObj.work.jobs.length; i++) {
       newHTMLwork += HTMLworkStart.replace('</div>', '');
       newHTMLwork += HTMLworkEmployerLink.replace('%data%', cvObj.work.jobs[i]['employerlink']);
       newHTMLwork += HTMLworkEmployer.replace('%data%', cvObj.work.jobs[i]['employer']);
       newHTMLwork += HTMLworkTitle.replace('%data%', cvObj.work.jobs[i]['title']);
       newHTMLwork += HTMLworkDates.replace('%data%', cvObj.work.jobs[i]['dates']);
       newHTMLwork += HTMLworkLocation.replace('%data%', cvObj.work.jobs[i]['location']);
       newHTMLwork += HTMLworkDescription.replace('%data%', cvObj.work.jobs[i]['description']);
       newHTMLwork += '</div>';
     }
   
     $('#workExperience').append(newHTMLwork).show();
  };
    
  // Building and displaying the projects section 
  data.projects.display = function (cvObj) {
     var i = 0,
         j,
         newHTMLprojects = '',
         newHTMLimages;

     for (;i < cvObj.projects.length; i++) {
       newHTMLprojects += HTMLprojectStart.replace('</div>', '');
       newHTMLprojects += HTMLprojectTitleLink.replace('%data%', cvObj.projects[i]['link']);
       newHTMLprojects += HTMLprojectTitle.replace('%data%', cvObj.projects[i]['title']);
       newHTMLprojects += HTMLprojectDates.replace('%data%', cvObj.projects[i]['dates']);
       newHTMLprojects += HTMLprojectDescription.replace('%data%', cvObj.projects[i]['description']);
       newHTMLprojects += (function () {
                             newHTMLimages = '', j = 0;
                             for (;j < cvObj.projects[i]['images'].length; j++) {
                               newHTMLimages += HTMLprojectImage.replace('%data%', cvObj.projects[i]['images'][j]);
                             }
                             return newHTMLimages;                              
                           })();
       newHTMLprojects += '</div>';
     }
   
     $('#projects').append(newHTMLprojects).show();
  };
  
  // Building and displaying the education section
  data.education.display = function (cvObj) {
     var i = 0, 
         newHTMLschool = '';

     for (;i < cvObj.education.schools.length; i++) {
       newHTMLschool += HTMLschoolStart.replace('</div>', '');
       newHTMLschool += HTMLschoolNameLink.replace('%data%', cvObj.education.schools[i]['url']);
       newHTMLschool += HTMLschoolName.replace('%data%', cvObj.education.schools[i]['name']);
       newHTMLschool += HTMLschoolDegree.replace('%data%', cvObj.education.schools[i]['degree']);
       newHTMLschool += HTMLschoolDates.replace('%data%', cvObj.education.schools[i]['dates']);
       newHTMLschool += HTMLschoolLocation.replace('%data%', cvObj.education.schools[i]['location']);
       newHTMLschool += HTMLschoolMajor.replace('%data%', cvObj.education.schools[i]['majors']);
       newHTMLschool += '</div>';
     }
     if (cvObj.education.onlineCourses[0]) {
       var j = 0;
       newHTMLschool += HTMLonlineClasses;
       for (;j < cvObj.education.onlineCourses.length; j++) {
         newHTMLschool += HTMLschoolStart.replace('</div>', '');
         newHTMLschool += HTMLonlineTitleLink.replace('%data%', cvObj.education.onlineCourses[j]['url']);
         newHTMLschool += HTMLonlineTitle.replace('%data%', cvObj.education.onlineCourses[j]['title']);
         newHTMLschool += HTMLonlineSchool.replace('%data%', cvObj.education.onlineCourses[j]['school']);
         newHTMLschool += HTMLonlineDates.replace('%data%', cvObj.education.onlineCourses[j]['date']);
         newHTMLschool += '</div>';
       }
     }

     $('#education').append(newHTMLschool).show();
  };
  
  // Building and displaying the bottom contacts section
  data.bio.displayBottomContacts = function (cvObj) {
    $('#footerContacts').append(HTMLemail.replace('%data%', cvObj.bio.contacts['email']),
                                HTMLtwitter.replace('%data%', cvObj.bio.contacts['twitter']),
                                HTMLgithub.replace('%data%', cvObj.bio.contacts['github']),
                                HTMLlinkedin.replace('%data%', cvObj.bio.contacts['linkedin']));
    $('#lets-connect').show();
  };
  
  // calling all displaying functions
  data.bio.display(data);
  data.work.display(data);
  data.projects.display(data);
  data.education.display(data);
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


