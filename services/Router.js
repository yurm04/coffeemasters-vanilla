const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        // or get url a.href
        const url = event.target.getAttribute("href");
        Router.go(url);
      });
    });

    // add event listener for back button
    // event includes that state
    window.addEventListener("popstate", (event) => {
      // passing false to addToHistory because we don't
      // want to add more of the same route to the history
      Router.go(event.state.route, false);
    });
    // check the initual url
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }

    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;

      case "/order":
        pageElement = document.createElement("order-page");
        break;

      default:
        const id = route.substring(route.lastIndexOf("-") + 1);
        const detailsPage = document.createElement("details-page");
        detailsPage.dataset.productId = id;
        pageElement = detailsPage;
        break;
    }

    if (pageElement) {
      const page = document.querySelector("main");
      // remove the current content of the page
      page.innerHTML = "";
      // add the "new route" content
      page.appendChild(pageElement);

      // scroll to the top of the page to "reset" page
      window.scrollX = 0;
      window.scrollY = 0;
    }
  },
};

export default Router;
