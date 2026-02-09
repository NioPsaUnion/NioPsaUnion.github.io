// componentLoader.js
// Загружает header и footer из templates на все страницы

document.addEventListener('DOMContentLoaded', async () => {
    // Определяем глубину текущей страницы для правильных относительных путей
    const pathDepth = window.location.pathname.split('/').length - 2;
    const basePath = pathDepth > 1 ? '../'.repeat(pathDepth - 1) : '';
    
    // Загружаем header
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        try {
            const headerResponse = await fetch(basePath + 'templates/header.html');
            const headerContent = await headerResponse.text();
            
            // Если контейнер - это сам header, добавляем содержимое внутрь
            if (headerContainer.tagName === 'HEADER') {
                headerContainer.innerHTML = headerContent;
            }
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }

    // Загружаем footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        try {
            const footerResponse = await fetch(basePath + 'templates/footer.html');
            const footerContent = await footerResponse.text();
            
            // Если контейнер - это сам footer, добавляем содержимое внутрь
            if (footerContainer.tagName === 'FOOTER') {
                footerContainer.innerHTML = footerContent;
            }
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }

    // Инициализируем навигационную активность
    initializeNavigation();

    // Инициализируем функциональность доставки
    initializeDelivery();
});

// Функция для установления активного пункта навигации
function initializeNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Проверяем, совпадает ли href с текущей страницей
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Функция для инициализации модального окна доставки
function initializeDelivery() {
    const deliveryInfoBtn = document.getElementById('delivery-info-btn');
    const deliveryModal = document.getElementById('delivery-modal');
    const closeBtn = document.querySelector('.modal-close');

    // Обработчик для кнопки "Доставка и контакты" на странице мерча
    if (deliveryInfoBtn) {
        deliveryInfoBtn.addEventListener('click', openDeliveryModal);
    }

    // Закрытие модального окна
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDeliveryModal);
    }

    // Закрытие модального окна при клике вне его
    if (deliveryModal) {
        deliveryModal.addEventListener('click', (e) => {
            if (e.target === deliveryModal) {
                closeDeliveryModal();
            }
        });
    }
}

// Функция открытия модального окна доставки
function openDeliveryModal() {
    const deliveryModal = document.getElementById('delivery-modal');
    if (deliveryModal) {
        deliveryModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Блокируем скролл
    }
}

// Функция закрытия модального окна доставки
function closeDeliveryModal() {
    const deliveryModal = document.getElementById('delivery-modal');
    if (deliveryModal) {
        deliveryModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Разблокируем скролл
    }
}

// Обработка гладкого скролла для якорей
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
