window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
   let homePageButton = document.getElementById("homePageButton");
   let schedulePageButton = document.getElementById("schedulePageButton");
   let sessPageButton = document.getElementById("sessPageButton");
   let charPageButton = document.getElementById("charPageButton");
  

   homePageButton.addEventListener("click", function(){
      location.replace("./home.html");
      console.log("home button pressed!");
   });

   charPageButton.addEventListener("click", function(){
      location.replace("./chars.html");
   });

   sessPageButton.addEventListener("click", function(){
      location.replace("./sess.html");
   });

   schedulePageButton.addEventListener("click", function(){
      location.replace("./schedule.html");
   });

}

