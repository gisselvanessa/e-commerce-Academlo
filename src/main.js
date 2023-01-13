
let products=[
    {
        id:"0",
        name:"Hoodies",
        price:14.00,
        stock:3,
        urlImage: "./img/featured1.png"
    },
    {
        id:"1",
        name:"Shirts",
        price:24.00,
        stock:4,
        urlImage: "./img/featured2.png"
    },
    {
        id:"2",
        name:"Sweatshirts",
        price:24.00,
        stock:4,
        urlImage: "./img/featured3.png"
    },
    {
        id:"3",
        name:"New Hoodie",
        price:14.00,
        stock:4,
        urlImage: "./img/home.png"
    }

]

window.addEventListener("load", function () {
    const load = document.querySelector(".load");

    setTimeout(function () {
        load.style.display = "none";
    }, 2000);
});
window.addEventListener("scroll", function(){
      const header= document.querySelector("#header");
      header.classList.toggle("down", window.scrollY>0);
      console.log("scrolling ");
})

const change=document.querySelector(".bx-moon");
change.addEventListener("click", function(){
    console.log('change theme');
    change.classList.toggle("bx-sun");
    document.body.classList.toggle("darkmode");
})
////menu
const iconMenu = document.querySelector(".bx-grid-alt");
const menu = document.querySelector(".menu");
function showMenu() {
      
      
      iconMenu.addEventListener("click", function () {
      console.log("click hamburguer");
      menu.classList.toggle("menu__show");
      });

}
showMenu();

//cart
const productsContent = document.querySelector(".products__content");
const cartProducts= document.querySelector(".cart__container");
const amountCart= document.querySelector(".count");

let objCart= {};
function printAmountCart(){
    let sum=0;
    const arrayCart= Object.values(objCart);
    if(!arrayCart.length){
        amountCart.style.display="none";
        return;
    }
    amountCart.style.display="";
    arrayCart.forEach(function({amount}){
        sum+=amount;
    })
    amountCart.textContent=sum;
   
}

function printProductsInCart(){
    let html='';
    const arrayCart = Object.values(objCart);
    arrayCart.forEach(function({id,name,price,stock,urlImage,amount}) {
        // console.log(product);
        html+=`
        <article class="products__card">
                <div class="products__shape">
                    <img src="${urlImage}" alt="${name}" class="products__img">
                </div>
    
                <div class="products__data">
                    <h3 class="products__name">${name}</h3>
                    <p >Stock: ${stock} | <span class="products__price"> $${price}.00</span> </p>
                    <h3 class="products__price">Subtotal: ${price*amount}.00 </h3> <span class="products__quantity">| ${amount} Units</span>
                    
                    <button class="button products__button" id=${id}>
                            <i class="bx bx-plus"></i>
                            <i class="bx bx-minus"></i>
                            <i class="bx bx-trash"></i>
                    </button>
                </div>
        </article>
        `
    });
    // console.log(arrayCart);
    cartProducts.innerHTML=html;
}
function printProducts(){
    let html='';

    products.forEach(function({id,name,price,stock,urlImage}) {
        // console.log(product);
        html+=`
        <article class="products__card ${name}">
                <div class="products__shape">
                    <img src="${urlImage}" alt="${name}" class="products__img">
                </div>
    
                <div class="products__data">
                    <h2 class="products__price">$${price}.00 <span class="products__quantity">| Stock: ${stock}</span></h2>
                    <h3 class="products__name">${name}</h3>
    
                    <button class="button products__button" id=${id}>
                            <i class="bx bx-plus"></i>
                    </button>
                </div>
        </article>
        `
    });

    productsContent.innerHTML=html;
}

const carTotal= document.querySelector(".cart__prices-total");
const carItems= document.querySelector("#items-count");
const cartBtn= document.querySelector(".cart__checkout");

//print items and display button
function printTotalItems(){
    const arrayCart = Object.values(objCart);
    // console.log(arrayCart);
    if(!arrayCart.length){
        carItems.innerHTML=``;
        cartBtn.style.display='none';
        return
    }
    let sum=0;
    arrayCart.forEach(function({amount}){
        sum+=amount;
    });
        carItems.innerHTML=`
            <div><h3>${sum} items</h3></div>
        `;
        cartBtn.style.display='';
}

