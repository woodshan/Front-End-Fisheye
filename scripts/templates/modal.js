export default class Modal {
  constructor() {
    this.$container = document.querySelector(".container");
    this.$btnClose = document.querySelectorAll(".close_button");

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
  }

  /**
   * Show modal
   * @param {HTMLElement} modal
   */
  displayModal(modal) {
    modal.parentElement.classList.remove("hidden");
    document.querySelector("body").style.overflowY = "hidden";

    // Set accesibility
    this.$container.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-hidden", "false");

    // Put focus on close btn
    this.$btnClose.forEach((btn) => btn.focus());
  }

  /**
   * Display modal title
   * @param {HTMLElement} modal
   * @param {string} data
   */
  displayTitle(modal, data) {
    modal.querySelector("h1").innerHTML = `${
      modal.querySelector("h1").innerHTML
    }${data}`;
  }

  /**
   * Hide modal
   * @param {HTMLElement} modal
   */
  closeModal(modal) {
    modal.parentElement.classList.add("hidden");
    document.querySelector("body").style.overflowY = "auto";

    // Set accesibility
    this.$container.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-hidden", "true");
  }

  /**
   * Handle focus & accessibility
   * @param {HTMLElement} modal
   * @param {Object} e
   * @param {Object} modalElements
   */
  accessibility(modal, e, modalElements) {
    // Focus loop
    if (modal.getAttribute("aria-hidden") == "false") {
      if (e.keyCode == 9) {
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
        this.closeModal(modal);
      }
    }
  }
}
