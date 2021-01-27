// -----------------------HEADER------------------------
/*
 ******* SLIDER *******
 */
const slide = () => {
  const dots = Array.from(document.querySelectorAll(".slider__dot"));
  const arrows = Array.from(document.querySelectorAll(".slider__arrow"));
  const slider = document.querySelector(".slider__items");
  let counter = 0;

  dots.forEach((dot, index) => {
    dot.addEventListener("click", (e) => {
      const selected = document.querySelector(".slider__dot--active");
      selected.classList.remove("slider__dot--active");
      e.target.classList.add("slider__dot--active");
      counter = index;
      slider.style.transform = "translateX(" + counter * -50 + "%)";
    });
  });

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", (e) => {
      if (arrow.classList.contains("slider__arrow--left")) {
        counter = counter > 0 ? --counter : (counter = 0);
        const selected = document.querySelector(".slider__dot--active");
        selected.classList.remove("slider__dot--active");
        dots[counter].classList.add("slider__dot--active");
        slider.style.transform = "translateX(" + counter * -50 + "%)";
      }

      if (arrow.classList.contains("slider__arrow--right")) {
        counter = counter < 0 ? ++counter : (counter = 1);
        const selected = document.querySelector(".slider__dot--active");
        selected.classList.remove("slider__dot--active");
        dots[counter].classList.add("slider__dot--active");

        slider.style.transform = "translateX(" + counter * -50 + "%)";
      }
    });
  });
};

slide();

// -----------------------PRODUCT------------------------

const openCart = () => {
  const cartButton = document.querySelector(".navigation__cart");
  const closeCartButton = document.querySelector(".cart__close");
  const cart = document.querySelector(".cart");

  cartButton.addEventListener("click", () => {
    cart.style.transition = "0.3s";
    cart.style.display = "block";
  });

  closeCartButton.addEventListener("click", () => {
    cart.style.transition = "0.3s";
    cart.style.display = "none";
  });
};

openCart();


const totalPrice = (e) => {
  const list = document.querySelector(".cart__list");
  const a = document.querySelector(".cart__total span");

  if (list.children.length > 0) {
    let total = [];

    Array.from(list.children).forEach((item, index) => {
      const priceItem = parseInt(
        item.children[1].children[1].textContent.slice(1)
      );
      const amountItem = parseInt(item.children[2].children[1].textContent);
      const priceAfterAll = priceItem * amountItem;
      total.push(priceAfterAll);
    });
    const resultTotal = total.reduce((total, item) => {
      return total + item;
    }, 0);

    console.log(resultTotal);

    a.textContent = `Total: $${resultTotal}`;
  }
};

const addItem = (e) => {
  const addButton = document.querySelectorAll(".product__btn");
  const list = document.querySelector(".cart__list");
  const a = document.querySelector(".cart__total span");
  const quantity = document.querySelector(".navigation__cart span");

  addButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      const total = document.querySelector(".cart__total");
      const srcImg = e.target.parentElement.children[0].children[0].src.slice(
        21
      );
      const name = e.target.parentElement.children[1].children[0].textContent;
      const price = e.target.parentElement.children[1].children[2].textContent.slice(
        1
      );

      const div = document.createElement("div");
      div.classList.add("cart__item");
      div.innerHTML = `
                <div class="cart__img">
                  <img src="${srcImg}" alt="" />
                </div>
                <div class="cart__desc">
                  <span>${name}</span>
                  <p>$${price}</p>
                </div>
                <div class="cart__quantity">
                  <i class="fas fa-sort-up"></i>
                  <span>1</span>
                  <i class="fas fa-sort-down"></i>
                </div>
                <div class="cart__delete">
                  <i class="fas fa-trash-alt"></i>
                </div>
          `;

      list.appendChild(div);
      localStorage.setItem("items", list.innerHTML);
      alert("Item added");
      quantity.textContent = list.children.length;

      totalPrice();
    });
  });
};

