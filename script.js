document.addEventListener("DOMContentLoaded", () => {

    const envelopeScreen = document.getElementById("envelopeScreen");
    const envelope = document.querySelector(".envelope");
    const waxSeal = document.getElementById("waxSeal");

    const invitation = document.getElementById("invitation");

    const music = document.getElementById("bgMusic");
    const musicButton = document.getElementById("musicButton");


    /* =========================================
       LOADING SCREEN
    ========================================= */

    setTimeout(() => {

        const loading = document.getElementById("loadingScreen");

        if (loading) {

            loading.style.transition =
                "opacity 1s ease";

            loading.style.opacity = "0";

            setTimeout(() => {
                loading.style.display = "none";
            }, 1000);

        }

    }, 2200);


    /* =========================================
       ENVELOPE OPEN
    ========================================= */

    if (waxSeal) {

        waxSeal.addEventListener("click", () => {

            if (navigator.vibrate) {
                navigator.vibrate([40, 30, 70]);
            }

            waxSeal.style.pointerEvents = "none";

            envelope.classList.add("open");


            /* Start music after user interaction */

            if (music) {

                music.volume = 0.22;

                music.play().catch(() => {});

            }

            if (musicButton) {
                musicButton.style.display = "flex";
            }


            /* Open envelope */

            setTimeout(() => {

                envelopeScreen.style.transition =
                    "opacity 1.2s ease, transform 1.2s ease";

                envelopeScreen.style.opacity = "0";

                envelopeScreen.style.transform =
                    "scale(1.05)";

            }, 1000);


            /* Show invitation */

            setTimeout(() => {

                envelopeScreen.style.display =
                    "none";

                invitation.classList.remove(
                    "hidden"
                );

                window.scrollTo({
                    top: 0,
                    behavior: "instant"
                });

            }, 2100);

        });

    }


    /* =========================================
       MUSIC BUTTON
    ========================================= */

    if (musicButton) {

        musicButton.addEventListener("click", () => {

            if (!music) return;

            if (music.paused) {

                music.play();

                musicButton.textContent = "♫";

            } else {

                music.pause();

                musicButton.textContent = "♪";

            }

        });

    }


    /* =========================================
       HEART SCRATCH
    ========================================= */

    const canvas =
        document.getElementById("scratchCanvas");

    const scratchArea =
        document.getElementById("scratchArea");

    const heart =
        document.getElementById("heartScratch");


    if (canvas && scratchArea) {

        const ctx =
            canvas.getContext("2d");


        let scratching = false;

        let revealed = false;

        let scratchCount = 0;


        /* -------------------------------------
           CANVAS SIZE
        ------------------------------------- */

        function setupCanvas() {

            const width =
                scratchArea.clientWidth;

            const height =
                scratchArea.clientHeight;

            const ratio =
                window.devicePixelRatio || 1;


            canvas.width =
                width * ratio;

            canvas.height =
                height * ratio;


            canvas.style.width =
                width + "px";

            canvas.style.height =
                height + "px";


            ctx.setTransform(
                ratio,
                0,
                0,
                ratio,
                0,
                0
            );


            createGoldLayer();

        }


        /* -------------------------------------
           GOLD SCRATCH LAYER
        ------------------------------------- */

        function createGoldLayer() {

            const width =
                scratchArea.clientWidth;

            const height =
                scratchArea.clientHeight;


            ctx.globalCompositeOperation =
                "source-over";


            const gradient =
                ctx.createLinearGradient(
                    0,
                    0,
                    width,
                    height
                );


            gradient.addColorStop(
                0,
                "#f1d58d"
            );

            gradient.addColorStop(
                0.45,
                "#bd9146"
            );

            gradient.addColorStop(
                1,
                "#e5c77d"
            );


            ctx.fillStyle =
                gradient;

            ctx.fillRect(
                0,
                0,
                width,
                height
            );


            /* Glitter */

            for (
                let i = 0;
                i < 350;
                i++
            ) {

                const x =
                    Math.random() * width;

                const y =
                    Math.random() * height;


                ctx.beginPath();

                ctx.arc(
                    x,
                    y,
                    Math.random() * 1.6 + .4,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    "rgba(255,255,255,.65)";

                ctx.fill();

            }


            ctx.globalCompositeOperation =
                "destination-out";

        }


        /* -------------------------------------
           TOUCH POSITION
        ------------------------------------- */

        function getPosition(event) {

            const rect =
                canvas.getBoundingClientRect();


            let x;
            let y;


            if (
                event.touches &&
                event.touches.length
            ) {

                x =
                    event.touches[0].clientX -
                    rect.left;

                y =
                    event.touches[0].clientY -
                    rect.top;

            } else {

                x =
                    event.clientX -
                    rect.left;

                y =
                    event.clientY -
                    rect.top;

            }


            return {
                x,
                y
            };

        }


        /* -------------------------------------
           SCRATCH
        ------------------------------------- */

        function scratch(event) {

            if (
                !scratching ||
                revealed
            ) {
                return;
            }


            event.preventDefault();


            const position =
                getPosition(event);


            ctx.beginPath();

            ctx.arc(
                position.x,
                position.y,
                27,
                0,
                Math.PI * 2
            );

            ctx.fill();


            scratchCount++;


            if (
                scratchCount % 12 === 0
            ) {

                checkReveal();

            }

        }


        /* -------------------------------------
           CHECK HOW MUCH IS SCRATCHED
        ------------------------------------- */

        function checkReveal() {

            const image =
                ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );


            let transparent = 0;

            const step = 80;


            for (
                let i = 3;
                i < image.data.length;
                i += step
            ) {

                if (
                    image.data[i] < 80
                ) {

                    transparent++;

                }

            }


            const total =
                image.data.length / step;


            const percentage =
                transparent / total * 100;


            if (
                percentage >= 42
            ) {

                revealDate();

            }

        }


        /* -------------------------------------
           REVEAL DATE
        ------------------------------------- */

        function revealDate() {

            if (revealed) return;

            revealed = true;


            canvas.style.transition =
                "opacity .9s ease";

            canvas.style.opacity = "0";


            if (heart) {

                heart.style.transition =
                    "opacity .6s ease";

                heart.style.opacity = "0";

            }


            fireworks();


            setTimeout(() => {

                canvas.style.display =
                    "none";

                if (heart) {
                    heart.style.display =
                        "none";
                }

            }, 900);

        }


        /* -------------------------------------
           MOUSE
        ------------------------------------- */

        canvas.addEventListener(
            "mousedown",
            event => {

                scratching = true;

                scratch(event);

            }
        );


        canvas.addEventListener(
            "mousemove",
            scratch
        );


        window.addEventListener(
            "mouseup",
            () => {

                scratching = false;

            }
        );


        /* -------------------------------------
           PHONE TOUCH
        ------------------------------------- */

        canvas.addEventListener(
            "touchstart",
            event => {

                scratching = true;

                scratch(event);

            },
            {
                passive: false
            }
        );


        canvas.addEventListener(
            "touchmove",
            scratch,
            {
                passive: false
            }
        );


        canvas.addEventListener(
            "touchend",
            () => {

                scratching = false;

            }
        );


        setupCanvas();


        window.addEventListener(
            "resize",
            setupCanvas
        );

    }


    /* =========================================
       FIREWORKS
    ========================================= */

    function fireworks() {

        const container =
            document.getElementById(
                "fireworks"
            );


        if (!container) return;


        for (
            let burst = 0;
            burst < 6;
            burst++
        ) {

            setTimeout(() => {

                createBurst(container);

            }, burst * 350);

        }

    }


    function createBurst(container) {

        const centerX =
            20 + Math.random() * 60;

        const centerY =
            20 + Math.random() * 45;


        for (
            let i = 0;
            i < 40;
            i++
        ) {

            const particle =
                document.createElement("span");


            particle.className =
                "firework-particle";


            particle.style.left =
                centerX + "%";

            particle.style.top =
                centerY + "%";


            const angle =
                Math.PI * 2 * i / 40;


            const distance =
                55 + Math.random() * 110;


            particle.style.setProperty(
                "--x",
                Math.cos(angle) *
                distance +
                "px"
            );


            particle.style.setProperty(
                "--y",
                Math.sin(angle) *
                distance +
                "px"
            );


            container.appendChild(
                particle
            );


            setTimeout(() => {

                particle.remove();

            }, 1300);

        }

    }


    /* =========================================
       COUNTDOWN
    ========================================= */

    /*
       IMPORTANT:
       Nikah:
       09 November 2026
       7:00 PM
    */


    const targetDate =
        new Date(
            "2026-11-09T19:00:00+05:30"
        ).getTime();


    function updateCountdown() {

        const now =
            Date.now();


        let remaining =
            targetDate - now;


        if (remaining < 0) {
            remaining = 0;
        }


        const days =
            Math.floor(
                remaining /
                (1000 * 60 * 60 * 24)
            );


        const hours =
            Math.floor(
                remaining /
                (1000 * 60 * 60)
            ) % 24;


        const minutes =
            Math.floor(
                remaining /
                (1000 * 60)
            ) % 60;


        const seconds =
            Math.floor(
                remaining / 1000
            ) % 60;


        const daysElement =
            document.getElementById(
                "days"
            );

        const hoursElement =
            document.getElementById(
                "hours"
            );

        const minutesElement =
            document.getElementById(
                "minutes"
            );

        const secondsElement =
            document.getElementById(
                "seconds"
            );


        if (daysElement) {

            daysElement.textContent =
                String(days)
                .padStart(2, "0");

        }


        if (hoursElement) {

            hoursElement.textContent =
                String(hours)
                .padStart(2, "0");

        }


        if (minutesElement) {

            minutesElement.textContent =
                String(minutes)
                .padStart(2, "0");

        }


        if (secondsElement) {

            secondsElement.textContent =
                String(seconds)
                .padStart(2, "0");

        }

    }


    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );


    /* =========================================
       SCREEN ANIMATION
    ========================================= */

    const screens =
        document.querySelectorAll(
            "#invitation .screen"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                            }

                        }
                    );

                },
                {
                    threshold: .15
                }
            );


        screens.forEach(
            screen => {

                observer.observe(
                    screen
                );

            }
        );

    }


    /* =========================================
       SWIPE / SNAP FEEL
    ========================================= */

    let touchStartY = 0;

    let touchEndY = 0;


    document.addEventListener(
        "touchstart",
        event => {

            touchStartY =
                event.changedTouches[0]
                    .screenY;

        },
        {
            passive: true
        }
    );


    document.addEventListener(
        "touchend",
        event => {

            touchEndY =
                event.changedTouches[0]
                    .screenY;

            const distance =
                touchStartY -
                touchEndY;


            /*
              Don't interfere with
              scratch canvas.
            */

            if (
                Math.abs(distance) < 80
            ) {
                return;
            }

        },
        {
            passive: true
        }
    );

});
