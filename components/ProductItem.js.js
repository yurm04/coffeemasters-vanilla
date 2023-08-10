import { addToCart } from "../services/Order.js";
import { WCBase } from "./WCBase.js";

export class ProductItem extends WCBase {
  templateName = "product-item-template";

  constructor() {
    super();
  }

  connected() {
    const product = JSON.parse(this.dataset.product);
    this.querySelector("h4").textContent = product.name;
    this.querySelector("p.price").textContent = `$${product.price.toFixed(2)}`;
    this.querySelector("img").src = `data/images/${product.image}`;
    this.querySelector("a").addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() == "button") {
        //TODO
        addToCart(product.id);
      } else {
        app.router.go(`/product-${product.id}`);
      }
      event.preventDefault();
    });
  }
}
