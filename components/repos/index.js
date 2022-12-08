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
    this.loading = false;rgbrgb(167, 121, 21)
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
        <style>
        @import "components/repos/style.css";
        </style>
        <span class="span">
          <h1>Feel free to
            <a href="mailto:07zglossie@wp.pl?subject=aboutCode">
              mail me.
            </a>
          </h1>
          <table>
            <tr style="background:#1118">
              <th>No</th>
              <th>Name</th>
              <th>Type</th>
              <th>Language</th>
            </tr>
            ${this.reps.map(repo => {
        if (repo.name != "loleus.github.io") {
          return `
            <tr>
              <td style="background:#1118" >${i++}</td>
              <td><a target="_blank" href="https://loleus.github.io/${repo.name}">${repo.name.toUpperCase()}</a></td>
              <td>${repo.description}</td>
              <td style="color:var(--mainTxtCol)">${repo.language}</td>
            </tr>
              `
        }
      }).join("")}
          </table>
        </span>
      `;
    }
  }
});
