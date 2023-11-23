import Media from "../models/Media.js";
import Photographer from "../models/Photographer.js";

export default class InfoBox {
  constructor(id, data) {
    // Get url id
    this._id = id;

    // Filter data using id
    this._media = data.media.filter(
      (media) => media.photographerId == this._id
    );
    this._photographer = data.photographers.filter(
      (photographer) => photographer.id == this._id
    )[0];

    this._photographerPrice = new Photographer(this._photographer).price;

    // Array of likes
    this._sumLikes = [];
  }

  /**
   * Create info box
   * @returns {HTMLElement}
   */
  createRateCard() {
    this._media.forEach((media) => {
      // Format data
      const constructorMedia = new Media(media);

      // Add likes in array
      this._sumLikes.push(constructorMedia.likes);
    });

    // Compute total likes
    this._sumLikes = this._sumLikes.reduce((acc, curr) => acc + curr);

    // Create & display dom elements using data
    const container = document.createElement("div");
    const containerLikes = document.createElement("p");
    const totalLikes = document.createElement("span");
    const like = document.createElement("em");
    const dailyPrice = document.createElement("p");

    container.setAttribute("class", "rate-container");
    totalLikes.setAttribute("class", "total_likes");
    totalLikes.setAttribute("aria-label", "Total de j'aime");
    like.setAttribute("class", "fa-solid fa-heart");

    totalLikes.innerText = this._sumLikes;
    dailyPrice.innerText = `${this._photographerPrice}€ / jour`;

    container.appendChild(containerLikes);
    containerLikes.appendChild(totalLikes);
    containerLikes.appendChild(like);
    container.appendChild(dailyPrice);

    return container;
  }
}
