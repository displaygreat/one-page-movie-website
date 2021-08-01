const key = config.API_KEY;
const movieId = "87739";

const getData = async () => {
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
