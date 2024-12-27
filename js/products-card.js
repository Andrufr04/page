const products = [
    { id: 1, name: "Kalanchoe", description: "Spiky green cactus.", price: 10, discountPrice: 8, inStock: true, image: "imgs/flow/kalanhoe1.jpg" },
    { id: 3, name: "Monstera", description: "Tropical monstera plant", price: 20, discountPrice: 18, inStock: true, image: "imgs/flow/monstera1.jpg" },
    { id: 5, name: "Monstera", description: "Tropical monstera plant", price: 8, inStock: true, image: "imgs/flow/monstera2.jpg" },
    { id: 4, name: "Begonia", description: "Colorful begonias", price: 12, inStock: true, image: "imgs/flow/begonia2.jpg" },
    { id: 2, name: "Begonia", description: "Colorful begonias", price: 15, inStock: false, image: "imgs/flow/begonia1.jpg" },
    { id: 6, name: "Cactus", description: "Beautiful orchid plant.", price: 25, discountPrice: 20, inStock: true, image: "imgs/flow/cactus1.jpg" },
    { id: 7, name: "Cactus", description: "Healing aloe vera plant.", price: 15, inStock: true, image: "imgs/flow/cactus2.jpg" },
    { id: 8, name: "Cactus", description: "Healing aloe vera plant.", price: 30, inStock: false, image: "imgs/flow/cactus3.jpg" },
    { id: 9, name: "Cactus", description: "Healing aloe vera plant.", price: 8, inStock: true, image: "imgs/flow/cactus4.jpg" },
    { id: 10, name: "Cactus", description: "Healing aloe vera plant.", price: 17, inStock: true, image: "imgs/flow/cactus5.jpg" },
    { id: 11, name: "Orchid", description: "Healing aloe vera plant.", price: 80, inStock: true, image: "imgs/flow/orhidea1.jpg" },
    { id: 12, name: "Orchid", description: "Healing aloe vera plant.", price: 16, inStock: true, image: "imgs/flow/orhidea2.jpg" },
    { id: 13, name: "Orange", description: "Healing aloe vera plant.", price: 150, inStock: true, image: "imgs/flow/citrus1.jpg" },
    { id: 14, name: "Bonsai", description: "Healing aloe vera plant.", price: 15, inStock: true, image: "imgs/flow/bonsai1.jpg" },
    { id: 15, name: "Bonsai", description: "Healing aloe vera plant.", price: 25, inStock: true, image: "imgs/flow/bonsai2.jpg" },
    { id: 16, name: "Cyclamen", description: "Healing aloe vera plant.", price: 6, inStock: true, image: "imgs/flow/ciklamen1.jpg" },
];

products.sort((a, b) => b.inStock - a.inStock);

const MAX_CARDS_PER_PAGE = 8;
let currentPage = 1;
const productGrid = document.getElementById("productGrid");
const paginationContainer = document.querySelector(".pagination");
const filterForm = document.getElementById("filterForm");
let filteredProducts = products;

// корзина
let cartCount = 0;
let totalPrice = 0;
const cartCountElement = document.querySelector(".cart-count");
const cartTotalElement = document.querySelector(".cart-text div:last-child");

