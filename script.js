let currentIndex = 0;

document.addEventListener("DOMContentLoaded", function () 
{
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

    const heroAvatar = document.getElementById("heroAvatar");
    const navAvatar = document.getElementById("navAvatar");

    if (heroAvatar) heroAvatar.src = profileImage;
    if (navAvatar) navAvatar.src = profileImage;

    //Bio
    window.scrollToBio = function () {
        document.getElementById("bio").scrollIntoView({
            behavior: "smooth"
        });
    };

    //Hamburger Menu
    window.toggleMenu = function () {
        const nav = document.querySelector(".nav-links");
        const burger = document.querySelector(".hamburger");

        nav.classList.toggle("active");
        burger.classList.toggle("active");
    };

    window.addEventListener("resize", () => {
        currentIndex = 0;
        const track = document.querySelector(".carousel-track");
        if (track) track.style.transform = "translateX(0)";

        if (window.innerWidth > 900) {
            document.querySelector(".nav-links").classList.remove("active");
            document.querySelector(".hamburger").classList.remove("active");
        }
    });

    /* Carousel */
    //let currentIndex = 0;

    window.addEventListener("load", () => {

        const track = document.querySelector(".carousel-track");
        const cards = document.querySelectorAll(".carousel-track .project-card");

        if (!track || cards.length === 0) return;

        const visibleSlides = window.innerWidth <= 768 ? 1 : 2;

        // Clone first & last slides
        for (let i = 0; i < visibleSlides; i++) {
            const firstClone = cards[i].cloneNode(true);
            const lastClone = cards[cards.length - 1 - i].cloneNode(true);

            track.appendChild(firstClone);
            track.insertBefore(lastClone, track.firstChild);
        }

        const allCards = document.querySelectorAll(".carousel-track .project-card");

        const slideWidth = allCards[0].getBoundingClientRect().width;

        currentIndex = visibleSlides;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        window.moveSlide = function(direction) {

            currentIndex += direction;
            track.style.transition = "transform 0.5s ease";
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

            setTimeout(() => {

                if (currentIndex >= allCards.length - visibleSlides) {
                    track.style.transition = "none";
                    currentIndex = visibleSlides;
                    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
                }

                if (currentIndex <= 0) {
                    track.style.transition = "none";
                    currentIndex = allCards.length - (visibleSlides * 2);
                    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
                }

            }, 500);
        };

        setInterval(() => {
            moveSlide(1);
        }, 5000);
    });

    //Modal Popup
    const modal = document.getElementById("projectModal");

    document.querySelectorAll(".carousel-track .project-card").forEach(card => {
        card.addEventListener("click", function () {

            document.getElementById("modalTitle").textContent = this.dataset.title;
            document.getElementById("modalImage").src = this.dataset.image;
            document.getElementById("modalTech").textContent = "Tech Stack: " + this.dataset.tech;

            // ===== SEE MORE LOGIC HERE =====
            const descriptionElement = document.getElementById("modalDescription");
            const toggleBtn = document.getElementById("toggleDescription");

            const fullText = this.dataset.description;
            const maxLength = window.innerWidth <= 768 ? 120 : 250;

            if (fullText.length > maxLength) {

                let isExpanded = false;

                descriptionElement.textContent = fullText.substring(0, maxLength) + "...";
                toggleBtn.textContent = "See More";
                toggleBtn.style.display = "inline";

                toggleBtn.onclick = function () {
 
                    if (!isExpanded) {
                        descriptionElement.textContent = fullText;
                        toggleBtn.textContent = "See Less";
                    } else {
                        descriptionElement.textContent = fullText.substring(0, maxLength) + "...";
                        toggleBtn.textContent = "See More";
                    }

                    isExpanded = !isExpanded;
                };

            } else {
                descriptionElement.textContent = fullText;
                toggleBtn.style.display = "none";
            }

            modal.classList.add("active");
        });
    });

    window.closeModal = function () {
        modal.classList.remove("active");
    };

    // Close when clicking outside
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });
});