// Mobile header nav toggle for small screens (<480px)
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (!navToggle || !mainNav) return;

    // Toggle open/close
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const opened = mainNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
    });

    // Close nav when any nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close when clicking outside the nav
    document.addEventListener('click', (e) => {
        if (!mainNav.classList.contains('open')) return;
        const target = e.target;
        if (target === navToggle || mainNav.contains(target)) return;
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});