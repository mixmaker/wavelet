import axios from "axios";

export const getResponse = async (url) => {
  const { data } = await axios.get("https://wavelet-backend.vercel.app/api", {
    headers: {
      url,
    },
  });
  // console.log(url);
  // console.log(data);
  return data;
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
