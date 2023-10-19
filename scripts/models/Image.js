import { Media } from "../models/Media.js";

export class Image extends Media{
    constructor(data) {
        super(data);
    }

    get miniature() {
        const img = document.createElement("img");

        img.setAttribute("src", this.src);
        img.setAttribute("alt", this.title);

        return img
    }
} 