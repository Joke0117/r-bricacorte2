document.addEventListener('DOMContentLoaded', function() {
    const apiURL = 'https://fakestoreapi.com/products';
    const productGrid = document.getElementById('productGrid');
    const productFilter = document.getElementById('productFilter');

    // Fetch products from API
    fetch(apiURL)
        .then(response => response.json())
        .then(products => {
            const limitedProducts = products.slice(0, 15);  
            displayProducts(limitedProducts);  
            populateFilterOptions(limitedProducts);  
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to display products
    function displayProducts(products) {
        productGrid.innerHTML = '';  
        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
            `;
            productGrid.appendChild(card);
        });
    }

    // Function to populate filter options
    function populateFilterOptions(products) {
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.title;
            productFilter.appendChild(option);
        });

        // Filter logic
        productFilter.addEventListener('change', function() {
            const selectedValue = this.value;
            if (selectedValue === 'all') {
                displayProducts(products);  
            } else {
                const filteredProduct = products.filter(product => product.id == selectedValue);
                displayProducts(filteredProduct);  
            }
        });
    }
});
