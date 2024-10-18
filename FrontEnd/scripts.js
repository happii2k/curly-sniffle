
    document.getElementById('request-form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent form from reloading the page

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const department = document.getElementById('department').value;
        const details = document.getElementById('details').value;

        try {
            const response = await fetch('http://localhost:5000/submit-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    department,
                    details
                })
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            alert('Error submitting the request');
        }
    });

