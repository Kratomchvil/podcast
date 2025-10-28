// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initSmoothScroll();
    initRevealAnimations();
    initTeamCards();
    initFormAnimations();
    initNavLogo(); // attach nav logo home behavior
    initDynamicClassSelect();
// Dynamically show class select based on obor
function initDynamicClassSelect() {
    const oborSelect = document.getElementById('obor-select');
    const prumkaDiv = document.getElementById('tridy-prumka');
    const gymplDiv = document.getElementById('tridy-gympl');
    if (!oborSelect || !prumkaDiv || !gymplDiv) return;

    function updateClassSelect() {
        if (oborSelect.value === 'prumka') {
            prumkaDiv.style.display = '';
            gymplDiv.style.display = 'none';
        } else if (oborSelect.value === 'gympl') {
            prumkaDiv.style.display = 'none';
            gymplDiv.style.display = '';
        } else {
            prumkaDiv.style.display = 'none';
            gymplDiv.style.display = 'none';
        }
    }
    oborSelect.addEventListener('change', updateClassSelect);
    updateClassSelect();
}
});

// Smooth scroll implementation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Reveal animations using Intersection Observer
function initRevealAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add reveal animations to elements
    const revealElements = document.querySelectorAll('.episode, .team-member, #registrace');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// Empty navbar function - using CSS styles only
function initNavbarEffects() {
    // No JavaScript effects for navbar
}

// Team cards hover effects
function initTeamCards() {
    const cards = document.querySelectorAll('.team-member');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            // Apply subtle rotation with smooth transition
            card.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateZ(10px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
            card.style.transition = 'transform 0.5s ease';
        });
    });
}

// Form animations and validation
function initFormAnimations() {
    const form = document.querySelector('form');
    if (!form) return;

    // Add animation to form inputs
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        // Add focused class to parent when input is focused
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            // Add filled class if input has value
            if (input.value.trim() !== '') {
                input.classList.add('filled');
            } else {
                input.classList.remove('filled');
            }
        });
    });

    // Add submit button effect
    const submitBtn = form.querySelector('input[type="submit"]');
    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            if (!form.checkValidity()) return;
            
            e.preventDefault();
            submitBtn.classList.add('submitting');
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                submitBtn.classList.remove('submitting');
                submitBtn.classList.add('submitted');
                // Show success message
                showNotification('Formulář byl úspěšně odeslán!', 'success');
                
                setTimeout(() => {
                    submitBtn.classList.remove('submitted');
                }, 2000);
            }, 1500);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '1rem 2rem',
        borderRadius: '8px',
        backgroundColor: type === 'success' ? '#10B981' : '#3B82F6',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        zIndex: '9999'
    });

    // Add to document
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);

    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add dynamic class for reveal animations
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }

        .submitting {
            position: relative;
            pointer-events: none;
        }

        .submitting::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid rgba(255,255,255,0.2);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .submitted {
            background: var(--accent-color) !important;
        }
    `;
    document.head.appendChild(style);
});

// particle background removed (was intentionally disabled)

// Nav logo: scroll to top then refresh
function initNavLogo() {
    const logo = document.getElementById('nav-logo');
    if (!logo) return;

    function goHomeAndReload() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const start = Date.now();
        const check = setInterval(() => {
            if (window.scrollY <= 2 || Date.now() - start > 900) {
                clearInterval(check);
                setTimeout(() => { location.reload(); }, 80);
            }
        }, 50);
    }

    logo.addEventListener('click', (e) => { e.preventDefault(); goHomeAndReload(); });
    logo.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goHomeAndReload(); } });
}