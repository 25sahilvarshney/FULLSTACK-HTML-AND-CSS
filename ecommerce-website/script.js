const container = document.getElementById("product-container");
const loadMoreBtn = document.getElementById("loadMore");
const searchInput = document.getElementById("search");

let allProducts = [];
let displayedCount = 0;
const step = 5;

// Fetch data from API
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    allProducts = data;
    renderProducts();
  });

// Render next 5 products
function renderProducts() {
  const nextProducts = allProducts.slice(displayedCount, displayedCount + step);
  nextProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.onclick = () => {
      window.location.href = `product.html?id=${product.id}`;
    };
    card.innerHTML = `
      <img src="${product.image}" alt="">
      <h4>${product.title}</h4>
      <p>$${product.price}</p>
    `;
    container.appendChild(card);
  });

  displayedCount += step;
  if (displayedCount >= allProducts.length) {
    loadMoreBtn.style.display = "none";
  }
}

// Load more on button click
loadMoreBtn.addEventListener("click", renderProducts);

// Search feature
searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const filtered = allProducts
    .slice(0, displayedCount)
    .filter((p) => p.title.toLowerCase().includes(searchTerm));

  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = "<p>No products found</p>";
  } else {
    filtered.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.onclick = () => {
        window.location.href = `product.html?id=${product.id}`;
      };
      card.innerHTML = `
        <img src="${product.image}" alt="">
        <h4>${product.title}</h4>
        <p>$${product.price}</p>
      `;
      container.appendChild(card);
    });
  }
});