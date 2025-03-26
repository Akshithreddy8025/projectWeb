// Mobile Menu Toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const nav = document.querySelector('nav ul');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// Product Image Gallery
if (document.querySelector('.thumbnail-images')) {
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    const mainImage = document.getElementById('main-image');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainImage.src = this.src.replace('-thumb', '-large');
            thumbnails.forEach(t => t.style.borderColor = '#ddd');
            this.style.borderColor = '#3498db';
        });
    });
}

// Shopping Cart Functionality
if (document.querySelector('.cart-items')) {
    // Quantity controls
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            
            if (this.classList.contains('minus') && value > 1) {
                input.value = value - 1;
            } else if (this.classList.contains('plus')) {
                input.value = value + 1;
            }
            
            updateCartTotal();
        });
    });
    
    // Quantity input changes
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            if (this.value < 1) this.value = 1;
            updateCartTotal();
        });
    });
    
    // Remove item
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.cart-item').remove();
            updateCartTotal();
        });
    });
    
    // Update cart total
    function updateCartTotal() {
        let subtotal = 0;
        
        document.querySelectorAll('.cart-item').forEach(item => {
            const price = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
            const quantity = parseInt(item.querySelector('.quantity-input').value);
            const total = price * quantity;
            
            item.querySelector('.item-total p').textContent = '$' + total.toFixed(2);
            subtotal += total;
        });
        
        const tax = subtotal * 0.07; // 7% tax
        const total = subtotal + tax;
        
        document.querySelector('.summary-row:nth-child(1) span:last-child').textContent = '$' + subtotal.toFixed(2);
        document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = '$' + tax.toFixed(2);
        document.querySelector('.summary-row.total span:last-child').textContent = '$' + total.toFixed(2);
    }
    
    // Initialize cart total
    updateCartTotal();
}

// Form Validation for Checkout
if (document.getElementById('shipping-form')) {
    const form = document.getElementById('shipping-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Simple validation - check required fields
        document.querySelectorAll('#shipping-form [required]').forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        if (isValid) {
            // Proceed to payment (in a real app, this would submit the form)
            alert('Form is valid. Proceeding to payment...');
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Local Storage for Cart (Optional)
if (typeof(Storage) !== "undefined") {
    // Load cart from localStorage
    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('bookwormsCart')) || [];
        // Update UI with cart items
    }
    
    // Save cart to localStorage
    function saveCart(cart) {
        localStorage.setItem('bookwormsCart', JSON.stringify(cart));
    }
    
    // Load cart on page load
    window.addEventListener('load', loadCart);
}