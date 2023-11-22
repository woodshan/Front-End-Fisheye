export default class MediaCard {
  constructor(media, likeSubject) {
    this._media = media;
    this._likeSubject = likeSubject;
  }

  createMediaCard() {
    const article = document.createElement("li");
    const link = document.createElement("a");
    const container = document.createElement("div");
    const title = document.createElement("p");
    const containerLike = document.createElement("div");
    const numberLikes = document.createElement("p");
    // const like = document.createElement("i");
    const like = document.createElement("button");
    const srOnly = document.createElement("p");

    article.setAttribute("data-id", this._media._id);
    link.setAttribute("href", "#");
    link.setAttribute("aria-label", `Afficher le media ${this._media.title}`);
    link.setAttribute("class", "media_card");
    container.setAttribute("class", "container-desc");
    containerLike.setAttribute("class", "container-like");
    like.setAttribute("role", "button");
    like.setAttribute("tabindex", "0");
    like.setAttribute("aria-label", "J'aime");
    like.setAttribute("class", "fa-solid fa-heart");
    srOnly.setAttribute("class", "sr-only");

    title.innerText = this._media.title;
    numberLikes.innerText = this._media.likes;
    srOnly.innerText = "J'aime";

    article.appendChild(link);
    link.appendChild(this._media.thumbnail);
    article.appendChild(container);
    container.appendChild(title);
    container.appendChild(containerLike);
    containerLike.appendChild(numberLikes);
    containerLike.appendChild(like);
    containerLike.appendChild(srOnly);

    like.addEventListener("click", () => {
      this.handleLikeButton(like, numberLikes);
    });

    return article;
  }

  handleLikeButton(like, numberLikes) {
    const that = this; 

    if (like.classList.contains("liked")) {
      like.classList.remove("liked");
      that._likeSubject.fire("DEC", numberLikes);
      numberLikes.parentElement.querySelector(".sr-only").innerText = "J'aime";
      like.setAttribute("aria-label", "J'aime");
    } else {
      like.classList.add("liked");
      that._likeSubject.fire("INC", numberLikes);
      numberLikes.parentElement.querySelector(".sr-only").innerText = "Je n'aime pas";
      like.setAttribute("aria-label", "Je n'aime pas");
    }

    this._media.likes = Number(numberLikes.innerText);
  }
}
