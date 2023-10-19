export class MediaCard {
    constructor(media) {
        this._media = media
    }

    createMediaCard() {
        const article = document.createElement("article");
        const img = document.createElement("img");
        const title = document.createElement("p");
        const like = document.createElement("img");

        img.setAttribute("src", this._media.picture);
        img.setAttribute("alt", this._media.title);
        like.setAttribute("src", "/assets/icons/like.svg");
        like.setAttribute("alt", "like");

        title.innerText = this._media.title;

        article.appendChild(img);
        article.appendChild(title);
        article.appendChild(like);
        
        return article
    }
}