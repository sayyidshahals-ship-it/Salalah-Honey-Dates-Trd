document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // Navbar Scroll Effect
    // ----------------------------------------------------
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ----------------------------------------------------
    // Mobile Navigation Toggle
    // ----------------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';

        // Ensure nav gets a background if opened at top
        if (window.scrollY <= 50) {
            navbar.classList.toggle('scrolled', isActive);
        }
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ----------------------------------------------------
    // Intersection Observer for Scroll Animations
    // ----------------------------------------------------
    const faders = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');

    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // ----------------------------------------------------
    // Form Submission Handler (Mock)
    // ----------------------------------------------------
    const inquiryForm = document.getElementById('inquiryForm');
    const formStatus = document.getElementById('formStatus');

    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = inquiryForm.querySelector('button');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;

            const formData = new FormData(inquiryForm);

            // Using fetch with no-cors to submit to Google Form
            fetch(inquiryForm.action, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            }).then(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                inquiryForm.reset();
                formStatus.textContent = 'Thank you! Your inquiry has been sent. We will contact you soon.';
                formStatus.style.color = 'green';

                // Clear message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }).catch(err => {
                console.error('Form submission error:', err);
                formStatus.textContent = 'Something went wrong. Please try again or contact us via phone.';
                formStatus.style.color = 'red';
                btn.textContent = originalText;
                btn.disabled = false;
            });
        });
    }
});

// ----------------------------------------------------
// Blurred Background Fill for all product images
// ----------------------------------------------------
function initBlurredBg() {
    document.querySelectorAll('.product-image').forEach(container => {
        const img = container.querySelector('img:not(.samar-slide)') || container.querySelector('img');
        if (img) {
            container.style.backgroundImage = `url('${img.src}')`;
        }
    });
}

document.addEventListener('DOMContentLoaded', initBlurredBg);

// ----------------------------------------------------
// Samar Honey Image Slider
// ----------------------------------------------------
let samarIndex = 0;

function updateSlider() {
    const slides    = document.querySelectorAll('.samar-slide');
    const dots      = document.querySelectorAll('.samar-dot');
    const container = document.getElementById('samarSlider');

    slides.forEach((s, i) => s.classList.toggle('active', i === samarIndex));
    dots.forEach((d, i)   => d.classList.toggle('active', i === samarIndex));

    // Update blurred background to match current slide
    if (container && slides[samarIndex]) {
        container.style.backgroundImage = `url('${slides[samarIndex].src}')`;
    }
}

function moveSlide(dir) {
    const total = document.querySelectorAll('.samar-slide').length;
    samarIndex = (samarIndex + dir + total) % total;
    updateSlider();
}

function goToSlide(n) {
    samarIndex = n;
    updateSlider();
}

// Init slider background on page load
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('samarSlider');
    const firstSlide = slider && slider.querySelector('.samar-slide');
    if (slider && firstSlide) {
        slider.style.backgroundImage = `url('${firstSlide.src}')`;
    }
});
