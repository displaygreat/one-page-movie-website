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
        const cardDescription = getElement("figcaption", ["card-description"]);
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

const createModalSeriesCast = ({
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

const createModalSeasons = ({
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
  console.log(seasonsList);
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
  if (options.modalCast) {
    app.append(createModalSeriesCast(options));
  }
  if (options.modalSeasons) {
    app.append(createModalSeasons(options));
  }
};

getData()
  .then(([info, images, video, episodes, cast]) => {
    const movie = {
      title: info.name,
      background: `linear-gradient(40deg, rgba(20, 18, 24, 1) 0%, rgba(20, 18, 24, 0.9) 50%, rgba(255,255,255,0) 100%), url('https://image.tmdb.org/t/p/original/${images.backdrops[5].file_path}') top right 20% no-repeat`,
      favicon: "img/logo.png",
      fontColor: "#fff",
      backgroundColor: "#141218",
      subColor: "#9D2929",
      header: {
        logo: `https://image.tmdb.org/t/p/original/${images.logos[2].file_path}`,
        social: [
          {
            title: "Twitter",
            link: "https://twitter.com",
            image: "img/social/twitter.svg",
          },
          {
            title: "Instagram",
            link: "https://www.instagram.com",
            image: "img/social/instagram.svg",
          },
          {
            title: "facebook",
            link: "https://www.facebook.com",
            image: "img/social/facebook.svg",
          },
        ],
        menu: [
          {
            title: "Series Cast",
            link: "#cast",
          },
          {
            title: "Seasons",
            link: "#seasons",
          },
          {
            title: "Reviews",
            link: "#",
          },
        ],
      },
      main: {
        genre: `${info.first_air_date.substr(0, 4)}, ${info.genres[0].name}`,
        rating: Math.floor(info.vote_average),
        description: info.overview,
        trailer: `https://www.youtube.com/watch?v=${video.results[1].key}`,
        slider: episodes.episodes.map((episode) => {
          return {
            img: `https://image.tmdb.org/t/p/original/${episode.still_path}`,
            title: episode.name,
            subtitle: `Episode №${episode.episode_number}`,
          };
        }),
      },
      footer: {
        copyright: `© ${new Date().getFullYear()} ${
          info.name
        }. All right reserved.`,
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
      modalCast: {
        modalId: "cast",
        closeSymbol: "\u2715",
        castTitle: "Series Cast",
        seriesCast: cast.cast
          .map((actor) => {
            return {
              name: actor.name,
              character: actor.roles[0].character,
            };
          })
          .slice(0, 10),
      },
      modalSeasons: {
        modalId: "seasons",
        closeSymbol: "\u2715",
        seasonsTitle: "Seasons",
        seasonsList: info.seasons.map((season) => {
          return {
            name: season.name,
            seasonsNumber: info.seasons.length,
            episodeCount: season.episode_count,
            airDate: season.air_date,
          };
        }),
      },
    };
    movieConstructor(".app", movie);
  })
  .catch((error) => console.log(error.message));
