import { getElement } from "./element.js";
import { createHeader } from "./components/header.js";
import { createMain } from "./components/main.js";
import { createFooter } from "./components/footer.js";
import { createModalSeriesCast } from "./components/modalSeriesCast.js";
import { createModalSeasons } from "./components/modalSeasons.js";
import { createModalPosters } from "./components/modalPosters.js";

export const createApp = (selector, options) => {
  const app = document.querySelector(selector);
  app.classList.add("body-app");

  if (options.favicon) {
    const index = options.favicon.lastIndexOf(".");
    const type = options.favicon.substring(index + 1);

    const favicon = getElement("link", null, {
      rel: "icon",
      href: options.favicon,
      type: "image/" + (type === "svg" ? "svg-xml" : type),
    });

    document.head.append(favicon);
  }

  app.style.background = options.background ? options.background : "";
  app.style.backgroundSize = options.backgroundSize
    ? options.backgroundSize
    : "";

  document.title = options.title;

  app.style.color = options.fontColor || "";

  document.documentElement.style.setProperty("--sub-color", options.subColor);
  document.documentElement.style.setProperty(
    "--background-color",
    options.backgroundColor
  );

  if (options.header) {
    app.append(createHeader(options));
  }

  if (options.main) {
    app.append(createMain(options));
  }

  if (options.footer) {
    app.append(createFooter(options));
  }
  if (options.modalCast) {
    app.append(createModalSeriesCast(options));
  }
  if (options.modalSeasons) {
    app.append(createModalSeasons(options));
  }
  if (options.modalPosters) {
    app.append(createModalPosters(options));
  }
};
