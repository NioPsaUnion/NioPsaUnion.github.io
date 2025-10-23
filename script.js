document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');

    // Function to switch tabs
    const showSection = (hash) => {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Deactivate all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Find the target section and nav link
        const targetSection = document.querySelector(hash);
        const targetLink = document.querySelector(`nav ul li a[href="${hash}"]`);

        // Activate the target section and link
        if (targetSection) {
            targetSection.classList.add('active');
        }
        if (targetLink) {
            targetLink.classList.add('active');
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const hash = event.currentTarget.hash;
            window.location.hash = hash;
        });
    });

    // Function to show section based on URL hash
    const showSectionFromHash = () => {
        const hash = window.location.hash || '#home';
        showSection(hash);
    };

    // Show section on initial load
    showSectionFromHash();

    // Listen for hash changes
    window.addEventListener('hashchange', showSectionFromHash);
});
