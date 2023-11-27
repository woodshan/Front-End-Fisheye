import Modal from "./modal.js";

/**
 * Modal Light box
 */
export default class LightBox extends Modal {
  constructor(mediaData) {
    super();

    this._media = mediaData;

    // Current media's index
    this._currentIndex = 0;

    // Select dom elements
    this.$modal = document.querySelector(".container_light_box");
    this.$btnOpen = document.querySelectorAll(".media_card");
    this.$modalElements = this.$modal.querySelectorAll(
      "#close_light_box, button"
    );
    this.$btnNext = this.$modal.querySelector(".fa-chevron-right");
    this.$btnPrevious = this.$modal.querySelector(".fa-chevron-left");

    this.$btnOpen.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        // Find clicked media using its id
        const media = this._media.find(
          (media) => media.id == btn.parentElement.getAttribute("data-id")
        );

        // Display lightBox
        this.displayLightBox(media);
        this.displayModal(this.$modal);

        // Set current index using media's index
        this._currentIndex = this._media.indexOf(media);
      });
    });

    // Handle accessibility using keyboard event
    this.$modal.addEventListener("keydown", (e) => {
      this.accessibility(this.$modal, e, this.$modalElements);

      // Next arrow key
      if (e.keyCode == 39) {
        this.next();
      }

      // Previous arrow key
      if (e.keyCode == 37) {
        this.previous();
      }
    });

    this.$btnNext.addEventListener("click", () => {
      this.next();
    });

    this.$btnPrevious.addEventListener("click", () => {
      this.previous();
    });
  }

  /**
   * Display light box
   * @param {Object} mediaData
   */
  displayLightBox(mediaData) {
    // Remove previous displayed media
    if (this.$modal.querySelector(".thumbnail")) {
      this.$modal.querySelector(".thumbnail").remove();
    }

    // Display actual media
    this.$modal
      .querySelector(".container_title")
      .prepend(
        mediaData.content == undefined ? mediaData.thumbnail : mediaData.content
      );

    // Display actual title
    this.$modal.querySelector("h1").innerHTML = "";
    this.displayTitle(this.$modal, mediaData._title);
  }

  /**
   * Show next media
   */
  next() {
    // Next media until end of media's array
    if (this._currentIndex < this._media.length - 1) {
      this._currentIndex++;

      // Back to first media
    } else {
      this._currentIndex = 0;
    }

    // Show media in order
    this.displayLightBox(this._media[this._currentIndex]);
  }

  /**
   * Show previous media
   */
  previous() {
    // If first media back to last media
    if (this._currentIndex <= 0) {
      this._currentIndex = this._media.length - 1;

      // Else previous media
    } else if (this._currentIndex <= this._media.length - 1) {
      this._currentIndex--;
    }

    // Show media in order
    this.displayLightBox(this._media[this._currentIndex]);
  }
}
