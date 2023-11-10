import { Modal } from "../templates/modal.js";

// export class LightBox extends Modal {
//   constructor(mediaDatas) {
//     super();
//     this._medias = mediaDatas;
//     this._currentIndex = 0;

//     this.$modal = document.querySelector(".container_light_box");
//     this.$img = this.$modal.querySelector(".img_light_box");
//     this.$btnOpen = document.querySelectorAll(".media_card");
//     this.$modalElements = this.$modal.querySelectorAll("#close_light_box, i");
//     this.$btnNext = this.$modal.querySelector(".fa-chevron-right");
//     this.$btnPrevious = this.$modal.querySelector(".fa-chevron-left");

//     this.$btnOpen.forEach((btn) => {
//       btn.addEventListener("click", (e) => {
//         const dataMedia = this._medias.find(
//           (media) => media.id == btn.getAttribute("data-id")
//         );

//         this.displayLightBox(e, dataMedia);
        
//         this.displayModal(this.$modal);
//         this._currentIndex = 0;
//       });
//     });

//     this.$btnClose.forEach((btn) => {
//       btn.addEventListener("click", () => {
//         this.closeModal(this.$modal);
//       });

//       btn.addEventListener("keydown", (e) => {
//         if (e.keyCode == 13) {
//           this.closeModal(this.$modal);
//         }
//       });
//     });

//     document.addEventListener("keydown", (e) => {
//       this.acessibility(this.$modal, e, this.$modalElements);
//     });

//     this.$btnNext.addEventListener("click", (e) => {
//       this.next(e);
//     });
//   }

//   displayLightBox(e, dataMedia) {
//     e.preventDefault();
//     this.$modal.querySelector("h1").innerHTML = "";

//     this.$img.src = `./assets/medias/Mimi/${dataMedia.image}`;
//     this.displayTitle(this.$modal, dataMedia.title);
//     this.$img.setAttribute("data-id", dataMedia.id);
//   }

//   next(e) {
//     let mediaList = [];

//     this.$btnOpen.forEach((link) => {
//       mediaList.push(this._medias.find(media => media.id == link.getAttribute("data-id")));
//     });

//     mediaList.forEach((media) => {
//       if(this.$img.getAttribute("data-id") == media.id) {
//         this._currentIndex++
//       }
//     });

//     if(this.$img.getAttribute("data-id") == mediaList[mediaList.length-1].id) {
//       this._currentIndex = 0
//     };

//     this.displayLightBox(e, mediaList[this._currentIndex]);
//   }
// }


// TEST
export class LightBox extends Modal {
  constructor(mediaData) {
    super();
    this._media = mediaData._media;
    this._currentIndex = 0;

    this.$modal = document.querySelector(".container_light_box");
    this.$img = this.$modal.querySelector(".img_light_box");
    this.$btnOpen = document.querySelectorAll(".media_card");
    this.$modalElements = this.$modal.querySelectorAll("#close_light_box, i");
    this.$btnNext = this.$modal.querySelector(".fa-chevron-right");
    this.$btnPrevious = this.$modal.querySelector(".fa-chevron-left");

    this.$btnOpen.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if(this._media.id == btn.getAttribute("data-id")) {
          this.displayLightBox(e);
          this.displayModal(this.$modal);
          this._currentIndex = 0;
        }
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
      this.acessibility(this.$modal, e, this.$modalElements);
    });

    this.$btnNext.addEventListener("click", (e) => {
      this.next(e);
    });
  }

  displayLightBox(e) {
    e.preventDefault();
    this.$modal.querySelector("h1").innerHTML = "";

    this.$img.src = this._media._src;
    this.displayTitle(this.$modal, this._media._title);
    this.$img.setAttribute("data-id", this._media._id);
  }

  next(e) {
    let mediaList = [];

    this.$btnOpen.forEach((link) => {
      // mediaList.push(this._media.find(media => media.id == link.getAttribute("data-id")));
      // console.log(this._media._id)
      if(link.getAttribute("data-id") == this._media._id) {
        mediaList.push(this._media);
      }
    });

    console.log(mediaList);

    // mediaList.forEach((media) => {
    //   if(this.$img.getAttribute("data-id") == media.id) {
    //     this._currentIndex++
    //   }
    // });

    // if(this.$img.getAttribute("data-id") == mediaList[mediaList.length-1].id) {
    //   this._currentIndex = 0
    // };

    // this.displayLightBox(e, mediaList[this._currentIndex]);
  }
}