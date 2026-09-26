/* =========================================================
   JANVI PORTFOLIO — 3D + AI VOICE ASSISTANT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const reduceMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    /* =====================================================
       LOADER
    ===================================================== */

    const loader = document.getElementById("loader");

    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.classList.add("hide");
            }, 700);
        });
    }


    /* =====================================================
       NAVBAR
    ===================================================== */

    const navbar = document.getElementById("navbar");

    function updateNavbar() {
        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );
    }

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /* =====================================================
       3-DOT MENU
    ===================================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const navMenu =
        document.getElementById("navMenu");


    function closeMenu() {

        if (!navMenu || !menuBtn) return;

        navMenu.classList.remove("open");

        menuBtn.classList.remove("active");

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );
    }


    if (menuBtn && navMenu) {

        menuBtn.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                const open =
                    navMenu.classList.toggle("open");

                menuBtn.classList.toggle(
                    "active",
                    open
                );

                menuBtn.setAttribute(
                    "aria-expanded",
                    String(open)
                );
            }
        );


        document
            .querySelectorAll(".nav-menu a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            });


        document.addEventListener(
            "click",
            (event) => {

                if (
                    !navMenu.contains(event.target) &&
                    !menuBtn.contains(event.target)
                ) {
                    closeMenu();
                }

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (
        !reduceMotion &&
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries, obs) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            obs.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach((element) => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       FOOTER YEAR
    ===================================================== */

    const year =
        document.getElementById("year");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       3D CARD TILT
    ===================================================== */

    function addTilt(selector, maxRotate = 6) {

        if (reduceMotion) return;

        document
            .querySelectorAll(selector)
            .forEach((card) => {

                card.addEventListener(
                    "pointermove",
                    (event) => {

                        if (
                            window.innerWidth <= 700
                        ) return;


                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            (event.clientX -
                                rect.left) /
                            rect.width;


                        const y =
                            (event.clientY -
                                rect.top) /
                            rect.height;


                        const rotateY =
                            (x - 0.5) *
                            maxRotate *
                            2;


                        const rotateX =
                            (0.5 - y) *
                            maxRotate *
                            2;


                        card.style.transform =
                            `perspective(1100px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             translateY(-6px)
                             scale(1.01)`;

                    }
                );


                card.addEventListener(
                    "pointerleave",
                    () => {
                        card.style.transform = "";
                    }
                );

            });
    }


    addTilt(".skill-card", 6);
    addTilt(".project-card", 4);
    addTilt(".stat-card", 5);
    addTilt(".timeline-content", 4);
    addTilt(".certificate", 5);
    addTilt(".big-contact", 3);


    /* =====================================================
       HERO 3D PARALLAX
    ===================================================== */

    const hero =
        document.querySelector(".hero");

    const scene =
        document.querySelector(".scene");


    if (
        hero &&
        scene &&
        !reduceMotion
    ) {

        hero.addEventListener(
            "pointermove",
            (event) => {

                if (window.innerWidth <= 900) {
                    return;
                }


                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width -
                    0.5;


                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height -
                    0.5;


                scene.style.transform =
                    `rotateX(${-y * 7}deg)
                     rotateY(${x * 9}deg)`;

            }
        );


        hero.addEventListener(
            "pointerleave",
            () => {
                scene.style.transform = "";
            }
        );

    }


    /* =====================================================
       CHATBOT
    ===================================================== */

    const aiButton =
        document.getElementById("aiButton");

    const chatbot =
        document.getElementById("chatbot");

    const closeChat =
        document.getElementById("closeChat");

    const chatBody =
        document.getElementById("chatBody");

    const chatForm =
        document.getElementById("chatForm");

    const chatInput =
        document.getElementById("chatInput");


    /* =====================================================
       OPEN / CLOSE CHAT
    ===================================================== */

    function openChat() {

        if (!chatbot) return;

        chatbot.classList.add("open");

        if (chatInput) {

            setTimeout(() => {
                chatInput.focus();
            }, 250);

        }
    }


    function closeChatBox() {

        if (!chatbot) return;

        chatbot.classList.remove("open");

        stopSpeaking();

    }


    if (aiButton) {

        aiButton.addEventListener(
            "click",
            () => {

                if (
                    chatbot.classList.contains(
                        "open"
                    )
                ) {
                    closeChatBox();
                } else {
                    openChat();
                }

            }
        );

    }


    if (closeChat) {

        closeChat.addEventListener(
            "click",
            closeChatBox
        );

    }


    /* =====================================================
       PORTFOLIO AI ANSWERS
    ===================================================== */

    function getBotAnswer(message) {

        const text =
            message.toLowerCase().trim();


        if (
            text.includes("skill") ||
            text.includes("skills") ||
            text.includes("technology") ||
            text.includes("tech")
        ) {

            return (
                "Janvi's portfolio showcases skills " +
                "in C, C++, Java, Python, HTML, CSS, " +
                "JavaScript, MySQL, AI fundamentals " +
                "and GitHub."
            );
        }


        if (
            text.includes("project") ||
            text.includes("projects") ||
            text.includes("work")
        ) {

            return (
                "Janvi's portfolio includes four main " +
                "projects: Java Project, Cloud Computing " +
                "Project, Online Library Management System " +
                "and Linux Project."
            );
        }


        if (
            text.includes("java")
        ) {

            return (
                "The Java Project focuses on object " +
                "oriented programming, application logic " +
                "and practical Java development."
            );
        }


        if (
            text.includes("cloud")
        ) {

            return (
                "The Cloud Computing Project explores " +
                "cloud concepts, scalable services, " +
                "deployment and modern infrastructure."
            );
        }


        if (
            text.includes("library")
        ) {

            return (
                "The Online Library Management System " +
                "is designed to manage books, users, " +
                "issue and return records and library data."
            );
        }


        if (
            text.includes("linux")
        ) {

            return (
                "The Linux Project focuses on command line " +
                "workflows, file management, system " +
                "operations and shell based tasks."
            );
        }


        if (
            text.includes("education") ||
            text.includes("study") ||
            text.includes("college")
        ) {

            return (
                "Janvi has a Diploma in Computer Science " +
                "Engineering from Centurion University " +
                "of Technology and Management, Odisha."
            );
        }


        if (
            text.includes("resume") ||
            text.includes("cv")
        ) {

            return (
                "You can download Janvi's resume using " +
                "the Resume button in the portfolio."
            );
        }


        if (
            text.includes("contact") ||
            text.includes("email") ||
            text.includes("mail") ||
            text.includes("whatsapp")
        ) {

            return (
                "You can contact Janvi using the WhatsApp " +
                "and Gmail buttons in the Let's Connect " +
                "section of the portfolio."
            );
        }


        if (
            text.includes("about") ||
            text.includes("janvi")
        ) {

            return (
                "This is Janvi's personal portfolio. " +
                "It showcases her profile, technical skills, " +
                "projects, education, certificates and " +
                "contact information."
            );
        }


        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey")
        ) {

            return (
                "Hi! I'm Janvi's portfolio assistant. " +
                "You can ask me about her skills, projects, " +
                "education, resume or contact details."
            );
        }


        return (
            "I can tell you about Janvi's portfolio, " +
            "skills, projects, education, resume " +
            "and contact information."
        );
    }


    /* =====================================================
       TEXT TO SPEECH
    ===================================================== */

    let speaking = false;


    function speakText(text) {

        if (
            !("speechSynthesis" in window)
        ) {
            return;
        }


        window.speechSynthesis.cancel();


        const speech =
            new SpeechSynthesisUtterance(text);


        speech.lang = "en-IN";
        speech.rate = 0.95;
        speech.pitch = 1.05;
        speech.volume = 1;


        speech.onstart = () => {

            speaking = true;

            if (chatbot) {
                chatbot.classList.add(
                    "speaking"
                );
            }
        };


        speech.onend = () => {

            speaking = false;

            if (chatbot) {
                chatbot.classList.remove(
                    "speaking"
                );
            }
        };


        speech.onerror = () => {

            speaking = false;

            if (chatbot) {
                chatbot.classList.remove(
                    "speaking"
                );
            }
        };


        window.speechSynthesis.speak(
            speech
        );
    }


    function stopSpeaking() {

        if (
            "speechSynthesis" in window
        ) {

            window.speechSynthesis.cancel();

        }

        speaking = false;

        if (chatbot) {
            chatbot.classList.remove(
                "speaking"
            );
        }
    }


    /* =====================================================
       ADD CHAT MESSAGE
    ===================================================== */

    function addMessage(
        message,
        type,
        shouldSpeak = false
    ) {

        if (!chatBody) return;


        const div =
            document.createElement("div");


        div.className =
            type === "user"
                ? "user-message"
                : "bot-message";


        div.textContent = message;


        chatBody.appendChild(div);


        chatBody.scrollTop =
            chatBody.scrollHeight;


        if (
            type === "bot" &&
            shouldSpeak
        ) {

            speakText(message);

        }
    }


    /* =====================================================
       CHAT FORM
    ===================================================== */

    if (
        chatForm &&
        chatInput
    ) {

        chatForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const message =
                    chatInput.value.trim();


                if (!message) return;


                addMessage(
                    message,
                    "user"
                );


                chatInput.value = "";


                setTimeout(
                    () => {

                        const answer =
                            getBotAnswer(
                                message
                            );


                        addMessage(
                            answer,
                            "bot",
                            true
                        );

                    },
                    400
                );

            }
        );

    }


    /* =====================================================
       MICROPHONE / SPEECH RECOGNITION
    ===================================================== */

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (
        chatForm &&
        chatInput &&
        SpeechRecognition
    ) {

        const micButton =
            document.createElement("button");


        micButton.type = "button";
        micButton.className = "mic-btn";
        micButton.id = "micButton";
        micButton.setAttribute(
            "aria-label",
            "Talk to Janvi Assistant"
        );
        micButton.innerHTML = "🎙️";


        chatForm.insertBefore(
            micButton,
            chatForm.querySelector(
                'button[type="submit"]'
            )
        );


        const recognition =
            new SpeechRecognition();


        recognition.lang = "en-IN";
        recognition.continuous = false;
        recognition.interimResults = false;


        let listening = false;


        micButton.addEventListener(
            "click",
            () => {

                if (listening) {

                    recognition.stop();

                    return;

                }


                try {

                    recognition.start();

                } catch (error) {

                    console.log(
                        "Microphone is already active."
                    );

                }

            }
        );


        recognition.onstart = () => {

            listening = true;

            micButton.classList.add(
                "listening"
            );

            micButton.innerHTML = "🔴";

            chatInput.placeholder =
                "Listening... speak now";

        };


        recognition.onresult = (event) => {

            const transcript =
                event.results[0][0]
                    .transcript
                    .trim();


            if (!transcript) return;


            chatInput.value =
                transcript;


            addMessage(
                transcript,
                "user"
            );


            setTimeout(
                () => {

                    const answer =
                        getBotAnswer(
                            transcript
                        );


                    addMessage(
                        answer,
                        "bot",
                        true
                    );

                },
                400
            );

        };


        recognition.onerror = (event) => {

            console.log(
                "Microphone:",
                event.error
            );

            micButton.classList.remove(
                "listening"
            );

            micButton.innerHTML = "🎙️";

            chatInput.placeholder =
                "Ask something...";

            listening = false;

        };


        recognition.onend = () => {

            listening = false;

            micButton.classList.remove(
                "listening"
            );

            micButton.innerHTML = "🎙️";

            chatInput.placeholder =
                "Ask something...";

        };

    }


    /* =====================================================
       QUICK QUESTIONS
    ===================================================== */

    document
        .querySelectorAll(
            ".quick-questions button"
        )
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const questionMap = {

                        skills:
                            "What are Janvi's skills?",

                        projects:
                            "What projects has Janvi made?",

                        education:
                            "What is Janvi's education?",

                        contact:
                            "How can I contact Janvi?"

                    };


                    const message =
                        questionMap[
                            button.dataset.question
                        ];


                    if (!message) return;


                    addMessage(
                        message,
                        "user"
                    );


                    setTimeout(
                        () => {

                            const answer =
                                getBotAnswer(
                                    message
                                );


                            addMessage(
                                answer,
                                "bot",
                                true
                            );

                        },
                        350
                    );

                }
            );

        });


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeMenu();
                closeChatBox();

            }

        }
    );

});