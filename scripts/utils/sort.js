import { Counter } from "../likes/counter.js";
import { Subject } from "../likes/subject.js";
import { MediaCard } from "../templates/mediaCard.js";
import { LightBox } from "./lightBox.js";

export class Sort {
  constructor(mediaList) {
    this.$select = document.querySelector(".select");
    this.$btn = this.$select.querySelectorAll("button");
    this.$icon = this.$select.querySelector("i");
    this.$mediaWrapper = document.querySelector(".wrapper");

    this._isVisible = false;
    this._mediaList = mediaList.sort((a, b) => b._likes - a._likes);
    this._value = this.$select.querySelector("button").innerText;

    this._lastsLikedTab = [];

    this._likeSubject = new Subject();
    this._likeCounter = new Counter();

    this._likeSubject.subscribe(this._likeCounter);

    this.handleSort();

    this.$select.addEventListener("click", (e) => {
      const oldValue = this._value;

      if (this._isVisible) {
        if (e.target.value == undefined) {
          this._value = oldValue;
        } else {
          this._value = e.target.value;
          this.showFilter(e);
        }

        if (oldValue !== this._value) {
          this.handleSort();
        }
      } else if (!this._isVisible) {
        this.hideFilter();
      }
    });
  }

  showFilter(e) {
    this.$btn.forEach((btn) => {
      btn.classList.add("hidden");
    });
    this.$select.prepend(e.target);
    e.target.append(this.$icon);
    e.target.classList.remove("hidden");
    this._isVisible = false;
  }

  hideFilter() {
    this.$btn.forEach((btn) => {
      btn.classList.remove("hidden");
    });
    this._isVisible = true;
  }

  // Organize array based on sorting
  handleSort() {
    switch (this._value) {
      case "Popularité":
        this._mediaList = this._mediaList.sort((a, b) => b._likes - a._likes);
        this.displayMediaCard();
        break;
      case "Date":
        this._mediaList = this._mediaList.sort((a, b) =>
          a._date < b._date ? 1 : a._date > b._date ? -1 : 0
        );
        this.displayMediaCard();
        break;
      case "Titre":
        this._mediaList = this._mediaList.sort((a, b) =>
          a._title < b._title ? -1 : a._title > b._title ? 1 : 0
        );
        this.displayMediaCard();
        break;
      default:
        console.log("Error Unknow Value");
    }

    new LightBox(this._mediaList);
  }

  // Clear all media cards & display ordered media cards
  displayMediaCard() {
    this.$mediaWrapper.innerHTML = "";
    this._mediaList.forEach((media) => {
      const mediaCard = new MediaCard(media, this._likeSubject);
      this.$mediaWrapper.appendChild(mediaCard.createMediaCard());
    });

    // Set liked class on liked elements
    this._lastsLikedTab.forEach((id) => {
      let like = this.$mediaWrapper.querySelector(`[data-id="${id}"]`);

      like.querySelector(".container-like i").classList.add("liked");
    });

    // Save liked elements
    this.attachLikeEvents();
  }

  attachLikeEvents() {
    this.$mediaWrapper.querySelectorAll(".container-like i").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // set last media card clicked
        const lastArticle = btn.parentNode.parentNode.parentNode;
        const lastLike = this.$mediaWrapper.querySelector(
          `[data-id="${lastArticle.getAttribute("data-id")}"]`
        );

        // Update array of liked elements

        if (
          !lastLike
            .querySelector(".container-like i")
            .classList.contains("liked")
        ) {
          // If unlike
          // Remove unlike elements from array
          this._lastsLikedTab = this._lastsLikedTab.filter(
            (id) => id !== lastLike.getAttribute("data-id")
          );

          // if array changes in popularity filter reorganize list & display ordered media card
          this.orderedPopularity();
        } else if (
          lastLike
            .querySelector(".container-like i")
            .classList.contains("liked")
        ) {
          // If like
          // add liked elements in array
          this._lastsLikedTab.push(lastLike.getAttribute("data-id"));

          // Remove similar liked elements from array
          this._lastsLikedTab = this._lastsLikedTab.filter(
            (id, index) => this._lastsLikedTab.indexOf(id) === index
          );

          this.orderedPopularity();
        }
      });
    });
  }

  // if array changes in popularity filter reorganize list & display ordered media card
  orderedPopularity() {
    if (
      this._value == "Popularité" &&
      JSON.stringify(this._mediaList) !==
        JSON.stringify(this._mediaList.sort((a, b) => b._likes - a._likes))
    ) {
      this._mediaList = this._mediaList.sort((a, b) => b._likes - a._likes);

      this.displayMediaCard();
    }
  }
}
