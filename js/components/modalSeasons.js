import { getElement } from "../element.js";

export const createModalSeasons = ({
  modalSeasons: { closeSymbol, seasonsList, seasonsTitle, modalId },
}) => {
  const modal = getElement("div", ["modal", "modal-seasons"]);
  modal.setAttribute("id", modalId);
  const modalDialog = getElement("div", ["modal-dialog"]);
  modal.append(modalDialog);
  const closeBtn = getElement("button", ["close-btn"], {
    textContent: closeSymbol,
  });
  const modalTitle = getElement("h2", ["seasons-title"], {
    textContent: seasonsTitle,
  });
  const seasons = seasonsList.map((season) => {
    if (
      season.name ||
      season.seasonsNumber ||
      season.episodeCount ||
      season.airDate
    ) {
      const seasonInfo = getElement("p", ["season-info"]);
      seasonInfo.innerHTML = `
  				${
            season.seasonsNumber
              ? `<span class="season-number">Season ${season.seasonsNumber}</span>`
              : ""
          }
          ${
            season.name ? `<span class="season-name">${season.name}</span>` : ""
          }
          ${
            season.episodeCount
              ? `<span class="season-episodes">${season.episodeCount} episodes</span>`
              : ""
          }
          ${
            season.airDate
              ? `<span class="season-date">Season ${season.seasonsNumber} premiered on ${season.airDate}</span>`
              : ""
          }
  			`;
      return seasonInfo;
    }
  });
  modalDialog.append(closeBtn);
  modalDialog.append(modalTitle);
  modalDialog.append(...seasons);

  return modal;
};
