const nameInput = document.getElementById('nameInput');
const saveNameBtn = document.getElementById('saveNameBtn');
const greeting = document.getElementById('greeting');

// Загрузка сохранённого имени при загрузке страницы
window.onload = function() {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        greeting.textContent = `Привет, ${savedName}!`;
    }
};

// Сохранение имени в LocalStorage
saveNameBtn.addEventListener('click', function() {
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem('userName', name);
        greeting.textContent = `Привет, ${name}!`;
        nameInput.value = ''; // Очистить поле ввода
    }
});