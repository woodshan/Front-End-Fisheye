import Api from "../api/api.js";
import { PhotographerTemplate } from "../templates/photographerCard.js";
import { Photographer } from "../models/Photographer.js";

/**
 * Display Home page from photographers data
 */
class Index {
  constructor() {
    this.$photographersSection = document.querySelector(
      ".photographer_section"
    );
    this.api = new Api("../../data/photographers.json");
  }

  async main() {
    const api = new Api("../../data/photographers.json");
    const data = await api.getData();
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
