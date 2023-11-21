import { Media } from "../models/Media.js";

export class Video extends Media {
    constructor(data, photographer) {
        super(data);
        this._photographer = photographer.split(" ")[0];
        this._src = `/assets/medias/${this._photographer}/${this._media}`;
    }

    get thumbnail() {
        const video = document.createElement("video");
        const source = document.createElement("source");

        video.setAttribute("class", "thumbnail");
        video.setAttribute("controls", "true");
        video.setAttribute("aria-label", this.title);

        source.setAttribute("src", this._src);
        source.setAttribute("type", "video/mp4");

        video.appendChild(source);

        return video;
    }
}