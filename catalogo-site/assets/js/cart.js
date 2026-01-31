function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const item = cart.find(p => p.id === id);

  if (item) item.qty += qty;
  else cart.push({ id, qty });

  saveCart(cart);
}

function updateCartQty(id, qty) {
  const cart = getCart();
  const item = cart.find(p => p.id === id);

  if (!item) return;

  item.qty = Math.max(1, qty);
  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart().filter(p => p.id !== id);
  saveCart(cart);
}

function getTotalItems() {
  return getCart().reduce((t, i) => t + i.qty, 0);
}
