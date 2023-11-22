import Media from "../models/Media.js";

/**
 * Constructor pattern
 * Format data
 * Get data
 */
export default class Video extends Media {
  constructor(data, photographer) {
    super(data);
    this._photographer = photographer.split(" ")[0];
    this._src = `/assets/medias/${this._photographer}/${this._media}`;
  }

  get thumbnail() {
    const video = document.createElement("video");
    const source = document.createElement("source");

    video.setAttribute("class", "thumbnail");
    video.setAttribute("aria-label", this.title);

    source.setAttribute("src", this._src);
    source.setAttribute("type", "video/mp4");

    video.innerText = "Votre navigateur ne supporte pas la vidéo.";

    video.appendChild(source);

    return video;
  }

  get content() {
    const video = document.createElement("video");
    const source = document.createElement("source");

    video.setAttribute("class", "thumbnail");
    video.setAttribute("controls", "true");
    video.setAttribute("aria-label", this.title);

    source.setAttribute("src", this._src);
    source.setAttribute("type", "video/mp4");

    video.innerText = "Votre navigateur ne supporte pas la vidéo.";

    video.appendChild(source);

    return video;
  }
}
