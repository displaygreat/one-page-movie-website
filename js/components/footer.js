import { getElement } from "../element.js";

export const createFooter = ({ footer: { copyright, menu, fontColor } }) => {
  const footer = getElement("footer", ["footer"]);
  const container = getElement("div", ["container"]);
  footer.append(container);
  const content = getElement("div", ["footer-content"]);
  container.append(content);
  const left = getElement("div", ["left"]);
  const right = getElement("div", ["right"]);
  content.append(left, right);

  footer.style.color = fontColor;

  if (copyright) {
    const copyrightSpan = getElement("span", ["copyright"], {
      textContent: copyright,
    });
    left.append(copyrightSpan);
  }

  if (menu) {
    const nav = getElement("nav", ["footer-menu"]);
    const allMenuLinks = menu.map((item) => {
      const menuLink = getElement("a", ["footer-link"], {
        href: item.href,
        textContent: item.title,
      });

      return menuLink;
    });
    nav.append(...allMenuLinks);
    right.append(nav);
  }

  return footer;
};
