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
    this._oldValue = this._value;

    this._lastsLikedTab = [];

    this._likeSubject = new Subject();
    this._likeCounter = new Counter();

    this._likeSubject.subscribe(this._likeCounter);

    this.handleSort();

    this.$select.addEventListener("click", (e) => {
      const oldValue = this._value;
      this._oldValue = this._value;

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

  handleSort() {
    switch (this._value) {
      case "Popularité":
        this._mediaList = this._mediaList.sort((a, b) => b._likes - a._likes);
        this.displayMediaCard();
        // this.$mediaWrapper
        //   .querySelectorAll(".container-like i")
        //   .forEach((btn) => {
        //     btn.addEventListener("click", (e) => {
        // if (
        //   JSON.stringify(this._mediaList) !==
        //   JSON.stringify(
        //     this._mediaList.sort((a, b) => b._likes - a._likes)
        //   )
        // ) {
        //   this._mediaList = this._mediaList.sort(
        //     (a, b) => b._likes - a._likes
        //   );

        //   this.displayMediaCard();

        //   let card = btn.parentNode.parentNode.parentNode;
        //   let like = this.$mediaWrapper.querySelector(
        //     `[data-id="${card.getAttribute("data-id")}"]`
        //   );
        //   like.querySelector(".container-like i").classList.add("liked");
        // }
        //   });
        // });
        // console.log("Trié par Popularité");
        break;
      case "Date":
        this._mediaList = this._mediaList.sort((a, b) => {
          if (a._date < b._date) {
            return 1;
          }

          if (a._date > b._date) {
            return -1;
          }

          return 0;
        });
        this.displayMediaCard();
        // console.log("Trié par Date");
        break;
      case "Titre":
        this._mediaList = this._mediaList.sort((a, b) => {
          if (a._title < b._title) {
            return -1;
          }

          if (a._title > b._title) {
            return 1;
          }

          return 0;
        });
        this.displayMediaCard();
        // console.log("Trié par Titre");
        break;
      default:
        console.log("Error Unknow Value");
    }

    new LightBox(this._mediaList);
  }

  displayMediaCard() {
    this.$mediaWrapper.innerHTML = "";
    this._mediaList.forEach((media) => {
      const mediaCard = new MediaCard(media, this._likeSubject);
      this.$mediaWrapper.appendChild(mediaCard.createMediaCard());
    });

    this.attachLikeEvents();
  }

  attachLikeEvents() {
    let lastsLikedTab = [];
    this.$mediaWrapper.querySelectorAll(".container-like i").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const lastArticle = btn.parentNode.parentNode.parentNode;
        const lastLike = this.$mediaWrapper.querySelector(
          `[data-id="${lastArticle.getAttribute("data-id")}"]`
        );

        if (
          !lastLike
            .querySelector(".container-like i")
            .classList.contains("liked")
        ) {
          // console.log("Le dernier article que j'ai unliké")
          // console.log(lastLike)

          console.log(
            "Les derniers articles que j'ai liké dans le cas du unlike"
          );
          this._lastsLikedTab = this._lastsLikedTab.filter(
            (id) => id !== lastLike.getAttribute("data-id")
          );
          console.log(this._lastsLikedTab);

          if (this._oldValue !== this._value) {
            this._lastsLikedTab.forEach((id) => {
              let like = this.$mediaWrapper.querySelector(`[data-id="${id}"]`);

              like.querySelector(".container-like i").classList.add("liked");
            });
          }
        } else if (
          lastLike
            .querySelector(".container-like i")
            .classList.contains("liked")
        ) {
          // console.log("Le dernier article que j'ai liké");
          // console.log(lastLike);
          this._lastsLikedTab.push(lastLike.getAttribute("data-id"));
        }

        if (
          !lastLike
            .querySelector(".container-like i")
            .classList.contains("liked")
        ) {
          // console.log("Le dernier article que j'ai unliké")
          // console.log(lastLike)

          // console.log("Les derniers articles que j'ai liké dans le cas du unlike")
          lastsLikedTab = lastsLikedTab.filter(
            (id) => id !== lastLike.getAttribute("data-id")
          );
          // console.log(lastsLikedTab)

          if (
            this._value == "Popularité" &&
            JSON.stringify(this._mediaList) !==
              JSON.stringify(
                this._mediaList.sort((a, b) => b._likes - a._likes)
              )
          ) {
            this._mediaList = this._mediaList.sort(
              (a, b) => b._likes - a._likes
            );
            this.displayMediaCard();

            lastsLikedTab.forEach((id) => {
              let like = this.$mediaWrapper.querySelector(`[data-id="${id}"]`);

              like.querySelector(".container-like i").classList.add("liked");
            });
            // let like = this.$mediaWrapper.querySelector(
            //   `[data-id="${lastLiked.getAttribute("data-id")}"]`
            // );
            // console.log("Nouvel article après reorganisation")
            // console.log(like)
            // like.querySelector(".container-like i").classList.add("liked");
          }
        } else if (
          lastLike
            .querySelector(".container-like i")
            .classList.contains("liked")
        ) {
          lastsLikedTab.push(lastLike.getAttribute("data-id"));

          // lastLiked = lastLike
          // console.log("Le dernier article que j'ai liké")
          // console.log(lastLike)

          if (
            this._value == "Popularité" &&
            JSON.stringify(this._mediaList) !==
              JSON.stringify(
                this._mediaList.sort((a, b) => b._likes - a._likes)
              )
          ) {
            this._mediaList = this._mediaList.sort(
              (a, b) => b._likes - a._likes
            );
            this.displayMediaCard();

            let card = btn.parentNode.parentNode.parentNode;
            let like = this.$mediaWrapper.querySelector(
              `[data-id="${card.getAttribute("data-id")}"]`
            );
            // console.log("Nouvel article après reorganisation")
            // console.log(like)
            like.querySelector(".container-like i").classList.add("liked");
          }
        }
      });
    });
  }
}
