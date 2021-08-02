import { disableScroll, enableScroll } from "../blockScroll.js";
import { getElement } from "../element.js";

export const createHeader = ({
  title,
  header: { logo, menu, social, background },
}) => {
  const header = getElement("header");
  header.classList.add("lock-padding");
  header.style.backgroundColor = background;
  const container = getElement("div", ["container"]);
  const wrapper = getElement("div", ["header"]);

  if (logo) {
    const logoElem = getElement("img", ["logo"], {
      src: logo,
      alt: "Logo: " + title,
    });
    wrapper.append(logoElem);
  }

  if (menu) {
    const nav = getElement("nav", ["menu-list"]);
    const allMenuLinks = menu.map((item) => {
      const menuLink = getElement("a", ["menu-link"], {
        href: item.link,
        textContent: item.title,
      });

      return menuLink;
    });
    nav.append(...allMenuLinks);
    wrapper.append(nav);

    const menuBtn = getElement("button", ["menu-button"]);
    menuBtn.addEventListener("click", () => {
      let isActive;
      menuBtn.classList.toggle("menu-button-active");
      wrapper.classList.toggle("header-active");
      if (wrapper.classList.contains("header-active")) {
        isActive = true;
        disableScroll(document.body, isActive);
      } else {
        isActive = false;
        enableScroll(document.body);
      }
    });
    container.append(menuBtn);
  }

  if (social) {
    const socialWrapper = getElement("div", ["social"]);
    const allSocial = social.map((item) => {
      const socialLink = getElement("a", ["social-link"]);
      socialLink.append(
        getElement("img", [], {
          src: item.image,
          alt: item.title,
        })
      );
      socialLink.href = item.link;
      socialLink.target = "_blank";

      return socialLink;
    });
    socialWrapper.append(...allSocial);
    wrapper.append(socialWrapper);
  }

  header.append(container);
  container.append(wrapper);

  return header;
};
