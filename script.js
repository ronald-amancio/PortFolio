/*
document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        const url = card.getAttribute("data-url");
        window.open(url, "_blank");
    });
});
*/

document.addEventListener("DOMContentLoaded", function () {

    // Card Redirect
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => {
            const url = card.getAttribute("data-url");
            window.open(url, "_blank");
        });
    });

    // Theme Toggle
    const toggleBtn = document.getElementById("themeToggle");

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
        toggleBtn.textContent = "☀️";
    }

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");

        if (document.body.classList.contains("light-mode")) {
            toggleBtn.textContent = "☀️";
            localStorage.setItem("theme", "light");
        } else {
            toggleBtn.textContent = "🌙";
            localStorage.setItem("theme", "dark");
        }
    });

    const bars = document.querySelectorAll(".progress-bar");

    function animateSkills() {
        bars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                bar.style.width = bar.getAttribute("data-width");
            }
        });
    }

    window.addEventListener("scroll", animateSkills);

    const sections = document.querySelectorAll(".section");

    function revealOnScroll() {
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                sec.style.opacity = 1;
                sec.style.transform = "translateY(0)";
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);

    window.toggleSection = function (id) {
    const section = document.getElementById(id);

    // Close other sections
    document.querySelectorAll(".collapsible").forEach(sec => {
        if (sec.id !== id) {
            sec.classList.remove("active");
        }
    });

    // Toggle selected
    section.classList.toggle("active");

    // Smooth scroll to it
    if (section.classList.contains("active")) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    /* Scroll to top with hide/showing avatar */
    const avatar = document.querySelector(".avatar-container");
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {

        const scrollPosition = window.scrollY;
        const pageHeight = document.body.scrollHeight - window.innerHeight;

        const hero = document.querySelector(".hero");
        const heroBottom = hero.getBoundingClientRect().bottom;

        // 50% scroll trigger
        //if (scrollPosition > pageHeight * 0.5) {
        if (heroBottom <= 0) {
            avatar.classList.add("show-avatar");
            backToTop.classList.add("show-top");
        } else {
            avatar.classList.remove("show-avatar");
            backToTop.classList.remove("show-top");
        }
    });

    // Back to top click
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    //Profile Image
    const profileImage = "resources/images/profile/prof-pic.jpg";

    document.getElementById("heroAvatar").src = profileImage;
    document.getElementById("navAvatar").src = profileImage;
});