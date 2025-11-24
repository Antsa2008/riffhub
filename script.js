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
   KIRJAUTUMINEN JA REKISTERÖINTI (LocalStorage)
   ========================================================== */

const userBtn = document.getElementById("userBtn");
const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));

// Login
const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const showPasswordLogin = document.getElementById("showPasswordLogin"); // checkbox

// Register
const registerForm = document.getElementById("registerForm");
const regUsernameInput = document.getElementById("regUsernameInput");
const regPasswordInput = document.getElementById("regPasswordInput");
const showPasswordRegister = document.getElementById("showPasswordRegister"); // checkbox

// Toggle link
const toggleAuthLink = document.getElementById("toggleAuth");
const modalTitle = document.getElementById("modalTitle");

// Logout
const logoutSection = document.getElementById("logoutSection");
const loggedUserElement = document.getElementById("loggedUser");
const logoutBtn = document.getElementById("logoutBtn");

// Haetaan kirjautunut käyttäjä
let loggedUser = localStorage.getItem("loggedUser");

// Näytä/piilota salasana (checkbox)
if (showPasswordLogin) {
  showPasswordLogin.addEventListener("change", () => {
    passwordInput.type = showPasswordLogin.checked ? "text" : "password";
  });
}
if (showPasswordRegister) {
  showPasswordRegister.addEventListener("change", () => {
    regPasswordInput.type = showPasswordRegister.checked ? "text" : "password";
  });
}

// Avaa modaalin
userBtn.addEventListener("click", () => {
  updateAuthModal();
  loginModal.show();
});

// Päivitä modaalin näkymä kirjautuneen tilan mukaan
function updateAuthModal() {
  if (loggedUser) {
    loginForm.classList.add("d-none");
    registerForm.classList.add("d-none");
    logoutSection.classList.remove("d-none");
    toggleAuthLink.classList.add("d-none");
    modalTitle.textContent = "Tervetuloa";
    loggedUserElement.textContent = loggedUser;
  } else {
    loginForm.classList.remove("d-none");
    registerForm.classList.add("d-none");
    logoutSection.classList.add("d-none");
    toggleAuthLink.classList.remove("d-none");
    modalTitle.textContent = "Kirjaudu sisään";
  }
}

// Vaihda login <-> register
toggleAuthLink.addEventListener("click", (e) => {
  e.preventDefault();
  if (loginForm.classList.contains("d-none")) {
    loginForm.classList.remove("d-none");
    registerForm.classList.add("d-none");
    modalTitle.textContent = "Kirjaudu sisään";
    toggleAuthLink.textContent = "Ei tiliä? Rekisteröidy";
  } else {
    loginForm.classList.add("d-none");
    registerForm.classList.remove("d-none");
    modalTitle.textContent = "Rekisteröidy";
    toggleAuthLink.textContent = "Onko sinulla jo tili? Kirjaudu";
  }
});

// Rekisteröinti
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = regUsernameInput.value.trim();
  const password = regPasswordInput.value.trim();

  if (username.length < 3 || password.length < 3) {
    alert("Käyttäjänimi ja salasana vähintään 3 merkkiä");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.username === username)) {
    alert("Käyttäjänimi on jo käytössä.");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Rekisteröinti onnistui! Kirjaudu sisään.");
  toggleAuthLink.click(); // vaihda login-näkymään
  regUsernameInput.value = "";
  regPasswordInput.value = "";
});

// Kirjautuminen
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    alert("Virheellinen käyttäjänimi tai salasana.");
    return;
  }

  loggedUser = username;
  localStorage.setItem("loggedUser", loggedUser);

  usernameInput.value = "";
  passwordInput.value = "";
  updateAuthModal();
  loginModal.hide();
});

// Uloskirjautuminen
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedUser");
  loggedUser = null;
  updateAuthModal();
});

/* ==========================================================
   ALKUKUTSU
   ========================================================== */
renderProducts();
updateCartCount();
updateAuthModal();