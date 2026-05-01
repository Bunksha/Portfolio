function toggleCard(cardElement) {
    cardElement.classList.toggle('open');
    const arrow = cardElement.querySelector('.arrow');
    if (arrow) {
        arrow.style.transform = cardElement.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
    }
}