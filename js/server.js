const key = config.API_KEY;

const getData = async () => {
  const urlInfo = `https://api.themoviedb.org/3/tv/87739?api_key=${key}`;
  const urlImages = `https://api.themoviedb.org/3/tv/87739/images?api_key=${key}`;
  const urlVideo = `https://api.themoviedb.org/3/tv/87739/videos?api_key=${key}`;
  const urlEpisodes = `https://api.themoviedb.org/3/tv/87739/season/1?api_key=${key}`;

  const [infoResponse, imagesResponse, videoResponse, episodesResponse] =
    await Promise.all([
      fetch(urlInfo),
      fetch(urlImages),
      fetch(urlVideo),
      fetch(urlEpisodes),
    ]);

  if (
    !infoResponse.ok ||
    !imagesResponse.ok ||
    !videoResponse.ok ||
    !episodesResponse.ok
  ) {
    const message = `An error has occured!
    info: status ${infoResponse.status}, ${infoResponse.statusText}
    images: status ${imagesResponse.status}, ${imagesResponse.statusText}
    video: status ${videoResponse.status}, ${videoResponse.statusText}
    episodes: status ${episodesResponse.status} ${episodesResponse.statusText}
    `;
    throw new Error(message);
  }

  const info = await infoResponse.json();
  const images = await imagesResponse.json();
  const video = await videoResponse.json();
  const episodes = await episodesResponse.json();

  return [info, images, video, episodes];
};
