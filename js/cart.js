/* ---------- CART STORAGE ---------- */
let cart = JSON.parse(localStorage.getItem("cart")) || {};

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ---------- ADD FROM PRODUCT PAGE ---------- */
function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  if (cart[name] && typeof cart[name] === "object") {
    cart[name].qty += 1;
  } else {
    cart[name] = { qty: 1, price: price };
  }

  localStorage.setItem("cart", JSON.stringify(cart));
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



function renderCartPage() {
  const list = document.getElementById("cartList");
  const totalEl = document.getElementById("cartTotal");
  const orderInput = document.getElementById("orderItems");

  if (!list) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  list.innerHTML = "";

  let total = 0;
  let orderText = "";

  if (Object.keys(cart).length === 0) {
    list.innerHTML = "<li>Cart is empty</li>";
    totalEl.textContent = "0";
    orderInput.value = "";
    return;
  }

  for (let item in cart) {
    const { qty, price } = cart[item];
    const itemTotal = qty * price;
    total += itemTotal;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item} × ${qty} — ₹${itemTotal}
      <button type="button" onclick="removeItem('${item}')">❌</button>
    `;
    list.appendChild(li);

    orderText += `${item} × ${qty} = ₹${itemTotal}\n`;
  }

  orderText += `\nTOTAL = ₹${total}`;
  orderInput.value = orderText;
  totalEl.textContent = total;
}

function getCartTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  let total = 0;

  for (let item in cart) {
    total += cart[item].qty * cart[item].price;
  }

  return total;
}

document.getElementById("orderForm").addEventListener("submit", function (e) {
  const total = getCartTotal();

  if (total <= 49) {
    e.preventDefault();
    alert("Minimum order value must be more than ₹50.");
    return;
  }

  // allow submit → clear cart
  localStorage.removeItem("cart");
});

