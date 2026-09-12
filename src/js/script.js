document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.getElementById("navLinks");
    const backToTop = document.getElementById("backToTop");
    const projectGrid = document.getElementById("projectGrid");
    const showAllProjects = document.getElementById("showAllProjects");
    const projectItems = [...document.querySelectorAll(".project-item")];
    const filterButtons = [...document.querySelectorAll(".filter-button")];
    let lastFocusedElement = null;

    document.getElementById("currentYear").textContent = new Date().getFullYear();

    const setNavigation = (isOpen) => {
        navLinks.classList.toggle("open", isOpen);
        navToggle.classList.toggle("active", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    };

    navToggle.addEventListener("click", () => {
        setNavigation(navToggle.getAttribute("aria-expanded") !== "true");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setNavigation(false));
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 720) setNavigation(false);
    });

    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("visible", window.scrollY > 700);
    }, { passive: true });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;

            filterButtons.forEach((item) => {
                const isActive = item === button;
                item.classList.toggle("active", isActive);
                item.setAttribute("aria-pressed", String(isActive));
            });

            projectGrid.classList.toggle("filtering", filter !== "all");

            projectItems.forEach((project) => {
                const categories = project.dataset.category.split(" ");
                project.classList.toggle("is-filtered", filter !== "all" && !categories.includes(filter));
            });

            showAllProjects.hidden = filter !== "all";
        });
    });

    showAllProjects.addEventListener("click", () => {
        const isExpanded = projectGrid.classList.toggle("show-all");
        showAllProjects.setAttribute("aria-expanded", String(isExpanded));
        showAllProjects.innerHTML = isExpanded
            ? 'Show fewer projects <span aria-hidden="true">↑</span>'
            : 'Explore all projects <span aria-hidden="true">↓</span>';
    });

    const openModal = (modal, trigger) => {
        lastFocusedElement = trigger || document.activeElement;
        modal.hidden = false;
        body.classList.add("modal-open");
        requestAnimationFrame(() => modal.querySelector(".modal-close").focus());
    };

    const closeModal = (modal) => {
        modal.hidden = true;
        body.classList.remove("modal-open");
        if (lastFocusedElement) lastFocusedElement.focus();
    };

    const projectModal = document.getElementById("projectModal");
    const projectModalImage = document.getElementById("projectModalImage");
    const projectModalTitle = document.getElementById("projectModalTitle");
    const projectModalDescription = document.getElementById("projectModalDescription");
    const projectModalTech = document.getElementById("projectModalTech");
    const projectModalLink = document.getElementById("projectModalLink");

    document.querySelectorAll(".project-hit-area").forEach((trigger) => {
        trigger.addEventListener("click", () => {
            projectModalTitle.textContent = trigger.dataset.title;
            projectModalDescription.textContent = trigger.dataset.description;
            projectModalImage.src = trigger.dataset.image;
            projectModalImage.alt = `${trigger.dataset.title} project screenshot`;
            projectModalTech.replaceChildren();

            trigger.dataset.tech.split(",").forEach((technology) => {
                const tag = document.createElement("span");
                tag.textContent = technology.trim();
                projectModalTech.appendChild(tag);
            });

            if (trigger.dataset.link) {
                projectModalLink.href = trigger.dataset.link;
                projectModalLink.textContent = trigger.dataset.linkLabel || "View project";
                projectModalLink.hidden = false;
            } else {
                projectModalLink.hidden = true;
            }

            openModal(projectModal, trigger);
        });
    });

    projectModal.querySelectorAll("[data-close-modal]").forEach((trigger) => {
        trigger.addEventListener("click", () => closeModal(projectModal));
    });

    const techModal = document.getElementById("techModal");
    document.getElementById("openTechStack").addEventListener("click", (event) => openModal(techModal, event.currentTarget));
    techModal.querySelectorAll("[data-close-tech]").forEach((trigger) => {
        trigger.addEventListener("click", () => closeModal(techModal));
    });

    const contactModal = document.getElementById("contactModal");
    document.querySelectorAll(".open-contact").forEach((trigger) => {
        trigger.addEventListener("click", () => {
            setNavigation(false);
            openModal(contactModal, trigger);
        });
    });
    contactModal.querySelectorAll("[data-close-contact]").forEach((trigger) => {
        trigger.addEventListener("click", () => closeModal(contactModal));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        [projectModal, techModal, contactModal].forEach((modal) => {
            if (!modal.hidden) closeModal(modal);
        });
        setNavigation(false);
    });
});
