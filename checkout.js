const form = document.getElementById('checkout-form');
const confirmation = document.getElementById('confirmation');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // "Maksu" käsitellään tässä (simuloidusti)
  localStorage.removeItem('cart'); // tyhjennetään ostoskori
  form.style.display = 'none';
  confirmation.style.display = 'block';
});