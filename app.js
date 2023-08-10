import Store from "./services/Store.js";
import API from "./services/API.js";
import { loadData } from "./services/Menu.js";
import Router from "./services/Router.js";

import defineCustomElements from "./components/defineCustomElements.js";

// add the app object to the window so that it is availabl
// globally. Then add objects to app object rather than adding
// a bunch of objects to window that can conflict elsewhere
window.app = {};
app.store = Store;
app.router = Router;

// better to wait for the event before manipulation
// so that the DOM is doneß loading
window.addEventListener("DOMContentLoaded", () => {
  defineCustomElements();
  loadData();
  app.router.init();
});

window.addEventListener("appcartchange", () => {
  const badge = document.getElementById("badge");
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});
