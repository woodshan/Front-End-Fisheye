import { Media } from "../models/Media.js";

export class Video extends Media {
    constructor(data) {
        super(data)
    }

    get miniature() {
        const video = document.createElement("video");
        const source = document.createElement("source");

        // source.setAttribute("src", this.data.src)
        source.setAttribute("src", this.src)
        source.setAttribute("type", "video/mp4")

        video.appendChild(source);

        return video
    }
}