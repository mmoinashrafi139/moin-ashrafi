// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Global Variables
let isLoading = true;
const projectData = {
    bupit: {
        title: "BUPIT",
        description: "BUPIT is a USA-based luggage shipment platform built with Laravel and Vue.js. It allows users to schedule one-way, round-trip, or return shipments of personal luggage across locations in the United States. The system offers intelligent location-based search, displays available shipment dates, and provides live tracking after booking. A printable shipping label is automatically generated for each booking.",
        images: [
            "/assets/img/bupit/2nd.png",
            "/assets/img/bupit/3rd.png",
        ],
        technologies: ["Laravel", "Vue.js", "MySQL", "Stripe API", "Tailwind CSS", "JavaScript"],
        features: [
            "Luggage shipment booking across US locations",
            "Trip type selection: One-way, Round, Return",
            "Smart location search with available shipment dates",
            "Automatic shipping label generation after booking",
            "Live luggage tracking in real-time",
            "Stripe-powered secure payment integration",
            "Responsive and intuitive admin dashboard",
            "User-friendly booking history and tracking interface"
        ],
        liveUrl: "https://bupit.net/",
    },
    artsticketing: {
        title: "ArtSticketing",
        description: "An innovative event ticketing platform with real-time seat selection, dynamic pricing, and comprehensive event management capabilities.",
        images: [
            "/assets/img/artticketing/Screenshot_2.png",
            "/assets/img/artticketing/Screenshot_3.png",
            "/assets/img/artticketing/Screenshot_4.png",
            "/assets/img/artticketing/Screenshot_6.png",
        ],
        technologies: ["PHP", "JavaScript", "MySQL", "Stripe API", "PayPal API", "Google Maps API"],
        features: [
            "Interactive seat selection interface",
            "Real-time availability updates",
            "Dynamic pricing algorithms",
            "Multiple payment gateway integration",
            "Event analytics and reporting",
            "Mobile-responsive design"
        ],
        liveUrl: "https://new-app.artsticketing.com/",
    },
    bundini: {
        title: "Bundini",
        description: "Bundini is a community-based social networking platform designed to analyze user behavior and promote healthier digital habits, especially among youth. Built with Laravel and Vue.js, it empowers users to create their own organizations, manage projects, and host events. Each event can have participants, feedback surveys, and real-time engagement tracking, helping communities foster positive behavior change through structured social interaction.",
        images: [
            "/assets/img/bundini/Screenshot_2.png",
            "/assets/img/bundini/Screenshot_3.png",
            "/assets/img/bundini/Screenshot_4.png",
        ],
        technologies: ["Laravel", "Tailwind CSS", "MySQL", "Vue.js", "Google People API"],
        features: [
            "Behavior analysis for positive community impact",
            "Create and manage organizations and projects",
            "Event creation with participant management",
            "Real-time messaging and communication tools",
            "Survey forms for participant feedback",
            "Community groups and structured forums",
            "Advanced user profiles and content sharing",
            "Push notifications and real-time alerts",
            "Privacy controls and moderation tools"
        ],
        liveUrl: "https://application.bundini.co.uk/",
    }
};

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const themeToggle = document.getElementById('themeToggle');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const resumeBtn = document.getElementById('resumeBtn');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Set default theme
    document.documentElement.setAttribute('data-theme', 'bright');
    
    // Show loading screen
    showLoadingScreen();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Initialize animations
    initializeAnimations();
    
    // Hide loading screen after animations are set up
    setTimeout(() => {
        hideLoadingScreen();
    }, 2000);
}

function showLoadingScreen() {
    const progressBar = document.querySelector('.loader-progress');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
        }
        progressBar.style.width = progress + '%';
    }, 100);
}

function hideLoadingScreen() {
    gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            loadingScreen.style.display = 'none';
            isLoading = false;
            animatePageEntry();
        }
    });
}

function initializeEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Resume download
    resumeBtn.addEventListener('click', downloadResume);
    
    // Project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    
    // Modal close
    modalClose.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
  
    // Mobile menu
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'bright' ? 'dark' : 'bright';
    
    gsap.to(document.body, {
        opacity: 0.8,
        duration: 0.2,
        onComplete: () => {
            document.documentElement.setAttribute('data-theme', newTheme);
            gsap.to(document.body, {
                opacity: 1,
                duration: 0.2
            });
        }
    });
}

