import { WCBase } from "./WCBase.js";

export class MenuPage extends WCBase {
  shadow = true;
  name = "MenuPage";
  templateName = "menu-page-template";
  styleSheet = "/components/MenuPage.css";

  constructor() {
    super();
  }

  connected() {
    window.addEventListener("appmenuchange", () => {
      this.render();
    });
    this.render();
  }

  render() {
    if (app.store.menu) {
      this.shadowRoot.querySelector("#menu").innerHTML = "";
      for (let category of app.store.menu) {
        const liCategory = document.createElement("li");
        liCategory.innerHTML = `
          <h3>${category.name}<h3>
          <ul class='category'>

          </ul>
        `;
        this.root.querySelector("#menu").appendChild(liCategory);

        category.products.forEach((product) => {
          const item = document.createElement("product-item");
          item.dataset.product = JSON.stringify(product);
          liCategory.querySelector("ul").appendChild(item);
        });
      }
    } else {
      this.root.querySelector("#menu").innerHTML = "Loading";
    }
  }
}
