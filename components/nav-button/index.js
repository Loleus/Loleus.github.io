const getTemp = (vis, id, text) => {
  if (vis) {
    if (id == "about") {
      return `
      <link rel="stylesheet" href="./components/info/style.css">
      <section class="container">
      <article id="content" class="content">
        <img class="logo" src="./assets/me.jpg" alt="me">
        <p>
          Hi, here Łukasz Kamiński aka Lolo.
          I'm passionate about programming web aplications, and taking pictures. I have been a CNC operator for several years. Previous occupations: beatmaker, graphic designer, sound engineer, photo editor,
          DTP, accountant, warehouseman, wire harness fitter.
          The current technology stack: JavaScript, Web Components,  NodeJS, ExpressJS, Postman, Sql/noSql. (C=) Amiga RULES! (C=)
        </p>
      </article>
    </section>
      `
    }
    if (id == "music") {
      return `
      <link rel="stylesheet" href="./components/soundCloud/style.css">
      <section class="container">
      <article id="content" class="content">
  
      <iframe id="sc-widget" scrolling="no" frameborder="no" allow="autoplay"
      src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/loleus/"></iframe>
    <script src="https://w.soundcloud.com/player/api.js" type="text/javascript"></script>
    <script type="text/javascript">
      (function () {
        var widgetIframe = document.getElementById('sc-widget'),
          widget = SC.Widget(widgetIframe);
        widget.bind(SC.Widget.Events.READY, function () {
          widget.bind(SC.Widget.Events.PLAY, function () {
            // get information about currently playing sound
            widget.getCurrentSound(function (currentSound) {
              console.log('sound ' + currentSound.get('') + 'began to play');
            });
          });
          // get current level of volume
          widget.getVolume(function (volume) {
            console.log('current volume value is ' + volume);
          });
          // set new volume level
          widget.setVolume(50);
          // get the value of the current position
        });
  
      }());
    </script>
      </article>
    </section>
      `
    }
    if (id == "video") {
      return `
      <link rel="stylesheet" href="./components/youTube/style.css">
      <section class="container">
      <article id="content" class="content">
      <iframe id="player" type="text/html" width="640" height="360"
      src="https://www.youtube.com/embed?listType=playlist&list=PLkXJmTe_aZnZncsAHK4LgkP6kkt-ataG3"
      frameborder="0"></iframe>
      </article>
    </section>
      `
    }
    if (id == "photo") {
      return `<my-photo></my-photo>`
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
