import Api from "../api/api.js";
import PhotographerTemplate from "../templates/photographerCard.js";
import Photographer from "../models/Photographer.js";

/**
 * HOME PAGE
 */
class Index {
  constructor() {
    // Get dom elements
    this.$photographersSection = document.querySelector(
      ".photographer_section"
    );

    this._api = new Api("data/photographers.json");
  }

  /**
   * Get photographer data & display photographer cards
   */
  async main() {
    const data = await this._api.getData();
    const photographers = data.photographers;

    photographers.forEach((photographer) => {
      const photographerModel = new Photographer(photographer);
      const userCardDOM = new PhotographerTemplate(photographerModel);

      this.$photographersSection.appendChild(userCardDOM.createUserCardDOM());
    });
  }
}

const index = new Index();
index.main();
