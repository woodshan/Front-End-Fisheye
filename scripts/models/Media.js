export class Media {
    constructor(data) {
        this._id = data.id
        this._photographerId = data.photographerId
        this._title = data.title 
        this._media = data.image ? data.image : data.video 
        this._likes = data.likes 
        this._date = data.date 
        this._price = data.price
    }

    get id() {
        return this._id
    }

    get photographerId() {
        return this._photographerId
    }

    get title() {
        return this._title
    }

    get src() {
        return `/assets/medias/${this._photographerId}/${this._media}`
    }

    get likes() {
        return this._likes
    }

    get date() {
        return this._date
    }

    get price() {
        return this._price
    }
}