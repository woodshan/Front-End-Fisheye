import { Media } from "../models/Media.js";

export class MediasFactory {
    constructor(data, type) {
        if(type === "image") {
            return new Media(data)
        } else if(type === "video") {
            return new Media(data)
        } else {
            throw "Unknown format"
        }
    }
}