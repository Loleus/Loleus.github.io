customElements.define("my-info", class extends HTMLElement {

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
    });
  this.visibility = false
  }

  disconnectedCallback() { }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render(attrName,oldVal, newVal);
  }

  render(prop, oldVal, newVal) {



    
    // if (this.visibility) {
    //   this.shadowRoot.innerHTML = `
    //   <link rel="stylesheet" href="./components/info/style.css">
    //   <section class="container">
    //   <article id="content" class="content">
    //     <img class="logo" src="/assets/me.jpg" alt="me">
    //     <p>
    //       Hi, here Łukasz Kamiński aka Lolo.
    //       I'm passionate about programming web aplications, and taking pictures. I have been a CNC operator for several years. Previous occupations: beatmaker, graphic designer, sound engineer, photo editor,
    //       DTP, accountant, warehouseman, wire harness fitter.
    //       The current technology stack: JavaScript, WebComponents,  NodeJS, ExpressJS, Postman, Sql/noSql. (C=) Amiga RULES! (C=)
    //     </p>
    //   </article>
    // </section>
    //   `;
    // } else {
    //   this.shadowRoot.innerHTML = `
    //   <button style="cursor:pointer;font-size:0.7em;box-shadow: 0px 0px 2px 0 rgb(204, 11, 11);border:none;background:#333b;color:#a5a5a5;padding:4px 16px;">About Me</button>
    //   `;
    // }
    
    if (this.visibility) {
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/info/style.css">
      <section class="container">
      <article id="content" class="content">
        <img class="logo" src="/assets/me.jpg" alt="me">
        <p>
          Hi, here Łukasz Kamiński aka Lolo.
          I'm passionate about programming web aplications, and taking pictures. I have been a CNC operator for several years. Previous occupations: beatmaker, graphic designer, sound engineer, photo editor,
          DTP, accountant, warehouseman, wire harness fitter.
          The current technology stack: JavaScript, WebComponents,  NodeJS, ExpressJS, Postman, Sql/noSql. (C=) Amiga RULES! (C=)
        </p>
      </article>
    </section>
      `;
    } else {
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/info/style.css">
      <button style="padding:4px 16px;">About Me</button>
      `;
    }

  }
});