function printTotal(){
    const arrayCart = Object.values(objCart);
    let sum=0;
    if(!arrayCart.length){
        cartProducts.innerHTML=`
            <div class="cart__empty">
                <img src="./img/empty-cart.png" alt="empty cart">
                <h2>Your cart is empty</h2>
            </div>
        `;
        carTotal.innerHTML=``;
        return
    }
    
    arrayCart.forEach(function({amount,price}){
        sum+=amount*price;
    });
    carTotal.innerHTML=`
            <h3>Total: $${sum}.00</h3>
        `;
    
}

const iconCart = document.querySelector(".bx-shopping-bag")
const contentCart = document.querySelector(".cart");
const iconX = document.querySelector(".cart__close");
const iconXmenu = document.querySelector(".cart__close__menu");
const addToCart= document.querySelector(".home__button");


iconCart.addEventListener("click", function () {
    contentCart.classList.toggle("show-cart");
    console.log('click Carrito');
});
addToCart.addEventListener("click", function(){
    const id='3';
    let findProduct=products.find(function (product) {
            return product.id===id;
        });
    if(objCart[id]){
                let findProduct=products.find(function (product) {
                    return product.id===id;
                });

                if(findProduct.stock === objCart[id].amount){
                    alert('No tengo mas en stock');
                }
                else{
                    objCart[id].amount++;
                }
            // objCart[id].amount++;
            }
        
        else{
            objCart[id]={
                ...findProduct,
                amount:1,
            };
        }
    printProductsInCart();
    printTotal();
    printTotalItems();
    printAmountCart();
});

iconX.addEventListener("click", function () {
    contentCart.classList.toggle("show-cart");
    console.log('click X cart');
});
iconXmenu.addEventListener("click", function () {
    menu.classList.toggle("menu__show");
    console.log('click X menu');
});

//productos en carrito
productsContent.addEventListener("click", function(e) {
    if(e.target.classList.contains("bx-plus")){
        //obtenemos el id
        const id= e.target.parentElement.id;
        //console.log(id);
        //obtenemos el prod x id
        let findProduct=products.find(function (product) {
            return product.id===id;
        });
        // products.forEach(function(product){
        //     if(product.id=== id){
        //         findProduct= product;
        //     }
        // })
        // console.log(findProduct);

//****************logica del carrito
        if(objCart[id]){
                let findProduct=products.find(function (product) {
                    return product.id===id;
                });

                if(findProduct.stock === objCart[id].amount){
                    alert('No tengo mas en stock');
                }
                else{
                    objCart[id].amount++;
                }
                
            // objCart[id].amount++;
            }
        
        else{
            objCart[id]={
                ...findProduct,
                amount:1,
            };
        }
        // console.log(objCart);
    };
    printProductsInCart();
    printTotal();
    printTotalItems();
    printAmountCart();
});
//funcionalidades botones +-
cartProducts.addEventListener("click",function(e){
    if (e.target.classList.contains('bx-minus')) {
        const id= e.target.parentElement.id;
        if(objCart[id].amount===1){
            const res=confirm("Seguro quieres eliminar el producto?")
            if(res)delete objCart[id];
        }
        else{
            objCart[id].amount--;
        }
    }
    if (e.target.classList.contains('bx-plus')) {
        const id= e.target.parentElement.id;

        let findProduct=products.find(function (product) {
            return product.id===id;
        });

        if(findProduct.stock === objCart[id].amount){
            alert('No tengo mas en stock');
        }
        else{
            objCart[id].amount++;
        }
        
    }
    if (e.target.classList.contains('bx-trash')) {
        const id= e.target.parentElement.id;
        const res=confirm("Seguro quieres eliminar el producto?");
        if(res)delete objCart[id];
    }
    printProductsInCart();
    printTotal();
    printTotalItems();
    printAmountCart();
})

contentCart.addEventListener("click", function (e) {
    if (e.target.classList.contains("cart__btn")) {
        const res = confirm("Seguro quieres hacer la compra");

        if (!res) return;

        let newArray = [];

        products.forEach(function (product) {
            if (product.id === objCart[product.id]?.id) {
                newArray.push({
                    ...product,
                    stock: product.stock - objCart[product.id].amount,
                });
            } else {
                newArray.push(product);
            }
        });

        products = newArray;
        objCart = {};
        printAmountCart();
        printProducts();
        printProductsInCart();
        printTotalItems();
        printTotal();

        
    }
});


printAmountCart();
printProducts();
printTotal();
printTotalItems();


mixitup(".products__content",{
    selectors:{
        target: ".products__card",
    },
    animation:{
        duration:300,
    },
})





