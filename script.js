const getProducts = async () => {
    // const response = await fetch('https://api.escuelajs.co/api/v1/products/'); duzo elementów
    const response = await fetch('https://api.storerestapi.com/products');
    const products = await response.json();


    return products;
}


document.addEventListener('DOMContentLoaded', async () => {
    let products = [];

    try {
        products = await getProducts();
    } catch (e) {
        console.log(e)
    }
    
    console.log(products);
})

//  do tego napisac funckje, ktore bedzie obejmowac tez li !
const navMobile = document.querySelector('.nav_mobile');
const burgerLines = document.querySelectorAll('.burger_btn > div');
const burgerBtn = document.querySelector('.burger_btn').addEventListener('click', () => {
    navMobile.classList.toggle('show');
    burgerLines.forEach((line) => line.classList.toggle('show'));
})