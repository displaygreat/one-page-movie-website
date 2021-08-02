import { getElement } from "../element.js";

export const createModalSeriesCast = ({
  modalCast: { closeSymbol, seriesCast, castTitle, modalId },
}) => {
  const modal = getElement("div", ["modal", "modal-cast"]);
  modal.setAttribute("id", modalId);
  const modalDialog = getElement("div", ["modal-dialog"]);
  modal.append(modalDialog);
  const closeBtn = getElement("button", ["close-btn"], {
    textContent: closeSymbol,
  });
  const modalTitle = getElement("h2", ["cast-title"], {
    textContent: castTitle,
  });
  const cast = seriesCast.map((actor) => {
    if (actor.name || actor.character) {
      const actorInfo = getElement("p", ["actor-info"]);
      actorInfo.innerHTML = `
  				${actor.name ? `<span class="actor-name">${actor.name}</span>` : ""}
  				${
            actor.character
              ? `<span class="actor-character">"${actor.character}"</span>`
              : ""
          }
  			`;
      return actorInfo;
    }
  });
  modalDialog.append(closeBtn);
  modalDialog.append(modalTitle);
  modalDialog.append(...cast);

  return modal;
};
