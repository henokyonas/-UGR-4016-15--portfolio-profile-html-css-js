

// Utility Functions
const fadeInElements = (elements, options = {}) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    elements.forEach(el => observer.observe(el));
};

// Navigation Active State
const updateNavigation = () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
};

// Form Validation and Submission (Contact Page)
const initializeContactForm = () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all fields');
            return;
        }

        if (!isValidEmail(data.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate form submission
        try {
            const button = form.querySelector('button');
            button.textContent = 'Sending...';
            button.disabled = true;

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            form.reset();
            alert('Message sent successfully!');
        } catch (error) {
            alert('Failed to send message. Please try again.');
        } finally {
            const button = form.querySelector('button');
            button.textContent = 'Send Message';
            button.disabled = false;
        }
    });
};

// Email validation helper
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Portfolio Projects Animation
const initializePortfolio = () => {
    const projects = document.querySelectorAll('.project-card');
    if (!projects.length) return;

    fadeInElements(projects, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    // Add click event for project details
    projects.forEach(project => {
        project.addEventListener('click', () => {
            const title = project.querySelector('h3').textContent;
            const description = project.querySelector('p').textContent;
            console.log(`Selected project: ${title}`);
        });
    });
};

// About Page Hobbies Animation
const initializeAboutPage = () => {
    const hobbyCards = document.querySelectorAll('.hobby-card');
    if (!hobbyCards.length) return;

    fadeInElements(hobbyCards, {
        threshold: 0.2,
        rootMargin: '50px'
    });
};

// Education Page Enhancement
const initializeEducation = () => {
    const educationItems = document.querySelectorAll('.education-item');
    if (!educationItems.length) return;

    fadeInElements(educationItems, {
        threshold: 0.2,
        rootMargin: '50px'
    });
};

// Theme Preference Detection
const initializeThemePreference = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateTheme = (e) => {
        document.body.classList.toggle('dark-theme', e.matches);
    };
    
    prefersDark.addListener(updateTheme);
    updateTheme(prefersDark);
};

// Image Loading Enhancement
const initializeImageLoading = () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add error handling for images
        img.onerror = function() {
            console.error(`Failed to load image: ${img.src}`);
            // Optionally set a fallback image
            // img.src = 'path/to/fallback-image.jpg';
        };

        // Add loaded class when image loads successfully
        img.onload = function() {
            img.classList.add('loaded');
        };

        // For images with lazy loading attribute
        if (img.getAttribute('loading') === 'lazy') {
            const observer = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Only set data-src if it exists
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                            }
                            observer.unobserve(img);
                        }
                    });
                },
                {
                    rootMargin: '50px'
                }
            );
            observer.observe(img);
        }
    });
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateNavigation();
    initializeContactForm();
    initializePortfolio();
    initializeAboutPage();
    initializeEducation();
    initializeTheme();
    initializeImageLoading();
});

// Handle browser back/forward navigation
window.addEventListener('popstate', updateNavigation);

const initializeTheme = () => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) {
        console.error('Theme toggle button not found');
        return;
    }

    // Check for saved theme preference, default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setTheme(savedTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        // Update button content
        themeToggle.innerHTML = theme === 'dark' ? `
            <svg class="sun-icon" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
        ` : `
            <svg class="moon-icon" viewBox="0 0 24 24">
                <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
        `;
    }
};
