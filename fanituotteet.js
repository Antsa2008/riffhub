const tuotteet = [
      { id: 11, name: "Funko Pop! - Lady Justice", price: 18.00, img: "kuvat/L_justice.png" },
      { id: 12, name: "Funko Pop! - Vic Rattlehead", price: 18.00, img: "kuvat/rattlehead.png" },
      { id: 13, name: "Funko Pop! - Eddie (The trooper)", price: 23.00, img: "kuvat/ironmaiden_pop.png" },
      { id: 14, name: "Funko Pop! Deluxe Moment: Metallica Master of Puppets Tour (1986)", price: 180.00, img: "kuvat/metallica_funko.png" },
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