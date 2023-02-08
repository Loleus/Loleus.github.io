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
      this.shadowRoot.innerHTML += `
      <link rel="stylesheet" href="./components/youTube/style.css">
      <section class="container">
      <article id="content" class="content">
      <iframe id="player" type="text/html" width="640" height="360"
      src="https://www.youtube.com/embed?listType=playlist&list=PLkXJmTe_aZnZncsAHK4LgkP6kkt-ataG3"
      frameborder="0"></iframe>
      </article>
    </section>
      `;
  }
});