const deleteItem = (e) => {
  const list = e.target.parentElement.parentElement;
  const a = document.querySelector(".cart__total span");
  const quantity = document.querySelector(".navigation__cart span");

  if (e.target.classList.contains("cart__delete")) {
    e.target.parentElement.remove();
    quantity.textContent = list.children.length;

    localStorage.setItem("items", list.innerHTML);

    let totalPrice = [];
    Array.from(list.children).forEach((item, index) => {
      const priceItem = parseInt(
        item.children[1].children[1].textContent.slice(1)
      );

      const amountItem = parseInt(item.children[2].children[1].textContent);
      const priceAfterAll = priceItem * amountItem;
      totalPrice.push(priceAfterAll);
    });

    const resultTotal = totalPrice.reduce((total, item) => {
      return total + item;
    }, 0);

    a.textContent = `Total: $${resultTotal}`;
  }
};

const clearAllItem = (e) => {
  const list = e.target.parentElement.previousElementSibling;

  const a = document.querySelector(".cart__total span");
  const quantity = document.querySelector(".navigation__cart span");

  list.innerHTML = "";
  quantity.textContent = list.children.length;
  a.textContent = `Total: $0`;
};

const increaseAmountItem = (e) => {
  const a = document.querySelector(".cart__total span");

  if (e.target.parentElement.parentElement.parentElement !== "null") {
    const list = e.target.parentElement.parentElement.parentElement;
    if (e.target.classList.contains("fa-sort-up")) {
      let amount = e.target.nextElementSibling;
      amount.textContent = parseInt(amount.textContent) + 1;
      let totalPrice = [];
      Array.from(list.children).forEach((item, index) => {
        const priceItem = parseInt(
          item.children[1].children[1].textContent.slice(1)
        );
        const amountItem = parseInt(item.children[2].children[1].textContent);
        const priceAfterAll = priceItem * amountItem;
        totalPrice.push(priceAfterAll);
      });
      const resultTotal = totalPrice.reduce((total, item) => {
        return total + item;
      }, 0);
      a.textContent = `Total: $${resultTotal}`;
    }
  }
};

const decreaseAmountItem = (e) => {
  const a = document.querySelector(".cart__total span");

  if (e.target.parentElement.parentElement.parentElement) {
    const list = e.target.parentElement.parentElement.parentElement;

    if (e.target.classList.contains("fa-sort-down")) {
      let amount = e.target.previousElementSibling;
      if (parseInt(amount.textContent) <= 1) return;
      amount.textContent = parseInt(amount.textContent) - 1;
      let totalPrice = [];
      Array.from(list.children).forEach((item, index) => {
        const priceItem = parseInt(
          item.children[1].children[1].textContent.slice(1)
        );
        const amountItem = parseInt(item.children[2].children[1].textContent);
        const priceAfterAll = priceItem * amountItem;
        totalPrice.push(priceAfterAll);
      });
      const resultTotal = totalPrice.reduce((total, item) => {
        return total + item;
      }, 0);
      a.textContent = `Total: $${resultTotal}`;
    }
  }
};
/*
 ******* HANDLE CART *******
 */

let itemsInLS = [];

const handleCart = () => {
  const list = document.querySelector(".cart__list");
  const clearButton = document.querySelector(".cart__total button");

  addItem();
  list.addEventListener("click", deleteItem);
  list.addEventListener("click", increaseAmountItem);
  list.addEventListener("click", decreaseAmountItem);
  clearButton.addEventListener("click", clearAllItem);
};

handleCart();

/*
 ******* ACTIVE TYPE *******
 */
const activeType = () => {
  const types = document.querySelectorAll(".product__type");

  types.forEach((type) => {
    type.addEventListener("click", (e) => {
      const selectedType = document.querySelector(".product__type--active");
      selectedType.classList.remove("product__type--active");
      e.target.parentElement.classList.add("product__type--active");
    });
  });
};

activeType();

/*
 ******* FILTER TYPE *******
 */
const filterType = () => {
  const items = document.querySelectorAll(".product__item");
  const types = document.querySelectorAll(".product__text");

  types.forEach((type) => {
    type.addEventListener("click", (e) => {
      items.forEach((item) => {
        const typeName = type.textContent.toLowerCase();
        if (typeName.includes("all")) {
          item.style.display = "flex";
        }

        if (typeName.includes("trending")) {
          if (item.dataset.category === "trending") {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
        }

        if (typeName.includes("special")) {
          if (item.dataset.category === "special") {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
        }

        if (typeName.includes("featured")) {
          if (item.dataset.category === "featured") {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
        }
      });
    });
  });
};

filterType();
