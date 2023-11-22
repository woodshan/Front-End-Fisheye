import Counter from "../likes/counter.js";
import Subject from "../likes/subject.js";
import MediaCard from "../templates/mediaCard.js";
import LightBox from "../templates/lightBox.js";

export default class Sort {
  constructor(mediaList) {
    // Select dom elements
    this.$select = document.querySelector(".select");
    this.$btn = this.$select.querySelectorAll("button");
    this.$icon = this.$select.querySelector("em");
    this.$mediaWrapper = document.querySelector(".media_cards_list");

    // Set if filter is clicked
    this._isVisible = false;

    // Set media order
    this._mediaList = mediaList.sort((a, b) => b._likes - a._likes);

    // Set filter value
    this._value = this.$select.querySelector("button").innerText;

    // Array of liked elements
    this._lastsLikedTab = [];

    // Create a like observer
    this._likeSubject = new Subject();
    this._likeCounter = new Counter();
    this._likeSubject.subscribe(this._likeCounter);

    this.handleSort();

    // Handle click outside filter
    document.addEventListener("click", (e) => {
      if (
        e.target.parentElement !== this.$select &&
        e.target !== this.$select.querySelector("em") &&
        this._isVisible == true
      ) {
        this.$btn.forEach((btn) => {
          if (btn.querySelector("em") === null) {
            this._isVisible = false;
            btn.classList.add("hidden");
            btn.setAttribute("aria-hidden", "true");
          } else {
            btn.setAttribute("aria-expanded", "false");
            btn.setAttribute(
              "aria-label",
              `Ouvrir le menu de tri, trier par ${this._value}`
            );
            btn.querySelector("em").classList.remove("arrow-up");
            btn.querySelector("em").classList.add("arrow-down");
          }
        });
      }
    });

    // Handle filter on click
    this.$select.addEventListener("click", (e) => {
      const oldValue = this._value;

      if (this._isVisible) {
        // Set target element
        let htmlElement;
        if (e.target == this.$icon) {
          this._value = e.target.parentElement.value;
          htmlElement = e.target.parentElement;
          this.hideFilter(htmlElement);
        } else if (e.target.value !== undefined) {
          this._value = e.target.value;
          htmlElement = e.target;
          this.hideFilter(htmlElement);
        } else {
          htmlElement = e.target.querySelector("button");
          this.hideFilter(htmlElement);
        }

        // if filter value is the same
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
      // Hide filter values
      btn.classList.add("hidden");

      // Handle hidden items accessibility
      btn.setAttribute("aria-hidden", "true");
      btn.removeAttribute("aria-expanded");
      btn.removeAttribute("aria-haspopup");
      btn.removeAttribute("role");
      btn.removeAttribute("aria-label");
    });

    // Handle close menu accessibility
    htmlElement.setAttribute("aria-expanded", "false");
    htmlElement.setAttribute("aria-haspopup", "true");
    htmlElement.setAttribute("role", "listbox");
    htmlElement.setAttribute(
      "aria-label",
      `Ouvrir le menu de tri, trier par ${this._value}`
    );
    htmlElement.setAttribute("aria-hidden", "false");

    // Show selected value
    htmlElement.classList.remove("hidden");

    // Display selected filter value
    this.$select.prepend(htmlElement);
    htmlElement.append(this.$icon);

    // Handle icon style
    htmlElement.querySelector("em").classList.remove("arrow-up");
    htmlElement.querySelector("em").classList.add("arrow-down");

    // Set filter visibility
    this._isVisible = false;
  }

  /**
   * Show filter & handle accessibility
   */
  showFilter() {
    this.$btn.forEach((btn) => {
      // Show all filter values
      btn.classList.remove("hidden");

      // Handle visible items accessibility
      btn.setAttribute("aria-hidden", "false");
      btn.setAttribute("aria-label", `Trier par ${btn.value}`);
    });

    // Handle open menu accessibility
    this.$select.querySelector("button").setAttribute("aria-expanded", "true");
    this.$select
      .querySelector("button")
      .setAttribute("aria-label", "Fermer le menu de tri");

    // Handle icon style
    this.$select.querySelector("em").classList.remove("arrow-down");
    this.$select.querySelector("em").classList.add("arrow-up");

    // Set filter visibility
    this._isVisible = true;
  }

  /**
   * Reorganize array based on selected filter value
   * Reorganize media cards using ordered array
   */
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

    // Display lightbox in order
    new LightBox(this._mediaList);
  }

  /**
   * Remove all media cards
   * &
   * display ordered media cards
   */
  displayMediaCard() {
    this.$mediaWrapper.innerHTML = "";
    this._mediaList.forEach((media) => {
      // Create and display media card using ordered array
      const mediaCard = new MediaCard(media, this._likeSubject);
      this.$mediaWrapper.appendChild(mediaCard.createMediaCard());
    });

    // Set liked class on liked elements
    this._lastsLikedTab.forEach((id) => {
      let like = this.$mediaWrapper.querySelector(`[data-id="${id}"]`);

      like.querySelector(".container-like button").classList.add("liked");

      // Handle liked accessibility
      like.querySelector(".container-like .sr-only").innerText =
        "Je n'aime pas";
      like.setAttribute("aria-label", "Je n'aime pas");
    });

    // Save liked elements
    this.attachLikeEvents();
  }

  /**
   * Keep like events
   */
  attachLikeEvents() {
    this.$mediaWrapper
      .querySelectorAll(".container-like button")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          // Set last media card cliked
          const lastArticle = btn.parentNode.parentNode.parentNode;
          const lastLike = this.$mediaWrapper.querySelector(
            `[data-id="${lastArticle.getAttribute("data-id")}"]`
          );

          // Update array of liked elements

          // If unlike
          if (
            !lastLike
              .querySelector(".container-like button")
              .classList.contains("liked")
          ) {
            // Remove id of unlike elements from liked array
            this._lastsLikedTab = this._lastsLikedTab.filter(
              (id) => id !== lastLike.getAttribute("data-id")
            );

            // if array changes in popularity filter reorganize list & display ordered media card
            this.orderedPopularity();

            // If like
          } else if (
            lastLike
              .querySelector(".container-like button")
              .classList.contains("liked")
          ) {
            // Add ID of liked elements in array
            this._lastsLikedTab.push(lastLike.getAttribute("data-id"));

            // Remove ID of similar liked elements from array
            this._lastsLikedTab = this._lastsLikedTab.filter(
              (id, index) => this._lastsLikedTab.indexOf(id) === index
            );

            // Handle popularity case
            this.orderedPopularity();
          }
        });
      });
  }

  /**
   * if array changes in popularity filter reorganize list
   * &
   * display ordered media card
   */
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
