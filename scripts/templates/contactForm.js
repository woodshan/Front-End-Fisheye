import Modal from "./modal.js";

/**
 * Modal contact form
 */
export default class ContactForm extends Modal {
  constructor(photographerName) {
    super();

    // Select dom elements
    this.$modal = document.querySelector(".modal");
    this.$btnOpen = document.querySelector(".contact_button");
    this.$inputs = this.$modal.querySelectorAll("input, textarea");
    this.$modalElements = this.$modal.querySelectorAll(
      "img, input, textarea, button"
    );
    this.$errorMsg = this.$modal.querySelector(".error-msg");

    this._photographerName = photographerName;
    // Empty form data array
    this._datas = [];

    this.displayTitle(this.$modal, this._photographerName);

    this.$btnOpen.addEventListener("click", () => {
      this.displayModal(this.$modal, this._photographerName);
    });

    document.addEventListener("keydown", (e) => {
      this.accessibility(this.$modal, e, this.$modalElements);
    });

    // Handle data on submit
    this.$modal
      .querySelector(".contact_button")
      .addEventListener("click", (e) => {
        this.sendDatas(e);
      });
  }

  /**
   * Handle data
   * @param {Object} event
   */
  sendDatas(event) {
    event.preventDefault();

    let checkForm;

    this.$inputs.forEach((input) => {
      if (input.value == "") {
        // Set form invalidity
        checkForm = false;

        // Handle accessibility
        input.classList.add("wrong");
        input.setAttribute("aria-invalid", "true");
      } else {
        // Set form validity
        checkForm = true;

        // Handle accessibility
        input.classList.remove("wrong");
        input.setAttribute("aria-invalid", "false");

        // Add inputs values in array
        this._datas.push(input.value);
      }
    });

    // All form is valid
    if (checkForm) {
      // Return inputs values
      console.log(`
                Prénom : ${this._datas[0]},
                Nom: ${this._datas[1]},
                Email: ${this._datas[2]},
                Message: ${this._datas[3]}
            `);

      // Hide error msg
      this.$errorMsg.classList.add("hidden");

      this.closeModal(this.$modal);

      // Empty the inputs
      this.$inputs.forEach((input) => (input.value = ""));

      // If form is invalid
    } else {
      // Display error msg
      this.$errorMsg.classList.remove("hidden");

      console.log("Veuillez remplir tous les champs.");
    }

    this._datas = [];
  }
}
