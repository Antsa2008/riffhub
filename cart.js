let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-items");
const totalElement = document.getElementById("cart-total");

function updateCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Ostoskori on tyhjä.</p>";
  } else {
    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <span>${item.name} (${item.quantity} kpl)</span>
        <span>${subtotal.toFixed(2)} €</span>
        <button onclick="removeItem(${index})">Poista</button>
      `;
      cartContainer.appendChild(div);
    });
  }

  totalElement.textContent = total.toFixed(2) + " €";
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

updateCart();
