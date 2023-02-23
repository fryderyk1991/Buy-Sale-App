const openCloseNav = () => {
    const navMobile = document.querySelector('.nav_mobile');
    const burgerLines = document.querySelectorAll('.burger_btn > div');
    navMobile.classList.toggle('show');
    burgerLines.forEach((line) => line.classList.toggle('show'));
    }
const burgerBtn = document.querySelector('.burger_btn').addEventListener('click', openCloseNav);
    

// link do koszyka
const linkToCart = document.querySelector('.cart_icon > i').addEventListener('click', () => {
    window.location.href = "/cart.html";
})



// tablica z id produktów, które wybraliśmhy do koszyka !
// export let cartProducts = []; // to poebiramy do Cart.js i robimy request do api !


// zmmienna odpowiedzialna za id produktu, który wybiermay do koszyka~!
export let selectedProductToCart = "";
export let modifySelectedProductToCart = (value) => {selectedProductToCart = value}; 



// licznik koszyka
export let cartCounter = document.querySelector('.cart_icon--counter');
// export let counter = cartProducts.length;
// cartCounter.innerHTML = counter;

// export let counter = JSON.parse(localStorage.getItem('cartArray'));

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
// cartCounter.innerHTML = counter;




