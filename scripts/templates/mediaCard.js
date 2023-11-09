export class MediaCard {
    constructor(media) {
        this._media = media
    }

    createMediaCard() {    
        const article = document.createElement("article");
        const link = document.createElement("a");
        const container = document.createElement("div");
        const title = document.createElement("p");
        const containerLike = document.createElement("div");
        const numberLikes = document.createElement("p");
        const like = document.createElement("i");

        link.setAttribute("href", "#");
        link.setAttribute("aria-label", this._media.title);
        link.setAttribute("data-id", this._media._id);
        link.setAttribute("class", "media_card");
        container.setAttribute("class", "container-desc");
        containerLike.setAttribute("class", "container-like");
        like.setAttribute("role", "button");
        like.setAttribute("aria-label", "Like");
        like.setAttribute("class", "fa-solid fa-heart");

        title.innerText = this._media.title;
        numberLikes.innerText = this._media.likes;

        article.appendChild(link); 
        link.appendChild(this._media.thumbnail);
        article.appendChild(container);
        container.appendChild(title);
        container.appendChild(containerLike);
        containerLike.appendChild(numberLikes)
        containerLike.appendChild(like);
        
        return article
    }
}