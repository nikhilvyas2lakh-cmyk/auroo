let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(item) {
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

function renderCartPage() {
  const list = document.getElementById("cartList");
  list.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item} <button onclick="removeItem(${index})">❌</button>`;
    list.appendChild(li);
  });
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartPage();
}

function prepareOrder() {
  document.getElementById("orderItems").value = cart.join(", ");
}

function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".product").forEach(p => {
    p.style.display = p.dataset.name.includes(input) ? "flex" : "none";
  });
}
