// variables

const products_container = document.querySelector(".products_container");
const icon_list = document.getElementById("list");
const icon_cart = document.getElementById("cart");
const navbar_list = document.getElementById("navbar_list");
const navbar_cart = document.querySelector("#navbar_cart");
const btn_close = document.getElementById("btn_close");
const close_cart = document.querySelector(".close_cart");
const categories = document.querySelectorAll(".btn_navbar");
const title_products = document.querySelector(".title_content");
let buttons_add = document.querySelectorAll(".product_add");
let cartAmount = document.querySelector(".counter");
let cartAmount2 = document.querySelector(".counter2");
const cart_empty = document.querySelector(".cart_empty");
const cart_center = document.querySelector(".cart_center");
const buy_cart = document.querySelector(".buy_cart");
let price_total = document.querySelector("#price_total");
let cart_product_delete = document.querySelector(".cart_product_delete");
const icons_navbar = document.querySelector(".icons_navbar");
const formProducts = document.querySelector("#formProducts");
let resultSearchProduct = document.querySelector(".input_search");
let product_js = document.querySelector(".product_js");
let resultadoVacio = document.querySelector(".resultadoVacio");
let resultText = document.querySelector(".resultText");
let linksClothes = document.querySelectorAll(".linksClothes");
const search_bar = document.querySelector(".search_bar");

// funciones

linksClothes.forEach(links => {

    links.addEventListener("click", (e) => {

        if (e.currentTarget.id !== "todos") {
            localStorage.setItem("value-links-products",e.currentTarget.id);
        } else {
            localStorage.setItem("value-links-products",e.currentTarget.id);
        };
    });
})

let productsInCartLS = JSON.parse(localStorage.getItem("products-In-Cart"));

function reloadNumberAmount(){
    let numberAmount = productsInCartLS.reduce((acc,product) => acc + product.amount,0);
    cartAmount.innerText = numberAmount;
    cartAmount2.innerText = numberAmount;
};

function añadirProductosAlLateral(){

    if (productsInCartLS && productsInCartLS.length > 0) {
        cart_empty.classList.add("display_none");
        cart_center.classList.remove("display_none");
        buy_cart.classList.remove("display_none");

        cart_center.innerHTML = "";

        productsInCartLS.forEach(product =>{
            const div = document.createElement("div");
            div.classList.add("cart_product");
            div.innerHTML = ` 

                <div class="product" id="product">
                    <img src="${product.img}" class="img_product_cart" alt="${product.title}">
                    <div class="info_product_cart">
                        <h2 class="product_title_cart">${product.title}</h2>
                        <p class="count_paragraph">cantidad: <span class="count_amount">${product.amount}</span></p>
                    </div>
                </div>

            <div class="cart_product_interactive">
                <button class="cart_product_delete" id="${product.id}"><i class="bi bi-trash3-fill delete"></i></button>
                <p class="product_price">$${product.price}</p>
            </div>
            `;
            cart_center.append(div);
        });

    }else{
        cart_empty.classList.remove("display_none");
        cart_center.classList.add("display_none");
        buy_cart.classList.add("display_none");
    };

    reloadNumberAmount();
    updateRemoveProduct();
    reloadTotal();
};

añadirProductosAlLateral();

function updateRemoveProduct(){
    cart_product_delete = document.querySelectorAll(".cart_product_delete");
    
    cart_product_delete.forEach(btn_remove => {
        btn_remove.addEventListener("click", removeToCart);
    });
};

function removeToCart(e){
    e.preventDefault();
    e.stopPropagation();

    const idButton = e.currentTarget.id;
    const indexCart = productsInCartLS.findIndex(product => product.id === idButton);
        
    productsInCartLS.splice(indexCart, 1);
    añadirProductosAlLateral();

    localStorage.setItem("products-In-Cart", JSON.stringify(productsInCartLS));

};

function reloadTotal(){
    const totalCalculate = productsInCartLS.reduce((acc,product) => acc + (product.price * product.amount),0);
    price_total.innerText = `$${totalCalculate}.99`;
};

// events

icon_list.addEventListener("click",() => {
    navbar_list.classList.toggle("active");
});

btn_close.addEventListener("click",() => {
    navbar_list.classList.remove("active");
});

icon_cart.addEventListener("click",() => {
    navbar_cart.classList.toggle("active");
});

close_cart.addEventListener("click",() => {
    navbar_cart.classList.remove("active");
});

document.body.addEventListener("click", (e) => {
    // e.stopPropagation();

    if (!icons_navbar.contains(e.target) && !navbar_cart.contains(e.target) && !navbar_list.contains(e.target)){
        navbar_list.classList.remove("active");
        navbar_cart.classList.remove("active");
    };
});