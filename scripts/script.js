// Этот файл может быть пустым или содержать только глобальные скрипты,
// которые не относятся к переключению секций.
// Большая часть функционала из вашего старого script.txt удалена,
// так как она предназначалась для одностраничного сайта.

document.addEventListener('DOMContentLoaded', () => {

    // Обработка кликов для плавного скролла к якорям на ТЕКУЩЕЙ странице (если они остались)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});