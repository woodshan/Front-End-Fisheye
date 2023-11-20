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
    this.$datas = [];

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
      } else {
        checkForm = true;
        this.$datas.push(input.value);
      }
    });

    if (checkForm) {
      console.log(`
                Prénom : ${this.$datas[0]},
                Nom: ${this.$datas[1]},
                Email: ${this.$datas[2]},
                Message: ${this.$datas[3]}
            `);

      this.closeModal(this.$modal);

      this.$inputs.forEach((input) => (input.value = ""));
    } else {
      console.log("Veuillez remplir tous les champs.");
    }

    this.$datas = [];
  }
}
