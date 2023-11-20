import { Media } from "../models/Media.js";
import { Photographer } from "../models/Photographer.js";

export class InfoBox {
    constructor(id, data) {
        this._id = id;
        this._media = data.media.filter(media => media.photographerId == this._id);
        this._photographer = data.photographers.filter((photographer) => photographer.id == this._id)[0];
        this._photographerPrice = new Photographer(this._photographer).price;
        this._sumLikes = [];
    }

    createRateCard () {
        this._media.forEach(media => {
            const constructorMedia = new Media(media);
            this._sumLikes.push(constructorMedia.likes);
        });

        this._sumLikes = this._sumLikes.reduce((acc, curr) => acc + curr);

        const container = document.createElement("div");
        const containerLikes = document.createElement("p");
        const totalLikes = document.createElement("span");
        const like = document.createElement("i");
        const dailyPrice = document.createElement("p");

        container.setAttribute("class", "rate-container");
        totalLikes.setAttribute("class", "total_likes");
        like.setAttribute("class", "fa-solid fa-heart");

        totalLikes.innerText = this._sumLikes;
        dailyPrice.innerText = `${this._photographerPrice}€ / jour`;
        
        container.appendChild(containerLikes);
        containerLikes.appendChild(totalLikes);
        containerLikes.appendChild(like);
        container.appendChild(dailyPrice);

        return container;
    }
}