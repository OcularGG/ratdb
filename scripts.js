document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('language-selector').addEventListener('change', changeLanguage);
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

function toggleTheme() {
    document.body.classList.toggle('bg-dark');
    document.body.classList.toggle('text-white');
    document.body.classList.toggle('bg-light');
    document.body.classList.toggle('text-dark');
}

function changeLanguage() {
    const language = document.getElementById('language-selector').value;
    // Implement language change logic
    alert(`Language changed to: ${language}`);
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

function firstPage() {
    // Implement pagination logic
}

function prevPage() {
    // Implement pagination logic
}

function nextPage() {
    // Implement pagination logic
}

function lastPage() {
    // Implement pagination logic
}