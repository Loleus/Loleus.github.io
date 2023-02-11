customElements.define("my-repos", class extends HTMLElement {

  static get observedAttributes() { return ["loading"]; }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get loading() {
    return JSON.parse(this.getAttribute("loading"));
  }

  set loading(v) {
    this.setAttribute("loading", JSON.stringify(v));
  }

  async getRepos(url) {
    this.loading = true;
    const response = await fetch(url, { mode: 'cors' });
    const json = await response.json();
    this.reps = json;
    this.loading = false;
  }

  async connectedCallback() {
    this.shadowRoot.addEventListener("click", (e) => {
      console.log(e.target)
    });
    await this.getRepos("https://api.github.com/users/Loleus/repos");
  }

  disconnectedCallback() { }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }

  render() {
    let i = 1;
    if (this.loading) {
      this.shadowRoot.innerHTML = `Loading...`;
    } else {
      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/repos/style.css">
      <script src="./components/modal/index.js"></script>
      <link rel="stylesheet" href="./components/modal/style.css">
        <span class="span">
          <h1>Feel free to
            <a href="mailto:07zglossie@wp.pl?subject=aboutCode">
              mail me.
            </a>
          </h1>
          <table>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Type</th>
              <th>Language</th>
            </tr>
            ${this.reps.map(repo => {
        if (repo.name != "loleus.github.io") {
          return `
            <tr>
              <td>${i++}</td>
              <td><a target="_blank" href="https://loleus.github.io/${repo.name}">${repo.name}</a></td>
              <td>${repo.description}</td>
              <td>${repo.language}</td>
            </tr>
              `
        }
      }).join("")}
          </table>
          <h1>
          <nav-modal id="about" label-text="About Me"></nav-modal>
          <nav-modal id="music" label-text="Music Tracks"></nav-modal>
          <nav-modal id="video" label-text="Music Videos"></nav-modal>
        </h1>
        </span>
      `;
    }
  }
});
