// const getTemp = (vis) => {
//     if(vis) {
//       return `
//       <link rel="stylesheet" href="./components/photo/style.css">
//       <section class="container">
//         <article id="content" class="content">
//         <div id="container">
//         <header>
//           <div>1</div>
//           <div>2</div>
//           <div>3</div>
//         </header>
//         <aside>Aside</aside>
//         <main>Main</main>
//         <footer>Footer</footer>
//       </div></article>
//       </section>
//       <button>Photos</button>
//       `
//     } else {
//       return `
//       <link rel="stylesheet" href="./components/photo/style.css">
//       <button>Photos</button>
//       `
//     }
//   }
  
  customElements.define("nav-button", class extends HTMLElement {
    static get observedAttributes() { return ["visibility", "label-text"]; }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    get labelText() {
        return this.getAttribute('label-text');
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
        window.scrollTo(0, 0);
      });
      this.visibility = false
    }
    disconnectedCallback() { }
    attributeChangedCallback(attrName, oldVal, newVal) {
      this.render(attrName, oldVal, newVal);
    }
    render(prop, oldVal, newVal) {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./components/nav-button/css/style.css">
        <button>${this.labelText}</button>
        `;
    }
  });
  