const getProducts = async () => {
    // const response = await fetch('https://api.escuelajs.co/api/v1/products/');
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();


    return products;
}


document.addEventListener('DOMContentLoaded', async () => {
    let products = [];
    const allProducts = document.querySelector('.all_products');
    try {
        products = await getProducts();
    } catch (e) {
        console.log(e)
    }
    products.forEach((product) => {
        allProducts.innerHTML += `
        <div class="all_products--item">
        <div class="item_img--container">
        <img src="${product.image}">
        </div>
        <p>Title:${product.title}</p>
        <p>Price:${product.price}$</p>
        <button class="item_button--buy">Buy now</button>
      
        </div>`
    })
    console.log(products);
})



//  do tego napisac funckje, ktore bedzie obejmowac tez li !
const navMobile = document.querySelector('.nav_mobile');
const burgerLines = document.querySelectorAll('.burger_btn > div');
const burgerBtn = document.querySelector('.burger_btn').addEventListener('click', () => {
    navMobile.classList.toggle('show');
    burgerLines.forEach((line) => line.classList.toggle('show'));
})
