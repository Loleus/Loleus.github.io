const getTemp = (vis,id,text) => {
    if(vis) {
      if(id == "about") {
        return `
        <link rel="stylesheet" href="./components/info/style.css">
        <my-info></my-info>
        `
      }
    } else {
      return `
      <link rel="stylesheet" href="./components/nav-button/css/style.css">
      <button>${text}</button>
      `
    }
  }
  
  customElements.define("nav-button", class extends HTMLElement {
    static get observedAttributes() { return ["visibility", "label-text", "id"]; }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    get labelText() {
        return this.getAttribute('label-text');
    }
    get index() {
        return this.getAttribute('id');
    }

    set labelText(value) {
        if(value) {
            this.setAttribute('label-text', value);
        }
    }
    get visibility() {
      return JSON.parse(this.getAttribute("visibility"));
    }
    set visibility(v) {
      this.setAttribute("visibility", JSON.stringify(v));
    }
    async connectedCallback() {
        this.textContent = this.labelText;
      this.shadowRoot.addEventListener("click", (e) => {
        this.visibility = !this.visibility
        console.log(this.index)
        window.scrollTo(0, 0);
      });
      this.visibility = false
    }
    disconnectedCallback() { }

    attributeChangedCallback(attrName, oldVal, newVal) {
      this.render(attrName, oldVal, newVal);
    }

    render(prop, oldVal, newVal) {
        this.shadowRoot.innerHTML = getTemp(this.visibility, this.index, this.labelText);
    }
  });
  