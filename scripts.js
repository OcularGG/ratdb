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

    // Populate the table with random data for testing
    populateTableWithRandomData();
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

function populateTableWithRandomData() {
    const tableBody = document.querySelector('#report-table tbody');
    tableBody.innerHTML = '';

    for (let i = 0; i < 300; i++) {
        const row = document.createElement('tr');
        const rat = `Rat${i + 1}`;
        const loss = (Math.random() * 1000).toFixed(2);
        const incidentType = ['Fraud', 'Scam', 'Theft'][Math.floor(Math.random() * 3)];
        const date = new Date(Date.now() - Math.floor(Math.random() * 1e10)).toLocaleDateString();

        row.innerHTML = `
            <td>${rat}</td>
            <td>${loss}</td>
            <td>${incidentType}</td>
            <td>${date}</td>
        `;

        tableBody.appendChild(row);
    }
}