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


    // ----------------------------------------------------
    // Language Switcher Logic
    // ----------------------------------------------------
    const translations = {
        en: {
            nav_home: "Home",
            nav_about: "About",
            nav_products: "Products",
            nav_market: "Our Market",
            nav_contact: "Contact",
            hero_badge: "Trusted Since 2009",
            hero_title: "15 Years of Pure Quality Honey in the UAE",
            hero_desc: "Discover the finest natural honey and premium dates sourced with passion and authenticity.",
            hero_btn_products: "Our Products",
            hero_btn_story: "Our Story",
            trust_1_title: "Premium Quality",
            trust_1_desc: "100% natural and authentic.",
            trust_2_title: "Locally Sourced",
            trust_2_desc: "Finest ingredients from nature.",
            trust_3_title: "UAE Delivery",
            trust_3_desc: "Available across all Emirates.",
            trust_4_title: "15+ Years",
            trust_4_desc: "Trusted market experience.",
            about_subtitle: "Our Story",
            about_title: "Commitment to Quality & Authenticity",
            about_desc_1: "For over 15 years, Salalah Honey & Dates Trd has been a cornerstone of trust in the UAE market. We started with a simple belief: nature provides the best, and our job is simply to bring it to your table uncompromised.",
            about_desc_2: "Our journey has led us to source the most exquisite, pure honey and the plumpest, premium dates. We carefully select every product to ensure it meets our rigorous standards for taste, purity, and health benefits.",
            about_feat_1: "100% Pure, Unfiltered Honey",
            about_feat_2: "Hand-picked Premium Dates",
            about_feat_3: "Ethical Sourcing Practices",
            about_btn: "Get in Touch",
            products_subtitle: "Our Treasures",
            products_title: "Featured Products",
            products_desc: "Explore our selection of nature's finest offerings.",
            p3_origin: "Saudi Arabia",
            p3_title: "Premium Dates",
            p3_desc: "Luxurious, plump dates harvested from Saudi Arabia, known for their caramel-like taste and soft texture.",
            p4_origin: "Highland Oman",
            p4_title: "Samar Honey",
            p4_desc: "Pure mountain honey harvested from the highlands of Oman, known for its rich aroma and deep flavour.",
            p5_origin: "Russia",
            p5_title: "White Honey",
            p5_desc: "A rare and luxurious honey known for its smooth texture and delicate sweetness.",
            p6_origin: "UAE Made",
            p6_title: "Premium Honey Nuts",
            p6_desc: "A premium blend of pure honey and hand-picked nuts for a delicious crunch.",
            p7_origin: "Salalah, Oman",
            p7_title: "Royal Sidr Honey",
            p7_desc: "Harvested from ancient Sidr trees in Salalah, this elite honey is prized for its rare floral aroma and smooth taste.",
            p8_origin: "Oman",
            p8_title: "Honey Sidr 250g",
            p8_desc: "A premium Sidr honey from Oman, now delicately packaged in a 250g jar for ultimate freshness.",
            btn_inquire: "Inquire Now",
            market_subtitle: "Distribution",
            market_title: "Available Across the UAE",
            market_desc: "Our expansive distribution network ensures that our premium quality honey and dates reach customers and wholesale buyers across all the Emirates.",
            market_stat_1: "Emirates Served",
            market_stat_2: "Wholesale Partners",
            market_stat_3: "Happy Customers",
            contact_subtitle: "Get in Touch",
            contact_title: "Contact Us",
            contact_desc: "Interested in wholesale or just want to taste our premium products? Reach out today.",
            contact_loc_label: "Location",
            contact_loc_val: "UAE (Available Nationwide)",
            contact_phone_label: "Phone",
            contact_email_label: "Email",
            qr_label: "Scan to follow on Instagram:",
            form_name: "Your Name",
            form_email: "Your Email",
            form_phone: "Phone Number",
            form_msg: "Your Message",
            form_submit: "Send Message",
            footer_desc: "Premium honey & dates supplier with over 15 years of market experience in the UAE.",
            footer_links_label: "Quick Links",
            footer_trust_label: "Trust",
            testimonials_subtitle: "What Our Customers Say",
            testimonials_title: "Our Client Stories",
            test_1_text: "The Sidr honey is absolutely pure and rich in taste. Hands down the best I've ever tried in the UAE!",
            test_1_name: "Ahmed K.",
            test_2_text: "Excellent quality and fast delivery. The Samar honey helped a lot with my sore throat. Highly recommended!",
            test_2_name: "Sarah J.",
            test_3_text: "Premium packaging and even better taste. These dates are the perfect gift for my family back home.",
            test_3_name: "Mohammed R.",
            test_4_text: "Authentic local products with 15+ years of trust. You can truly taste the quality in every jar.",
            test_4_name: "Fatima S.",
            verified: "Verified Customer"
        },
        ar: {
            nav_home: "الرئيسية",
            nav_about: "من نحن",
            nav_products: "منتجاتنا",
            nav_market: "سوقنا",
            nav_contact: "اتصل بنا",
            hero_badge: "موثوق منذ عام 2009",
            hero_title: "15 عاماً من العسل عالي الجودة في الإمارات",
            hero_desc: "اكتشف أجود أنواع العسل الطبيعي والتمور الفاخرة التي تم الحصول عليها بشغف وأصالة.",
            hero_btn_products: "منتجاتنا",
            hero_btn_story: "قصتنا",
            trust_1_title: "جودة ممتازة",
            trust_1_desc: "100٪ طبيعي وأصيل.",
            trust_2_title: "مصدر محلي",
            trust_2_desc: "أجود المكونات من الطبيعة.",
            trust_3_title: "توصيل في الإمارات",
            trust_3_desc: "متوفر في جميع الإمارات.",
            trust_4_title: "أكثر من 15 عاماً",
            trust_4_desc: "خبرة سوقية موثوقة.",
            about_subtitle: "قصتنا",
            about_title: "الالتزام بالجودة والأصالة",
            about_desc_1: "لأكثر من 15 عاماً، كانت صلالة للعسل والتمور ركيزة ثقة في سوق الإمارات العربية المتحدة. بدأنا بإيمان بسيط: أن الطبيعة توفر الأفضل، ومهمتنا هي نقله إلى طاولتكم دون أي تنازل عن الجودة.",
            about_desc_2: "لقد دفعتنا رحلتنا للحصول على أرق وأجود أنواع العسل وأفخم التمور. نختار بعناية كل منتج لضمان مطابقته لمعاييرنا الصارمة للمذاق والنقاء والفوائد الصحية.",
            about_feat_1: "عسل نقي 100٪ غير مفلتر",
            about_feat_2: "تمور فاخرة منتقاة يدوياً",
            about_feat_3: "ممارسات توريد أخلاقية",
            about_btn: "تواصل معنا",
            products_subtitle: "كنوزنا",
            products_title: "المنتجات المميزة",
            products_desc: "استكشف مجموعتنا المختارة من أجود عطايا الطبيعة.",
            p3_origin: "المملكة العربية السعودية",
            p3_title: "تمور فاخرة",
            p3_desc: "تمور سعودية فاخرة تُعرف بمذاقها الشبيه بالكراميل وقوامها الناعم.",
            p4_origin: "مرتفعات عمان",
            p4_title: "عسل سمر",
            p4_desc: "عسل جبلي نقي من مرتفعات عُمان، يتميز برائحته الغنية ونكهته العميقة.",
            p5_origin: "روسيا",
            p5_title: "عسل أبيض",
            p5_desc: "عسل نادر وفاخر معروف بقوامه الناعم وحلاوته الرقيقة.",
            p6_origin: "صنع في الإمارات",
            p6_title: "مكسرات بالعسل فاخرة",
            p6_desc: "مزيج فاخر من العسل الصافي والمكسرات المختارة يدوياً لتجربة مقرمشة.",
            p7_origin: "صلالة، عُمان",
            p7_title: "عسل سدر ملكي",
            p7_desc: "يتم جمعه من أشجار السدر القديمة في صلالة، وهو عسل نخبة نادر برائحة عطرية ومذاق رائع.",
            p8_origin: "عُمان",
            p8_title: "عسل سدر 250 جرام",
            p8_desc: "عسل سدر فاخر من عُمان، معبأ بدقة في عبوة 250 جرام لضمان أقصى درجات النضارة.",
            btn_inquire: "استفسر الآن",
            market_subtitle: "التوزيع",
            market_title: "متوفر عبر الإمارات",
            market_desc: "تضمن شبكة توزيعنا الواسعة وصول العسل والتمور عالية الجودة إلى العملاء وتجار الجملة في جميع الإمارات العربية المتحدة.",
            market_stat_1: "إمارات نخدمها",
            market_stat_2: "شركاء جملة",
            market_stat_3: "عملاء سعداء",
            contact_subtitle: "تواصل معنا",
            contact_title: "اتصل بنا",
            contact_desc: "مهتم بالجملة أو تريد تذوق منتجاتنا؟ تواصل معنا اليوم.",
            contact_loc_label: "الموقع",
            contact_loc_val: "الإمارات (التوصيل متاح لكل الدولة)",
            contact_phone_label: "الهاتف",
            contact_email_label: "البريد الإلكتروني",
            qr_label: "امسح الكود لمتابعتنا على إنستغرام:",
            form_name: "اسمك",
            form_email: "بريدك الإلكتروني",
            form_phone: "رقم الهاتف",
            form_msg: "رسالتك",
            form_submit: "إرسال الرسالة",
            footer_desc: "مورد عسل وتمور فاخر بخبرة تزيد عن 15 عاماً في سوق الإمارات.",
            footer_links_label: "روابط سريعة",
            footer_trust_label: "الثقة",
            testimonials_subtitle: "ماذا يقول عملاؤنا",
            testimonials_title: "قصص عملائنا",
            test_1_text: "عسل السدر نقي تمامًا وغني بالطعم. ببساطة هو الأفضل الذي تذوقته في الإمارات!",
            test_1_name: "أحمد ك.",
            test_2_text: "جودة ممتازة وتوصيل سريع. عسل السمر ساعدني كثيرًا في علاج آلام الحلق. أنصح به بشدة!",
            test_2_name: "سارة ج.",
            test_3_text: "تغليف فاخر ومذاق أروع. هذه التمور كانت الهدية المثالية لعائلتي في الوطن.",
            test_3_name: "محمد ر.",
            test_4_text: "منتجات محلية أصيلة بفضل أكثر من 15 عامًا من الثقة. يمكنك حقًا تذوق الجودة في كل عبوة.",
            test_4_name: "فاطمة س.",
            verified: "عميل موثق"
        }
    };

    const langToggle = document.getElementById('langToggle');
    const currentLangText = document.getElementById('currentLang');
    let currentLang = localStorage.getItem('preferredLang') || 'en';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('preferredLang', lang);
        
        // Update HTML attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update button text
        currentLangText.textContent = lang === 'en' ? 'AR' : 'EN';
        
        // Update all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // Update all placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        // Add class to body for specific CSS tweaks if needed
        document.body.classList.toggle('ar-lang', lang === 'ar');
    }

    // Initialize Language
    setLanguage(currentLang);

    // Ensure body is visible (fix for text not appearing bug)
    document.body.style.opacity = '1';

    langToggle.addEventListener('click', () => {
        const nextLang = currentLang === 'en' ? 'ar' : 'en';
        
        // Page transition effect
        document.body.style.opacity = '0';
        setTimeout(() => {
            setLanguage(nextLang);
            document.body.style.opacity = '1';
        }, 300);
    });

    // Add CSS for fade transition
    document.body.style.transition = 'opacity 0.3s ease';

    // ----------------------------------------------------
    // Testimonials Slider Logic
    // ----------------------------------------------------
    const testimonialTrack = document.getElementById('testimonialTrack');
    const testPrev = document.getElementById('testPrev');
    const testNext = document.getElementById('testNext');
    const testDotsContainer = document.getElementById('testDots');
    const testCards = document.querySelectorAll('.testimonial-card');
    
    let currentTestIdx = 0;
    const totalTests = testCards.length;
    let itemsPerView = window.innerWidth > 992 ? 3 : (window.innerWidth > 768 ? 2 : 1);

    // Create dots
    function createTestDots() {
        testDotsContainer.innerHTML = '';
        const dotCount = Math.ceil(totalTests / itemsPerView);
        for(let i=0; i<dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('test-dot');
            if(i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestSlide(i));
            testDotsContainer.appendChild(dot);
        }
    }

    function updateTestSlider() {
        if (window.innerWidth > 768) {
            const cardWidth = testCards[0].offsetWidth + 32; // card + gap
            const offset = -currentTestIdx * cardWidth;
            testimonialTrack.style.transform = `translateX(${offset}px)`;
            
            // Handle RTL offset correction
            if (document.documentElement.dir === 'rtl') {
                testimonialTrack.style.transform = `translateX(${-offset}px)`;
            }
        }
        
        // Update dots
        const dots = document.querySelectorAll('.test-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestIdx);
        });
    }

    function goToTestSlide(idx) {
        currentTestIdx = idx;
        updateTestSlider();
    }

    testNext.addEventListener('click', () => {
        const maxIdx = Math.ceil(totalTests / itemsPerView) - 1;
        currentTestIdx = (currentTestIdx + 1) > maxIdx ? 0 : currentTestIdx + 1;
        updateTestSlider();
    });

    testPrev.addEventListener('click', () => {
        const maxIdx = Math.ceil(totalTests / itemsPerView) - 1;
        currentTestIdx = (currentTestIdx - 1) < 0 ? maxIdx : currentTestIdx - 1;
        updateTestSlider();
    });

    // Auto slide
    let testAutoSlide = setInterval(() => {
        testNext.click();
    }, 6000);

    // Pause on hover
    document.querySelector('.testimonials').addEventListener('mouseenter', () => clearInterval(testAutoSlide));
    document.querySelector('.testimonials').addEventListener('mouseleave', () => {
        testAutoSlide = setInterval(() => testNext.click(), 6000);
    });

    window.addEventListener('resize', () => {
        itemsPerView = window.innerWidth > 992 ? 3 : (window.innerWidth > 768 ? 2 : 1);
        createTestDots();
        updateTestSlider();
    });

    createTestDots();

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
    if (slider) {
        initSliderBackground(slider);
    }
});

function initSliderBackground(slider) {
    const firstSlide = slider.querySelector('.samar-slide');
    if (firstSlide) {
        slider.style.backgroundImage = `url('${firstSlide.src}')`;
    }
}

