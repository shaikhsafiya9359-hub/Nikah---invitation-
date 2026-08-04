

const loading = document.getElementById("loading");
const envelope = document.getElementById("envelope");
const seal = document.getElementById("seal");
const envelopePage = document.getElementById("envelopePage");
const mainInvitation = document.getElementById("mainInvitation");
const bgMusic = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

// Loading Screen

window.addEventListener("load", () => {

setTimeout(() => {

loading.style.display = "none";

}, 2500);

});

// Envelope Opening

seal.addEventListener("click", () => {

document.querySelector(".flap").style.transform = "rotateX(180deg)";

document.querySelector(".letter").style.transform =
"translate(-50%,-150px)";

setTimeout(() => {

envelopePage.style.display = "none";

mainInvitation.style.display = "block";

bgMusic.play().catch(()=>{});

window.scrollTo({

top:0,

behavior:"smooth"

});

},1800);

});

// Music Button

musicButton.addEventListener("click",()=>{

if(bgMusic.paused){

bgMusic.play();

musicButton.innerHTML="🔊";

}else{

bgMusic.pause();

musicButton.innerHTML="🎵";

}

});


// Countdown

const targetDate = new Date("November 9, 2026 19:00:00").getTime();

const countdown = document.getElementById("countdown");

setInterval(() => {

const now = new Date().getTime();

const distance = targetDate - now;

const days = Math.floor(distance / (1000 * 60 * 60 * 24));

const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

const seconds = Math.floor((distance % (1000 * 60)) / 1000);

if(countdown){

countdown.innerHTML =
days+" Days : "+
hours+" Hours : "+
minutes+" Min : "+
seconds+" Sec";

}

},1000);


// Simple Fireworks

function launchFireworks(){

const fireworks = document.getElementById("fireworks");

if(!fireworks) return;

for(let i=0;i<25;i++){

const spark = document.createElement("div");

spark.style.position="fixed";

spark.style.width="8px";

spark.style.height="8px";

spark.style.borderRadius="50%";

spark.style.background="#d4af37";

spark.style.left=Math.random()*100+"vw";

spark.style.top=Math.random()*100+"vh";

spark.style.boxShadow="0 0 15px gold";

spark.style.transition="all 1.5s ease";

fireworks.appendChild(spark);

setTimeout(()=>{

spark.style.transform="scale(4)";

spark.style.opacity="0";

},50);

setTimeout(()=>{

spark.remove();

},1600);

}

}



// Scratch Reveal (basic version)

const scratchCard = document.getElementById("scratchCard");

if (scratchCard) {
  let revealed = false;

  scratchCard.addEventListener("click", () => {

    if (revealed) return;

    revealed = true;

    const canvas = document.getElementById("scratchCanvas");

    if (canvas) {
      canvas.style.opacity = "0";
      canvas.style.transition = "opacity 1s";
    }

    launchFireworks();

    setTimeout(() => {

      document.querySelector(".dateReveal").style.transform = "scale(1.1)";

      setTimeout(() => {
        document.querySelector(".dateReveal").style.transform = "scale(1)";
      }, 400);

    }, 200);

  });

}


// Scroll Reveal Animation

const revealItems = document.querySelectorAll(
".hero,.coupleSection,.welcomeSection,.scratchSection,.eventSection,.venueSection,.countdownSection,.giftSection,.familySection"
);

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";
entry.target.style.transform="translateY(0)";

}

});

},{
threshold:0.15
});

revealItems.forEach(section=>{

section.style.opacity="0";
section.style.transform="translateY(50px)";
section.style.transition="all .8s ease";

observer.observe(section);

});


// Page Ready

console.log("Royal Nikah Invitation Loaded ❤️");
