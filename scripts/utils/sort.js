export class Sort {
  constructor() {
    this.$select = document.querySelector(".select");
    this.$btn = this.$select.querySelectorAll("button");
    this.$icon = this.$select.querySelector("i");
    this._isVisible = false;

    this.$select.addEventListener("click", (e) => {

        console.log(this.$select.querySelector("button"))

      if (this._isVisible) {
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
}
