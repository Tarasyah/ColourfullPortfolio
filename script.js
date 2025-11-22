tailwind.config = {
    theme: {
        extend: {
                colors: {
                    krica: {
                        orange: 'var(--color-orange)',
                        amber: 'var(--color-amber)',
                        brown: 'var(--color-brown)', 
                        bg: 'var(--color-bg)',    
                        cream: 'var(--color-cream)',
                        dark: 'var(--color-dark)'
                    }
                },
            fontFamily: {
                header: ['"Fredoka One"', 'cursive'],
                body: ['"Varela Round"', 'sans-serif'],
            },
            animation: {
                'spin-slow': 'spin 12s linear infinite',
                'float': 'float 3s ease-in-out infinite',
                'scroll': 'scroll 20s linear infinite',
                'scroll-reverse': 'scrollReverse 25s linear infinite',
                'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                scroll: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' }, 
                },
                scrollReverse: {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0)' }, 
                },
                pop: {
                    '0%': { transform: 'scale(0.95)' },
                    '50%': { transform: 'scale(1.05)' },
                    '100%': { transform: 'scale(1)' },
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // Theme Effects Definition
    const themeEffects = {
        'arabic': ['🌙', '✨'],
        'japanese': ['🌸', '💮'],
        'chinese': ['🏮', '🧧'],
        'egypt': ['🐫', '🏺', '☀️'],
        'finlandia': ['❄️', '🌨️']
    };

    // Hover Falling Icon Effect
    const hoverElements = document.querySelectorAll('.card-frame, .data-module, .tilt-card, .btn-gradient, .cyber-scroll, .hero-terminal, .folder-card');
    let currentTheme = 'arabic'; // Default theme

    hoverElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            // Throttle creation
            if (Math.random() > 0.15) return; 

            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const iconEl = document.createElement('span');
            iconEl.classList.add('hover-falling-icon');
            
            // Get icons for current theme
            const icons = themeEffects[currentTheme] || themeEffects['arabic'];
            const icon = icons[Math.floor(Math.random() * icons.length)];
            
            iconEl.textContent = icon;
            iconEl.style.left = `${x}px`;
            iconEl.style.top = `${y}px`;

            // Randomize size slightly
            const size = Math.random() * 10 + 15; // 15-25px
            iconEl.style.fontSize = `${size}px`;

            el.appendChild(iconEl);

            // Remove after animation
            setTimeout(() => {
                iconEl.remove();
            }, 1000);
        });
    });

    // Theme Switcher Logic
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeMenu = document.getElementById('theme-menu');
    const themeOptions = document.querySelectorAll('.theme-option');
    const body = document.body;

    // Create container for falling effects
    const fallingContainer = document.createElement('div');
    fallingContainer.classList.add('falling-container');
    document.body.appendChild(fallingContainer);
    let fallingInterval;

    function startFallingEffect(theme) {
        // Clear existing
        clearInterval(fallingInterval);
        fallingContainer.innerHTML = '';

        const icons = themeEffects[theme] || themeEffects['arabic'];

        fallingInterval = setInterval(() => {
            const icon = icons[Math.floor(Math.random() * icons.length)];
            const el = document.createElement('div');
            el.classList.add('falling-item');
            el.textContent = icon;
            
            // Randomize properties
            const left = Math.random() * 100;
            const duration = Math.random() * 5 + 5; // 5-10s
            const size = Math.random() * 20 + 10; // 10-30px
            
            el.style.left = `${left}%`;
            el.style.animationDuration = `${duration}s`;
            el.style.fontSize = `${size}px`;

            fallingContainer.appendChild(el);

            // Cleanup
            setTimeout(() => {
                el.remove();
            }, duration * 1000);

        }, 400); // Spawn every 400ms
    }

    // Start default effect
    startFallingEffect('arabic');

    if (themeBtn && themeMenu) {
        themeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            themeMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!themeMenu.contains(e.target) && !themeBtn.contains(e.target)) {
                themeMenu.classList.remove('active');
            }
        });

        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.getAttribute('data-theme');
                
                // Remove all theme classes
                body.classList.remove('theme-japanese', 'theme-chinese', 'theme-egypt', 'theme-finlandia');

                // Add selected theme class if not default
                if (theme !== 'arabic') {
                    body.classList.add(`theme-${theme}`);
                }

                // Update current theme for hover effect
                currentTheme = theme;

                // Start falling effect
                startFallingEffect(theme);

                themeMenu.classList.remove('active');
            });
        });
    }

    // 3D Text Rotation Logic
    const text3d = document.querySelector('.interactive-3d-text');
    if (text3d) {
        document.addEventListener('mousemove', (e) => {
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX - innerWidth / 2) / innerWidth; // -0.5 to 0.5
            const y = (e.clientY - innerHeight / 2) / innerHeight; // -0.5 to 0.5
            
            // Rotate range: -15deg to 15deg
            const rotateY = x * 30; 
            const rotateX = -y * 30;

            text3d.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            
            // Dynamic Shadow based on rotation
            const shadowX = -x * 20;
            const shadowY = -y * 20;
            text3d.style.textShadow = `${shadowX}px ${shadowY}px 0px #ea5b25, ${shadowX*1.5}px ${shadowY*1.5}px 10px rgba(0,0,0,0.5)`;
        });
    }

    // Initialize Wave Text Effect
    initWaveTextEffect();
});

// Function to wrap text characters for wave effect
function initWaveTextEffect() {
    // Select specific text-containing elements to avoid breaking layouts in structural divs
    const targets = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, button, label, strong, em, b, i, u, small, big, blockquote, cite, code, pre');
    
    Array.from(targets).forEach(el => {
        // Skip specific tags that shouldn't be touched or already processed
        if (el.classList.contains('wave-hover-trigger') || el.classList.contains('char-wave')) return;
        if (el.closest('.code-block')) return; // Example exclusion
        
        // Check for direct text nodes to ensure we only wrap actual text containers
        const hasDirectText = Array.from(el.childNodes).some(node => 
            node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
        );

        if (hasDirectText) {
            el.classList.add('wave-hover-trigger');
            wrapTextNodes(el);
        }
    });
}

function wrapTextNodes(element) {
    const children = [...element.childNodes];
    let charIndex = 0;

    children.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            // Skip pure whitespace
            if (!text.match(/\S/) && !text.includes(' ')) return;
            
            // CRITICAL FIX: Wrap the text node in a span first.
            // This prevents flex/grid parents from treating every character as a separate item.
            const wrapperSpan = document.createElement('span');
            wrapperSpan.classList.add('wave-text-wrapper');
            // Ensure the wrapper doesn't change layout properties
            wrapperSpan.style.display = 'inline'; 
            
            const fragment = document.createDocumentFragment();
            
            [...text].forEach((char) => {
                if (char === ' ') {
                    fragment.appendChild(document.createTextNode(' '));
                    charIndex++;
                } else if (char === '\n' || char === '\t') {
                     fragment.appendChild(document.createTextNode(char));
                } else {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.classList.add('char-wave');
                    span.style.setProperty('--char-index', charIndex);
                    fragment.appendChild(span);
                    charIndex++;
                }
            });
            
            wrapperSpan.appendChild(fragment);
            node.parentNode.replaceChild(wrapperSpan, node);
        }
    });
}
