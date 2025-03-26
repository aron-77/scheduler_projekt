document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = 0;
    document.body.style.transition = 'opacity 1s';
    document.body.style.opacity = 1;
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(this);
    const messageDiv = document.getElementById('message');

    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'index.html'; // Redirect to the main page
        } else {
            messageDiv.textContent = data.message;
            messageDiv.style.color = '#ff4d4d'; // Display error message in red
        }
    })
    .catch(error => {
        console.error('Error:', error);
        messageDiv.textContent = 'Hiba történt a bejelentkezés során.';
        messageDiv.style.color = '#ff4d4d'; // Display error message in red
    });
});

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function () {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => button.style.transform = 'scale(1)', 150);
    });
});

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function () {
        input.style.boxShadow = '0 0 10px rgba(128, 0, 128, 0.5)';
    });
    input.addEventListener('blur', function () {
        input.style.boxShadow = 'none';
    });
});