customElements.define("my-youtube", class extends HTMLElement {
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
    console.log(prop, oldVal, newVal)
    if (this.visibility) {
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/modal-button/style.css">
      <section class="container">
      <article id="content" class="content">
      <h1>YouTube</h1>
      </article>
    </section>
    <button>YouTube</button>
      `;
    } else {
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/modal-button/style.css">
      <button>YouTube</button>
      `;
    }
  }
});
