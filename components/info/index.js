customElements.define("my-info", class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  // get visibility() {
  //   return JSON.parse(this.getAttribute("visibility"));
  // }
  // set visibility(v) {
  //   this.setAttribute("visibility", JSON.stringify(v));
  // }
  async connectedCallback() {
    this.shadowRoot.addEventListener("click", (e) => {
      // this.visibility = !this.visibility
      // window.scrollTo(0, 0);
    });
    this.render()
  // this.visibility = false
  }
  disconnectedCallback() { }
  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render(attrName,oldVal, newVal);
  }
  render(prop, oldVal, newVal) {
    console.log(prop, oldVal, newVal)
      this.shadowRoot.innerHTML += "";
  }
});
