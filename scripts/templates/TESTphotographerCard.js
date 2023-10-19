export class PhotographerTemplate {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createUserCardDOM() {
    const article = document.createElement("article");
    const descriptionContainer = document.createElement("div");
    const name = document.createElement("h1");
    const location = document.createElement("h2");
    const description = document.createElement("p");
    const btn = document.createElement("button");
    const img = document.createElement("img");

    btn.setAttribute("onClick", "displayModal()");
    img.setAttribute("src", this._photographer.picture);
    img.setAttribute("alt", "");

    btn.classList.add("contact_button");

    name.textContent = this._photographer._name;
    location.textContent = `${this._photographer._city}, ${this._photographer._country}`;
    description.textContent = this._photographer._tagline;
    btn.textContent = "Contactez-moi";

    article.appendChild(descriptionContainer)
    descriptionContainer.appendChild(name);
    descriptionContainer.appendChild(location);
    descriptionContainer.appendChild(description);
    article.appendChild(btn);
    article.appendChild(img);

    return article
  }
}
