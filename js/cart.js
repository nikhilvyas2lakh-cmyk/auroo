/* ---------- CART STORAGE ---------- */
let cart = JSON.parse(localStorage.getItem("cart")) || {};

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ---------- ADD FROM PRODUCT PAGE ---------- */
function addToCart(item) {
  cart[item] = (cart[item] || 0) + 1;
  saveCart();
  alert("Added to cart");
}

/* ---------- RENDER CART + PREPARE FORM ---------- */
function renderCartPage() {
  const list = document.getElementById("cartList");
  const orderInput = document.getElementById("orderItems");

  if (!list || !orderInput) return;

  list.innerHTML = "";
  let orderText = "";

  if (Object.keys(cart).length === 0) {
    list.innerHTML = "<li>Cart is empty</li>";
    orderInput.value = "";
    return;
  }

  for (let item in cart) {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item} × ${cart[item]}
      <button type="button" onclick="removeItem('${item}')">❌</button>
    `;
    list.appendChild(li);

    orderText += `${item} × ${cart[item]}\n`;
  }

  orderInput.value = orderText;
}

/* ---------- REMOVE ITEM ---------- */
function removeItem(item) {
  delete cart[item];
  saveCart();
  renderCartPage();
}

/* ---------- CLEAR CART AFTER SUBMIT ---------- */
document.addEventListener("submit", () => {
  localStorage.removeItem("cart");
});

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", renderCartPage);
