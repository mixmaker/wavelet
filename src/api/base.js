import CryptoJS from "crypto-js";
import { getResponse } from ".";

const baseURL = "https://www.jiosaavn.com";
const URLstr = "/api.php?_format=json&_marker=0&api_version=4&ctx=web6dot0";
const endpoints = {
  homeData: "__call=webapi.getLaunchData",
  topSearches: "__call=content.getTopSearches",
  fromToken: "__call=webapi.get",
  featuredRadio: "__call=webradio.createFeaturedStation",
  artistRadio: "__call=webradio.createArtistStation",
  entityRadio: "__call=webradio.createEntityStation",
  radioSongs: "__call=webradio.getSong",
  songDetails: "__call=song.getDetails",
  playlistDetails: "__call=playlist.getDetails",
  albumDetails: "__call=content.getAlbumDetails",
  getResults: "__call=search.getResults",
  albumResults: "__call=search.getAlbumResults",
  artistResults: "__call=search.getArtistResults",
  playlistResults: "__call=search.getPlaylistResults",
  getReco: "__call=reco.getreco",
  getAlbumReco: "__call=reco.getAlbumReco",
  artistOtherTopSongs: "__call=search.artistOtherTopSongs",
};
const getURL = (params) => {
  return `${baseURL}${URLstr}&${params}`;
};

export const searchResultsURL = (query) => {
  return getURL(`p=1&q=${query}&n=20&${endpoints.getResults}`);
};

export const artistResultsURL = (query) => {
  return getURL(`p=1&q=${query}&n=20&${endpoints.artistResults}`);
};
export const albumResultsURL = (query) => {
  return getURL(`p=1&q=${query}&n=20&${endpoints.albumResults}`);
};

export const songDetailsfromIdURL = (id) => {
  return getURL(`pids=${id}&${endpoints.songDetails}`);
};

export const homeDataURL = () => {
  return getURL(`${endpoints.homeData}`);
};

export const topSearchesURL = () => {
  return getURL(`${endpoints.topSearches}`);
};

export const lyricsURL = (id) => {
  return getURL(`${endpoints.getlyrics}&lyrics_id=${id}`);
};

export const albumURL = (type, id) => {
  let params;
  if (type === "playlist") {
    params = `${endpoints.playlistDetails}&cc=in&listid=${id}`;
  }
  if (type === "album") {
    params = `${endpoints.albumDetails}&cc=in&albumid=${id}`;
  }
  if (type === "song") {
    params = `pids=${id}&${endpoints.songDetails}`;
  }
  if (type === "radio_station") {
    params = `name=${id}&query=${id}&language=hindi&${endpoints.artistRadio}`;
  }
  return getURL(params);
};
export function decryptByDES(ciphertext) {
  var keyHex = CryptoJS.enc.Utf8.parse("38346591");

  // direct decrypt ciphertext
  var decrypted = CryptoJS.DES.decrypt(
    {
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext),
    },
    keyHex,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export const fetchSearchResults = async (q) => {
  try {
    const songResultsUrl = searchResultsURL(q);
    const artistResultsUrl = artistResultsURL(q);
    const albumResultsUrl = albumResultsURL(q);
    const songResults = await getResponse(songResultsUrl);
    const artistResults = await getResponse(artistResultsUrl);
    const albumResults = await getResponse(albumResultsUrl);
    return {
      artistResults: artistResults?.results,
      albumResults: albumResults?.results,
      songResults: songResults?.results,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchAlbumDetails = async (type, id) => {
  try {
    const url = albumURL(type, id);
    const data = await getResponse(url);
    if (type === "album" || type === "playlist" || type === "song") {
      return data;
    }
    if (type === "radio_station") {
      const { stationid } = data;
      // console.log(data);
      const newurl = getURL(
        `stationid=${stationid}&k=20&next=1&${endpoints.radioSongs}`
      );
      const newData = await getResponse(newurl);
      // console.log(newData);
      return newData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchSongDataFromId = async (songId) => {
  try {
    const detailUri = songDetailsfromIdURL(songId);
    const data = await getResponse(detailUri);
    const newTrack = data.songs[0];
    return newTrack;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLyricsfromId = async (songId) => {
  try {
    const lyricsuri = lyricsURL(songId);
    const data = await getResponse(lyricsuri);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopSearches = async () => {
  try {
    const uri = topSearchesURL();
    const data = await getResponse(uri);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchHomeData = async () => {
  const homeUrl = homeDataURL();
  const data = await getResponse(homeUrl);
  return data;
};
