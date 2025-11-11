let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartContainer = document.getElementById('cart-items');
const totalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

function updateCart() {
  cartContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name} (${item.quantity} kpl)</span>
      <span>${(item.price * item.quantity).toFixed(2)} €</span>
      <button onclick="removeItem(${index})">Poista</button>
    `;
    cartContainer.appendChild(div);
  });

  totalElement.textContent = total.toFixed(2) + ' €';
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

checkoutBtn.addEventListener('click', () => {
  window.location.href = 'checkout.html';
});

updateCart();