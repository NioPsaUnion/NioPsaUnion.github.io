// Mobile header nav toggle for small screens (<480px)
   const navToggle = document.getElementById('nav-toggle');
   const mainNav = document.querySelector('nav');
   if (navToggle && mainNav) {
        navToggle.addEventListener('click', (e) => {
           e.stopPropagation();
           const opened = mainNav.classList.toggle('open');
           navToggle.setAttribute('aria-expanded', opened ? 'true' : 'false');
       });
       // Close nav on nav link click
       navLinks.forEach(link => {
           link.addEventListener('click', () => {
               if (mainNav.classList.contains('open')) {
                    mainNav.classList.remove('open');
                   navToggle.setAttribute('aria-expanded', 'false');
               }
           });
       });
       // Close when clicking outside
       document.addEventListener('click', (e) => {
           if (!mainNav.classList.contains('open')) return;
           const target = e.target;
           if (target === navToggle || mainNav.contains(target)) return;
           mainNav.classList.remove('open');
           navToggle.setAttribute('aria-expanded', 'false');
       });
}