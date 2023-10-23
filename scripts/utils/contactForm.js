export class ContactForm {
    constructor(name) {
        this._name = name

        this.$modalSection = document.getElementById("contact_modal");
        this.$modalTitle = document.querySelector(".modal h2");
        this.$modalOpen = document.querySelector(".contact_button");
        this.$modalClose = document.getElementById("close_button");
        this.$modalSubmit = document.querySelector(".modal .contact_button");

        this.$modalTitle.innerHTML = `${this.$modalTitle.innerText} <br/> ${this._name}`

        this.$modalOpen.addEventListener("click", (e) => {
            this.displayModal(e)
        })

        this.$modalClose.addEventListener("click", () => {
            this.closeModal()
        })

        this.$modalSubmit.addEventListener("click", (e) => {
            this.sendDatas(e)
        })
    }

    displayModal() {
        this.$modalSection.classList.remove("hidden-modal");
        document.querySelector("body").style.overflowY = "hidden";
    }
    
    closeModal() {
        this.$modalSection.classList.add("hidden-modal");
        document.querySelector("body").style.overflowY = "auto";
    }

    sendDatas(event) {
        event.preventDefault();
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        console.log(`
        Prénom : ${firstName},
        Nom: ${lastName},
        Email: ${email},
        Message: ${message}
        `)
    }
}
