import { Modal } from "../templates/modal.js";

// export class ContactForm extends Modal {
//   constructor(datas) {
//     super(datas)
//     this.$inputs = this.$modal.querySelectorAll("input, textarea");
//     this.$datas = []

//     this.$modal
//       .querySelector(".contact_button")
//       .addEventListener("click", (e) => {
//         this.sendDatas(e);
//       });
//   }

//   sendDatas(event) {
//     event.preventDefault();

//     let checkForm;

//     this.$inputs.forEach((input) => {
//       if (input.value == "") {
//         checkForm = false;
//       } else {
//         checkForm = true;
//         this.$datas.push(input.value);
//       }
//     });

//     if (checkForm) {
//       console.log(`
//                 Prénom : ${this.$datas[0]},
//                 Nom: ${this.$datas[1]},
//                 Email: ${this.$datas[2]},
//                 Message: ${this.$datas[3]}
//             `);

//       this.closeModal();

//       this.$inputs.forEach(input => input.value = "");
//     } else {
//       console.log("Veuillez remplir tous les champs.");
//     }

//     this.$datas = [];
//   }
// }


export class ContactForm extends Modal {
  constructor(photographerName) {
    super();
    this._photographerName = photographerName;
    this.$modal = document.querySelector(".modal");
    this.$btnOpen = document.querySelector(".contact_button");

    this.$inputs = this.$modal.querySelectorAll("input, textarea");
    this.$modalElements = this.$modal.querySelectorAll("img, input, textarea, button");
    this.$datas = [];

    this.displayTitle(this.$modal, this._photographerName);

    this.$btnOpen.addEventListener("click", () => {
      this.displayModal(this.$modal, this._photographerName);
    });

    document.addEventListener("keydown", (e) => {
      this.acessibility(this.$modal, e, this.$modalElements)
    });

    this.$btnClose.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.closeModal(this.$modal);
      })

      btn.addEventListener("keydown", (e) => {
        if (e.keyCode == 13) {
          this.closeModal(this.$modal);
        }
      });
    })

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

      this.$inputs.forEach(input => input.value = "");
    } else {
      console.log("Veuillez remplir tous les champs.");
    }

    this.$datas = [];
  }
}
