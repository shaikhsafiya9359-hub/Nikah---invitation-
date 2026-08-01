function openInvitation() {
  const envelopePage = document.getElementById("envelopePage");
  const invitationPage = document.getElementById("invitationPage");
  const envelope = document.getElementById("envelope");

  envelope.classList.add("opened");

  setTimeout(() => {
    envelopePage.classList.add("hidden");
    invitationPage.classList.remove("hidden");
  }, 800);
}

function revealDate() {
  const box = document.getElementById("scratchBox");
  box.classList.add("revealed");
}

const targetDate = new Date("2026-11-09T19:00:00+05:30").getTime();

function updateCountdown() {
  const countdown = document.getElementById("countdown");
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    countdown.textContent = "Nikah Started";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown.textContent =
    String(days).padStart(2, "0") + "d : " +
    String(hours).padStart(2, "0") + "h : " +
    String(minutes).padStart(2, "0") + "m : " +
    String(seconds).padStart(2, "0") + "s";
}

updateCountdown();
setInterval(updateCountdown, 1000);
