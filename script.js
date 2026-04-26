// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== PROFILE PHOTO HANDLING ==========
    const profileImg = document.getElementById('profilePhoto');
    const fallbackIcon = document.getElementById('fallbackIcon');
    
    // Check if image exists and load properly
    if (profileImg) {
        // If image source is still default or empty, show fallback
        if (profileImg.src.includes('images/profile.jpg') || profileImg.src === '' || !profileImg.src) {
            profileImg.style.display = 'none';
            if (fallbackIcon) fallbackIcon.style.display = 'block';
        }
        
        // Try to load image, if fails show fallback
        profileImg.onerror = function() {
            profileImg.style.display = 'none';
            if (fallbackIcon) fallbackIcon.style.display = 'block';
        };
        
        profileImg.onload = function() {
            profileImg.style.display = 'block';
            if (fallbackIcon) fallbackIcon.style.display = 'none';
        };
    }
    
    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('.nav-links a, .btn-group a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }
        });
    });
    
    // ========== PROJECT FILTERING ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
    
    // ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections and project cards for entrance animations
    document.querySelectorAll('section, .project-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // ========== ACTIVE NAVIGATION HIGHLIGHT ==========
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active-nav');
            }
        });
    });
    
    // ========== CONSOLE WELCOME MESSAGE ==========
    console.log('🚀 soumya prakash — animated portfolio loaded!');
    console.log('📸 Update your photo in images/profile.jpg');
    console.log('💻 Skills: Python, Web Design, HTML, CSS, AJS, and more...');
    
    // ========== ADD ACTIVE NAV STYLE ==========
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active-nav {
            color: white;
            text-shadow: 0 0 8px #80b4ff;
        }
        .nav-links a.active-nav::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});
