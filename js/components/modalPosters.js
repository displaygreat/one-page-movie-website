import { getElement } from "../element.js";

export const createModalPosters = ({
  modalPosters: { closeSymbol, postersList, postersTitle, modalId },
}) => {
  const modal = getElement("div", ["modal", "modal-posters"]);
  modal.setAttribute("id", modalId);
  const modalDialog = getElement("div", ["modal-dialog"]);
  modal.append(modalDialog);
  const closeBtn = getElement("button", ["close-btn"], {
    textContent: closeSymbol,
  });
  const modalTitle = getElement("h2", ["posters-title"], {
    textContent: postersTitle,
  });
  const postersGallery = getElement("div", ["posters-gallery"]);
  const posters = postersList.map((poster) => {
    if (poster.path) {
      const posterWrapper = getElement("div", ["poster-wrapper"]);
      posterWrapper.innerHTML = `
  				${
            poster.path
              ? `<img class="poster-image" src="${poster.path}" alt="poster"/>`
              : ""
          }
  			`;
      return posterWrapper;
    }
  });
  modalDialog.append(closeBtn);
  modalDialog.append(modalTitle);
  modalDialog.append(postersGallery);
  postersGallery.append(...posters);

  return modal;
};
