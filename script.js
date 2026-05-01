function toggleCard(cardElement) {
    cardElement.classList.toggle('open');
    const arrow = cardElement.querySelector('.arrow');
    if (arrow) {
        arrow.style.transform = cardElement.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
    }
}

async function handleSubmit(event) {
    event.preventDefault();

    // 1. Grab the form and input values
    const form = event.target;
    const name = document.getElementById('f-name').value.trim();
    const email = document.getElementById('f-email').value.trim();

    // 2. Simple validation check
    if (!name || !email) {
        alert('Please fill in at least your name and email.');
        return;
    }

    // 3. Prepare the data for Formspree
    const data = new FormData(form);

    try {
        // 4. Send the request to your Formspree endpoint
        const response = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        // 5. Handle the response
        if (response.ok) {
            alert('Thanks! Your message has been sent.');
            form.reset(); // Clear the form fields
        } else {
            // Handle server-side errors
            const result = await response.json();
            if (Object.hasOwn(result, 'errors')) {
                alert(result.errors.map(error => error.message).join(", "));
            } else {
                alert('Oops! There was a problem submitting your form.');
            }
        }
    } catch (error) {
        // Handle network errors
        alert('Oops! There was a connectivity issue. Please try again later.');
    }
}