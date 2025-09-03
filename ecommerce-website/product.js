const details = document.getElementById("product-details");

// Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://fakestoreapi.com/products/${id}`)
  .then((res) => res.json())
  .then((product) => {
    details.innerHTML = `
      <h2>${product.title}</h2>
      <img src="${product.image}" alt="" style="width:200px">
      <p><strong>Price:</strong> $${product.price}</p>
      <p><strong>Category:</strong> ${product.category}</p>
      <p>${product.description}</p>
      <a href="index.html">← Back to Products</a>
    `;
  });