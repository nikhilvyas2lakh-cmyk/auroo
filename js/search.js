// Read search query
const params = new URLSearchParams(window.location.search);
const query = params.get("q")?.toLowerCase() || "";

// ALL PRODUCTS (single source of truth)
const products = [
  { name: "Rice 1kg", keywords: "rice chawal basmati 1kg" },
  { name: "Wheat Flour 1kg", keywords: "atta wheat flour 1kg" },
  { name: "Mustard Oil 1L", keywords: "oil tel sarso mustard 1l" },
  { name: "Sugar 1kg", keywords: "sugar chini 1kg" }
];

// Filter products
const matched = products.filter(p =>
  p.keywords.includes(query)
);

// Render results
const container = document.getElementById("results");

if (matched.length === 0) {
  container.innerHTML = "<p>No items found</p>";
} else {
  matched.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <span>${p.name}</span>
      <button onclick="addToCart('${p.name}')">Add</button>
    `;
    container.appendChild(div);
  });
}
