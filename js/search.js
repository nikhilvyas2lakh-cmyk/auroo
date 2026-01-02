// Read search query
const params = new URLSearchParams(window.location.search);
const query = params.get("q")?.toLowerCase() || "";

// ALL PRODUCTS (single source of truth)
const products = [
  { name: "Rice 1kg", keywords: "rice chawal basmati 1kg" },
  { name: "mateshwari", keywords: "chai tea mateshwari mate" },
  { name: "Sugar 1kg", keywords: "sugar chini sakkar 1kg" },
  { name: "salt 1kg", keywords: "salt namak nirma 1kg" },
  { name: "mirch 200g", keywords: "mirch chili chilis spmi laxmi 200g" },
  { name: "haldi 200g", keywords: "haldi turmeric powder 100g" },
  { name: "dhaniya 200g", keywords: "dhaniya coriander powder 100g" },
  { name: "oil 1ltr", keywords: "oil tel sarso soyabin mustard 1l" },
  { name: "Mustard Oil 1L", keywords: "oil tel sarso mustard 1l" },
  
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
