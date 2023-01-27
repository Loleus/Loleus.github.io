customElements.define("my-soundcloud", class extends HTMLElement {
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
    <button>Music Tracks</button>
      `;
    } else {
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/soundCloud/style.css">
      <button>Music Tracks</button>
      `;
    }
  }
});
