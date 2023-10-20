import Api from "../api/api.js";
import { Photographer } from "../models/Photographer.js";
import { PhotographerTemplate } from "../templates/photographerCard.js";
import { FilterTemplate } from "../templates/filterTemplate.js";
import { MediasFactory } from "../factories/MediasFactory.js";
import { MediaCard } from "../templates/mediaCard.js";

class PhotographerPage {
  constructor() {
    this._url = new URL(document.location).searchParams;
    this._id = this._url.get("id");
    this.api = new Api("../../data/photographers.json");
    this.$photographerHeader = document.querySelector(".photograph-header");
    this.$mediaSection = document.querySelector(".media-section");
    this.$mediaWrapper = document.querySelector(".wrapper");
  }

  async main() {
    const data = await this.api.getData();
    const photographersData = data.photographers;
    const mediaData = data.media;

    const filterBox = new FilterTemplate();
    this.$mediaSection.prepend(filterBox.createFilter());

    photographersData.filter((photographer) => {
      if (photographer.id === parseInt(this._id)) {
        // console.log("Info correspondant à l'id du photographe")
        const photographerData = new Photographer(photographer);
        const photographerTemplate = new PhotographerTemplate(photographerData);
        photographerTemplate.createPhotographerHeader(this.$photographerHeader)
      }
    });

    mediaData.filter((media) => {
      if (media.photographerId === parseInt(this._id)) {
        const mediaFactory = new MediasFactory(media, Object.keys(media)[3]);
        const mediaCard = new MediaCard(mediaFactory);
        this.$mediaWrapper.appendChild(mediaCard.createMediaCard())
      }
    });
  }
}

const photographerPage = new PhotographerPage();
photographerPage.main();
