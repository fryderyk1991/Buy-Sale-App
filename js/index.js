import {} from "./utils.js";
const getProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();


    return products;
};

const showData = async () => {
    let products = [];
    const allProducts = document.querySelector('.all_products');
    try {
        products = await getProducts();
    } catch (e) {
        console.log(e)
    }
    products.forEach((product) => {
        allProducts.innerHTML += `
        <div class="all_products--item" data-id="${product.id}">
        <div class="item_img--container">
        <img src="${product.image}">
        </div>
        <p>${product.title}</p>
        <p>Price: ${product.price}$</p>
        </div>`
    })
    const popularItems = document.querySelectorAll('.all_products--item');
    const selectedProduct = (e) => {
       let itemID = e.target.getAttribute("data-id");
       let url = `/product-details.html?id=${itemID}`;
       window.location.href = url;
    }
    popularItems.forEach((item) => item.addEventListener('click', selectedProduct));
} 

document.addEventListener('DOMContentLoaded', showData);

