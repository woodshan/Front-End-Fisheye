import { Counter } from "../likes/counter.js";
import { Subject } from "../likes/subject.js";
import { MediaCard } from "../templates/mediaCard.js";
import { LightBox } from "../templates/lightBox.js";

export class Sort {
  constructor(mediaList) {
    this.$select = document.querySelector(".select");
    this.$btn = this.$select.querySelectorAll("button");
    this.$icon = this.$select.querySelector("em");
    this.$mediaWrapper = document.querySelector(".media_cards_list");

    this._isVisible = false;
    this._mediaList = mediaList.sort((a, b) => b._likes - a._likes);
    this._value = this.$select.querySelector("button").innerText;

    this._lastsLikedTab = [];

    this._likeSubject = new Subject();
    this._likeCounter = new Counter();

    this._likeSubject.subscribe(this._likeCounter);

    this.handleSort();

    // Handle click outside filter
    document.addEventListener("click", (e) => {
      if(e.target.parentElement !== this.$select && e.target !== this.$select.querySelector("em") && this._isVisible == true) {
        this.$btn.forEach((btn) => {
          if(btn.querySelector("em") === null) {
            this._isVisible = false
            btn.classList.add("hidden");
            btn.setAttribute("aria-hidden", "true");
          } else {
            this.$select.setAttribute("aria-expanded", "false");
            this.$select.setAttribute("aria-label", "Ouvrir le menu de tri");
            btn.querySelector("em").classList.remove("arrow-up");
            btn.querySelector("em").classList.add("arrow-down");
          }
        });
      }
    });

    // Handle filter
    this.$select.addEventListener("click", (e) => {
      const oldValue = this._value;

      if (this._isVisible) {
        let htmlElement;
        if (e.target.value == undefined) {
          this._value = e.target.parentElement.value;
          htmlElement = e.target.parentElement;
          this.hideFilter(htmlElement);
        } else {
          this._value = e.target.value;
          htmlElement = e.target;
          this.hideFilter(htmlElement);
        }

        if (oldValue !== this._value) {
          this.handleSort();
        }
      } else if (!this._isVisible) {
        this.showFilter();
      }
    });
  }

  /**
   * Hide Filter & handle accessibility
   * @param {HTMLElement} htmlElement button
   */
  hideFilter(htmlElement) {
    this.$btn.forEach((btn) => {
      btn.classList.add("hidden");
      btn.setAttribute("aria-hidden", "true");
    });

    this.$select.setAttribute("aria-expanded", "false");
    this.$select.setAttribute("aria-label", "Ouvrir le menu de tri");
    this.$select.prepend(htmlElement);
    htmlElement.append(this.$icon);
    htmlElement.classList.remove("hidden");
    htmlElement.setAttribute("aria-hidden", "false");

    htmlElement.querySelector("em").classList.remove("arrow-up");
    htmlElement.querySelector("em").classList.add("arrow-down");

    this._isVisible = false;
  }

  // Show filter & handle accessibility
  showFilter() {
    this.$btn.forEach((btn) => {
      btn.classList.remove("hidden");
      btn.setAttribute("aria-hidden", "false");
    });

    this.$select.setAttribute("aria-expanded", "true");
    this.$select.setAttribute("aria-label", "Fermer le menu de tri");
    this.$select.querySelector("em").classList.remove("arrow-down");
    this.$select.querySelector("em").classList.add("arrow-up");

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

      like.querySelector(".container-like button").classList.add("liked");
      like.querySelector(".container-like .sr-only").innerText = "Je n'aime pas";
      like.setAttribute("aria-label", "Je n'aime pas");
    });

    // Save liked elements
    this.attachLikeEvents();
  }

  attachLikeEvents() {
    this.$mediaWrapper.querySelectorAll(".container-like button").forEach((btn) => {
      btn.addEventListener("click", () => {
        // set last media card clicked
        const lastArticle = btn.parentNode.parentNode.parentNode;
        const lastLike = this.$mediaWrapper.querySelector(
          `[data-id="${lastArticle.getAttribute("data-id")}"]`
        );

        // Update array of liked elements

        if (
          !lastLike
            .querySelector(".container-like button")
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
            .querySelector(".container-like button")
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
