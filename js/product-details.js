import {selectedProductToCart, modifySelectedProductToCart, changeValueOfCounter} from "./utils.js";
let params = (new URL(document.location)).searchParams;
let id = parseInt(params.get('id'));


const getSingleProduct = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();


    return products;
};

const showProductDetails = async () => {
    let products = [];
    const productContainer = document.querySelector('.product_container')
    try {
        products = await getSingleProduct();
    } catch (e) {
        console.log(e)
    }
    products.filter((product) => product.id === id).map((product) => {
       productContainer.innerHTML += `
       <div class="product_container--details">
            <div class="product_details--img">
            <img src="${product.image}">
            </div>
            <div class="details_container--desc">
        <div class="details_desc">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p class="details_price">Price: ${product.price}$</p>
        </div>
        <button class="details_btn" data-id="${product.id}">Add to cart</button>
        </div>
        </div>
       ` 
        let data = [];
        const addProductToLocalStorage = () => { 
            data = JSON.parse(localStorage.getItem('cartArray')) || []; 
                if (data.indexOf(selectedProductToCart) == -1) {
                    data.push(selectedProductToCart);
                    localStorage.setItem('cartArray', JSON.stringify(data));
                    console.log(data)
                }
                else {
                    alert("THIS PRODUCT IS YOUR ALREADY");
                }
                
        }
        const removeProductFromLocalStorage = (buttonID) => {
           let productToDelete = buttonID;
           let modifyData = data.filter((product) => {return product !== productToDelete});
           if (modifyData) {
            data = JSON.parse(localStorage.getItem('cartArray')) || []; 
            localStorage.setItem('cartArray', JSON.stringify(modifyData));
           }
        }
       const addProductToCart = (e) => {
         let button = e.target;
         let buttonID = e.target.getAttribute("data-id");
         button.classList.toggle("active");
         if (button.classList.contains("active")) {
            button.innerHTML = "Remove from cart";
            modifySelectedProductToCart(`${buttonID}`);
            addProductToLocalStorage()
            changeValueOfCounter()
         }
         else  {
            button.innerHTML = "Add to cart";
            removeProductFromLocalStorage(buttonID)
            changeValueOfCounter()
         };
       }
       const detailsBtn = document.querySelector('.details_btn').addEventListener('click', addProductToCart);
    });

};


document.addEventListener('DOMContentLoaded', showProductDetails);

