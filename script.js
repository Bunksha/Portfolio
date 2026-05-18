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
function toggleCard(cardElement) {
    cardElement.classList.toggle('open');
    const arrow = cardElement.querySelector('.arrow');
    if (arrow) {
        arrow.style.transform = cardElement.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
    }
}

