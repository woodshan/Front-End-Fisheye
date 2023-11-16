export class MediaCard {
  constructor(media, likeSubject) {
    this._media = media;
    this._likeSubject = likeSubject;
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
    like.setAttribute("tabindex", "0");
    like.setAttribute("aria-label", "Like");
    like.setAttribute("class", "fa-solid fa-heart");

    title.innerText = this._media.title;
    numberLikes.innerText = this._media.likes;

    article.appendChild(link);
    link.appendChild(this._media.thumbnail);
    article.appendChild(container);
    container.appendChild(title);
    container.appendChild(containerLike);
    containerLike.appendChild(numberLikes);
    containerLike.appendChild(like);

    like.addEventListener("click", () => {
      this.handleLikeButton(like, numberLikes);
    });

    like.addEventListener("keydown", (e) => {
      if(e.keyCode == 13) {
        this.handleLikeButton(like, numberLikes);
      }
    })

    return article;
  }

  handleLikeButton(like, numberLikes) {
    const that = this;

    if (like.classList.contains("liked")) {
      like.classList.remove("liked");
      that._likeSubject.fire("DEC", numberLikes);
    } else {
      like.classList.add("liked");
      that._likeSubject.fire("INC", numberLikes);
    }

    // console.log(Number(numberLikes.innerText))
    this._media.likes = Number(numberLikes.innerText);
  }
}
