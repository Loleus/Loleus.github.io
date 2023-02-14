let sc;
fetch("./components/modal/sc.html")
    .then(stream => stream.text())
    .then(text => sc = text);
let yt;
fetch("./components/modal/yt.html")
    .then(stream => stream.text())
    .then(text => yt = text);
let info;
fetch("./components/modal/info.html")
    .then(stream => stream.text())
    .then(text => info = text);

const getHTML = (id) => {
  if (id == "about") {
    return `${info}`
  }
  if (id == "music") {
    return `${sc}`
  }
  if (id == "video") {
    return `${yt}`
  }
  if (id == "photo") {
    return `<my-photo></my-photo>`
  }
}
const getTemp = (vis, id, text) => {
  if (vis) {
    return `
      <section class="container">
        <article id="content" class="content">
          ${getHTML(id)}
        </article>
      </section>
      <button>${text}</button>
      `
  } else {
    return `
      <button>${text}</button>
      `
  }
}

export default class Modal extends HTMLElement {

  static get observedAttributes() { return ["visibility", "label-text", "id"]; }
  constructor() {
    super();
  }
  get labelText() {
    return this.getAttribute('label-text');
  }
  get index() {
    return this.getAttribute('id');
  }
  set labelText(value) {
    if (value) {
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
    this.addEventListener("click", (e) => {
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
    this.innerHTML = getTemp(this.visibility, this.index, this.labelText);
  }
}
