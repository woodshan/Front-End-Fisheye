export class Modal {
  constructor(datas) {
    this._photographerName = datas.name;
    this.$container = document.querySelector(".container");
    this.$modal = document.querySelector(".modal");
    this.$modalSection = document.getElementById("contact_modal");
    this.$btnOpen = document.querySelector(".contact_button");
    this.$btnClose = document.getElementById("close_button");

    this.$modal.querySelector("h1").innerHTML = `${
      this.$modal.querySelector("h1").innerText
    } <br/> ${this._photographerName}`;

    this.$btnOpen.addEventListener("click", (e) => {
      this.displayModal(e);
    });

    this.$btnClose.addEventListener("click", () => {
      this.closeModal();
    });

    this.$btnClose.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        this.closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (this.$modal.getAttribute("aria-hidden") == "false") {
        if (e.keyCode == 9) {
          const modalElements = this.$modal.querySelectorAll(
            "img, input, textarea, button"
          );

          if (e.target === modalElements[modalElements.length - 1]) {
            e.preventDefault();
            modalElements[0].focus();
          }
          if (e.target === modalElements[0]) {
            e.preventDefault();
            modalElements[1].focus();
          }
        }

        if (e.keyCode == 27) {
          this.closeModal();
        }
      }
    });
  }

  displayModal() {
    this.$modalSection.classList.remove("hidden-modal");
    document.querySelector("body").style.overflowY = "hidden";
    this.$container.setAttribute("aria-hidden", "true");
    this.$modal.setAttribute("aria-hidden", "false");
    this.$btnClose.focus();
  }

  closeModal() {
    this.$modalSection.classList.add("hidden-modal");
    document.querySelector("body").style.overflowY = "auto";
    this.$container.setAttribute("aria-hidden", "false");
    this.$modal.setAttribute("aria-hidden", "true");
  }
}
