import { Modal } from "../templates/modal.js";

// export class ContactForm {
  // constructor(photographerName) {
  //   // this._photographerName = photographerName;

  //   this.$container = document.querySelector(".container");
  //   this.$modal = document.querySelector(".modal");
  //   this.$modalSection = document.getElementById("contact_modal");
  //   this.$btnOpen = document.querySelector(".contact_button");
  //   this.$btnClose = document.getElementById("close_button");

  //   this.$modal.querySelector("h1").innerHTML = `${this.$modal.querySelector("h1").innerText} <br/> ${this._photographerName}`;

  //   this.$btnOpen.addEventListener("click", (e) => {
  //     this.displayModal(e);
  //   });

  //   this.$btnClose.addEventListener("click", () => {
  //     this.closeModal();
  //   });

  //   this.$btnClose.addEventListener("keydown", (e) => {
  //     if (e.keyCode == 13) {
  //       this.closeModal();
  //     }
  //   });

  //   this.$modal.querySelector(".contact_button").addEventListener("click", (e) => {
  //     this.sendDatas(e);
  //   });

  //   document.addEventListener("keydown", (e) => {
  //     if (this.$modal.getAttribute("aria-hidden") == "false") {
  //       if (e.keyCode == 9) {
  //         const modalElements = this.$modal.querySelectorAll(
  //           "img, input, textarea, button"
  //         );

  //         if (e.target === modalElements[modalElements.length - 1]) {
  //           e.preventDefault();
  //           modalElements[0].focus();
  //         }
  //         if (e.target === modalElements[0]) {
  //           e.preventDefault();
  //           modalElements[1].focus();
  //         }
  //       }

  //       if (e.keyCode == 27) {
  //         this.closeModal();
  //       }
  //     }
  //   });
  // }

  // displayModal() {
  //   this.$modalSection.classList.remove("hidden-modal");
  //   document.querySelector("body").style.overflowY = "hidden";
  //   this.$container.setAttribute("aria-hidden", "true");
  //   this.$modal.setAttribute("aria-hidden", "false");
  //   this.$btnClose.focus();
  // }

  // closeModal() {
  //   this.$modalSection.classList.add("hidden-modal");
  //   document.querySelector("body").style.overflowY = "auto";
  //   this.$container.setAttribute("aria-hidden", "false");
  //   this.$modal.setAttribute("aria-hidden", "true");
  // }

  // sendDatas(event) {
  //   event.preventDefault();

  //   const inputs = this.$modal.querySelectorAll("input, textarea");

  //   let datas = [];
  //   let checkForm;

  //   inputs.forEach((input) => {
  //     if (input.value == "") {
  //       checkForm = false;
  //     } else {
  //       checkForm = true;
  //       datas.push(input.value);
  //     }
  //   });

  //   if (checkForm) {
  //     console.log(`
  //               Prénom : ${datas[0]},
  //               Nom: ${datas[1]},
  //               Email: ${datas[2]},
  //               Message: ${datas[3]}
  //           `);

  //     this.closeModal();
  //   } else {
  //     console.log("Veuillez remplir tous les champs.");
  //   }
  // }
// }

export class ContactForm extends Modal {
  constructor(datas) {
    super(datas)
    this.$inputs = this.$modal.querySelectorAll("input, textarea");
    this.$datas = []

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

      this.closeModal();

      this.$inputs.forEach(input => input.value = "");
    } else {
      console.log("Veuillez remplir tous les champs.");
    }

    this.$datas = [];
  }
}
