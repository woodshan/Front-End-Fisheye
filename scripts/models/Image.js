import Media from "../models/Media.js";
/**
 * Constructor pattern
 * Format data
 * Get data
 */
export default class Image extends Media {
  constructor(data, photographer) {
    super(data);
    this._photographer = photographer.split(" ")[0];
    this._src = `/assets/medias/${this._photographer}/${this._media}`;
  }

  get thumbnail() {
    const img = document.createElement("img");

    img.setAttribute("src", this._src);
    img.setAttribute("alt", this.title);

    img.setAttribute("class", "thumbnail");

    return img;
  }
}
