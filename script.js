// ================================
// PREMIUM NIKAH INVITATION
// SCRIPT.JS
// ================================

document.addEventListener("DOMContentLoaded", () => {

    const envelopeScreen = document.getElementById("envelopeScreen");
    const envelope = document.querySelector(".envelope");
    const waxSeal = document.getElementById("waxSeal");
    const invitation = document.getElementById("invitation");

    const music = document.getElementById("bgMusic");
    const musicButton = document.getElementById("musicButton");

    // =================================
    // ENVELOPE OPEN
    // =================================

    waxSeal.addEventListener("click", () => {

        waxSeal.style.pointerEvents = "none";

        envelope.classList.add("open");

        // Small vibration on supported phones
        if (navigator.vibrate) {
            navigator.vibrate([40, 30, 70]);
        }

        setTimeout(() => {

            envelopeScreen.style.transition =
                "opacity 1.2s ease, transform 1.2s ease";

            envelopeScreen.style.opacity = "0";
            envelopeScreen.style.transform = "scale(1.04)";

        }, 1100);

        setTimeout(() => {

            envelopeScreen.style.display = "none";

            invitation.classList.remove("hidden");

            musicButton.style.display = "block";

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

            // Browser may block autoplay.
            music.play().catch(() => {});

        }, 2200);

    });


    // =================================
    // MUSIC
    // =================================

    musicButton.addEventListener("click", () => {

        if (music.paused) {

            music.play();

            musicButton.textContent = "♫";

        } else {

            music.pause();

            musicButton.textContent = "♪";

        }

    });


    // =================================
    // REAL TOUCH SCRATCH
    // =================================

    const canvas = document.getElementById("scratchCanvas");
    const scratchArea = document.getElementById("scratchArea");
    const heartScratch = document.getElementById("heartScratch");

    if (canvas && scratchArea) {

        const ctx = canvas.getContext("2d");

        let scratching = false;
        let revealed = false;
        let scratchedPixels = 0;

        function resizeCanvas() {

            const rect = scratchArea.getBoundingClientRect();

            const dpr = window.devicePixelRatio || 1;

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            canvas.style.width = rect.width + "px";
            canvas.style.height = rect.height + "px";

            ctx.scale(dpr, dpr);

            createScratchLayer();

        }

        function createScratchLayer() {

            const width = scratchArea.clientWidth;
            const height = scratchArea.clientHeight;

            const gradient = ctx.createLinearGradient(
                0,
                0,
                width,
                height
            );

            gradient.addColorStop(0, "#e6c98c");
            gradient.addColorStop(.45, "#c49b58");
            gradient.addColorStop(1, "#ead49e");

            ctx.globalCompositeOperation = "source-over";

            ctx.fillStyle = gradient;

            ctx.fillRect(0, 0, width, height);

            // Glitter dots
            for (let i = 0; i < 260; i++) {

                const x = Math.random() * width;
                const y = Math.random() * height;

                ctx.beginPath();

                ctx.arc(
                    x,
                    y,
                    Math.random() * 1.5 + .4,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    "rgba(255,255,255," +
                    (Math.random() * .55 + .2) +
                    ")";

                ctx.fill();

            }

            ctx.globalCompositeOperation = "destination-out";
        }


        function getPosition(event) {

            const rect = canvas.getBoundingClientRect();

            let clientX;
            let clientY;

            if (event.touches && event.touches.length) {

                clientX = event.touches[0].clientX;
                clientY = event.touches[0].clientY;

            } else {

                clientX = event.clientX;
                clientY = event.clientY;

            }

            return {
                x: clientX - rect.left,
                y: clientY - rect.top
            };

        }


        function scratch(event) {

            if (!scratching || revealed) return;

            event.preventDefault();

            const pos = getPosition(event);

            ctx.beginPath();

            ctx.arc(
                pos.x,
                pos.y,
                24,
                0,
                Math.PI * 2
            );

            ctx.fill();

            checkScratchProgress();

        }


        function checkScratchProgress() {

            scratchedPixels++;

            // Every few strokes check the canvas
            if (scratchedPixels % 15 !== 0) return;

            const width = canvas.width;
            const height = canvas.height;

            const imageData =
                ctx.getImageData(
                    0,
                    0,
                    width,
                    height
                );

            let transparent = 0;

            // Sample pixels for performance
            for (
                let i = 3;
                i < imageData.data.length;
                i += 40
            ) {

                if (imageData.data[i] < 80) {
                    transparent++;
                }

            }

            const total =
                imageData.data.length / 40;

            const percentage =
                (transparent / total) * 100;

            if (percentage > 48) {

                revealDate();

            }

        }


        function revealDate() {

            if (revealed) return;

            revealed = true;

            canvas.style.transition =
                "opacity .8s ease";

            canvas.style.opacity = "0";

            heartScratch.style.transition =
                "opacity .5s ease";

            heartScratch.style.opacity = "0";

            launchFireworks();

            setTimeout(() => {

                heartScratch.style.display = "none";

            }, 800);

        }


        // Mouse
        canvas.addEventListener("mousedown", (e) => {

            scratching = true;

            scratch(e);

        });

        window.addEventListener("mouseup", () => {

            scratching = false;

        });

        canvas.addEventListener("mousemove", scratch);


        // Touch
        canvas.addEventListener(
            "touchstart",
            (e) => {

                scratching = true;

                scratch(e);

            },
            { passive: false }
        );

        canvas.addEventListener(
            "touchmove",
            scratch,
            { passive: false }
        );

        canvas.addEventListener(
            "touchend",
            () => {

                scratching = false;

            },
            { passive: true }
        );


        resizeCanvas();

        window.addEventListener(
            "resize",
            resizeCanvas
        );

    }


    // =================================
    // FIREWORKS
    // =================================

    function launchFireworks() {

        const container =
            document.getElementById("fireworks");

        if (!container) return;

        for (let burst = 0; burst < 5; burst++) {

            setTimeout(() => {

                const centerX =
                    15 + Math.random() * 70;

                const centerY =
                    15 + Math.random() * 55;

                for (let i = 0; i < 35; i++) {

                    const spark =
                        document.createElement("span");

                    spark.style.position = "absolute";

                    spark.style.left =
                        centerX + "%";

                    spark.style.top =
                        centerY + "%";

                    spark.style.width = "5px";

                    spark.style.height = "5px";

                    spark.style.borderRadius = "50%";

                    spark.style.background =
                        i % 2 === 0
                        ? "#ead39b"
                        : "#ffffff";

                    spark.style.boxShadow =
                        "0 0 10px #ead39b";

                    spark.style.transition =
                        "transform 1.2s ease-out, opacity 1.2s ease-out";

                    container.appendChild(spark);

                    const angle =
                        (Math.PI * 2 * i) / 35;

                    const distance =
                        60 + Math.random() * 90;

                    requestAnimationFrame(() => {

                        spark.style.transform =
                            `translate(
                                ${Math.cos(angle) * distance}px,
                                ${Math.sin(angle) * distance}px
                            )`;

                        spark.style.opacity = "0";

                    });

                    setTimeout(() => {

                        spark.remove();

                    }, 1300);

                }

            }, burst * 350);

        }

    }


    // =================================
    // COUNTDOWN
    // =================================

    const targetDate =
        new Date(
            "2026-11-09T19:00:00"
        ).getTime();

    function updateCountdown() {

        const now = Date.now();

        let difference =
            targetDate - now;

        if (difference < 0) {

            difference = 0;

        }

        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );

        const hours =
            Math.floor(
                (difference /
                (1000 * 60 * 60)) % 24
            );

        const minutes =
            Math.floor(
                (difference /
                (1000 * 60)) % 60
            );

        const seconds =
            Math.floor(
                (difference /
                1000) % 60
            );

        const daysEl =
            document.getElementById("days");

        const hoursEl =
            document.getElementById("hours");

        const minutesEl =
            document.getElementById("minutes");

        const secondsEl =
            document.getElementById("seconds");


        if (daysEl)
            daysEl.textContent =
                String(days).padStart(2, "0");

        if (hoursEl)
            hoursEl.textContent =
                String(hours).padStart(2, "0");

        if (minutesEl)
            minutesEl.textContent =
                String(minutes).padStart(2, "0");

        if (secondsEl)
            secondsEl.textContent =
                String(seconds).padStart(2, "0");

    }

    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    // =================================
    // SCROLL REVEAL
    // =================================

    const sections =
        document.querySelectorAll(".screen");

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                });

            },
            {
                threshold: .18
            }
        );

    sections.forEach((section) => {

        observer.observe(section);

    });

});
