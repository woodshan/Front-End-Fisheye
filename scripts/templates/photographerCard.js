/**
 * Create photographer card from photographer Data
 */
export class PhotographerTemplate {
  constructor(photographer) {
    this._photographer = photographer;
  }

  createUserCardDOM() {
    const article = document.createElement("article");
    const link = document.createElement("a");
    const img = document.createElement("img");
    const h2 = document.createElement("h2");
    const location = document.createElement("h3");
    const description = document.createElement("p");
    const pricePerDay = document.createElement("p");

    link.setAttribute("aria-label", `Ouvrir la page de ${this._photographer._name}`);
    link.setAttribute("href", `photographer.html?id=${this._photographer._id}`);
    link.setAttribute("class", "photographer_link");
    img.setAttribute("src", this._photographer.picture);
    img.setAttribute("alt", this._photographer._name);

    description.classList.add("description");
    pricePerDay.classList.add("price");

    h2.textContent = this._photographer._name;
    location.textContent = `${this._photographer._city}, ${this._photographer._country}`;
    description.textContent = this._photographer._tagline;
    pricePerDay.textContent = `${this._photographer._price}€/jour`;

    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(location);
    article.appendChild(description);
    article.appendChild(pricePerDay);

    return article;
  }

  createPhotographerHeader(section) {
    const descriptionContainer = document.createElement("div");
    const name = document.createElement("h1");
    const location = document.createElement("h2");
    const description = document.createElement("p");
    // const btn = document.createElement("button");
    const img = document.createElement("img");

    // btn.setAttribute("onClick", "displayModal()");
    img.setAttribute("src", this._photographer.picture);
    img.setAttribute("alt", "");

    // btn.classList.add("contact_button");

    name.textContent = this._photographer._name;
    location.textContent = `${this._photographer._city}, ${this._photographer._country}`;
    description.textContent = this._photographer._tagline;
    // btn.textContent = "Contactez-moi";

    section.appendChild(descriptionContainer);
    descriptionContainer.appendChild(name);
    descriptionContainer.appendChild(location);
    descriptionContainer.appendChild(description);
    // section.appendChild(btn);
    section.appendChild(img);
  }
}

