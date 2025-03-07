document.addEventListener('DOMContentLoaded', () => {
    fetchReports();
});

function fetchReports() {
    fetch('http://localhost:5000/api/reports')
        .then(response => response.json())
        .then(data => {
            const reportList = document.getElementById('admin-dashboard');
            data.forEach(report => {