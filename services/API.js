const API = {
  url: "/data/menu.json",
  fetchMenu: async () => {
    // result is an HTTP response
    const result = await fetch(API.url);
    // wait for json parsing for HTTP response
    return await result.json();
  },
};

export default API;
