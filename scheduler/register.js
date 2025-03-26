document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.register-container');
    container.style.opacity = 0;
    container.style.transition = 'opacity 1s ease-in-out';
    setTimeout(() => {
        container.style.opacity = 1;
    }, 100);

    // Password toggle functionality
    document.getElementById('toggle-password').addEventListener('click', function() {
        const passwordField = document.getElementById('password');
        const isPassword = passwordField.type === 'password';
        passwordField.type = isPassword ? 'text' : 'password';
        this.querySelector('svg').setAttribute('fill', isPassword ? '#d4bfff' : '#b3b3cc');
    });

    document.getElementById('toggle-confirm-password').addEventListener('click', function() {
        const confirmPasswordField = document.getElementById('confirm_password');
        const isPassword = confirmPasswordField.type === 'password';
        confirmPasswordField.type = isPassword ? 'text' : 'password';
        this.querySelector('svg').setAttribute('fill', isPassword ? '#d4bfff' : '#b3b3cc');
    });
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    if (password !== confirmPassword) {
        document.getElementById('message').textContent = 'A jelszavak nem egyeznek.';
        return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch('register.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').textContent = data.message;
        if (data.success) {
            window.location.href = 'index.html'; // Módosítás: átirányítás az index.html-re
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Hiba történt a regisztráció során.';
    });
});