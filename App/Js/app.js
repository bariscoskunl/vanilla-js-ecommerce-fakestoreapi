const apiUrl = "https://fakestoreapi.com/products";
let cart = [];
let totalPrice = 0;

// Fetch and render unique product categories from API
function fetchCategories() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const categories = [...new Set(data.map((item) => item.category))];
      const categoryList = document.getElementById("category-list");
      
      categoryList.innerHTML = "";
      categories.forEach((category) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = category;
        li.addEventListener("click", () => filterProductByCategory(category));
        categoryList.appendChild(li);
      });
    })
    .catch((error) => console.log("Hata: ", error));
}

// Fetch all available products from API and render cards
function fetchProduct(){
    fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ``;
        
        data.forEach(product => {
            const productCart = `
            <div class="col-md-4 mb-4">
                <div class="card h-100 shadow-sm">
                    <img src="${product.image}" class="card-img-top product-card-img" alt="${product.title}">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title text-truncate h6" title="${product.title}">${product.title}</h5>
                        <p class="card-text text-truncate small text-muted">${product.description}</p>
                        <p class="card-text fw-bold text-primary">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary btn-sm w-100" onclick="addToCart('${product.title.replace(/'/g, "\\'")}', ${product.price})">Sepete Ekle</button>
                    </div>
                </div>        
            </div>
            `;
            productList.innerHTML += productCart;
        });
    })
    .catch((error) => console.log("Hata: ", error));
}

// Filter and render products based on selected category
function filterProductByCategory(category){
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const filteredProducts = data.filter(product => product.category === category);
        const productList = document.getElementById('product-list');

        productList.innerHTML = ``;
        filteredProducts.forEach(product =>{
            const productCart = `
            <div class="col-md-4 mb-4">
                 <div class="card h-100 shadow-sm">
                     <img src="${product.image}" class="card-img-top product-card-img" alt="${product.title}">
                     <div class="card-body d-flex flex-column justify-content-between">
                         <h5 class="card-title text-truncate h6" title="${product.title}">${product.title}</h5>
                         <p class="card-text fw-bold text-primary">$${product.price.toFixed(2)}</p>
                         <button class="btn btn-primary btn-sm w-100" onclick="addToCart('${product.title.replace(/'/g, "\\'")}', ${product.price})">Sepete Ekle</button>
                     </div>
                 </div>
            </div>
            `;
            productList.innerHTML += productCart;
        });
    })
    .catch((error) => console.log("Hata: ", error));
}

// Initialize application state on DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  fetchCategories();
  fetchProduct();
});

// Add items to state array and update cumulative pricing state
function addToCart(productName, productPrice){
    const price = parseFloat(productPrice);
    const existingProduct = cart.find(item => item.name === productName);
    
    if(existingProduct){
        existingProduct.quantity++;
        totalPrice += price;
    }
    else{
        cart.push({name: productName, price: price, quantity : 1});
        totalPrice += price;
    }
    alertify.success(productName + ' sepete eklendi!');
    updateCart();
}

// Re-render Cart UI element collection and compute subtotals
function updateCart(){
    const cartItem = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartItem.innerHTML = ``;
    let totalCartPrice = 0;
    
    cart.forEach((item, index) =>{
        const itemTotalPrice = parseFloat(item.price * item.quantity).toFixed(2);
        totalCartPrice += item.price * item.quantity; 

        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center gap-2";
        
        li.innerHTML = `
          <span class="cart-item-title" title="${item.name}">${item.name}</span>
          <span class="badge bg-primary rounded-pill">Adet: ${item.quantity}</span>
          <div class="btn-group btn-group-sm">
             <button class="btn btn-outline-secondary py-0" onclick="decreaseQuantity(${index})">-</button>
             <button class="btn btn-outline-secondary py-0" onclick="increaseQuantity(${index})">+</button>
          </div>
          <span class="fw-bold text-end" style="min-width: 70px;">${itemTotalPrice} $</span>
        `;
        cartItem.appendChild(li);
    });
    
    totalPriceElement.textContent = totalCartPrice.toFixed(2);
    totalPrice = totalCartPrice;
}

// Increment target product item count state
function increaseQuantity(index){
    cart[index].quantity++;
    totalPrice += cart[index].price;
    updateCart();
}

// Decrement target product item count state or remove if counter hits zero
const decreaseQuantity = function decreaseQuantity(index){
    if(cart[index].quantity > 1){
        cart[index].quantity--;
        totalPrice -= cart[index].price;
        updateCart();
    }
    else{
        removeFromCart(index);
    }
}
window.decreaseQuantity = decreaseQuantity;

// Delete targeted single product reference object from global cart state
function removeFromCart(index){
    totalPrice -= cart[index].price * cart[index].quantity;
    cart.splice(index, 1);
    alertify.warning('Ürün sepetten kaldırıldı!');
    updateCart();
}

// Reset data collection state structures completely
function emptyCart(){
    if(cart.length === 0) return;
    cart = [];
    totalPrice = 0;
    alertify.warning('Sepet boşaltıldı!');
    updateCart();
}

// Finalize fictional payment operation transaction sequence
function completedPurchase(){
    if(cart.length === 0){
        alertify.error('Sepetiniz boş!');
        return;
    }
    alertify.success('Satın alma işlemi başarıyla tamamlandı!');
    emptyCart();
}