/* =====================================================
   JANVI PORTFOLIO JAVASCRIPT
===================================================== */


/* ================= LOADER ================= */

window.addEventListener("load", () => {

    const loader =
        document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("hide");

    }, 700);

});


/* ================= NAVBAR ================= */

const navbar =
    document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* ================= MOBILE MENU ================= */

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");


menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("open");

});


/* Close menu after clicking link */

const navLinks =
    document.querySelectorAll(".nav-menu a");


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

    });

});


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach((element) => {

    observer.observe(element);

});


/* ================= FOOTER YEAR ================= */

document.getElementById("year")
    .textContent =
    new Date().getFullYear();


/* ================= CHATBOT ================= */

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


/* Open chatbot */

aiButton.addEventListener("click", () => {

    chatbot.classList.toggle("open");

});


/* Close chatbot */

closeChat.addEventListener("click", () => {

    chatbot.classList.remove("open");

});


/* ================= BOT ANSWERS ================= */

function getBotAnswer(message) {

    const text =
        message.toLowerCase();


    if (
        text.includes("skill") ||
        text.includes("technology") ||
        text.includes("tech")
    ) {

        return `
        Janvi has knowledge of C/C++, Java,
        Python, HTML, CSS, JavaScript,
        MySQL, AI fundamentals and Git/GitHub.
        `;

    }


    if (
        text.includes("project") ||
        text.includes("work")
    ) {

        return `
        Janvi's portfolio includes projects such as
        Student Result Management System,
        Online Library Management System,
        AI-Based Chatbot and Personal Portfolio Website.
        `;

    }


    if (
        text.includes("education") ||
        text.includes("study") ||
        text.includes("college")
    ) {

        return `
        Janvi has a Diploma in Computer Science
        Engineering from Centurion University of
        Technology and Management, Odisha.
        `;

    }


    if (
        text.includes("contact") ||
        text.includes("email") ||
        text.includes("mail")
    ) {

        return `
        You can contact Janvi through
        jk0432072@gmail.com.
        `;

    }


    if (
        text.includes("whatsapp") ||
        text.includes("phone") ||
        text.includes("number")
    ) {

        return `
        You can contact Janvi directly on WhatsApp
        using the green WhatsApp button on this website.
        `;

    }


    if (
        text.includes("resume") ||
        text.includes("cv")
    ) {

        return `
        You can download Janvi's resume using
        the Download Resume button on this website.
        `;

    }


    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return `
        Hi! 👋
        I'm Janvi's portfolio assistant.
        You can ask me about her skills,
        projects, education or contact details.
        `;

    }


    return `
    I can help you with information about
    Janvi's skills, projects, education,
    resume and contact details.
    `;

}


/* ================= ADD MESSAGE ================= */

function addMessage(
    message,
    type
) {

    const div =
        document.createElement("div");

    div.className =
        type === "user"
            ? "user-message"
            : "bot-message";

    div.innerHTML =
        message;

    chatBody.appendChild(div);

    chatBody.scrollTop =
        chatBody.scrollHeight;

}


/* ================= CHAT FORM ================= */

chatForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const message =
            chatInput.value.trim();


        if (!message) {

            return;

        }


        addMessage(
            message,
            "user"
        );


        chatInput.value = "";


        setTimeout(() => {

            const answer =
                getBotAnswer(message);

            addMessage(
                answer,
                "bot"
            );

        }, 500);

    }
);


/* ================= QUICK QUESTIONS ================= */

const quickButtons =
    document.querySelectorAll(
        ".quick-questions button"
    );


quickButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const question =
                button.dataset.question;


            let message = "";


            if (question === "skills") {

                message =
                    "What are Janvi's skills?";

            }

            if (question === "projects") {

                message =
                    "What projects has Janvi made?";

            }

            if (question === "education") {

                message =
                    "What is Janvi's education?";

            }

            if (question === "contact") {

                message =
                    "How can I contact Janvi?";

            }


            addMessage(
                message,
                "user"
            );


            setTimeout(() => {

                addMessage(
                    getBotAnswer(message),
                    "bot"
                );

            }, 400);

        }
    );

});