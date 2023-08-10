import { WCBase } from "./WCBase.js";

export class OrderPage extends WCBase {
  styleSheet = "/components/OrderPage.css";
  shadow = true;

  #user = {
    name: "",
    phone: "",
    email: "",
  };

  constructor() {
    super();
  }

  connected() {
    const section = document.createElement("section");
    this.root.appendChild(section);

    window.addEventListener("appcartchange", () => {
      this.render();
    });

    this.render();
  }

  render() {
    let section = this.root.querySelector("section");
    if (app.store.cart.length == 0) {
      section.innerHTML = `
          <p class="empty">Your order is empty</p>
      `;
    } else {
      let html = `
          <h2>Your Order</h2>
          <ul>
          </ul>
      `;
      section.innerHTML = html;

      const template = document.getElementById("order-form-template");
      const content = template.content.cloneNode(true);
      section.appendChild(content);

      let total = 0;
      for (let prodInCart of app.store.cart) {
        const item = document.createElement("cart-item");
        item.dataset.item = JSON.stringify(prodInCart);
        this.root.querySelector("ul").appendChild(item);

        total += prodInCart.quantity * prodInCart.product.price;
      }
      this.root.querySelector("ul").innerHTML += `
            <li>
                <p class='total'>Total</p>
                <p class='price-total'>$${total.toFixed(2)}</p>
            </li>                
        `;
    }

    // pass the form from the shadow dom
    const form = this.root.querySelector("form");

    if (form) {
      this.setFormBindings(form);
    }
  }

  setFormBindings(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      alert(`thanks for your order ${this.#user.name}`);
      this.#user.name = "";
      this.#user.email = "";
      this.#user.phone = "";
      //todo send data to server
    });
    // set double data binding
    this.#user = new Proxy(this.#user, {
      set(target, property, value) {
        target[property] = value;
        form.elements[property].value = value;
        return true;
      },
    });

    Array.from(form.elements).forEach((element) => {
      element.addEventListener("change", (event) => {
        this.#user[element.name] = element.value;
      });
    });
  }
}
