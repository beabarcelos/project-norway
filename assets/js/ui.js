function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.innerText = getTotalItems();
}

function renderProducts() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");

  let filtered = products;

  if (cat && cat !== "all") {
    filtered = products.filter(p => p.category === cat);
  }

  const container = document.getElementById("product-list");

  container.innerHTML = filtered.map(p => `
    <div class="card">

      <a href="produto.html?id=${p.id}" class="card-link">
        <div class="card-image">
          <img src="${p.images[0]}">
          <span class="card-badge">
            ${p.category}
          </span>
        </div>
      </a>

      <div class="card-body">
        <a href="produto.html?id=${p.id}" class="card-link">
          <h3>${p.name}</h3>
        </a>

        <p>${p.description || ""}</p>

        <div class="card-footer">
          <strong>R$ ${p.price}</strong>

          <button onclick="
            addToCart(${p.id});
            updateCartCount();
            openCart();
          ">
            🛒
          </button>
        </div>
      </div>

    </div>
  `).join("");
}



function renderProductPage() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const p = products.find(prod => prod.id === id);

  const el = document.getElementById("product-detail");

  el.innerHTML = `
    <div class="product-wrapper">

      <div class="product-gallery">
        <img id="main-image" src="${p.images[0]}">
      </div>

      <div class="product-info">
        <h1>${p.name}</h1>

        <div class="product-price">
          R$ ${p.price}
        </div>

        <p class="product-desc">
          ${p.description || ""}
        </p>

        <div class="product-buy">
          <div class="qty-row">
            <button onclick="
              updateCartQty(${p.id}, 1);
              renderDrawerCart();
            ">−</button>

            <span>1</span>

            <button>+</button>
          </div>

          <button class="primary"
            onclick="
              addToCart(${p.id});
              updateCartCount();
              openCart();
            ">
            🛒 Add to cart
          </button>
        </div>
      </div>

    </div>
  `;
}


function renderCart() {
  const container = document.getElementById("cart-items");
  const cart = getCart();

  let total = 0;

  container.innerHTML = cart.map(item => {
    const p = products.find(prod => prod.id === item.id);
    const subtotal = p.price * item.qty;
    total += subtotal;

    return `
      <div class="cart-item">
        ${p.name} - ${item.qty}x - R$ ${subtotal}
        <button onclick="removeFromCart(${p.id}); renderCart();">
          Remover
        </button>
      </div>
    `;
  }).join("");

  document.getElementById("cart-total").innerText =
    "Total: R$ " + total;
}

function openCart() {
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-overlay").classList.add("show");
  renderDrawerCart();
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("show");
}

function renderDrawerCart() {
  const container = document.getElementById("cart-drawer-items");
  const cart = getCart();

  let total = 0;

  container.innerHTML = cart.map(item => {
    const p = products.find(prod => prod.id === item.id);
    const subtotal = p.price * item.qty;
    total += subtotal;

    return `
      <div class="drawer-item">

        <img src="${p.images[0]}" class="drawer-img">

        <div class="drawer-info">
          <strong>${p.name}</strong>

          <div class="qty-row">
            <button onclick="
              updateCartQty(${p.id}, ${item.qty - 1});
              renderDrawerCart();
              updateCartCount();
            ">−</button>

            <span>${item.qty}</span>

            <button onclick="
              updateCartQty(${p.id}, ${item.qty + 1});
              renderDrawerCart();
              updateCartCount();
            ">+</button>
          </div>

          <div class="price-row">
            R$ ${subtotal}
            <button class="remove-btn" onclick="
              removeFromCart(${p.id});
              renderDrawerCart();
              updateCartCount();
            ">
              ✕
            </button>
          </div>
        </div>

      </div>
    `;
  }).join("");

  document.getElementById("drawer-total").innerText =
    "Total: R$ " + total;
}

function changeImage(src) {
  document.getElementById("main-image").src = src;
}

