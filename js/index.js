import { createApp } from "./app.js";
import { getData } from "./server.js";
import { openModal, closeModal } from "./modal.js";

getData()
  .then(([info, images, video, episodes, cast]) => {
    const movie = {
      title: info.name || "Movie Title",
      background: images.backdrops[3]
        ? window.matchMedia("(max-width: 768px)").matches
          ? `linear-gradient(40deg, rgba(20, 18, 24, 1) 0%, rgba(20, 18, 24, 0.9) 50%, rgba(255,255,255,0) 100%), url('https://image.tmdb.org/t/p/original/${images.backdrops[3].file_path}') top right 20% no-repeat`
          : `linear-gradient(40deg, rgba(20, 18, 24, 1) 0%, rgba(20, 18, 24, 0.9) 50%, rgba(255,255,255,0) 100%), url('https://image.tmdb.org/t/p/original/${images.backdrops[3].file_path}') top right no-repeat`
        : "",
      backgroundSize: "cover",
      favicon: "img/logo.png",
      fontColor: "#fff",
      backgroundColor: "#141218",
      subColor: "#9D2929",
      header: {
        background: "#141218",
        logo: images.logos[2]
          ? `https://image.tmdb.org/t/p/original/${images.logos[2].file_path}`
          : "",
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
            title: "Posters",
            link: "#posters",
          },
        ],
      },
      main: {
        genre:
          info.first_air_date && info.genres[0]
            ? `${info.first_air_date.substr(0, 4)}, ${info.genres[0].name}`
            : "",
        rating: info.vote_average ? Math.floor(info.vote_average) : "",
        description: info.overview || "",
        trailer: video.results[1]
          ? `https://www.youtube.com/watch?v=${video.results[1].key}`
          : "",
        slider: episodes.episodes
          ? episodes.episodes.map((episode) => {
              return {
                img: `https://image.tmdb.org/t/p/original/${episode.still_path}`,
                title: episode.name,
                subtitle: `Episode ???${episode.episode_number}`,
              };
            })
          : "",
      },
      footer: {
        copyright: info.name
          ? `?? ${new Date().getFullYear()} ${info.name}. All right reserved.`
          : "",
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
          ? cast.cast
              .map((actor) => {
                return {
                  name: actor.name || "",
                  character: actor.roles[0].character || "",
                };
              })
              .slice(0, 10)
          : "",
      },
      modalSeasons: {
        modalId: "seasons",
        closeSymbol: "\u2715",
        seasonsTitle: "Seasons",
        seasonsList: info.seasons
          ? info.seasons.map((season) => {
              return {
                name: season.name || "",
                seasonsNumber: info.seasons.length,
                episodeCount: season.episode_count || "",
                airDate: season.air_date || "",
              };
            })
          : "",
      },
      modalPosters: {
        modalId: "posters",
        closeSymbol: "\u2715",
        postersTitle: "Posters",
        postersList: images.posters
          ? images.posters
              .filter((item) => item.iso_639_1 === "en")
              .map((poster) => {
                return {
                  path: `https://image.tmdb.org/t/p/original/${poster.file_path}`,
                };
              })
              .slice(0, 3)
          : "",
      },
    };
    createApp(".app", movie);
  })
  .catch((error) => console.log(error.message));

document.addEventListener("click", openModal);
document.addEventListener("click", closeModal);
