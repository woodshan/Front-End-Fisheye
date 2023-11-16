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

    this._likeSubject = new Subject();
    this._likeCounter = new Counter();

    this._likeSubject.subscribe(this._likeCounter);

    this.handleSort();

    this.$select.addEventListener("click", (e) => {
      if (this._isVisible) {
        this._value = e.target.value;
        this.handleSort();
        this.showFilter(e);
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
        this.$mediaWrapper
          .querySelectorAll(".container-like i")
          .forEach((btn) => {
            btn.addEventListener("click", () => {
                console.log(
                  Number(btn.parentElement.querySelector("p").innerText)
                );
                this._mediaList = this._mediaList.sort(
                  (a, b) => b._likes - a._likes
                );
                this.displayMediaCard();
            });
          });
        console.log("Trié par Popularité");
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
        console.log("Trié par Date");
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
        console.log("Trié par Titre");
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
  }
}
