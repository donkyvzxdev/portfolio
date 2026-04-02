const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 80) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navOverlay = document.querySelector('.nav-overlay');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('open');
        navOverlay.classList.toggle('visible');
    });

    if (navOverlay) {
        navOverlay.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('open');
            navOverlay.classList.remove('visible');
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                nav.classList.remove('open');
                navOverlay.classList.remove('visible');
            }
        });
    });
}

// Nav pill sliding
const navLinks = document.querySelectorAll('.nav-link');
const navPill = document.querySelector('.nav-pill');
const navUl = document.querySelector('nav ul');
let activeLink = navLinks[0];

function positionPill(link) {
    if (!link || !navPill || !navUl) return;

    const linkLeft = link.offsetLeft;
    const linkWidth = link.offsetWidth;

    navPill.style.left = linkLeft + 'px';
    navPill.style.width = linkWidth + 'px';
}

navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        positionPill(link);
    });
});

nav.addEventListener('mouseleave', () => {
    positionPill(activeLink);
});

// Initialize pill on first link
window.addEventListener('load', () => {
    if (navLinks.length > 0) {
        navPill.style.transition = 'none';

        const scrollY = window.scrollY;
        let currentSection = null;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollY >= top - 100 && scrollY < bottom - 100) {
                currentSection = section.getAttribute('id');
            }
        });

        if (currentSection) {
            const activeLinkEl = document.querySelector(`nav a[href="#${currentSection}"]`);
            if (activeLinkEl) {
                positionPill(activeLinkEl);
                navItems.forEach(item => item.classList.remove('active'));
                activeLinkEl.classList.add('active');
                activeLink = activeLinkEl;
            }
        } else {
            positionPill(navLinks[0]);
        }

        requestAnimationFrame(() => {
            navPill.style.transition = 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }
});

// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Track active section for nav pill
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('nav a');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            const activeLinkEl = document.querySelector(`nav a[href="#${id}"]`);

            if (activeLinkEl) {
                navItems.forEach(item => item.classList.remove('active'));
                activeLinkEl.classList.add('active');
                activeLink = activeLinkEl;
                positionPill(activeLinkEl);
            }
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Floating badges parallax
const floatingBadges = document.querySelectorAll('.floating-badge');
document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

    floatingBadges.forEach((element, index) => {
        const speed = (index + 1) * 8;
        const x = mouseX * speed;
        const y = mouseY * speed;
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Toast for phone copy
const toast = document.createElement('div');
toast.className = 'toast';
toast.textContent = 'Número de telefone copiado com sucesso';
document.body.appendChild(toast);

const phoneCard = document.getElementById('phone-card');
phoneCard.addEventListener('click', (e) => {
    e.preventDefault();
    const phoneNumber = phoneCard.getAttribute('data-phone');
    navigator.clipboard.writeText(phoneNumber).then(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    });
});
