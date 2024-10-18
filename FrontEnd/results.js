async function fetchResults() {
    const query = new URLSearchParams(window.location.search).get('query');
    const resultsContainer = document.getElementById('results');

    if (!resultsContainer) {
        console.error('Results container not found');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/search-faculty?query=${encodeURIComponent(query)}`);
        const data = await response.json();

        // Clear previous results
        resultsContainer.innerHTML = '';

        // Check if any data is returned
        if (data.length === 0) {
            resultsContainer.innerHTML = '<p>No faculty found.</p>';
            return;
        }

        // Append each faculty to the results container
        data.forEach(faculty => {
            const facultyDiv = document.createElement('div');
            facultyDiv.textContent = `${faculty.name} - ${faculty.department} - ${faculty.email}`;
            resultsContainer.appendChild(facultyDiv);
        });
    } catch (error) {
        console.error('Error fetching faculty data:', error);
    }
}

// Call fetchResults when the script loads
document.addEventListener('DOMContentLoaded', fetchResults);
