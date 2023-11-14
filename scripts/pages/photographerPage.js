import Api from "../api/api.js";
import { Photographer } from "../models/Photographer.js";
import { PhotographerTemplate } from "../templates/photographerCard.js";
import { MediasFactory } from "../factories/MediasFactory.js";
// import { MediaCard } from "../templates/mediaCard.js";
import { InfoBox } from "../templates/infoBox.js";
import { ContactForm } from "../utils/contactForm.js";
// import { LightBox } from "../utils/lightBox.js";
// import { Subject } from "../likes/subject.js";
// import { Counter } from "../likes/counter.js";
import { Sort } from "../utils/sort.js";

class PhotographerPage {
  constructor() {
    this._url = new URL(document.location).searchParams;
    this._id = Number(this._url.get("id"));
    this.api = new Api("../../data/photographers.json");

    this.$photographerHeader = document.querySelector(".photograph-header");
    this.$main = document.querySelector("main");
    this.$mediaSection = document.querySelector(".media-section");
    this.$mediaWrapper = document.querySelector(".wrapper");

    // this._likeSubject = new Subject();
    // this._likeCounter = new Counter();

    // this._likeSubject.subscribe(this._likeCounter);
  }

  async main() {
    const data = await this.api.getData();

    const photographerData = data.photographers.find(photographer => photographer.id === this._id);

    const mediaData = data.media.filter(media => media.photographerId === this._id);

    const photographer = new Photographer(photographerData);
    const photographerTemplate = new PhotographerTemplate(photographer, this._id);
    photographerTemplate.createPhotographerHeader(this.$photographerHeader);

    const photographerName = photographer.name;

    let mediaList = [];

    mediaData.forEach((media) => {
      const mediaFactory = new MediasFactory(media, photographerName);
      // const mediaCard = new MediaCard(mediaFactory, this._likeSubject);
      // this.$mediaWrapper.appendChild(mediaCard.createMediaCard());

      mediaList.push(mediaFactory)
    });

    const infoBox = new InfoBox(this._id, data);
    this.$main.appendChild(infoBox.createRateCard());

    new ContactForm(photographerName);
    // new LightBox(mediaList);

    new Sort(mediaList);
  }
}

const photographerPage = new PhotographerPage();
photographerPage.main();
