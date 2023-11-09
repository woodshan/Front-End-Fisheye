import { Modal } from "../templates/modal.js";

export class LightBox extends Modal {
  constructor(datas) {
    super();
    this._medias = datas

    this.$modal = document.querySelector(".container_light_box");
    this.$img = this.$modal.querySelector(".img_light_box");
    this.$btnOpen = document.querySelectorAll(".media_card");
    this.$modalElements = this.$modal.querySelectorAll("#close_light_box, i");
    this.$btnNext = this.$modal.querySelector(".fa-chevron-right");
    this.$btnPrevious = this.$modal.querySelector(".fa-chevron-left");

    this.$btnOpen.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        this.$modal.querySelector("h1").innerHTML = "";

        const dataMedia = this._medias.find(media => media.id == btn.getAttribute("data-id"));
        
        this.$img.src = `./assets/medias/Mimi/${dataMedia.image}`;
        this.$img.setAttribute("data-id", dataMedia.id);
        this.displayTitle(this.$modal, dataMedia.title);

        this.displayModal(this.$modal, dataMedia.title);
      });
    });

    this.$btnClose.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.closeModal(this.$modal);
      });

      btn.addEventListener("keydown", (e) => {
        if (e.keyCode == 13) {
          this.closeModal(this.$modal);
        }
      });
    });

    document.addEventListener("keydown", (e) => {
        this.acessibility(this.$modal, e, this.$modalElements)
    });

    this.$btnNext.addEventListener("click", (e) => {
        this.next();
    })
  }

  next() {
    const mediaData = this._medias.find(media => media.id == this.$img.getAttribute("data-id"));
    console.log(mediaData)
  }

}
