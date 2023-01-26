let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get('id'));


const getSingleProduct = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();


    return products;
};

const showProductDetails = async () => {
    let products = [];
    const productContainer = document.querySelector('.product_container');
    try {
        products = await getSingleProduct();
    } catch (e) {
        console.log(e)
    }
    products.filter((product) => product.id === id).map((product) => {
        productContainer.innerHTML += `
        <img src="${product.image}"></img>`
    })
}
document.addEventListener('DOMContentLoaded', showProductDetails);