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

    // --- 3D Vanilla Tilt Effect ---
    const tiltElements = document.querySelectorAll('.tilt-element');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (max 15 degrees)
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // --- Laptop Typing Effect ---
    const codeLines = [
        "function buildFuture() {",
        "  const dreams = [];",
        "  while (alive) {",
        "    dreams.push(code());",
        "  }",
        "  return success;",
        "}",
        "> Compiling...",
        "> Success! 100% Ready."
    ];
    
    const laptopText = document.getElementById('laptop-code-text');
    let lineIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeCode() {
        if (!laptopText) return;

        const currentLine = codeLines[lineIdx];
        
        if (isDeleting) {
            // Option to delete or just clear and start over. Let's just type the whole block then loop.
            laptopText.textContent = '';
            isDeleting = false;
            lineIdx = 0;
            charIdx = 0;
            setTimeout(typeCode, 500);
            return;
        }

        // Add character
        let currentText = codeLines.slice(0, lineIdx).join('\n');
        if (lineIdx > 0) currentText += '\n';
        currentText += currentLine.substring(0, charIdx + 1);
        
        laptopText.textContent = currentText;
        charIdx++;

        let typeSpeed = 50 + Math.random() * 50;

        if (charIdx === currentLine.length) {
            // End of line
            lineIdx++;
            charIdx = 0;
            
            if (lineIdx === codeLines.length) {
                // End of all lines, wait and restart
                isDeleting = true;
                typeSpeed = 3000; // wait 3 seconds before clearing
            } else {
                typeSpeed = 300; // wait before next line
            }
        }

        setTimeout(typeCode, typeSpeed);
    }

    // Start typing
    if (laptopText) {
        setTimeout(typeCode, 1000);
    }
});
