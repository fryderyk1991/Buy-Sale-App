import { changeValueOfCounter } from "./utils.js";


const getCartProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();


    return products;
};

const showCartProducts = async () => {
    
   const cartContainer = document.querySelector('.cart_container');
   let products = [];
   
   try {
        products = await getCartProducts();
   } catch (e) {
    console.log(e)
   }

    let cartProductsID = (JSON.parse(localStorage.getItem('cartArray'))) || [];

    
        const currentCartProducts = products.filter(product => cartProductsID.some(item => item == product.id)).map((product) => {
            cartContainer.innerHTML += `
            <div class="cart_container--product">
                <div class="cart_product--image" >
                <img src=${product.image} data-image=${product.id}>
                </div>
                <p class="cart_product--desc">${product.title}</p>
                <div class="cart_product-price--quantinity">
                <p data-price=${product.price} data-price-id=${product.id}>${product.price}$</p>
                <select class="cart_select" data-id=${product.id}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>
                <i class="fa-solid fa-trash" data-delete=${product.id}></i>
                </div>
            <div>`;
        })

    const deleteProduct = (e) => {
        let deleteIconId = e.target.getAttribute("data-delete");
        let deleteCurrentProduct = cartProductsID.filter((product) => { return product !== deleteIconId });
        if (deleteCurrentProduct) {
            cartProductsID = deleteCurrentProduct;
            localStorage.setItem('cartArray', JSON.stringify(deleteCurrentProduct));
            cartContainer.innerHTML = '';
            showCartProducts();
            changeValueOfCounter();
        }
    }

    const cartProductDetails = document.querySelectorAll('.cart_product--image > img');
    
    const showProductDetails = (e) => {
        let productImage = e.target.getAttribute("data-image");
        let url = `/product-details.html?id=${productImage}`;
        window.location.href = url;
    }
    

    cartProductDetails.forEach((item) => item.addEventListener('click', showProductDetails));
    
    const deleteBtn = document.querySelectorAll('[data-delete]').forEach((btn) => {
        btn.addEventListener('click', deleteProduct);
    });

    const pricesObjArray = [];

    const productPrices = document.querySelectorAll('[data-price][data-price-id]').forEach((item) => {
        pricesObjArray.push({itemId : item.getAttribute('data-price-id'), itemPrice : item.getAttribute('data-price')});
    });

    // const pricesToNum = pricesObjArray.map((item) => { return item.itemId = +item.itemId, item.itemPrice =+item.itemPrice });
    
    console.log(pricesObjArray)
    // nodlist z selectami 
    const quantinitySelect = document.querySelectorAll('.cart_select');

    const selectQuantinity = (e) => {
        let option = e.target.value;
        let selectId = e.target.getAttribute("data-id");
        let currentSelect = e.target.previousElementSibling;
        const matchIdSelect = pricesObjArray.filter((item) => {return item.itemId === selectId});
        if (matchIdSelect) {
            const currentPrice = matchIdSelect.map((item) => {return item.itemPrice * option});
            currentSelect.innerHTML = `${currentPrice}$`
         }
    }

    quantinitySelect.forEach((option) => {option.addEventListener('click', selectQuantinity)});

 
    /// ----->
    // cena za cały koszyk 
    // const totalPriceOfCartItems = document.querySelector(".total_price > p");

    // // tablica z cenami producktów 
    // const pricesArray = [];

    // // nodelist do którego dodajemy value data_price!
    // const productPrices = document.querySelectorAll('[data-price]').forEach((price) => {
    //     pricesArray.push(price.getAttribute("data-price"));
    // });


    // // tablica która konwertuje stringi na numery 
    // const pricesToNum = pricesArray.map((price) => {return price = +price});

    // const sumPrices = () => {
    //     let sum = 0;
    //     pricesToNum.forEach((item) => {return sum+=item});
    //     totalPriceOfCartItems.innerHTML = `${sum} $`;
    // }
    // sumPrices()

    // // nodlist z selectami 
    // const quantinitySelect = document.querySelectorAll('.cart_select');

    // const selectQuantinity = (e) => {
    //     let option = e.target.value;
    //     let selectId = e.target.getAttribute("data-id");


    //     // console.log(option, selectId, priceId)
    //     console.log(pricesArray)
    // }

    // quantinitySelect.forEach((option) => {option.addEventListener('click', selectQuantinity)});
 }



document.addEventListener('DOMContentLoaded', showCartProducts);

