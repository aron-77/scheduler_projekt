document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.register-container');
    container.style.opacity = 0;
    container.style.transition = 'opacity 1s ease-in-out';
    setTimeout(() => {
        container.style.opacity = 1;
    }, 100);

    const passwordField = document.getElementById('password');
    const togglePassword = document.getElementById('toggle-password');

    if (!passwordField || !togglePassword) return;

    togglePassword.addEventListener('click', function () {
        const isPassword = passwordField.type === 'password';
        passwordField.type = isPassword ? 'text' : 'password';

        // Toggle eye icon color
        this.querySelector('svg').setAttribute('fill', isPassword ? '#4a4a4a' : '#2c2c2c');
    });
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').textContent = data.message;
        if (data.success) {
            window.location.href = 'index.html'; 
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Hiba történt a bejelentkezés során.';
    });
});