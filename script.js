document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');
    const characterCards = document.querySelectorAll('.character-card');

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

    // Character card click handler
    characterCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const characterId = `character-${index + 1}`;
            window.location.hash = `#${characterId}`;
        });
    });

    // Smooth scroll for hero CTA buttons (and any .btn anchors)
    const ctaButtons = document.querySelectorAll('.btn[href^="#"]');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href');
            if (!href) return;
            if (href.startsWith('#')) {
                // navigate to the section by setting the hash so tabs switch
                e.preventDefault();
                window.location.hash = href;
            }
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
