import { Media } from "../models/Media.js";
import { Image } from "../models/Image.js";
import { Video } from "../models/Video.js";

export class MediasFactory {
    constructor(data, type) {
        if(type === "image") {
            // console.log(data)
            return new Image(data)
        } else if(type === "video") {
            return new Video(data)
        } else {
            throw "Unknown format"
        }
    }
}