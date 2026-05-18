document.addEventListener('DOMContentLoaded', () => {
    // Basic Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial state setup to handle elements outside viewport
    document.querySelectorAll('.slide-up').forEach(element => {
        // Pause animation initially
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
});
