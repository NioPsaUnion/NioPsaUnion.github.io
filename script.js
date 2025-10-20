document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');

    // Function to switch tabs
    const showSection = (hash) => {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
            section.classList.add('unactive');
        });

        // Deactivate all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.classList.add('unactive');
        });

        // Find the target section and nav link
        const targetSection = document.querySelector(hash);
        const targetLink = document.querySelector(`nav ul li a[href="${hash}"]`);

        // Activate the target section and link
        if (targetSection) {
            targetSection.classList.remove('unactive');
            targetSection.classList.add('active');
        }
        if (targetLink) {
            targetLink.classList.add('active');
            targetLink.classList.remove('unactive');
        }
    };

    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor jump
            const hash = event.currentTarget.hash;
            showSection(hash);
        });
    });

    // Show the initial section (home)
    showSection('#home');
});
