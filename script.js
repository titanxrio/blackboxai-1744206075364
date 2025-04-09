// Mouse tracking for tool image container
function handleMouseMove(event) {
    const container = document.querySelector('.tool-image-container');
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    container.style.setProperty('--mouse-x', `${x}%`);
    container.style.setProperty('--mouse-y', `${y}%`);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.tool-image-container');
    if (container) {
        container.addEventListener('mousemove', handleMouseMove);
    }

    // Enhanced Intersection Observer for scroll animations with stagger effect
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay based on index
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    
                    // Add particle animations for Discord server section
                    if (entry.target.classList.contains('discord-server-container')) {
                        createParticles(entry.target);
                    }
                }, index * 200); // 200ms stagger between elements
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });

    // Observe all sections and elements with scroll-reveal class
    document.querySelectorAll('section, .scroll-reveal').forEach((el) => {
        observer.observe(el);
    });

    // Enhanced feature cards hover effect with 3D tilt and magnetic effect
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width - 0.5) * 20;
            const yPercent = (y / rect.height - 0.5) * 20;
            
            // Add magnetic effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const magneticPull = 0.2;
            
            const pullX = (x - centerX) * magneticPull;
            const pullY = (y - centerY) * magneticPull;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${-yPercent}deg)
                rotateY(${xPercent}deg)
                translateY(-10px)
                translate(${pullX}px, ${pullY}px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) translate(0, 0)';
        });
    });

    // Enhanced typing animation with cursor blink
    const typingText = document.querySelector('.typing-animation');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                // Add random delay between characters for more realistic typing
                setTimeout(typeWriter, 50 + Math.random() * 100);
            } else {
                // Add blinking cursor after typing
                typingText.classList.add('cursor-blink');
            }
        }
        
        typeWriter();
    }
});

// Enhanced particle creation with varied sizes and colors
function createParticles(container) {
    const particles = container.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const randomX = Math.random() * container.offsetWidth;
        const randomY = Math.random() * container.offsetHeight;
        const size = 2 + Math.random() * 4; // Random size between 2-6px
        
        particle.style.left = `${randomX}px`;
        particle.style.top = `${randomY}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random color between indigo and purple
        const hue = 230 + Math.random() * 40; // Range between indigo (230) and purple (270)
        particle.style.background = `hsla(${hue}, 95%, 70%, 0.5)`;
        
        // Reset animation with random duration and delay
        particle.style.animation = 'none';
        particle.offsetHeight; // Trigger reflow
        particle.style.animation = `
            float ${4 + index + Math.random() * 2}s infinite ${Math.random() * 2}s
        `;
    });
}

// Smooth scroll handling with improved performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        document.body.style.setProperty('--scroll', `${scrolled}px`);
        
        // Add parallax effect to sections
        document.querySelectorAll('section').forEach(section => {
            const speed = section.dataset.parallax || 0.1;
            const yOffset = scrolled * speed;
            section.style.transform = `translateY(${yOffset}px)`;
        });
    });
});
