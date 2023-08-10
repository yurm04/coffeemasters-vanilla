import { MenuPage } from "./MenuPage.js";
import { OrderPage } from "./OrderPage.js";
import { DetailsPage } from "./DetailsPage.js";
import { ProductItem } from "./ProductItem.js.js";
import { CartItem } from "./CartItem.js";

export default function () {
  customElements.define("menu-page", MenuPage);
  customElements.define("order-page", OrderPage);
  customElements.define("details-page", DetailsPage);
  customElements.define("product-item", ProductItem);
  customElements.define("cart-item", CartItem);
}
