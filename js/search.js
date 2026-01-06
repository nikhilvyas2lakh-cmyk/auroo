// Read search query
const params = new URLSearchParams(window.location.search);
const query = params.get("q")?.toLowerCase() || "";

// ALL PRODUCTS (single source of truth)
const products = [
  { name: "Rice 1kg", price: 70, keywords: "rice chawal basmati 1kg" },
  { name: "mateshwari", price: 60, keywords: "chai tea mateshwari mate" },
  { name: "Sugar 1kg", price: 45, keywords: "sugar chini sakkar 1kg" },
  { name: "salt 1kg", price: 20, keywords: "salt namak nirma 1kg" },
  { name: "salt 2kg", price: 30, keywords: "salt namak nirma 2kg" },
  { name: "mirch 500g", price: 150, keywords: "mirch chili chilis spmi laxmi 500g" },
  { name: "haldi 500g", price: 125, keywords: "haldi turmeric powder 500g" },
  { name: "dhaniya 500g", price: 125, keywords: "dhaniya coriander powder 500g" },
  { name: "mirch 200g", price: 60, keywords: "mirch chili chilis spmi laxmi 200g" },
  { name: "haldi 200g", price: 50, keywords: "haldi turmeric powder 100g" },
  { name: "dhaniya 200g", price: 50, keywords: "dhaniya coriander powder 100g" },
  { name: "krishna 1ltr", price: 140, keywords: "krishna oil tel sarso soyabin mustard 1l" },
  { name: "krishna 2ltr", price: 280, keywords: "krishna oil tel sarso soyabin mustard 2l" },
  { name: "masala 15g", price: 10, keywords: "masala spice powder sabut 15g" },
  { name: "coffee", price: 10, keywords: "coffee tea beverage" },
  { name: "daliya 1/2kg", price: 30, keywords: "daliya dalia ravva 1/2kg" },
  { name: "besan 1kg", price: 90, keywords: "besan gram flour 1kg" },
  { name: "suji 1/2kg", price: 30, keywords: "suji rava semolina 1kg" },
  { name: "aata 5kg", price: 170, keywords: "aata wheat flour 5kg" },
  { name: "poha 1kg", price: 50, keywords: "poha flattened rice 1kg" },
  { name: "moong 1kg", price: 120, keywords: "moong dal green gram 1kg" },
  { name: "soya chunks", price: 10, keywords: "soya chunks soyabean" },
  { name: "masoor 1kg", price: 85, keywords: "masoor dal red lentil 1kg" },
  { name: "bura sakkar 1kg", price: 55, keywords: "bura desi sakkar sugar chini 1kg" },
  { name: "krishna 1ltr", price: 140, keywords: "krishna oil tel sarso soyabin mustard 1l" },
  { name: "saras 1/2ltr", price: 300, keywords: "saras ghee mahan bilona 1l" },
  { name: "mahaan 1/2ltr", price: 300, keywords: "mahaan ghee mahan bilona 1l" },
  { name: "lifebuoy", price: 30, keywords: "lifebuoy hygiene soap" },
  { name: "lux", price: 30, keywords: "lux hygiene soap" },
  { name: "Neem", price: 20, keywords: "neem hygiene soap" },
  { name: "Viva Rose", price: 20, keywords: "pink hygiene soap" },
  { name: "Lime", price: 20, keywords: "cinthol hygiene soap" }
  
];

// Filter products
const matched = products.filter(p =>
  p.keywords.includes(query)
);

// Render results
const container = document.getElementById("results");

if (matched.length === 0) {
  container.innerHTML = "<p>No items found we will list this one soon..</p>";
} else {
  matched.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <span>${p.name}</span>
      <span>₹${p.price}</span>
      <button onclick="addToCart('${p.name}', ${p.price})">Add</button>
    `;
    container.appendChild(div);
  });
}
