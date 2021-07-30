const openModal = (e) => {
  if (e.target.classList.contains("menu-link")) {
    const target = e.target;
    const modalName = target.getAttribute("href").replace("#", "");
    const targetModal = document.querySelector(`#${modalName}`);
    targetModal.classList.add("is-open");
    e.preventDefault();
  }
};

const closeModal = (e) => {
  if (
    e.target.classList.contains("close-btn") ||
    (!e.target.closest(".modal-dialog") && e.target.closest(".modal"))
  ) {
    const target = e.target.closest(".modal");
    const modalName = target.getAttribute("id");
    const targetModal = document.querySelector(`#${modalName}`);
    targetModal.classList.remove("is-open");
    e.preventDefault();
  }
};

document.addEventListener("click", openModal);
document.addEventListener("click", closeModal);
