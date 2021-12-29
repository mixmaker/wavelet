// const baseURL = "www.jiosaavn.com";
const URLstr = "/api.php?_format=json&_marker=0&api_version=4&ctx=web6dot0";
const endpoints = {
  getResults: "__call=search.getResults",
  songDetails: "__call=song.getDetails",
  homeData: "__call=webapi.getLaunchData",
};

const getURL = (params) => {
  return `${URLstr}&${params}`;
};


export const searchResultsURL = (query) => {
  return getURL(`p=1&q=${query}&n=20&${endpoints.getResults}`);
};

export const detailsfromIdURL = (id) => {
  return `api.php?${endpoints.songDetails}&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=${id}`
 // return getURL(`pids=${id}&${endpoints.songDetails}`); //need to decrypt media url
};

export const homeDataURL = () => {
  return getURL(`${endpoints.homeData}`);
};
// url: https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=UjzojZVd
