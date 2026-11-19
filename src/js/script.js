document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.getElementById("navLinks");
    const siteHeader = document.querySelector(".site-header");
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
        siteHeader.classList.toggle("scrolled", window.scrollY > 80);
        backToTop.classList.toggle("visible", window.scrollY > 700);
    }, { passive: true });

    siteHeader.classList.toggle("scrolled", window.scrollY > 80);

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
        modal.querySelector(".modal-card").scrollTop = 0;
        body.classList.add("modal-open");
        requestAnimationFrame(() => modal.querySelector(".modal-close").focus());
    };

    const closeModal = (modal) => {
        modal.hidden = true;
        if (modal.id === "projectModal") stopProjectGalleryAutoplay();
        body.classList.remove("modal-open");
        if (lastFocusedElement) lastFocusedElement.focus();
    };

    const projectModal = document.getElementById("projectModal");
    const projectModalImage = document.getElementById("projectModalImage");
    const projectModalTitle = document.getElementById("projectModalTitle");
    const projectModalDescription = document.getElementById("projectModalDescription");
    const projectGalleryMain = document.getElementById("projectGalleryMain");
    const projectGalleryPrevious = document.getElementById("projectGalleryPrevious");
    const projectGalleryNext = document.getElementById("projectGalleryNext");
    const projectGalleryCounter = document.getElementById("projectGalleryCounter");
    const projectGalleryThumbnails = document.getElementById("projectGalleryThumbnails");
    const projectGalleryCaption = document.getElementById("projectGalleryCaption");
    const projectGalleryPageTitle = document.getElementById("projectGalleryPageTitle");
    const projectGalleryPageDescription = document.getElementById("projectGalleryPageDescription");
    const projectGalleryPagePurpose = document.getElementById("projectGalleryPagePurpose");
    const projectDetailSections = document.getElementById("projectDetailSections");
    const projectModalFeatures = document.getElementById("projectModalFeatures");
    const projectModalResponsibilities = document.getElementById("projectModalResponsibilities");
    const projectModalTech = document.getElementById("projectModalTech");
    const projectModalLink = document.getElementById("projectModalLink");
    const projectGalleries = {
        sharpsuite: [
            {
                image: "resources/images/project-image/wordpress/sharpsuite-wordpress-home.png",
                title: "Homepage",
                description: "Presents Sharpsuite's business-support promise, global reach, and four immediate business outcomes.",
                purpose: "Help decision-makers understand the value quickly and move toward a free consultation or service exploration."
            },
            {
                image: "resources/images/project-image/wordpress/sharpsuite-services.png",
                title: "Services catalogue",
                description: "Organises seven support areas, including IT, recruitment, finance, marketing, customer service, sales, and administration.",
                purpose: "Make a broad offer easy to scan and guide visitors into the service most relevant to their operational needs."
            },
            {
                image: "resources/images/project-image/wordpress/sharpsuite-industries.png",
                title: "Industries hub",
                description: "Connects Sharpsuite services to sector-specific workflows across hospitality, finance, digital, logistics, healthcare, HR, IT, and more.",
                purpose: "Show prospective clients that support can be shaped around the terminology, processes, and pressures of their industry."
            },
            {
                image: "resources/images/project-image/wordpress/sharpsuite-about.png",
                title: "About the company",
                description: "Explains the company model, global talent network, practical business-support approach, and the team behind delivery.",
                purpose: "Build trust by clarifying who Sharpsuite is, how it works, and why its cross-border staffing model supports sustainable growth."
            }
        ],
        tenfreight: [
            {
                image: "resources/images/project-image/wordpress/tenfreight-wordpress-home.png",
                title: "Homepage",
                description: "Positions TenFreight as an Australia-wide freight-management partner and highlights the portal and contact journeys.",
                purpose: "Communicate the core offer immediately and move shippers toward a quote, support, or portal action."
            },
            {
                image: "resources/images/project-image/wordpress/tenfreight-road-freight.png",
                title: "Road freight service",
                description: "Explains nationwide road-freight coverage, delivery options, tracking, pricing, and specialised transport capabilities.",
                purpose: "Give potential customers enough detail to evaluate the service and understand how it fits their shipment needs."
            },
            {
                image: "resources/images/project-image/wordpress/tenfreight-about.png",
                title: "About the company",
                description: "Introduces TenFreight's carrier network, office locations, logistics expertise, industries served, and service commitments.",
                purpose: "Establish credibility and reassure businesses that the provider has the network, experience, and support model to handle their freight."
            },
            {
                image: "resources/images/project-image/wordpress/tenfreight-knowledge-base.png",
                title: "Customer knowledge base",
                description: "Organises practical articles on surcharges, volumetric weight, dangerous goods, wait times, fuel levies, and freight charges.",
                purpose: "Help customers understand common logistics costs and rules while reducing repetitive support questions."
            }
        ],
        tenfreightV2: [
            {
                image: "resources/images/project-image/tenfreight-v2/portal-home.jpg",
                title: "Freight portal homepage",
                description: "Introduces the customer portal as a single workspace for quoting, booking, monitoring, and managing Australian freight.",
                purpose: "Give visitors immediate confidence in the platform and direct them toward tracking, support, sign-in, or account creation."
            },
            {
                image: "resources/images/project-image/tenfreight-v2/instant-quote.jpg",
                title: "Guided shipment quote",
                description: "Starts a four-step booking journey with route details, handling methods, freight items, and an at-a-glance shipment summary.",
                purpose: "Turn a complex freight request into a clear, validated workflow before carrier pricing is requested."
            },
            {
                image: "resources/images/project-image/tenfreight-v2/quote-request.jpg",
                title: "Standard quote request",
                description: "Captures pickup and delivery suburbs, loading requirements, item dimensions, weight, volume, quantity, and dangerous-goods status.",
                purpose: "Collect the operational details needed to compare suitable carrier services and produce dependable freight estimates."
            },
            {
                image: "resources/images/project-image/tenfreight-v2/shipment-tracking.jpg",
                title: "Public shipment tracking",
                description: "Lets customers check a consignment using its reference number or scan the QR code supplied on a booking receipt.",
                purpose: "Provide fast shipment visibility without requiring an account or a call to the operations team."
            },
            {
                image: "resources/images/project-image/tenfreight-v2/customer-support.jpg",
                title: "Customer support request",
                description: "Collects contact information, support category, consignment reference, subject, and a detailed customer message in one secure form.",
                purpose: "Route each enquiry to the support team with enough context to investigate and respond efficiently."
            },
            {
                image: "resources/images/project-image/tenfreight-v2/secure-sign-in.jpg",
                title: "Secure portal sign-in",
                description: "Provides a focused entry point for customers and staff, with password recovery, account creation, and terms access close at hand.",
                purpose: "Protect account-specific freight data while keeping the most common access actions easy to find."
            },
            {
                image: "resources/images/project-image/tenfreight-v2/account-registration.jpg",
                title: "Customer account registration",
                description: "Registers a shipper with personal, company, address, suburb, phone, email, password, and terms-confirmation details.",
                purpose: "Create a structured customer profile that can support personalized quotes, bookings, records, and ongoing service."
            },
            {
                image: "resources/images/project-image/tenfreight-v2/password-recovery.jpg",
                title: "Password recovery",
                description: "Combines email verification, a time-sensitive verification code, and new-password confirmation in one recovery flow.",
                purpose: "Help authorized users restore portal access without exposing credentials or relying on manual support intervention."
            }
        ],
        celestialMeadows: [
            {
                image: "resources/images/project-image/celestial-meadows/hr-dashboard.jpg",
                title: "HR operations dashboard",
                description: "Brings attendance, leave activity, workforce totals, pending actions, trends, and company updates into one operational view.",
                purpose: "Give HR leaders a fast daily overview and clear paths into the workflows that need attention."
            },
            {
                image: "resources/images/project-image/celestial-meadows/employee-management.jpg",
                title: "Staff management",
                description: "Provides a searchable employee and administrator directory with department, role, status, and account-level quick actions.",
                purpose: "Centralize workforce records and make routine employee administration faster and easier to audit."
            },
            {
                image: "resources/images/project-image/celestial-meadows/benefits-management.jpg",
                title: "Benefits management",
                description: "Organizes benefit plans, employee enrollments, claims, providers, dependents, contributions, and recent requests.",
                purpose: "Replace fragmented benefit tracking with one structured workflow for administrators and employees."
            },
            {
                image: "resources/images/project-image/celestial-meadows/government-compliance.jpg",
                title: "Government compliance",
                description: "Tracks statutory obligations, remittances, employee and employer contributions, filing readiness, and upcoming deadlines.",
                purpose: "Help payroll teams prepare filings accurately and see compliance risks before deadlines are missed."
            },
            {
                image: "resources/images/project-image/celestial-meadows/user-administration.jpg",
                title: "User administration",
                description: "Manages portal accounts, verification, activation, category, department, lockout status, and recent access information.",
                purpose: "Give authorized administrators clear control over account lifecycle and platform security."
            },
            {
                image: "resources/images/project-image/celestial-meadows/branches-devices.jpg",
                title: "Branches and devices",
                description: "Maintains company workplaces, branch details, registered devices, assignments, and location-aware attendance settings.",
                purpose: "Connect access and attendance rules to approved offices and trusted workplace devices."
            },
            {
                image: "resources/images/project-image/celestial-meadows/company-setup.jpg",
                title: "Company setup and branding",
                description: "Configures company identity, portal branding, business details, and the visual experience used across the platform.",
                purpose: "Let each organization manage a consistent portal identity without changing application code."
            },
            {
                image: "resources/images/project-image/celestial-meadows/help-support.jpg",
                title: "Help and support",
                description: "Combines a searchable user manual with a private support-ticket queue, attachments, status tracking, and replies.",
                purpose: "Give employees a dependable self-service path while keeping unresolved issues visible to support teams."
            },
            {
                image: "resources/images/project-image/celestial-meadows/memorial-real-estate.jpg",
                title: "Memorial real-estate workspace",
                description: "Groups sales contracts, collections, commissions, customer inquiries, operational processes, and management reports.",
                purpose: "Bring the company's specialized property operations into the same secure enterprise platform."
            },
            {
                image: "resources/images/project-image/celestial-meadows/feature-catalog.jpg",
                title: "Feature catalog",
                description: "Organizes platform modules and company entitlements so administrators can understand which capabilities are available.",
                purpose: "Support a modular rollout where features can be governed as the organization and product plan evolve."
            }
        ]
    };
    let activeProjectGallery = [];
    let activeGalleryIndex = 0;
    let projectGalleryAutoplayTimer = null;

    const stopProjectGalleryAutoplay = () => {
        window.clearTimeout(projectGalleryAutoplayTimer);
        projectGalleryAutoplayTimer = null;
    };

    const scheduleProjectGalleryAutoplay = () => {
        stopProjectGalleryAutoplay();
        if (activeProjectGallery.length < 2 || projectModal.hidden || document.hidden) return;
        projectGalleryAutoplayTimer = window.setTimeout(() => {
            showAdjacentGallerySlide(1, false);
            scheduleProjectGalleryAutoplay();
        }, 5000);
    };

    const renderProjectGallery = () => {
        const slide = activeProjectGallery[activeGalleryIndex];
        const hasMultipleSlides = activeProjectGallery.length > 1;
        projectModalImage.src = slide.image;
        projectModalImage.alt = `${slide.title} screenshot`;
        projectGalleryMain.disabled = !hasMultipleSlides;
        projectGalleryMain.setAttribute("aria-label", hasMultipleSlides ? `View next screenshot after ${slide.title}` : slide.title);
        projectGalleryPrevious.hidden = !hasMultipleSlides;
        projectGalleryNext.hidden = !hasMultipleSlides;
        projectGalleryCounter.hidden = !hasMultipleSlides;
        projectGalleryCounter.textContent = `${activeGalleryIndex + 1} of ${activeProjectGallery.length}`;
        projectGalleryCaption.hidden = !slide.description;
        projectGalleryPageTitle.textContent = slide.title;
        projectGalleryPageDescription.textContent = slide.description || "";
        projectGalleryPagePurpose.textContent = slide.purpose || "";
        projectGalleryThumbnails.hidden = !hasMultipleSlides;

        [...projectGalleryThumbnails.children].forEach((thumbnail, index) => {
            thumbnail.classList.toggle("active", index === activeGalleryIndex);
            thumbnail.setAttribute("aria-pressed", String(index === activeGalleryIndex));
        });
    };

    const buildProjectGalleryThumbnails = () => {
        projectGalleryThumbnails.replaceChildren();
        activeProjectGallery.forEach((gallerySlide, index) => {
            const thumbnail = document.createElement("button");
            const thumbnailImage = document.createElement("img");
            thumbnail.type = "button";
            thumbnail.className = "project-gallery-thumbnail";
            thumbnail.setAttribute("aria-label", `View ${gallerySlide.title} screenshot`);
            thumbnailImage.src = gallerySlide.image;
            thumbnailImage.alt = "";
            thumbnail.appendChild(thumbnailImage);
            thumbnail.addEventListener("click", () => {
                activeGalleryIndex = index;
                renderProjectGallery();
                projectModal.querySelector(".modal-card").scrollTop = 0;
                scheduleProjectGalleryAutoplay();
            });
            projectGalleryThumbnails.appendChild(thumbnail);
        });
    };

    const showAdjacentGallerySlide = (direction, restartAutoplay = true) => {
        activeGalleryIndex = (activeGalleryIndex + direction + activeProjectGallery.length) % activeProjectGallery.length;
        renderProjectGallery();
        projectModal.querySelector(".modal-card").scrollTop = 0;
        if (restartAutoplay) scheduleProjectGalleryAutoplay();
    };

    projectGalleryPrevious.addEventListener("click", () => showAdjacentGallerySlide(-1));
    projectGalleryNext.addEventListener("click", () => showAdjacentGallerySlide(1));
    projectGalleryMain.addEventListener("click", () => {
        if (activeProjectGallery.length > 1) showAdjacentGallerySlide(1);
    });

    const populateProjectList = (list, values) => {
        list.replaceChildren();
        values.forEach((value) => {
            const item = document.createElement("li");
            item.textContent = value.trim();
            list.appendChild(item);
        });
    };

    document.querySelectorAll(".project-hit-area").forEach((trigger) => {
        trigger.addEventListener("click", () => {
            projectModalTitle.textContent = trigger.dataset.title;
            projectModalDescription.textContent = trigger.dataset.description;
            activeProjectGallery = projectGalleries[trigger.dataset.gallery] || [{
                image: trigger.dataset.image,
                title: trigger.dataset.title,
                description: "",
                purpose: ""
            }];
            activeGalleryIndex = 0;
            buildProjectGalleryThumbnails();
            renderProjectGallery();
            projectModalTech.replaceChildren();

            const features = trigger.dataset.features?.split("|").filter(Boolean) || [];
            const responsibilities = trigger.dataset.responsibilities?.split("|").filter(Boolean) || [];
            populateProjectList(projectModalFeatures, features);
            populateProjectList(projectModalResponsibilities, responsibilities);
            projectDetailSections.hidden = features.length === 0 && responsibilities.length === 0;

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
            scheduleProjectGalleryAutoplay();
        });
    });

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopProjectGalleryAutoplay();
        else if (!projectModal.hidden) scheduleProjectGalleryAutoplay();
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
