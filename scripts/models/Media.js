/**
 * Constructor pattern
 * Format data
 * Get data
 */
export default class Media {
  constructor(data, photographer) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._media = data.image ? data.image : data.video;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    this._photographer = photographer;
  }

  get id() {
    return this._id;
  }

  get photographerId() {
    return this._photographerId;
  }

  get title() {
    return this._title;
  }

  set likes(like) {
    this._likes = like;
  }

  get likes() {
    return this._likes;
  }

  get date() {
    return this._date;
  }

  get price() {
    return this._price;
  }

  get photographer() {
    return this._photographer;
  }
}
