import { getProductById } from "../services/Menu.js";
import { addToCart } from "../services/Order.js";
import { WCBase } from "./WCBase.js";

export class DetailsPage extends WCBase {
  templateName = "details-page-template";
  shadow = true;
  styleSheet = "/components/DetailsPage.css";

  constructor() {
    super();
  }
  connected() {
    this.render();
  }

  async render() {
    if (this.dataset.productId) {
      this.product = await getProductById(this.dataset.productId);
      this.root.querySelector("h2").textContent = this.product.name;
      this.root.querySelector("img").src = `/data/images/${this.product.image}`;
      this.root.querySelector(".description").textContent =
        this.product.description;
      this.root.querySelector(
        ".price"
      ).textContent = `$ ${this.product.price.toFixed(2)} ea`;
      this.root.querySelector("button").addEventListener("click", () => {
        addToCart(this.product.id);
        app.router.go("/order");
      });
    } else {
      alert("Invalid Product ID");
    }
  }
}
