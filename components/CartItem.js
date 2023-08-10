import { removeFromCart } from "../services/Order.js";
import { WCBase } from "./WCBase.js";

export class CartItem extends WCBase {
  templateName = "cart-item-template";

  constructor() {
    super();
  }

  connected() {
    const item = JSON.parse(this.dataset.item);

    this.querySelector(".qty").textContent = `${item.quantity}x`;
    this.querySelector(".name").textContent = item.product.name;
    this.querySelector(".price").textContent = `$${item.product.price.toFixed(
      2
    )}`;
    this.querySelector("a.delete-button").addEventListener("click", (event) => {
      removeFromCart(item.product.id);
    });
  }
}
