const form = document.getElementById('contact-form');
const result = document.getElementById('form-result');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the default browser redirect
    
    result.style.color = "var(--muted)";
    result.innerHTML = "Sending...";

    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      let res = await response.json();
      if (response.status == 200) {
        result.style.color = "green";
        result.innerHTML = "Message sent successfully!";
        form.reset(); // Clears the form inputs
      } else {
        console.log(response);
        result.style.color = "red";
        result.innerHTML = res.message || "Something went wrong.";
      }
    })
    .catch(error => {
      console.log(error);
      result.style.color = "red";
      result.innerHTML = "Something went wrong!";
    });
  });
}

/**
 * Toggle work card expand/collapse with proper ARIA state management.
 * Accepts either a DOM element or the event from keydown.
 */
function toggleCard(cardElement) {
    // If we received an event object (from keydown handler), get the target
    if (cardElement && typeof cardElement === 'object' && cardElement.tagName) {
      // Check if this looks like an event object by checking for key property
      if (cardElement.key) {
        cardElement = cardElement.currentTarget;
      }
    }
    
    const card = cardElement.closest ? cardElement.closest('.work-card') : cardElement;
    if (!card) return;
    
    // Close any other open cards first (accordion behavior)
    const allCards = document.querySelectorAll('.work-card.open');
    allCards.forEach(otherCard => {
        if (otherCard !== card) {
            otherCard.classList.remove('open');
            otherCard.setAttribute('aria-expanded', 'false');
            const otherArrow = otherCard.querySelector('.arrow');
            if (otherArrow) {
                otherArrow.style.transform = 'rotate(0deg)';
            }
        }
    });
    
    const isOpen = card.classList.toggle('open');
    const arrow = card.querySelector('.arrow');
    
    // Update ARIA attributes for accessibility
    card.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    
    if (arrow) {
        arrow.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
    }
}