import { Modal } from "./modal.js";

export class ContactForm extends Modal {
  constructor(photographerName) {
    super();
    this._photographerName = photographerName;
    this.$modal = document.querySelector(".modal");
    this.$btnOpen = document.querySelector(".contact_button");

    this.$inputs = this.$modal.querySelectorAll("input, textarea");
    this.$modalElements = this.$modal.querySelectorAll(
      "img, input, textarea, button"
    );
    this.$errorMsg = this.$modal.querySelector(".error-msg");

    this._datas = [];

    this.displayTitle(this.$modal, this._photographerName);

    this.$btnOpen.addEventListener("click", () => {
      this.displayModal(this.$modal, this._photographerName);
    });

    document.addEventListener("keydown", (e) => {
      this.accessibility(this.$modal, e, this.$modalElements);
    });

    this.$modal
      .querySelector(".contact_button")
      .addEventListener("click", (e) => {
        this.sendDatas(e);
      });
  }

  sendDatas(event) {
    event.preventDefault();

    let checkForm;

    this.$inputs.forEach((input) => {
      if (input.value == "") {
        checkForm = false;

        input.classList.add("wrong");
        input.setAttribute("aria-invalid", "true");
      } else {
        checkForm = true;

        input.classList.remove("wrong");
        input.setAttribute("aria-invalid", "false");

        this._datas.push(input.value);
      }
    });

    if (checkForm) {
      console.log(`
                Prénom : ${this._datas[0]},
                Nom: ${this._datas[1]},
                Email: ${this._datas[2]},
                Message: ${this._datas[3]}
            `);
      
      this.$errorMsg.classList.add("hidden");

      this.closeModal(this.$modal);

      this.$inputs.forEach((input) => (input.value = ""));
    } else {
      this.$errorMsg.classList.remove("hidden");
      console.log("Veuillez remplir tous les champs.");
    }

    this._datas = [];
  }
}
