const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}


const modalLinks = document.querySelectorAll(".modal-link");

const membershipModals = document.querySelectorAll("dialog");

modalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const modalId = link.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);

        if (modal) {
            modal.showModal();
        }
    });
});



membershipModals.forEach((modal) => {
    const closeButton = modal.querySelector(".close-modal");

    if (closeButton) {
        closeButton.addEventListener("click", () => {
            modal.close();
        });
    }
});