export const saveEpisode = episode => {
  const episodes = getEpisodes();
  episodes.push(episode);

  // TODO - sort by title, series, episode
  episodes.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0));

  localStorage.setItem('serials', JSON.stringify(episodes));
};

export const getEpisodes = () => {
  let episodes = [];

  if (localStorage.getItem('serials') !== null) {
    episodes = JSON.parse(localStorage.getItem('serials'));
  }

  return episodes;
};

export const removeEpisode = id => {
  const episodes = getEpisodes();

  episodes.forEach((serial, index) => {
    if (serial.id === id) {
      episodes.splice(index, 1);
    }
  });

  localStorage.setItem('serials', JSON.stringify(episodes));
};
