// DOM Elements
const medicineContainer = document.getElementById("medicine-container");
const cartBody = document.getElementById("cart-body");
const cartTotal = document.getElementById("cart-total");
const saveFavoritesButton = document.getElementById("save-favorites");
const loadFavoritesButton = document.getElementById("load-favorites");
const clearCartButton = document.getElementById("clear-cart");
const checkoutButton = document.getElementById("checkout");
const buyNowButton = document.getElementById("buy-now");

// Cart array to store selected items
let cart = [];

// Fetch and Render Medicines
document.addEventListener("DOMContentLoaded", () => {
    fetch("Pharmacy.Json")
        .then((response) => response.json())
        .then((data) => renderMedicines(data.categories))
        .catch((error) => console.error("Error loading medicines:", error));
});

function renderMedicines(categories) {
    categories.forEach((category) => {
        // Create section for each category
        const section = document.createElement("div");
        section.classList.add("section");

        // Add category title
        const title = document.createElement("h2");
        title.textContent = category.name;
        section.appendChild(title);

        // Create medicine list
        const medicineList = document.createElement("div");
        medicineList.classList.add("medicine-list");

        category.items.forEach((item) => {
            const medicineItem = document.createElement("div");
            medicineItem.classList.add("medicine-item");

            // Medicine image
            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;
            medicineItem.appendChild(img);

            // Medicine name
            const name = document.createElement("h3");
            name.textContent = item.name;
            medicineItem.appendChild(name);

            // Medicine price
            const price = document.createElement("p");
            price.textContent = `Price: $${item.price.toFixed(2)}`;
            medicineItem.appendChild(price);

            // Quantity input
            const input = document.createElement("input");
            input.type = "number";
            input.min = "0";
            input.value = "0";
            input.dataset.price = item.price;
            input.id = item.name.replace(/\s+/g, "");
            medicineItem.appendChild(input);

            // Add to Cart button
            const button = document.createElement("button");
            button.textContent = "Add to Cart";
            button.dataset.action = "add-to-cart";
            button.addEventListener("click", (event) => handleAddToCart(event, item.name, item.price));
            medicineItem.appendChild(button);

            medicineList.appendChild(medicineItem);
        });

        section.appendChild(medicineList);
        medicineContainer.appendChild(section);
    });
}

// Handle Add to Cart
function handleAddToCart(event, medicineName, price) {
    const parent = event.target.parentElement;
    const quantity = parseInt(parent.querySelector("input").value, 10);

    if (quantity > 0) {
        const existingItem = cart.find((item) => item.name === medicineName);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name: medicineName, quantity, price });
        }

        updateCart();
    } else {
        alert("Please select a valid quantity.");
    }
}

// Update Cart Table
function updateCart() {
    cartBody.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${(item.quantity * item.price).toFixed(2)}</td>
            <td>
                <button class="remove-item" data-index="${index}">Remove</button>
            </td>
        `;

        total += item.quantity * item.price;
        cartBody.appendChild(row);
    });

    cartTotal.innerText = `$${total.toFixed(2)}`;
    addRemoveItemListeners();
}

// Add Remove Item Listeners
function addRemoveItemListeners() {
    document.querySelectorAll(".remove-item").forEach((button) => {
        button.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// Save Favorites
saveFavoritesButton.addEventListener("click", () => {
    localStorage.setItem("favorites", JSON.stringify(cart));
    alert("Favorites saved!");
});

// Load Favorites
loadFavoritesButton.addEventListener("click", () => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites) {
        cart = favorites;
        updateCart();
        alert("Favorites loaded!");
    } else {
        alert("No favorites found.");
    }
});

// Clear Cart
clearCartButton.addEventListener("click", () => {
    cart = [];
    updateCart();
});

// Redirect to Checkout Page with Cart Data
checkoutButton.addEventListener("click", () => {
    if (cart.length > 0) {
        const cartQuery = encodeURIComponent(JSON.stringify(cart));
        window.location.href = `Checkout.html?cart=${cartQuery}`;
    } else {
        alert("Your cart is empty!");
    }
});

// Buy Now
buyNowButton.addEventListener("click", () => {
    if (cart.length > 0) {
        const cartQuery = encodeURIComponent(JSON.stringify(cart));
        window.location.href = `Checkout.html?cart=${cartQuery}`;
    } else {
        alert("Your cart is empty!");
    }
}); 
