/* ---------- CART STORAGE ---------- */
const CART_KEY = "cart";
let cart = JSON.parse(localStorage.getItem(CART_KEY)) || {};

function loadCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || {};
}

function saveCart(nextCart) {
  cart = nextCart || cart;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* ---------- ADD FROM PRODUCT PAGE ---------- */
function addToCart(name, price, qty = 1) {
  if (typeof name !== "string") return;

  const trimmedName = name.trim();
  const numericPrice = Number(price);
  const numericQty = Number(qty);

  if (!trimmedName || Number.isNaN(numericPrice) || numericPrice < 0) return;
  if (!Number.isFinite(numericQty) || numericQty <= 0) return;

  const nextCart = loadCart();
  const existing = nextCart[trimmedName];

  if (existing && typeof existing === "object") {
    existing.qty += numericQty;
    existing.price = numericPrice;
  } else {
    nextCart[trimmedName] = { qty: numericQty, price: numericPrice };
  }

  saveCart(nextCart);
  return nextCart;
}

function removeFromCart(name, qty = 1) {
  if (typeof name !== "string") return;

  const trimmedName = name.trim();
  const numericQty = Number(qty);

  if (!trimmedName || !Number.isFinite(numericQty) || numericQty <= 0) return;

  const nextCart = loadCart();
  const existing = nextCart[trimmedName];

  if (!existing || typeof existing !== "object") return nextCart;

  existing.qty -= numericQty;
  if (existing.qty <= 0) {
    delete nextCart[trimmedName];
  }

  saveCart(nextCart);
  return nextCart;
}

function getItemQty(name) {
  const current = loadCart();
  return current[name]?.qty || 0;
}

/* ---------- RENDER CART + PREPARE FORM ---------- */
function renderCartPage() {
  const list = document.getElementById("cartList");
  const totalEl = document.getElementById("cartTotal");
  const orderInput = document.getElementById("orderItems");

  if (!list) return;

  const cart = loadCart();
  list.innerHTML = "";

  let total = 0;
  let orderText = "";

  if (Object.keys(cart).length === 0) {
    list.innerHTML = "<li>Cart is empty</li>";
    if (totalEl) {
      totalEl.textContent = "0";
    }
    if (orderInput) {
      orderInput.value = "";
    }
    return;
  }

  for (const item in cart) {
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
  if (orderInput) {
    orderInput.value = orderText;
  }
  if (totalEl) {
    totalEl.textContent = total;
  }
}

function getCartTotal() {
  const cart = loadCart();
  let total = 0;

  for (const item in cart) {
    total += cart[item].qty * cart[item].price;
  }

  return total;
}

/* ---------- REMOVE ITEM ---------- */
function removeItem(item) {
  const nextCart = loadCart();
  delete nextCart[item];
  saveCart(nextCart);
  renderCartPage();
}

function updateButtonCount(product) {
  if (!product) return;

  const name = product.dataset.name;
  if (!name) return;

  const qty = getItemQty(name);
  const addBtn = product.querySelector(".add-btn");
  if (!addBtn) return;

  let countEl = addBtn.querySelector(".add-count");
  if (!countEl) {
    countEl = document.createElement("span");
    countEl.className = "add-count";
    addBtn.appendChild(countEl);
  }

  if (qty > 0) {
    countEl.textContent = qty;
    countEl.classList.remove("hidden");
  } else {
    countEl.textContent = "";
    countEl.classList.add("hidden");
  }
}

function ensureQuantityControls(product) {
  if (!product) return;

  const existing = product.querySelector(".qty-controls");
  if (existing) return;

  const addBtn = product.querySelector("button");
  if (!addBtn) return;

  addBtn.classList.add("add-btn");

  const controls = document.createElement("div");
  controls.className = "qty-controls";

  const minusBtn = document.createElement("button");
  minusBtn.type = "button";
  minusBtn.className = "minus-btn";
  minusBtn.textContent = "-";

  addBtn.removeAttribute("onclick");

  controls.appendChild(minusBtn);
  controls.appendChild(addBtn);

  product.appendChild(controls);

  minusBtn.addEventListener("click", () => {
    const name = product.dataset.name;
    removeFromCart(name, 1);
    updateButtonCount(product);
    renderCartPage();
  });

  addBtn.addEventListener("click", () => {
    const name = product.dataset.name;
    const price = product.dataset.price;

    addToCart(name, price);
    updateButtonCount(product);
    renderCartPage();

    addBtn.classList.add("added");
    setTimeout(() => {
      addBtn.classList.remove("added");
    }, 900);
  });

  updateButtonCount(product);
}

/* ---------- CLEAR CART AFTER SUBMIT ---------- */
document.addEventListener("submit", () => {
  localStorage.removeItem(CART_KEY);
});

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();

  document.querySelectorAll(".product").forEach((product) => {
    ensureQuantityControls(product);
  });
});

const orderForm = document.getElementById("orderForm");
if (orderForm) {
  orderForm.addEventListener("submit", (e) => {
    const total = getCartTotal();

    if (total <= 199) {
      e.preventDefault();
      alert("Minimum order value must be more than ₹200.");
      return;
    }

    localStorage.removeItem(CART_KEY);
  });
}