function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = 'assets/resume.pdf';
    link.download = 'Moin_Ashrafi_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show feedback
    gsap.to(resumeBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
    });
}

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    modalBody.innerHTML = createProjectModalContent(project);
    
    gsap.set(projectModal, {
        display: 'flex',
        opacity: 0
    });
    
    gsap.to(projectModal, {
        opacity: 1,
        duration: 0.3,
        onComplete: () => {
            projectModal.classList.add('active');
        }
    });
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    gsap.to(projectModal, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            projectModal.classList.remove('active');
            projectModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

function createProjectModalContent(project) {
    return `
        <div class="project-modal-content">
            <h2 class="pixel-text" style="color: var(--accent-primary); margin-bottom: 20px; font-size: 32px;">
                ${project.title}
            </h2>
            
            <div class="modal-images" style="margin-bottom: 30px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
                    ${project.images.map(img => `
                        <img src="${img}" alt="${project.title}" style="width: 100%; height: 200px; object-fit: cover; border: 2px solid var(--accent-primary);">
                    `).join('')}
                </div>
            </div>
            
            <div class="project-description" style="margin-bottom: 30px;">
                <h3 style="color: var(--accent-primary); margin-bottom: 15px; text-transform: uppercase;">Description</h3>
                <p style="line-height: 1.8; color: var(--text-secondary);">${project.description}</p>
            </div>
            
            <div class="project-technologies" style="margin-bottom: 30px;">
                <h3 style="color: var(--accent-primary); margin-bottom: 15px; text-transform: uppercase;">Technologies Used</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${project.technologies.map(tech => `
                        <span class="tech-tag">${tech}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="project-features" style="margin-bottom: 30px;">
                <h3 style="color: var(--accent-primary); margin-bottom: 15px; text-transform: uppercase;">Key Features</h3>
                <ul style="list-style: none; padding: 0;">
                    ${project.features.map(feature => `
                        <li style="margin-bottom: 10px; color: var(--text-secondary); padding-left: 20px; position: relative;">
                            <i class="fas fa-check" style="position: absolute; left: 0; top: 4px; color: var(--accent-primary);"></i>
                            ${feature}
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="project-links" style="display: flex; gap: 20px; flex-wrap: wrap;">
                <a href="${project.liveUrl}" target="_blank" class="pixel-btn primary" style="text-decoration: none;">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
               
            </div>
        </div>
    `;
}

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    hamburger.classList.toggle('active');
}

function handleNavbarScroll() {
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        navbar.style.background = 'rgba(var(--card-bg-rgb), 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--card-bg)';
        navbar.style.backdropFilter = 'none';
    }
}

function initializeAnimations() {
    // Hero animations
    gsap.set(['.hero-image', '.hero-text'], {
        opacity: 0,
        y: 50
    });
    
    // Section animations
    gsap.set(['.about-content', '.skills-grid', '.projects-grid', '.contact-content'], {
        opacity: 0,
        y: 30
    });
    
    // Skill bars
    gsap.set('.skill-progress', {
        width: 0
    });
}

function animatePageEntry() {
    const tl = gsap.timeline();
    
    // Animate hero section
    tl.to('.hero-image', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    })
    .to('.hero-text', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5");
    
    // Set up scroll-triggered animations
    setupScrollAnimations();
}

function setupScrollAnimations() {
    // About section
    gsap.to('.about-content', {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Skills section
    gsap.to('.skills-grid', {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animate skill bars
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const width = bar.getAttribute('data-width');
        
        gsap.to(bar, {
            width: width + '%',
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: bar,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Projects section
    gsap.to('.projects-grid', {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.projects-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animate project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 50,
            scale: 0.9
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Contact section
    gsap.to('.contact-content', {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Floating elements animation
    gsap.to('.floating-elements .pixel-cube', {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
    });
    
    // Parallax effect for hero background
    gsap.to('.pixel-background', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero-section',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

// Utility function to add glitch effect on hover
document.querySelectorAll('.glitch-text').forEach(element => {
    element.addEventListener('mouseenter', () => {
        gsap.to(element, {
            duration: 0.1,
            skewX: Math.random() * 2 - 1,
            skewY: Math.random() * 2 - 1,
            yoyo: true,
            repeat: 5
        });
    });
});

// Add hover effects to buttons
document.querySelectorAll('.pixel-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});


// Performance optimization - Throttle scroll events
let ticking = false;

function updateScrollEffects() {
    handleNavbarScroll();
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Add page visibility change handler
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        gsap.globalTimeline.pause();
    } else {
        // Resume animations when page becomes visible
        gsap.globalTimeline.resume();
    }
});

console.log('🚀 Moin Ashrafi Portfolio - Loaded and Ready!');
