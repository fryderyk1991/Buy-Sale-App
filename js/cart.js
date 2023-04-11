import { changeValueOfCounter, loadingComponent } from "./utils.js";

const emptyCart = document.querySelector('.empty_cart');
const emptyCartText = document.querySelector('.empty_cart > h1');

const getCartProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  return products;
};



const showCartProducts = async () => {
  const cartContainer = document.querySelector(".cart_container");
  let products = [];

  try {
    products = await getCartProducts();
  } catch (e) {
    console.log(e);
  }

  let cartProductsID = JSON.parse(localStorage.getItem("cartArray")) || [];

 
 
  if (cartProductsID.length > 0) {
    emptyCart.classList.remove('active');
    emptyCartText.style.display = "none";
  }
 else {
  emptyCart.classList.add('active');
  emptyCartText.style.display = "block";
 }
  
 
  const currentCartProducts = products
    .filter((product) => cartProductsID.some((item) => item == product.id))
    .map((product) => {
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
    });

  

  const deleteProduct = (e) => {
    let deleteIconId = e.target.getAttribute("data-delete");
    let deleteCurrentProduct = cartProductsID.filter((product) => {
      return product !== deleteIconId;
    });
    if (deleteCurrentProduct) {
      cartProductsID = deleteCurrentProduct;
      localStorage.setItem("cartArray", JSON.stringify(deleteCurrentProduct));
      cartContainer.innerHTML = ""; 
      showCartProducts();
      changeValueOfCounter();
    }
  };

  const cartProductDetails = document.querySelectorAll(
    ".cart_product--image > img"
  );

  const showProductDetails = (e) => {
    let productImage = e.target.getAttribute("data-image");
    let url = `/product-details.html?id=${productImage}`;
    window.location.href = url;
  };

  cartProductDetails.forEach((item) =>
    item.addEventListener("click", showProductDetails)
  );

  const deleteBtn = document
    .querySelectorAll("[data-delete]")
    .forEach((btn) => {
      btn.addEventListener("click", deleteProduct);
    });

  let pricesAndIdObjArray = [];

  const productPricesAndId = document
    .querySelectorAll("[data-price][data-price-id]")
    .forEach((item) => {
      pricesAndIdObjArray.push({
        itemId: item.getAttribute("data-price-id"),
        itemPrice: +item.getAttribute("data-price"),
      });
    });

  const quantinitySelect = document.querySelectorAll(".cart_select");

  const matchSelectWithId = [];

  const selectQuantinity = (e) => {
    let quantinity = e.target.value;
    let selectId = e.target.getAttribute("data-id");

    const matchSelectWithId = pricesAndIdObjArray.filter((item) => item.itemId == selectId);
    const currentPriceAfterSelect = matchSelectWithId.map((item) => item.itemPrice * quantinity);
    let newPriceAfterSelect = e.target.previousElementSibling;
    newPriceAfterSelect.innerHTML = `${currentPriceAfterSelect}$`;
  };
  quantinitySelect.forEach((option) => {
    option.addEventListener("click", selectQuantinity);
  });

  const totalPriceOfCartItems = document.querySelector(".total_price > p");
  let sum = 0;
  const sumPrices = () => {
    pricesAndIdObjArray.forEach((item) => {return sum+= item.itemPrice});
    totalPriceOfCartItems.innerHTML = `${sum}$`;
    }  
  sumPrices();
   
};
document.addEventListener("DOMContentLoaded", showCartProducts);
