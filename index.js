customElements.define("my-repos", class extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  static get observedAttributes() { return ["loading", "repos"]; }
  get loading() {
    return JSON.parse(this.getAttribute("loading"));
  }
  set loading(v) {
    this.setAttribute("loading", JSON.stringify(v));
  }
  async fetchrepos(url) {
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
    await this.fetchrepos("https://api.github.com/users/Loleus/repos");
  }
  disconnectedCallback() {
  }
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
        @import "table.css";
        </style>
        <span class="span">
          <h1><slot name="title">
            <a class="link" style="color:inherit;" href="mailto:07zglossie@wp.pl?subject=aboutCode">
              07zglossie@wp.pl
          </a></slot></h1>
          <table>
            <tr style="background:#1118">
              <th>No</th>
              <th>Name</th>
              <th>Type</th>
              <th>www</th>
              <th>Language</th>
            </tr>
            ${this.reps.map(repo => {
        if (repo.name != "loleus.github.io") {
          return `
            <tr>
              <td style="background:#1118" >${i++}</td>
              <td style="color:var(--mainTxtCol)">${repo.name.toUpperCase()}</td>
              <td>${repo.description}</td>
              <td><a class="link" target="_blank" href="https://loleus.github.io/${repo.name}">link</a></td>
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
