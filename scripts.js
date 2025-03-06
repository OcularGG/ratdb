document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'RatGuard' && password === 'OCULARGuard2025') {
        alert('Login successful');
        // Redirect to admin dashboard
        window.location.href = 'admin.html';
    } else {
        alert('Invalid username or password');
    }
}

function filterReports(server) {
    // Function to filter reports based on server
    const rows = document.querySelectorAll('#report-table tbody tr');
    rows.forEach(row => {
        if (server === 'ALL' || row.dataset.server === server) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}