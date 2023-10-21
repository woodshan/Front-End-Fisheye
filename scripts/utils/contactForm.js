function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

class ContactForm {
    constructor() {
        this.$modalSection = document.getElementById("contact_modal");
        this.$modalBtn = document.querySelector(".contact_button")
    }

    displayModal() {
        this.$modalSection.style.display = "block";
    }
    
    closeModal() {
        this.$modalSection.style.display = "none";
    }
}
