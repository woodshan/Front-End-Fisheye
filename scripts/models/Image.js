import { Media } from "../models/Media.js";

export class Image extends Media{
    constructor(data, photographer) {
        super(data);
        this._photographer = photographer.split(" ")[0]
        this._src = `/assets/medias/${this._photographer}/${this._media}`
    }

    get thumbnail() {
        const img = document.createElement("img");

        img.setAttribute("src", this._src);
        img.setAttribute("alt", this.title);
        
        img.setAttribute("class", "img_light_box");

        return img
    }
} 