import axios from "axios";

export const getResponse = (url) => {
  return axios
    .get(`https://wavelet-backend.vercel.app/api?q=${encodeURIComponent(url)}`)
    .then((data) => data.data);
};

export const makeMediaurl = (url) => {
  return url
    .replace("preview.saavncdn.com", "aac.saavncdn.com")
    .replace("_96_p", "_320");
};

// export const getSearchedData = async (req) => {
//   const data = await axios.get(searchResultsURL(req));
//   return data.data.results;
// };

// export const getHomeData = () => {
//   const data = axios.get(homeDataURL());
//   return data;
// };

// export const getDetailsfromId = (id) => {
//   return axios.get(detailsfromIdURL(id));
// };
