import { Modal } from "./modal.js";
export class LightBox extends Modal {
  constructor(mediaData) {
    super();
    this._media = mediaData;
    this._currentIndex = 0;
    this._timeoutID;
    this._isPause = false;

    this.$modal = document.querySelector(".container_light_box");
    this.$btnOpen = document.querySelectorAll(".media_card");
    this.$modalElements = this.$modal.querySelectorAll("#close_light_box, i");
    this.$btnNext = this.$modal.querySelector(".fa-chevron-right");
    this.$btnPrevious = this.$modal.querySelector(".fa-chevron-left");

    this.$btnOpen.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const media = this._media.find(
          (media) => media.id == btn.parentElement.getAttribute("data-id")
        );

        this.displayLightBox(media);
        this.displayModal(this.$modal);
        this._currentIndex = this._media.indexOf(media);
        
        // Automatic caroussel scroll 5s
        if(!this._isPause) {
          this.automaticScroll();
        }
      });
    });

    this.$modal.addEventListener("keydown", (e) => {
      this.accessibility(this.$modal, e, this.$modalElements);

      if (e.keyCode == 39) {
        this.next();
      }

      if (e.keyCode == 37) {
        this.previous();
      }

      if(e.keyCode == 32) {
        if(this._isPause) {
          this.automaticScroll();
          this._isPause = false;
        } else {
          clearTimeout(this._timeoutID);
          this._isPause = true;
        }
      }
    });

    this.$btnNext.addEventListener("click", () => {
      this.next();
    });

    this.$btnNext.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        this.next();
      }
    });

    this.$btnPrevious.addEventListener("click", () => {
      this.previous();
    });

    this.$btnPrevious.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        this.previous();
      }
    });
  }

  displayLightBox(mediaData) {
    if (this.$modal.querySelector(".thumbnail")) {
      this.$modal.querySelector(".thumbnail").remove();
    }

    this.$modal.querySelector(".container_title").prepend(mediaData.thumbnail);
    this.$modal.querySelector("h1").innerHTML = "";

    this.displayTitle(this.$modal, mediaData._title);
  }

  next() {
    if (this._currentIndex < this._media.length - 1) {
      this._currentIndex++;
    } else {
      this._currentIndex = 0;
    }

    this.displayLightBox(this._media[this._currentIndex]);

    if(!this._isPause) {
      this.automaticScroll();
    }
  }

  previous() {
    if (this._currentIndex <= 0) {
      this._currentIndex = this._media.length - 1;
    } else if (this._currentIndex <= this._media.length - 1) {
      this._currentIndex--;
    }
    this.displayLightBox(this._media[this._currentIndex]);
  }

  // Automatic caroussel scroll 5s
  automaticScroll() {
    clearTimeout(this._timeoutID);
    this._timeoutID = setTimeout(() => {
      this.next();
    }, 5000)
  }
}
