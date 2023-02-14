const getHTML = (id) => {
  if (id == "about") {
    return `
  <img class="logo" src="./assets/me.jpg" alt="me">
  <p>
    Hi, here Łukasz Kamiński aka Lolo.
    I'm passionate about programming web aplications, and taking pictures. I have been a CNC operator for several years. Previous occupations: beatmaker, graphic designer, sound engineer, photo editor,
    DTP, accountant, warehouseman, wire harness fitter.
    The current technology stack: JavaScript, Web Components,  NodeJS, ExpressJS, Postman, Sql/noSql. (C=) Amiga RULES! (C=)
  </p>
  `
  }
  if (id == "music") {
    return `
  <iframe id="sc-widget" scrolling="no" frameborder="no" allow="autoplay"
  src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/loleus/"></iframe>
<script src="https://w.soundcloud.com/player/api.js" type="text/javascript"></script>
<script type="text/javascript">
  (function () {
    var widgetIframe = document.getElementById('sc-widget'),
      widget = SC.Widget(widgetIframe);
    widget.bind(SC.Widget.Events.READY, function () {
      widget.bind(SC.Widget.Events.PLAY, function () {
        widget.getCurrentSound(function (currentSound) {
          console.log('sound ' + currentSound.get('') + 'began to play');
        });
      });
      widget.getVolume(function (volume) {
        console.log('current volume value is ' + volume);
      });
      widget.setVolume(50);
    });
  }());
</script>
  `
  }
  if (id == "video") {
    return `
  <iframe id="player" type="text/html" width="640" height="360"
  src="https://www.youtube.com/embed?listType=playlist&list=PLkXJmTe_aZnZncsAHK4LgkP6kkt-ataG3"
  frameborder="0"></iframe>
  `
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
