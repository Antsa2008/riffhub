    const tuotteet = [
      { id: 41, name: "Epiphone Les Paul Custom EB", price: 766.00, img: "kuvat/.png" },
      { id: 42, name: "Jackson JS32 King V BLK AH", price: 499.00, img: "kuvat/.png" },
      { id: 43, name: "Ltd KH-202", price: 399.00, img: "kuvat/.png" },
      { id: 44, name: "Fender Player II", price: 499.00, img: "kuvat/.png" },
      { id: 45, name: "Ltd Snakebyte JH", price: 1499.00, img: "kuvat/.png" },
      { id: 46, name: "Kramer Guitars Dave Mustaine Vanguard SM", price: 815.00, img: "kuvat/.png"},
      { id: 47, name: "Schecter Synyster Gates Standard Gloss", price: 1111.00, img: "kuvat/.png"},
      { id: 48, name: "Schecter Synyster Gates Standard Gloss", price: 5990.00, img: "kuvat/.png"},
    ];



    // ====== DOM-elementit ======
    const productList = document.getElementById("productLista");
    const cartBtn = document.getElementById("cartBtn");
    const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");

    // ====== Ladataan ostoskori localStoragesta ======
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // ====== Näytetään tuotteet ======
    function renderProducts() {
      productList.innerHTML = "";
      tuotteet.forEach(t => {
        const col = document.createElement("div");
        col.className = "col-sm-4 col-md-5 col-lg-3";
        col.innerHTML = `
          <div class="card h-100 text-center shadow-sm">
            <img src="${t.img}" class="card-img-top p-2" alt="${t.name}">
            <div class="card-body">
              <h5 class="card-title">${t.name}</h5>
              <p class="text-muted">${t.price.toFixed(2)} €</p>
              <button class="btn btn-danger" onclick="addToCart(${t.id})">Lisää koriin</button>
            </div>
          </div>
        `;
        productList.appendChild(col);
      });
    }

    // ====== Lisää tuote koriin ======
    function addToCart(id) {
      const product = tuotteet.find(p => p.id === id);
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

    // ====== Päivitetään korin määrä ======
    function updateCartCount() {
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = count;
    }

    // ====== Päivitetään ostoskori modaalissa ======
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
          <div>${item.name} (${item.quantity} kpl)</div>
          <div>
            ${itemTotal.toFixed(2)} €
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

    // ====== Alustetaan sivu ======
    renderProducts();
    updateCartCount();
    updateCartModal();

    // ====== Avaa ostoskori ======
    cartBtn.addEventListener("click", () => {
      updateCartModal();
      cartModal.show();
    });

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