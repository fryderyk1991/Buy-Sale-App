const openCloseNav = () => {
    const navMobile = document.querySelector('.nav_mobile');
    const burgerLines = document.querySelectorAll('.burger_btn > div');
    navMobile.classList.toggle('show');
    burgerLines.forEach((line) => line.classList.toggle('show'));
    }
const burgerBtn = document.querySelector('.burger_btn').addEventListener('click', openCloseNav);
    

export const loadingComponent = document.querySelector('.loading_component');



const linkToCart = document.querySelector('.cart_icon > i').addEventListener('click', () => {
    window.location.href = "/cart.html";
})

export let selectedProductToCart = "";
export let modifySelectedProductToCart = (value) => {selectedProductToCart = value}; 

export let cartCounter = document.querySelector('.cart_icon--counter');

export const changeValueOfCounter = () => {
    let counter = JSON.parse(localStorage.getItem('cartArray'));
    if (counter) {
        counter = JSON.parse(localStorage.getItem('cartArray')).length;
    }
    if (counter === null) {
        counter = 0
    }
    cartCounter.innerHTML = counter;   
}
changeValueOfCounter();





