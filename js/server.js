import { config } from "./config.js";

const key = config.API_KEY;

// Uncomment one of the lines(7-11) below to build page for different movie

const movieId = "87739"; //The Queen's Gambit
// const movieId = "91239"; //Bridgerton
// const movieId = "82596"; //Emily in Paris
// const movieId = "70785"; //Anne with an E
// const movieId = "77169"; //Cobra Kai
// const movieId = "<your-favourite-movie-id>";

export const getData = async () => {
  const urlInfo = `https://api.themoviedb.org/3/tv/${movieId}?api_key=${key}`;
  const urlImages = `https://api.themoviedb.org/3/tv/${movieId}/images?api_key=${key}`;
  const urlVideo = `https://api.themoviedb.org/3/tv/${movieId}/videos?api_key=${key}`;
  const urlEpisodes = `https://api.themoviedb.org/3/tv/${movieId}/season/1?api_key=${key}`;
  const urlCast = `https://api.themoviedb.org/3/tv/${movieId}/aggregate_credits?api_key=${key}`;

  const [
    infoResponse,
    imagesResponse,
    videoResponse,
    episodesResponse,
    castResponse,
  ] = await Promise.all([
    fetch(urlInfo),
    fetch(urlImages),
    fetch(urlVideo),
    fetch(urlEpisodes),
    fetch(urlCast),
  ]);

  if (
    !infoResponse.ok ||
    !imagesResponse.ok ||
    !videoResponse.ok ||
    !episodesResponse.ok ||
    !castResponse
  ) {
    const message = `An error has occured!
    info: status ${infoResponse.status}, ${infoResponse.statusText}
    images: status ${imagesResponse.status}, ${imagesResponse.statusText}
    video: status ${videoResponse.status}, ${videoResponse.statusText}
    episodes: status ${episodesResponse.status} ${episodesResponse.statusText}
    cast: status ${castResponse.status} ${castResponse.statusText}
    `;
    throw new Error(message);
  }

  const info = await infoResponse.json();
  const images = await imagesResponse.json();
  const video = await videoResponse.json();
  const episodes = await episodesResponse.json();
  const cast = await castResponse.json();

  return [info, images, video, episodes, cast];
};
