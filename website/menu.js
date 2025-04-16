// Test data for products
const testProducts = [
    {
        id: 1,
        name: "Margherita Pizza",
        description: "Klasická italská pizza s rajčatovou omáčkou a mozzarellou",
        price: 199,
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        name: "Hamburger Classic",
        description: "Hovězí burger s čerstvou zeleninou a speciální omáčkou",
        price: 249,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        name: "Caesar Salad",
        description: "Římský salát s kuřecím masem, parmezánem a caesar dresinkem",
        price: 179,
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        name: "Kebab v pita chlebu",
        description: "Marinované kuřecí maso s čerstvou zeleninou a jogurtovou omáčkou",
        price: 189,
        image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 5,
        name: "Döner Kebab",
        description: "Marinované jehněčí maso s čerstvou zeleninou a česnekovou omáčkou",
        price: 199,
        image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 6,
        name: "Cheese Burger",
        description: "Hovězí burger s plátkem sýra, cibulí, rajčaty a speciální omáčkou",
        price: 269,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 7,
        name: "Bacon Burger",
        description: "Hovězí burger s slaninou, sýrem, cibulí a BBQ omáčkou",
        price: 289,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 8,
        name: "Chicken Kebab",
        description: "Marinované kuřecí maso s čerstvou zeleninou a chilli omáčkou",
        price: 179,
        image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 9,
        name: "Vegetarian Burger",
        description: "Rostlinný burger s avokádem, čerstvou zeleninou a veganskou majonézou",
        price: 239,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 10,
        name: "Falafel Wrap",
        description: "Smažené cizrnové koule s čerstvou zeleninou a tahini omáčkou",
        price: 169,
        image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 11,
        name: "Hawaii Pizza",
        description: "Pizza s rajčatovou omáčkou, mozzarellou, šunkou a ananasem",
        price: 219,
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 12,
        name: "Pepsi Cola",
        description: "0.5l",
        price: 45,
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60"
    }
];

// Test data for restaurant
const testRestaurant = {
    name: "Test Restaurant",
    address: "Test Street 123, Prague"
};

// Initialize Telegram WebApp
let tg = window.Telegram.WebApp;
tg.expand();

// DOM Elements
const productContainer = document.getElementById('productContainer');
const searchInput = document.getElementById('searchInput');
const cartBadge = document.getElementById('cartBadge');
const viewCartBtn = document.getElementById('viewCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const confirmOrderBtn = document.getElementById('confirmOrderBtn');

// Cart state
let cart = [];

// Initialize the page
function initializePage() {
    try {
        // Set restaurant info
        document.getElementById('restaurantName').textContent = testRestaurant.name;
        document.getElementById('restaurantAddress').textContent = testRestaurant.address;

        // Display products using test data
        displayProducts(testProducts);

        // Set up event listeners
        searchInput.addEventListener('input', handleSearch);
        viewCartBtn.addEventListener('click', () => cartModal.show());
        confirmOrderBtn.addEventListener('click', handleOrder);
    } catch (error) {
        console.error('Error initializing page:', error);
        // Display error message to user
        productContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-danger">Chyba při načítání menu. Prosím zkuste to znovu později.</p>
            </div>
        `;
    }
}

// Display products
function displayProducts(products) {
    productContainer.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-12 col-md-6 col-lg-4';
        productCard.innerHTML = `
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title product-title">${product.name}</h5>
                    <p class="card-text product-description">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="product-price">${product.price} Kč</span>
                        <div class="d-flex align-items-center">
                            <button class="btn-cart" onclick="updateCart(${product.id}, -1)">-</button>
                            <span class="cart-counter" id="counter-${product.id}">0</span>
                            <button class="btn-cart" onclick="updateCart(${product.id}, 1)">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProducts = testProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

// Update cart
function updateCart(productId, change) {
    const product = testProducts.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
    } else if (change > 0) {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    // Update counters
    cart.forEach(item => {
        const counter = document.getElementById(`counter-${item.id}`);
        if (counter) {
            counter.textContent = item.quantity;
        }
    });

    // Update cart badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadge.textContent = totalItems;
    cartBadge.classList.toggle('d-none', totalItems === 0);

    // Update checkout button
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutBtn.textContent = `Dokončit objednávku (${total} Kč)`;
    checkoutBtn.disabled = total === 0;

    // Update cart modal
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-muted">Váš košík je prázdný</p>';
        cartTotal.textContent = '0 Kč';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-0">${item.name}</h6>
                        <small class="text-muted">${item.price} Kč</small>
                    </div>
                    <div class="d-flex align-items-center">
                        <button class="btn-cart" onclick="updateCart(${item.id}, -1)">-</button>
                        <span class="cart-counter">${item.quantity}</span>
                        <button class="btn-cart" onclick="updateCart(${item.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `).join('');
        cartTotal.textContent = `${total} Kč`;
    }
}

// Handle order
function handleOrder() {
    const order = {
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    // Send order to Telegram
    tg.sendData(JSON.stringify(order));
    
    // Clear cart and close modal
    cart = [];
    updateCartUI();
    cartModal.hide();
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);