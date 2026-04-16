/**
 * GSAP 3D Cinematic Animations & Interactivity for BuildCorp
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // Smooth Scroll Integration (Lenis) for Transitions
    // ==========================================
    const lenis = new Lenis({
        duration: 1.2, // Adds a butter-smooth transition to the scroll itself
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time)=>{
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // ==========================================
    // Hero Section Cinematic Intro
    // ==========================================
    const heroTl = gsap.timeline();
    
    // Smooth fade and zoom of the background overlay
    gsap.set(".hero", { backgroundSize: "120%" });
    heroTl.from(".hero-overlay", {
        backgroundColor: "rgba(2, 6, 23, 1)", // starts completely dark
        backdropFilter: "blur(20px)", // Add a glassmorphism blur effect
        duration: 1.5,
        ease: "power2.out"
    })
    .to(".hero", {
        backgroundSize: "100%", // Zoom image out slowly
        duration: 2.5,
        ease: "power3.out"
    }, "<")
    // 3D Flip in for title
    .from(".hero-title", {
        y: 100,
        opacity: 0,
        scale: 0.9,
        rotationX: 45,
        filter: "blur(10px)",
        transformOrigin: "0% 50% -50",
        duration: 1.2,
        ease: "power3.out"
    }, "-=1.5")
    // Fade up subtitle
    .from(".hero-subtitle", {
        y: 30,
        opacity: 0,
        filter: "blur(5px)",
        duration: 1,
        ease: "power2.out"
    }, "-=0.8")
    // Actions float in
    .from(".hero-actions button", {
        y: 30,
        opacity: 0,
        scale: 0.8,
        stagger: 0.2,
        duration: 1,
        ease: "elastic.out(1, 0.7)"
    }, "-=0.8");

    // Hero Background Parallax on Scroll (make it more pronounced)
    gsap.to(".hero", {
        backgroundPosition: "50% 120%", 
        autoAlpha: 0.8,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // ==========================================
    // Core Features Cards - 3D Stagger Reveal
    // ==========================================
    gsap.from(".feature-card", {
        scrollTrigger: {
            trigger: ".features-section",
            start: "top 90%", 
        },
        y: 120,
        autoAlpha: 0,
        scale: 0.9,
        rotationY: -45, // Deeper 3D swing
        rotationX: 10,
        transformOrigin: "left bottom",
        stagger: 0.25,
        duration: 1.2,
        ease: "back.out(1.5)",
        immediateRender: false
    });


    // ==========================================
    // GS Card Animation - 3D Stagger Reveal (for video cards and other gs-card elements)
    // Exclude feature-card elements here to avoid duplicate animation conflicts.
    // ==========================================
    gsap.from(".gs-card:not(.feature-card)", {
        scrollTrigger: {
            trigger: ".gs-card:not(.feature-card)",
            start: "top 90%",
        },
        y: 100,
        autoAlpha: 0,
        scale: 0.95,
        rotationY: -30,
        rotationX: 5,
        transformOrigin: "center bottom",
        stagger: 0.2,
        duration: 1.0,
        ease: "back.out(1.7)",
        immediateRender: false
    });

    // ==========================================
    // About Section 
    // ==========================================
    // Image slides in 3D space
    gsap.from(".gs-image-reveal", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 70%",
        },
        x: -100,
        rotationY: 15, // tilt
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        transformStyle: "preserve-3d"
    });

    // Text cascades in
    gsap.from(".gs-text-reveal > *", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 70%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
    });

    // ==========================================
    // Services Section - 3D Float Up
    // ==========================================
    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: ".project-grid",
            start: "top 90%",
        },
        y: 80,
        opacity: 0,
        scale: 0.95,
        stagger: 0.18,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from("#projects .section-header, #design .section-header", {
        scrollTrigger: {
            trigger: "#projects",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });

    gsap.from(".gs-3d-card", {
        scrollTrigger: {
            trigger: ".services-grid",
            start: "top 75%",
        },
        y: 150,
        z: -100, // comes from deep z-axis
        rotationX: 20, // pitched backwards
        opacity: 0,
        stagger: 0.25,
        duration: 1.2,
        ease: "expo.out",
        transformStyle: "preserve-3d" // maintain 3D feeling as it resolves
    });

    // ==========================================
    // Statistics Counters - Replaying on Scroll
    // ==========================================
    const counters = document.querySelectorAll(".counter");
    
    // First, animate the stat containers floating in
    gsap.from(".stat-item", {
        scrollTrigger: {
            trigger: ".stats-section",
            start: "top 85%",
            toggleActions: "restart none none reverse" // plays entering, reverses when leaving top
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
    });
    
    // Then, bind the numbers to recount every time the section is viewed
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        
        gsap.fromTo(counter, 
            { innerHTML: 0 }, 
            {
                scrollTrigger: {
                    trigger: ".stats-section",
                    start: "top 85%",
                    toggleActions: "restart none none none" // Restart the count each time you scroll to it
                },
                innerHTML: target,
                duration: 2.5,
                ease: "power2.out",
                // This tricks GSAP into snapping the innerHTML to whole numbers
                snap: { innerHTML: 1 },
                onUpdate: function() {
                    // GSAP handles the string conversion, ensure it stays clean without decimals
                    counter.innerText = Math.ceil(this.targets()[0].innerHTML);
                }
            }
        );
    });

    // ==========================================
    // Project Cards - Stagger Reveal
    // ==========================================
    gsap.from(".gs-project-card", {
        scrollTrigger: {
            trigger: ".gs-project-grid",
            start: "top 85%",
        },
        y: 100,
        opacity: 0,
        scale: 0.95,
        stagger: 0.18,
        duration: 0.9,
        ease: "back.out(1.2)"
    });

    // Fade-up Animation for Section Headers
    gsap.from(".gs-fade-up", {
        scrollTrigger: {
            trigger: ".gs-fade-up",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        immediateRender: false
    });

    // Fade-in Animation for Grids
    gsap.from(".gs-fade-grid", {
        scrollTrigger: {
            trigger: ".gs-fade-grid",
            start: "top 90%",
        },
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });

    // ==========================================
    // Project Gallery Popup
    // ==========================================
    const galleryCards = document.querySelectorAll(".gallery-card");
    const projectModal = document.getElementById("project-modal");
    const modalOverlay = document.getElementById("project-modal-overlay");
    const modalImage = document.getElementById("project-modal-image");
    const modalTitle = document.getElementById("project-modal-title");
    const modalText = document.getElementById("project-modal-text");
    const closeModal = document.getElementById("project-modal-close");

    const openProjectModal = (card) => {
        if (!modalOverlay || !projectModal) return;
        modalImage.src = card.dataset.image;
        modalImage.alt = card.dataset.title;
        modalTitle.textContent = card.dataset.title;
        modalText.textContent = card.dataset.description;
        modalOverlay.classList.add("active");
    };

    galleryCards.forEach(card => {
        card.addEventListener("click", () => openProjectModal(card));
    });

    if (closeModal) {
        closeModal.addEventListener("click", () => modalOverlay.classList.remove("active"));
    }

    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove("active");
            }
        });
    }

});