function updateCart(price) {
    cartCount++;
    totalPrice += price;
    cartCountElement.textContent = cartCount;
    cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Создание карточек
function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";

    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.className = product.inStock ? "" : "out-of-stock";
    imageContainer.appendChild(img);

    const textContainer = document.createElement("div");

    const titleStockContainer = document.createElement("div");
    titleStockContainer.className = "title-stock-container";

    const title = document.createElement("h3");
    title.textContent = product.name;

    const stockText = document.createElement("p");
    stockText.className = `stock ${product.inStock ? "" : "out-of-stock"}`;
    stockText.textContent = product.inStock ? "Есть на складе" : "Нет на складе";

    titleStockContainer.appendChild(title);
    titleStockContainer.appendChild(stockText);

    const description = document.createElement("p");
    description.textContent = product.description;

    const priceContainer = document.createElement("div");
    priceContainer.className = "price-container";

    const priceLabel = document.createElement("p");
    priceLabel.className = "price-label";
    priceLabel.textContent = "Цена:";

    const price = document.createElement("p");
    price.className = "price";

    if (product.discountPrice) {
        const oldPrice = document.createElement("span");
        oldPrice.className = "old-price";
        oldPrice.textContent = `$${product.price.toFixed(2)}`;

        const newPrice = document.createElement("span");
        newPrice.className = "new-price";
        newPrice.textContent = `$${product.discountPrice.toFixed(2)}`;

        price.appendChild(oldPrice);
        price.appendChild(newPrice);
    } else {
        price.textContent = `$${product.price.toFixed(2)}`;
    }

    priceContainer.appendChild(priceLabel);
    priceContainer.appendChild(price);

    const buyButton = document.createElement("button");
    buyButton.className = "buy-button";
    buyButton.textContent = "Купить";
    if (!product.inStock) buyButton.disabled = true;

    const priceButtonContainer = document.createElement("div");
    priceButtonContainer.className = "price-button-container";
    priceButtonContainer.appendChild(priceContainer);
    priceButtonContainer.appendChild(buyButton);

    textContainer.appendChild(titleStockContainer);
    textContainer.appendChild(description);
    textContainer.appendChild(priceButtonContainer);

    card.appendChild(imageContainer);
    card.appendChild(textContainer);

    buyButton.addEventListener("click", () =>
        updateCart(product.discountPrice || product.price)
    );

    productGrid.appendChild(card);
}

function displayPage(page) {
    productGrid.innerHTML = "";
    const startIndex = (page - 1) * MAX_CARDS_PER_PAGE;
    const endIndex = startIndex + MAX_CARDS_PER_PAGE;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    productsToShow.forEach((product) => createProductCard(product));

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

function updatePagination() {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(filteredProducts.length / MAX_CARDS_PER_PAGE);

    const prevArrow = document.createElement("a");
    prevArrow.href = "#prev";
    prevArrow.className = `arrow prev ${currentPage === 1 ? "disabled" : ""}`;
    prevArrow.innerHTML = "&lt;";
    prevArrow.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            displayPage(currentPage);
            updatePagination();
        }
    });
    paginationContainer.appendChild(prevArrow);

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement("a");
        pageLink.href = `#${i}`;
        pageLink.className = `page ${currentPage === i ? "active" : ""}`;
        pageLink.textContent = i;
        pageLink.addEventListener("click", (e) => {
            e.preventDefault();
            currentPage = i;
            displayPage(currentPage);
            updatePagination();
        });
        paginationContainer.appendChild(pageLink);
    }

    const nextArrow = document.createElement("a");
    nextArrow.href = "#next";
    nextArrow.className = `arrow next ${currentPage === totalPages ? "disabled" : ""}`;
    nextArrow.innerHTML = "&gt;";
    nextArrow.addEventListener("click", (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            displayPage(currentPage);
            updatePagination();
        }
    });
    paginationContainer.appendChild(nextArrow);
}

function applyFilters() {
    const nameFilter = document.getElementById("nameFilter").value.toLowerCase();
    const stockFilter = document.getElementById("stockFilter").value;
    const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Infinity;

    filteredProducts = products.filter((product) => {
        const matchesName = product.name.toLowerCase().includes(nameFilter);
        const matchesStock =
            stockFilter === "all" ||
            (stockFilter === "inStock" && product.inStock) ||
            (stockFilter === "outOfStock" && !product.inStock);
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

        return matchesName && matchesStock && matchesPrice;
    });

    currentPage = 1;
    displayPage(currentPage);
    updatePagination();
}

filterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    applyFilters();
});

displayPage(currentPage);
updatePagination();
