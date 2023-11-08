export class ContactForm {
  constructor(name) {
    this._name = name;

    this.$container = document.querySelector(".container");
    this.$modal = document.querySelector(".modal");
    this.$modalSection = document.getElementById("contact_modal");
    this.$modalTitle = document.querySelector(".modal h1");
    this.$modalOpen = document.querySelector(".contact_button");
    this.$modalClose = document.getElementById("close_button");
    this.$modalSubmit = document.querySelector(".modal .contact_button");

    this.$modalTitle.innerHTML = `${this.$modalTitle.innerText} <br/> ${this._name}`;

    this.$modalOpen.addEventListener("click", (e) => {
      this.displayModal(e);
    });

    this.$modalClose.addEventListener("click", () => {
      this.closeModal();
    });

    this.$modalClose.addEventListener("keydown", (e) => {
      if (e.keyCode == 13) {
        this.closeModal();
      }
    });

    this.$modalSubmit.addEventListener("click", (e) => {
      this.sendDatas(e);
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
    this.$modalClose.focus();
  }

  closeModal() {
    this.$modalSection.classList.add("hidden-modal");
    document.querySelector("body").style.overflowY = "auto";
    this.$container.setAttribute("aria-hidden", "false");
    this.$modal.setAttribute("aria-hidden", "true");
  }

  sendDatas(event) {
    event.preventDefault();

    const inputs = this.$modal.querySelectorAll("input");
    const msg = this.$modal.querySelector("textarea").value;
    let datas = [];
    let checkForm;

    inputs.forEach((input) => {
      if (input.value == "" || msg == "") {
        checkForm = false;
      } else {
        checkForm = true;
        datas.push(input.value);
      }
    });

    if (checkForm) {
      datas.push(msg);
      console.log(`
                Prénom : ${datas[0]},
                Nom: ${datas[1]},
                Email: ${datas[2]},
                Message: ${datas[3]}
            `);

      this.closeModal();
    } else {
      console.log("Veuillez remplir tous les champs.");
    }
  }
}
