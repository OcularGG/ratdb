document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme) {
        document.body.classList.toggle('bg-dark', storedTheme === 'dark');
        document.body.classList.toggle('text-white', storedTheme === 'dark');
        themeToggle.textContent = storedTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
    } else {
        themeToggle.textContent = 'Dark Mode';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('bg-dark');
        document.body.classList.toggle('text-white');
        const isDarkMode = document.body.classList.contains('bg-dark');
        themeToggle.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    $('[data-toggle="tooltip"]').tooltip();
});

function filterReports(server) {
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
    // Implementation for first page navigation
}

function prevPage() {
    // Implementation for previous page navigation
}

function nextPage() {
    // Implementation for next page navigation
}

function lastPage() {
    // Implementation for last page navigation
}