// DOM Elements
const cartBody = document.getElementById("cart-body");
const cartTotal = document.getElementById("cart-total");
const billingForm = document.getElementById("billing-form");
const cartSection = document.getElementById("cart-section");
const billingSection = document.getElementById("billing-section");
const confirmationSection = document.getElementById("confirmation-section");

// Extract cart from query string
function getCartFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const cartData = urlParams.get("cart");

    if (!cartData) {
        alert("No cart data found! Redirecting to Pharmacy.");
        window.location.href = "Pharmacy.html"; // Redirect if cart is missing
        return [];
    }

    try {
        return JSON.parse(decodeURIComponent(cartData)); // Decode and parse cart data
    } catch (error) {
        console.error("Error parsing cart data:", error);
        alert("Invalid cart data! Redirecting to Pharmacy.");
        window.location.href = "Pharmacy.html"; // Redirect if parsing fails
        return [];
    }
}

// Display cart items
function displayCart(cart) {
    let total = 0;

    if (cart.length === 0) {
        cartBody.innerHTML = `<tr><td colspan="4">Your cart is empty.</td></tr>`;
        cartTotal.innerText = `$0.00`;
        return;
    }

    cart.forEach(item => {
        const row = document.createElement("tr");
        const itemTotal = item.quantity * item.price;
        total += itemTotal;

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${itemTotal.toFixed(2)}</td>
        `;

        cartBody.appendChild(row);
    });

    cartTotal.innerText = `$${total.toFixed(2)}`;
}

// Handle billing form submission
billingForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    alert("Order placed successfully!");

    // Hide cart and billing sections, show confirmation
    cartSection.style.display = "none";
    billingSection.style.display = "none";
    confirmationSection.classList.remove("hidden");
});

// Initialize checkout page
function init() {
    const cart = getCartFromQuery(); // Load cart from query string
    displayCart(cart); // Display cart items
}

// Run initialization on page load
document.addEventListener("DOMContentLoaded", init);
