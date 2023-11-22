import Image from "../models/Image.js";
import Video from "../models/Video.js";

/**
 * Factory pattern
 * Handle media creation
 * Handle media types
 */
export default class MediasFactory {
  constructor(data, photographer) {
    // Get media type
    this._type = Object.keys(data)[3];

    if (this._type === "image") {
      return new Image(data, photographer);
    } else if (this._type === "video") {
      return new Video(data, photographer);
    } else {
      throw "Unknown format";
    }
  }
}
