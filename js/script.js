const getElement = (tagName, classNames, attributes) => {
  const element = document.createElement(tagName);
  if (classNames) {
    element.classList.add(...classNames);
  }

  if (attributes) {
    for (const attribute in attributes) {
      element[attribute] = attributes[attribute];
    }
  }
  return element;
};

const createHeader = ({ title, header: { logo, menu, social } }) => {
  const header = getElement("header");
  const container = getElement("div", ["container"]);
  const wrapper = getElement("div", ["header"]);

  if (logo) {
    const logoElem = getElement("img", ["logo"], {
      src: logo,
      alt: "Logo: " + title,
    });
    logo.src = logo;
    logo.alt = "Logo: " + title;
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
      menuBtn.classList.toggle("menu-button-active");
      wrapper.classList.toggle("header-active");
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

const createMain = ({
  title,
  main: { genre, rating, description, trailer, slider },
}) => {
  const main = getElement("main");
  const container = getElement("div", ["container"]);
  main.append(container);
  const wrapper = getElement("div", ["main-content"]);
  container.append(wrapper);
  const content = getElement("div", ["content"]);
  wrapper.append(content);

  if (genre) {
    const genreSpan = getElement("span", ["genre", "animated", "fadeInRight"], {
      textContent: genre,
    });
    content.append(genreSpan);
  }

  if (rating) {
    const ratingBlock = getElement("div", [
      "rating",
      "animated",
      "fadeInRight",
    ]);
    const ratingStars = getElement("div", ["rating-stars"]);
    const ratingNumber = getElement("div", ["rating-number"], {
      textContent: `${rating}/10`,
    });

    for (let i = 0; i < 10; i++) {
      const star = getElement("img", ["star"], {
        alt: i ? "" : `Rating ${rating} from 10`,
        src: i < rating ? "img/star.svg" : "img/star-o.svg",
      });
      ratingStars.append(star);
    }

    ratingBlock.append(ratingStars, ratingNumber);
    content.append(ratingBlock);
  }

  content.append(
    getElement("h1", ["main-title", "animated", "fadeInRight"], {
      textContent: title,
    })
  );

  if (description) {
    const descriptionElem = getElement(
      "p",
      ["main-description", "animated", "fadeInRight"],
      {
        textContent: description,
      }
    );
    content.append(descriptionElem);
  }

  if (trailer) {
    const youtubeLink = getElement(
      "a",
      ["button", "animated", "fadeInRight", "youtube-modal"],
      {
        href: trailer,
        textContent: "Watch trailer",
      }
    );

    const youtubeImgLink = getElement("a", ["play", "youtube-modal"], {
      href: trailer,
      ariaLabel: "Watch trailer",
    });

    const iconPlay = getElement("img", ["play-img"], {
      src: "img/play.svg",
      alt: "",
      ariaHidden: true,
    });

    content.append(youtubeLink);
    youtubeImgLink.append(iconPlay);
    wrapper.append(youtubeImgLink);
  }

  if (slider) {
    const sliderBlock = getElement("div", ["series"]);
    const swiperBlock = getElement("div", ["swiper-container"]);
    const swiperWrapper = getElement("div", ["swiper-wrapper"]);
    const arrow = getElement("button", ["arrow"]);

    const slides = slider.map((item) => {
      const swiperSlide = getElement("div", ["swiper-slide"]);
      const card = getElement("figure", ["card"]);
      const cardImage = getElement("img", ["card-img"], {
        src: item.img,
        alt: ((item.title || "") + " " + (item.subtitle || "")).trim(),
      });

      if (item.title || item.subtitle) {
        const cardDescription = getElement("figcaption", ['card-description']);
        cardDescription.innerHTML = `
  				${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ""}
  				${item.title ? `<p class="card-title">${item.title}</p>` : ""}
  			`;
        card.append(cardDescription);
      }
      card.append(cardImage);
      swiperSlide.append(card);
      return swiperSlide;
    });

    swiperWrapper.append(...slides);
    swiperBlock.append(swiperWrapper);
    sliderBlock.append(swiperBlock, arrow);

    container.append(sliderBlock);

    new Swiper(swiperBlock, {
      loop: true,
      navigation: {
        nextEl: arrow,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        541: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
      },
    });
  }

  return main;
};

const createFooter = ({ footer: { copyright, menu, fontColor } }) => {
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

const movieConstructor = (selector, options) => {
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

  document.title = options.title;

  app.style.color = options.fontColor || "";
  app.style.backgroundColor = options.backgroundColor || "";

  document.documentElement.style.setProperty("--sub-color", options.subColor);

  if (options.header) {
    app.append(createHeader(options));
  }

  if (options.main) {
    app.append(createMain(options));
  }

  if (options.footer) {
    app.append(createFooter(options));
  }
};

movieConstructor(".app", {
  title: "The Queen's Gambit",
  background:
    "linear-gradient(40deg, rgba(20, 18, 24, 1) 0%, rgba(20, 18, 24, 0.9) 50%, rgba(255,255,255,0) 100%), url('gambit/background.jpg') top right 20% no-repeat",
  favicon: "gambit/logo.png",
  fontColor: "#fff",
  backgroundColor: "#141218",
  subColor: "#9D2929",
  header: {
    logo: "gambit/logo.png",
    social: [
      {
        title: "Twitter",
        link: "https://twitter.com/NetflixTheQG",
        image: "gambit/social/twitter.svg",
      },
      {
        title: "Instagram",
        link: "https://www.instagram.com/the.queensgambitnetflix",
        image: "gambit/social/instagram.svg",
      },
      {
        title: "facebook",
        link: "https://www.facebook.com/TheQueensGambitTVSeries",
        image: "gambit/social/facebook.svg",
      },
    ],
    menu: [
      {
        title: "Description",
        link: "#",
      },
      {
        title: "Trailer",
        link: "#",
      },
      {
        title: "Testimonials",
        link: "#",
      },
    ],
  },
  main: {
    genre: "2020, drama",
    rating: "8",
    description:
      "In a 1950s orphanage, a young girl reveals an astonishing talent for chess and begins an unlikely journey to stardom while grappling with addiction.",
    trailer: "https://www.youtube.com/watch?v=CDrieqwSdgI",
    slider: [
      {
        img: "gambit/episodes/episode-1.jpg",
        title: "Openings",
        subtitle: "Episode №1",
      },
      {
        img: "gambit/episodes/episode-2.jpg",
        title: "Exchanges",
        subtitle: "Episode №2",
      },
      {
        img: "gambit/episodes/episode-3.jpg",
        title: "Doubled Pawns",
        subtitle: "Episode №3",
      },
      {
        img: "gambit/episodes/episode-4.jpg",
        title: "Middle Game",
        subtitle: "Episode №4",
      },
      {
        img: "gambit/episodes/episode-5.jpg",
        title: "Fork",
        subtitle: "Episode №5",
      },
      {
        img: "gambit/episodes/episode-6.jpg",
        title: "Adjournment",
        subtitle: "Episode №6",
      },
      {
        img: "gambit/episodes/episode-7.jpg",
        title: "End Game",
        subtitle: "Episode №7",
      },
    ],
  },
  footer: {
    copyright: "© 2020 The Queen's Gambit. All right reserved.",
    menu: [
      {
        title: "Privacy Policy",
        link: "#",
      },
      {
        title: "Terms of Service",
        link: "#",
      },
      {
        title: "Legal",
        link: "#",
      },
    ],
    fontColor: "#3a383d",
  },
});
