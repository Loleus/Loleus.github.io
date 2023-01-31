const getTemp = (vis) => {
  if(vis) {
    return `
    <link rel="stylesheet" href="./components/photo/style.css">
    <section class="container">
      <article id="content" class="content"></article>
    </section>
    <button>Photos</button>
    `
  } else {
    return `
    <link rel="stylesheet" href="./components/photo/style.css">
    <button>Photos</button>
    `
  }
}

customElements.define("my-photo", class extends HTMLElement {
  static get observedAttributes() { return ["visibility"]; }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  get visibility() {
    return JSON.parse(this.getAttribute("visibility"));
  }
  set visibility(v) {
    this.setAttribute("visibility", JSON.stringify(v));
  }
  async connectedCallback() {
    this.shadowRoot.addEventListener("click", (e) => {
      this.visibility = !this.visibility
      window.scrollTo(0, 0);
    });
    this.visibility = false
  }
  disconnectedCallback() { }
  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render(attrName, oldVal, newVal);
  }
  render(prop, oldVal, newVal) {
      this.shadowRoot.innerHTML = getTemp(this.visibility);
  }
});
