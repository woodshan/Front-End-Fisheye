import { Modal } from "../templates/modal.js";
export class LightBox extends Modal {
  constructor(mediaData) {
    super();
    this._media = mediaData;
    this._currentIndex = 0;

    this.$modal = document.querySelector(".container_light_box");
    this.$btnOpen = document.querySelectorAll(".media_card");
    this.$modalElements = this.$modal.querySelectorAll("#close_light_box, i");
    this.$btnNext = this.$modal.querySelector(".fa-chevron-right");
    this.$btnPrevious = this.$modal.querySelector(".fa-chevron-left");
    
    this.$btnOpen.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const media = this._media.find(media => media.id == btn.getAttribute("data-id"));

        this.displayLightBox(e, media);
        this.displayModal(this.$modal);
        this._currentIndex = this._media.indexOf(media);
      });
    });

    document.addEventListener("keydown", (e) => {
      this.acessibility(this.$modal, e, this.$modalElements);

      if(e.keyCode == 39) {
        this.next(e)
      } 

      if(e.keyCode == 37) {
        this.previous(e)
      }
    });

    this.$btnNext.addEventListener("click", (e) => {
      this.next(e);
    });

    this.$btnNext.addEventListener("keydown", (e) => {
      if(e.keyCode == 13) {
        this.next(e)
      }
    });

    this.$btnPrevious.addEventListener("click", (e) => {
      this.previous(e);
    });

    this.$btnPrevious.addEventListener("keydown", (e) => {
      if(e.keyCode == 13) {
        this.previous(e)
      }
    });
  }

  displayLightBox(e, mediaData) {
    e.preventDefault();

    if(this.$modal.querySelector(".img_light_box")) {
      this.$modal.querySelector(".img_light_box").remove()
    }

    this.$modal.querySelector(".container_title").prepend(mediaData.thumbnail);
    this.$modal.querySelector("h1").innerHTML = "";

    this.displayTitle(this.$modal, mediaData._title);
  }

  next(e) {
    if(this._currentIndex < this._media.length-1) {
      this._currentIndex++
    } else {
      this._currentIndex = 0
    }

    this.displayLightBox(e, this._media[this._currentIndex])
  }

  previous(e) {
    if(this._currentIndex <= 0){
      this._currentIndex = this._media.length-1;
    } else if(this._currentIndex <= this._media.length-1) {
      this._currentIndex--
    }
    this.displayLightBox(e, this._media[this._currentIndex])
  }
}