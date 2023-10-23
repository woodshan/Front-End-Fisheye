import Api from "../api/api.js";
import { Photographer } from "../models/Photographer.js";
import { PhotographerTemplate } from "../templates/photographerCard.js";
import { MediasFactory } from "../factories/MediasFactory.js";
import { MediaCard } from "../templates/mediaCard.js";
import { InfoBox } from "../templates/infoBox.js";

class PhotographerPage {
  constructor() {
    this._url = new URL(document.location).searchParams;
    this._id = Number(this._url.get("id"));
    this.api = new Api("../../data/photographers.json");
    this.$photographerHeader = document.querySelector(".photograph-header");
    this.$main = document.querySelector("main");
    this.$mediaSection = document.querySelector(".media-section");
    this.$mediaWrapper = document.querySelector(".wrapper");
  }

  async main() {
    const data = await this.api.getData();
    const photographerData = data.photographers.find(photographer => photographer.id === this._id);
    const mediaData = data.media.filter(media => media.photographerId === this._id);

    const photographer = new Photographer(photographerData);
    const photographerTemplate = new PhotographerTemplate(photographer);
    photographerTemplate.createPhotographerHeader(this.$photographerHeader);

    const photographerName = decodeURIComponent(photographer.name);

    mediaData.forEach((media) => {
      // console.log(photographerName)
      const mediaFactory = new MediasFactory(media, photographerName);
      const mediaCard = new MediaCard(mediaFactory);
      this.$mediaWrapper.appendChild(mediaCard.createMediaCard())
    });

    const infoBox = new InfoBox(this._id, data);
    this.$main.appendChild(infoBox.createRateCard());
  }
}

const photographerPage = new PhotographerPage();
photographerPage.main();
