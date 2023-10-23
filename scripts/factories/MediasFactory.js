import { Image } from "../models/Image.js";
import { Video } from "../models/Video.js";

export class MediasFactory {
    constructor(data, photographer) {
        this._type = Object.keys(data)[3]

        if(this._type === "image") {
            return new Image(data, photographer)
        } else if(this._type === "video") {
            return new Video(data, photographer)
        } else {
            throw "Unknown format"
        }
    }
}