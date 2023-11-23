export default class MediaCard {
  constructor(media, likeSubject) {
    this._media = media;
    this._likeSubject = likeSubject;
  }

  /**
   * Create media card using media data
   * @returns {HTMLElement}
   */
  createMediaCard() {
    // Create dom element
    const list = document.createElement("li");
    const link = document.createElement("a");
    const container = document.createElement("div");
    const title = document.createElement("p");
    const containerLike = document.createElement("div");
    const numberLikes = document.createElement("p");
    const like = document.createElement("button");
    const srOnly = document.createElement("p");

    // Set attribute (id, accessibility,...)
    list.setAttribute("data-id", this._media._id);
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

    // Display elements in dom
    list.appendChild(link);
    link.appendChild(this._media.thumbnail);
    list.appendChild(container);
    container.appendChild(title);
    container.appendChild(containerLike);
    containerLike.appendChild(numberLikes);
    containerLike.appendChild(like);
    containerLike.appendChild(srOnly);

    like.addEventListener("click", () => {
      this.handleLikeButton(like, numberLikes);
    });

    return list;
  }

  /**
   * Handle like/unlike
   * @param {HTMLElement} like
   * @param {HTMLElement} numberLikes
   */
  handleLikeButton(like, numberLikes) {
    const that = this;

    // Unlike case
    if (like.classList.contains("liked")) {
      like.classList.remove("liked");
      // Notify observer
      that._likeSubject.fire("DEC", numberLikes);

      // Accessibility
      numberLikes.parentElement.querySelector(".sr-only").innerText = "J'aime";
      like.setAttribute("aria-label", "J'aime");

      // Like case
    } else {
      like.classList.add("liked");
      // Notify observer
      that._likeSubject.fire("INC", numberLikes);

      // Accessibility
      numberLikes.parentElement.querySelector(".sr-only").innerText =
        "Je n'aime pas";
      like.setAttribute("aria-label", "Je n'aime pas");
    }

    // Set likes in media(object)
    this._media.likes = Number(numberLikes.innerText);
  }
}
