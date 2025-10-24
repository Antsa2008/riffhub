const products = [
  { id: 1, title: 'RiffFuzz Pro - fuzz pedaali', price: 129.0, img: 'https://via.placeholder.com/400x300?text=Fuzz' },
  { id: 2, title: 'Vintage Strings 10-46', price: 9.9, img: 'https://via.placeholder.com/400x300?text=Strings' },
  { id: 3, title: 'MiniAmp 20W', price: 249.0, img: 'https://via.placeholder.com/400x300?text=Amp' },
  { id: 4, title: 'DelayEcho X', price: 179.0, img: 'https://via.placeholder.com/400x300?text=Delay' }
];

const productGrid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const cartItemsEl = document.getElementById('cartItems');
const updatedAt = document.getElementById('updatedAt');
let cart = [];

function renderProducts(list) {
  productGrid.innerHTML = '';
  list.forEach((p) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';
    col.innerHTML = `
      <div class="card product-card h-100">
        <img src="${p.img}" class="card-img-top" alt="${p.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title fs-6">${p.title}</h5>
          <p class="card-text text-muted small mb-2">€${p.price.toFixed(2)}</p>
          <div class="mt-auto d-flex gap-2">
            <button class="btn btn-sm btn-outline-secondary w-100" onclick="addToCart(${p.id})">Lisää ostoskoriin</button>
            <button class="btn btn-sm btn-primary" onclick="quickView(${p.id})">Esikatselu</button>
          </div>
        </div>
      </div>
    `;
    productGrid.appendChild(col);
  });
}

function addToCart(id) {
  const prod = products.find((p) => p.id === id);
  const existing = cart.find((c) => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...prod, qty: 1 });
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  cartCount.textContent = count;
  if (count === 0) cartCount.classList.add('d-none');
  else cartCount.classList.remove('d-none');

  if (cart.length === 0) {
    cartItemsEl.textContent = 'Ostoskori on tyhjä.';
    return;
  }

  cartItemsEl.innerHTML = '';
  cart.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'd-flex justify-content-between align-items-center mb-2';
    row.innerHTML = `<div>${item.title} <small class='text-muted'>x${item.qty}</small></div><div>€${(item.price * item.qty).toFixed(2)}</div>`;
    cartItemsEl.appendChild(row);
  });
}

function quickView(id) {
  const p = products.find((x) => x.id === id);
  alert(p.title + ' — €' + p.price.toFixed(2));
}

document.getElementById('searchInput').addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  if (!q) renderProducts(products);
  else renderProducts(products.filter((p) => p.title.toLowerCase().includes(q)));
});

const cartBtn = document.getElementById('cartBtn');
const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
cartBtn.addEventListener('click', () => cartModal.show());

renderProducts(products);
updateCartUI();
updatedAt.textContent = new Date().toLocaleDateString('fi-FI');
