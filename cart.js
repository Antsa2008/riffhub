let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartContainer = document.getElementById('cart-items');
const totalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const continueBtn = document.getElementById('continue-btn');

function updateCart() {
  cartContainer.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Ostoskori on tyhjä.</p>';
  } else {
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <span>${item.name} (${item.quantity} kpl)</span>
        <span>${(item.price * item.quantity).toFixed(2)} €</span>
        <button class="remove-btn" onclick="removeItem(${index})">Poista</button>
      `;
      cartContainer.appendChild(div);
    });
  }

  totalElement.textContent = total.toFixed(2) + ' €';
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {

    if (cart.length === 0) {
      alert('Ostoskori on tyhjä!');
      return;
    }

    window.location.href = 'checkout.html';
  });
}

if (continueBtn) {
  continueBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

updateCart();
