import Api from "../api/api.js";
import Photographer from "../models/Photographer.js";
import PhotographerTemplate from "../templates/photographerCard.js";
import MediasFactory from "../factories/MediasFactory.js";
import InfoBox from "../templates/infoBox.js";
import ContactForm from "../templates/contactForm.js";
import Sort from "../utils/sort.js";

/**
 * PHOTOGRAPHER PAGE
 */
class PhotographerPage {
  constructor() {
    // Get url id
    this._url = new URL(document.location).searchParams;
    this._id = Number(this._url.get("id"));
    this.api = new Api("data/photographers.json");

    // Get dom elements
    this.$photographerHeader = document.querySelector(".photograph-header");
    this.$main = document.querySelector("main");
    this.$mediaSection = document.querySelector(".media-section");
  }

  async main() {
    // Get data from api
    const data = await this.api.getData();

    // Get photographer data
    const photographerData = data.photographers.find(
      (photographer) => photographer.id === this._id
    );

    // Get media data
    const mediaData = data.media.filter(
      (media) => media.photographerId === this._id
    );

    // Format photographer data
    const photographer = new Photographer(photographerData);

    // Create photographer banner using data
    const photographerTemplate = new PhotographerTemplate(photographer);
    photographerTemplate.createPhotographerHeader(this.$photographerHeader);

    const photographerName = photographer.name;

    // Display info box using data and url id
    const infoBox = new InfoBox(this._id, data);
    this.$main.appendChild(infoBox.createRateCard());

    // Handle contact form modal
    new ContactForm(photographerName);

    // Create empty array to sort media cards
    let mediaList = [];

    mediaData.forEach((media) => {
      // Handle different media types
      const mediaFactory = new MediasFactory(media, photographerName);

      mediaList.push(mediaFactory);
    });

    // Handle sort filter
    new Sort(mediaList);
  }
}

const photographerPage = new PhotographerPage();
photographerPage.main();
