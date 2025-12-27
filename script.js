// Scroll animation for featured projects
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element, offset = 100) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset
        );
    }

    // Function to handle scroll animations
    function handleScrollAnimations() {
        // Animate projects title
        const projectsTitle = document.querySelector('.projects-title');
        if (projectsTitle && !projectsTitle.classList.contains('visible')) {
            if (isInViewport(projectsTitle, 150)) {
                projectsTitle.classList.add('visible');
            }
        }

        // Animate project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            if (!card.classList.contains('visible')) {
                if (isInViewport(card, 100)) {
                    // Add a slight delay for staggered effect
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                }
            }
        });
    }

    // Initial check on page load
    handleScrollAnimations();

    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Initialize EmailJS
        (function() {
            emailjs.init("jXjS42skU6A-NHku2");
        })();
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('.submit-button');
            const originalButtonText = submitButton.textContent;
            
            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Send email using EmailJS
            emailjs.sendForm('service_dj6gmdd', 'template_4hoiz2c', contactForm)
                .then(function() {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }, function(error) {
                    alert('Sorry, there was an error sending your message. Please try again or email me directly at amthagos@gmail.com');
                    console.error('EmailJS error:', error);
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                });
        });
    }
});

