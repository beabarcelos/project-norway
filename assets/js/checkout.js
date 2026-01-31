function checkoutWhatsApp() {
  const cart = getCart();

  if (!cart.length) {
    alert("Carrinho vazio");
    return;
  }

  let message = "Olá, gostaria de fazer o pedido:\n\n";
  let total = 0;

  cart.forEach(item => {
    const p = products.find(prod => prod.id === item.id);
    const subtotal = p.price * item.qty;
    total += subtotal;

    message += `${p.name} - ${item.qty} un - R$ ${subtotal}\n`;
  });

  message += `\nTotal: R$ ${total}`;

  const encoded = encodeURIComponent(message);

  window.open(`https://wa.me/5599999999999?text=${encoded}`, "_blank");
}
