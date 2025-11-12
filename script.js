const products = [
  { id: 1, name: "FOCUSRITE SCARLETT 2i2 4TH GEN äänikortti", price: 139.00, img: "kuvat/focusrite.png" },
  { id: 2, name: "Master of puppets - vinyylilevy", price: 29.90, img: "kuvat/mop.png" },
  { id: 3, name: "Harley benton - kitara setti", price: 150.00, img: "kuvat/kitaraset.png" },
  { id: 4, name: "vinyylilevysoitin", price: 269.90, img: "kuvat/levysoitin.png" },
];

// ====== DOM-elementit ======
const productGrid = document.getElementById("productGrid");
const cartBtn = document.getElementById("cartBtn");
const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");

// ====== Ladataan ostoskori localStoragesta ======
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ====== Näytetään tuotteet ======
function renderProducts() {
  productGrid.innerHTML = "";
  products.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-3";
    col.innerHTML = `
      <div class="card h-100 p-3 text-center">
        <img src="${product.img}" class="img-fluid mb-3" alt="${product.name}">
        <h5>${product.name}</h5>
        <p class="text-muted">${product.price.toFixed(2)} €</p>
        <button class="btn btn-danger" onclick="addToCart(${product.id})">Lisää koriin</button>
      </div>
    `;
    productGrid.appendChild(col);
  });
}

// ====== Lisää tuote ostoskoriin ======
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartCount();
  updateCartModal();
}

// ====== Tallennetaan ostoskori ======
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ====== Päivitetään ostoskorin laskuri ======
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;
}

// ====== Näytetään ostoskori modaalissa ======
function updateCartModal() {
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Ostoskori on tyhjä.</p>";
    return;
  }

  let total = 0;
  cartItems.innerHTML = "";
  cart.forEach((item, i) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "d-flex justify-content-between align-items-center mb-2";
    div.innerHTML = `
      <div>
        ${item.name} (${item.quantity} kpl)
      </div>
      <div>
        ${(itemTotal).toFixed(2)} €
        <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromCart(${i})">X</button>
      </div>
    `;
    cartItems.appendChild(div);
  });

  const totalDiv = document.createElement("div");
  totalDiv.className = "fw-bold border-top pt-2 mt-2 text-end";
  totalDiv.textContent = "Yhteensä: " + total.toFixed(2) + " €";
  cartItems.appendChild(totalDiv);
}

// ====== Poista tuote korista ======
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  updateCartModal();
}

// ====== Päivitä kaikki alussa ======
renderProducts();
updateCartCount();
updateCartModal();

// ====== Avaa modaalinen ostoskori ======
cartBtn.addEventListener("click", () => {
  updateCartModal();
  cartModal.show();
});
