export class WCBase extends HTMLElement {
  templateName;
  styleSheet;
  shadow;
  root;

  constructor() {
    super();
  }

  async connectedCallback() {
    // create shadow dom
    if (this.shadow) {
      this.root = this.attachShadow({ mode: "open" });
    } else {
      this.root = this;
    }

    // add styling
    if (this.styleSheet) {
      await this.loadCSS();
    }

    // clone and add template to shadow dom
    if (this.templateName) {
      const template = document.getElementById(this.templateName);
      const content = template.content.cloneNode(true);
      this.root.appendChild(content);
    }

    // call the connectedCallback callback function
    this.connected.bind(this);
    this.connected();
  }

  async loadCSS() {
    let stylesEl = document.createElement("style");
    this.root.appendChild(stylesEl);

    const request = await fetch(this.styleSheet);
    const css = await request.text();
    stylesEl.textContent = css;
  }

  connected() {}

  render() {}
}
