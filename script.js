/* ==========================================================
   TUOTTEET
   ========================================================== */

const products = [
  { id: 1, name: "FOCUSRITE SCARLETT 2i2 4TH GEN äänikortti", price: 139.00, img: "kuvat/focusrite.png" },
  { id: 2, name: "Master of puppets - vinyylilevy", price: 29.90, img: "kuvat/mop.png" },
  { id: 3, name: "Harley Benton - kitara setti", price: 150.00, img: "kuvat/kitaraset.png" },
  { id: 4, name: "Vinyylilevysoitin", price: 269.90, img: "kuvat/levysoitin.png" },
];

const productGrid = document.getElementById("productGrid");

/* ==========================================================
   OSTOSKORI
   ========================================================== */

const cartBtn = document.getElementById("cartBtn");
const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderProducts() {
  productGrid.innerHTML = "";
  products.forEach(p => {
    const item = document.createElement("div");
    item.className = "col-sm-6 col-md-3";
    item.innerHTML = `
      <div class="card h-100 p-3 text-center">
        <img src="${p.img}" class="img-fluid mb-3">
        <h5>${p.name}</h5>
        <p>${p.price.toFixed(2)} €</p>
        <button class="btn btn-danger" onclick="addToCart(${p.id})">Lisää koriin</button>
      </div>
    `;
    productGrid.appendChild(item);
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);

  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });

  saveCart();
  updateCartCount();
  updateCartModal();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  cartCount.textContent = cart.reduce((s, i) => s + i.quantity, 0);
}

cartBtn.addEventListener("click", () => {
  updateCartModal();
  cartModal.show();
});

function updateCartModal() {
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Ostoskori on tyhjä.</p>";
    return;
  }

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const sum = item.quantity * item.price;
    total += sum;

    const row = document.createElement("div");
    row.className = "d-flex justify-content-between mb-2";
    row.innerHTML = `
      <span>${item.name} (${item.quantity} kpl)</span>
      <span>${sum.toFixed(2)} € <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})">X</button></span>
    `;
    cartItems.appendChild(row);
  });

  const totalDiv = document.createElement("div");
  totalDiv.className = "text-end fw-bold border-top pt-2";
  totalDiv.textContent = "Yhteensä: " + total.toFixed(2) + " €";
  cartItems.appendChild(totalDiv);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  updateCartModal();
}

/* ==========================================================
   KIRJAUTUMINEN (LocalStorage)
   ========================================================== */

const userBtn = document.getElementById("userBtn");
const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));

const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");

const logoutSection = document.getElementById("logoutSection");
const loggedUserElement = document.getElementById("loggedUser");
const logoutBtn = document.getElementById("logoutBtn");

let loggedUser = localStorage.getItem("loggedUser");

userBtn.addEventListener("click", () => {
  updateLoginModal();
  loginModal.show();
});

function updateLoginModal() {
  if (loggedUser) {
    loginForm.classList.add("d-none");
    logoutSection.classList.remove("d-none");
    loggedUserElement.textContent = loggedUser;
  } else {
    loginForm.classList.remove("d-none");
    logoutSection.classList.add("d-none");
  }
}

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = usernameInput.value.trim();
  if (name.length < 3) { alert("Käyttäjänimi liian lyhyt."); return; }

  loggedUser = name;
  localStorage.setItem("loggedUser", name);

  usernameInput.value = "";
  passwordInput.value = "";
  updateLoginModal();
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  loggedUser = null;
  updateLoginModal();
});

/* ==========================================================
   ALKUKUTSU
   ========================================================== */
renderProducts();
updateCartCount();
updateLoginModal();