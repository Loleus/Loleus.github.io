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
      <style>
      .container {
        pointer-events: auto;
        box-sizing: border-box;
        max-width: 100vw;
        width: 100vh;
        height: auto;
        backdrop-filter: blur(6px);
        z-index: 2;
        display: block;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        top: 50%;
        overflow: auto;
        border-radius: 1em;
        background: #5a2b045b;
        font-size: 20px;
        cursor: pointer;
      }
      .container::after {
        border-radius: 1em;
        cursor: pointer;
        display: block;
        position: absolute;
        content: "X";
        font-size: 4vh;
        line-height: 5.2vh;
        color: #a5a5a5;
        width: 6vh;
        height: 6vh;
        right: 1%;
        top: 1%;
        background: #272727;
      }
      #sc-widget {
        width: 100%;
        height: 100vh;
      }
      .container .content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .container .content p {
        text-shadow: 2px 2px 0px #301e0c;
        text-indent: 1em;
        text-align: justify;
        text-justify: auto;
        font-size: 1em;
        line-height: 1.2em;
        margin: 0 auto;
        padding: 0.7em;
        padding-top: 0;
        color: #ffedd8;
        border-radius: 1em;
      }
      .container .content img {
        box-shadow: 1px 1px 3px 0 #181818;
        width: 260px;
        height: 260px;
        padding: 0;
        margin: 1em 0;
        border-radius: 50%;
      }
      
      @media only screen and (max-width: 1020px) {
        .container {
          position: absolute;
          left: 0;
          top: 0;
          width: 100vw;
          min-height: 100vh;
          max-height: 100%;
          transform: translate(0, 0);
        }
        .container .content p {
          font-size: 1em;
          line-height: 1.1em;
        }
        h1 {
          margin: 6vw 0;
        }
      }      
      </style>
      <section class="container">
        <article id="content" class="content">
          ${getHTML(id)}
        </article>
      </section>
      `
  } else {
    return `
      <link rel="stylesheet" href="./components/modal/style.css">
      <button>${text}</button>
      `
  }
}

export default class Modal extends HTMLElement {

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
}
