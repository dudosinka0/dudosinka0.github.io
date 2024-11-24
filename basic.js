let btn = document.querySelector('.ham');
let menuMob = document.querySelector('nav');

btn.addEventListener('click', function () {
  menuMob.classList.toggle('open');
})


// корзина
const cart = document.getElementById("cart-window");
const cartBtn = document.getElementById("cart");
const closeBtn = document.querySelector(".close");
const orderBtn = document.getElementById("order");

const btns = document.getElementsByClassName("addbtn");
const ulCart = document.getElementById("cart-list");
const resSum = document.getElementById("sum");
let cartItems = [];
let totalSum = 0;

// проверяем localStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const savedSum = parseInt(localStorage.getItem("totalSum")) || 0;

  cartItems = savedItems;
  totalSum = savedSum;
  resSum.innerHTML = totalSum;

  cartItems.forEach((item) => {
    addItemToCart(item.name, item.price, false);
  });
});


cartBtn.onclick = opencart;  //  открытие корзины
closeBtn.onclick = closecart; //  закрытие корзины

function opencart() {   //  открытие корзины
  cart.style.display = "block";
}

function closecart() {  //  закрытие корзины и запись в localStorage
  cart.style.display = "none";
  saveCartToLocalStorage();
}

// Добавляем товары в корзину
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    let name = btns[i].dataset.name;
    let price = parseInt(btns[i].dataset.price);

    addItemToCart(name, price);
    cartItems.push({ name, price });
    totalSum += price;
    resSum.innerHTML = totalSum;
  });
}

// Функция добавления товара в корзину
function addItemToCart(name, price, save = true) {
  let liCart = document.createElement("li");
  let cartSpan = document.createElement("span");
  let delCart = document.createElement("span");

  delCart.innerHTML = "&#10060;";
  delCart.className = "cart-delete";
  cartSpan.innerHTML = name;
  liCart.append(cartSpan);
  liCart.append(delCart);
  ulCart.append(liCart);

  delCart.onclick = function () {
    liCart.remove();
    totalSum -= price;
    resSum.innerHTML = totalSum;
    cartItems = cartItems.filter((item) => !(item.name === name && item.price === price));
    saveCartToLocalStorage();
  };

  if (save) {
    saveCartToLocalStorage();
  }
}

// сохранение корзины
function saveCartToLocalStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("totalSum", totalSum);
}

// сохранение корзины также при клике на кнопку заказать
orderBtn.onclick = saveCartToLocalStorage;