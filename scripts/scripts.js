/* =========================
   VÉRA ESTATES
   EXTERNAL JAVASCRIPT
========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------
       Page loader
    ------------------------- */

    window.addEventListener("load", () => {
        setTimeout(()=>{
          document.body.classList.add("loaded");
         },600);
       });


    /* -------------------------
       Scroll reveal
    ------------------------- */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }


    /* -------------------------
       Header scroll state
    ------------------------- */

    const header = document.querySelector(".site-header");

    const updateHeader = () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* -------------------------
       Scroll progress
    ------------------------- */

    const progressBar = document.querySelector(".scroll-progress");

    const updateScrollProgress = () => {

        const pageHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        if (pageHeight <= 0) {
            progressBar.style.width = "0";
            return;
        }

        const progress =
            (window.scrollY / pageHeight) * 100;

        progressBar.style.width = `${progress}%`;
    };

    updateScrollProgress();

    window.addEventListener("scroll", updateScrollProgress, {
        passive: true
    });


    /* =========================
       PROPERTY DATA
    ========================= */

    const properties = [
        {
            name: "The Azure House",
            location: "LAGOS · LEKKI",
            
            image: "images/property-1.jpg",
            bedrooms: "04",
            bathrooms: "05",
            size: "620",
            descriptions: {
                overview:
                    "A private residence shaped around light, space and modern living.",
                architecture:
                    "Clean architectural lines, generous proportions and strong indoor-outdoor connections give the home its quiet presence.",
                interior:
                    "Warm materials, restrained finishes and open living spaces create an interior designed to feel calm and effortless.",
                details:
                    "Four bedrooms, five bathrooms and 620 square metres arranged for contemporary Lagos living."
              
            }
        },
        {
            name: "Casa Aurelia",
            location: "LAGOS · IKOYI",
            image: "images/hero.jpg",
            bedrooms: "05",
            bathrooms: "06",
            size: "780",
            descriptions: {
                overview:
                    "A refined urban residence balancing privacy, light and a connection to the city.",
                architecture:
                    "A composed modern form designed with strong horizontal lines, deep openings and generous private spaces.",
                interior:
                    "Layered textures and understated materials create a sophisticated interior with room to breathe.",
                details:
                    "Five bedrooms, six bathrooms and approximately 780 square metres in the heart of Ikoyi."
            }
        },
        {
            name: "Maison Sol",
            location: "LAGOS · VICTORIA ISLAND",
            image: "images/property-1.jpg",
            bedrooms: "03",
            bathrooms: "04",
            size: "510",
            descriptions: {
                overview:
                    "A more intimate residence created around simplicity, sunlight and everyday comfort.",
                architecture:
                    "Balanced proportions and carefully framed openings make the architecture feel private without feeling closed.",
                interior:
                    "Natural tones and simple forms give the interior a relaxed character suited to modern city life.",
                details:
                    "Three bedrooms, four bathrooms and approximately 510 square metres near Victoria Island."
            }
          
        }
    ];
  

    /* =========================
       PROPERTY VIEWER
    ========================= */

    const viewer = document.querySelector("#property-viewer");
    const viewerImageBox = document.querySelector(".viewer-image");
    const viewerImage = document.querySelector("#viewer-image");
    const viewerTitle = document.querySelector("#viewer-title");
    const viewerLocation = document.querySelector("#viewer-location");
    const viewerCurrent = document.querySelector("#viewer-current");
    const viewerTotal = document.querySelector("#viewer-total");
    const viewerDescription = document.querySelector("#viewer-description");
    const viewerDetails = document.querySelector("#viewer-details");
    const viewerClose = document.querySelector("#viewer-close");
    const viewerPrev = document.querySelector("#viewer-prev");
    const viewerNext = document.querySelector("#viewer-next");
    const viewerBackdrop = document.querySelector(".viewer-backdrop");
    const viewerTabs = document.querySelectorAll(".viewer-tab");

    const propertyTriggers =
        document.querySelectorAll(".property-trigger");

    const collectionTrigger =
        document.querySelector(".collection-viewer-trigger");

    let currentProperty = 0;
    let currentTab = "overview";
    let lastFocusedElement = null;

    viewerTotal.textContent =
        String(properties.length).padStart(2, "0");


    const updateViewer = (propertyIndex) => {

        currentProperty =
            (propertyIndex + properties.length) % properties.length;

        const property = properties[currentProperty];

        viewerImageBox.classList.add("changing");

        window.setTimeout(() => {

            viewerImage.src = property.image;
            viewerImage.alt =
                `${property.name} — ${property.location}`;

            viewerTitle.textContent = property.name;
            viewerLocation.textContent = property.location;

            viewerCurrent.textContent =
                String(currentProperty + 1).padStart(2, "0");

            viewerDescription.textContent =
                property.descriptions[currentTab];

            viewerDetails.innerHTML = `
                <div class="viewer-detail">
                    <strong>${property.bedrooms}</strong>
                    <span>Bedrooms</span>
                </div>

                <div class="viewer-detail">
                    <strong>${property.bathrooms}</strong>
                    <span>Bathrooms</span>
                </div>

                <div class="viewer-detail">
                    <strong>${property.size}</strong>
                    <span>Square Metres</span>
                </div>
            `;

            viewerImageBox.classList.remove("changing");

        }, 180);
    };


    const updateTab = (tabName) => {

        currentTab = tabName;

        const property = properties[currentProperty];

        viewerTabs.forEach((tab) => {

            const isActive =
                tab.dataset.tab === tabName;

            tab.classList.toggle("active", isActive);
            tab.setAttribute(
                "aria-selected",
                String(isActive)
            );
        });

        viewerDescription.textContent =
            property.descriptions[tabName];
    };


    const openViewer = (propertyIndex) => {

        lastFocusedElement = document.activeElement;

        currentTab = "overview";

        updateViewer(propertyIndex);
        updateTab("overview");

        viewer.classList.add("active");
        viewer.setAttribute("aria-hidden", "false");
        document.body.classList.add("viewer-open");

        viewerClose.focus();
    };


    const closeViewer = () => {

        viewer.classList.remove("active");
        viewer.setAttribute("aria-hidden", "true");
        document.body.classList.remove("viewer-open");

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };


    propertyTriggers.forEach((trigger) => {

        trigger.addEventListener("click", () => {

            openViewer(
                Number(trigger.dataset.property)
            );

        });

    });


    collectionTrigger.addEventListener("click", () => {
        openViewer(0);
    });


    viewerClose.addEventListener("click", closeViewer);
    viewerBackdrop.addEventListener("click", closeViewer);


    viewerPrev.addEventListener("click", () => {
        updateViewer(currentProperty - 1);
    });


    viewerNext.addEventListener("click", () => {
        updateViewer(currentProperty + 1);
    });


    viewerTabs.forEach((tab) => {

        tab.addEventListener("click", () => {
            updateTab(tab.dataset.tab);
        });

    });


    document.addEventListener("keydown", (event) => {

        if (!viewer.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeViewer();
        }

        if (event.key === "ArrowLeft") {
            updateViewer(currentProperty - 1);
        }

        if (event.key === "ArrowRight") {
            updateViewer(currentProperty + 1);
        }
    });


    /* =========================
       VÉRA CONCIERGE
    ========================= */

    const choiceGroups =
        document.querySelectorAll(".choice-group");

    const conciergeResult =
        document.querySelector("#concierge-result-text");

    const choices = {
        type: "Private residence",
        location: "Lekki",
        size: "3–4 bedrooms"
    };


    const updateConcierge = () => {

        let opening = "A private residence";

        if (choices.type === "Investment property") {
            opening = "An investment property";
        }

        if (choices.type === "Family home") {
            opening = "A family home";
        }

        conciergeResult.textContent =
            `${opening} in ${choices.location} with ${choices.size}.`;
    };


    choiceGroups.forEach((group) => {

        const groupName =
            group.dataset.choiceGroup;

        const groupChoices =
            group.querySelectorAll(".choice");

        groupChoices.forEach((choice) => {

            choice.addEventListener("click", () => {

                groupChoices.forEach((item) => {
                    item.classList.remove("active");
                });

                choice.classList.add("active");

                choices[groupName] =
                    choice.dataset.value;

                updateConcierge();
            });
        });
    });


    /* =========================
       MAGNETIC BUTTONS
    ========================= */

    const canUsePointer =
        window.matchMedia("(pointer: fine)").matches;

    if (canUsePointer) {

        const magneticElements =
            document.querySelectorAll(".magnetic");

        magneticElements.forEach((element) => {

            element.addEventListener("mousemove", (event) => {

                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                element.style.transform =
                    `translate(${x * 0.12}px, ${y * 0.12}px)`;
            });

            element.addEventListener("mouseleave", () => {
                element.style.transform =
                    "translate(0, 0)";
            });
        });
    }


    /* -------------------------
       Placeholder social links
    ------------------------- */

    const placeholderLinks =
        document.querySelectorAll(
            '.footer-links a[href="#"]'
        );

    placeholderLinks.forEach((link) => {

        link.addEventListener("click", (event) => {
            event.preventDefault();
        });
    });

});
