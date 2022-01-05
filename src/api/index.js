import axios from "axios";
import { detailsfromIdURL } from "./base";

export const getResponse = (url) =>
  axios.get(url).then((data) => {
    // console.log(data)
    return data.data;
  });

// export const getResponse = (url, callback, errcallback) => {
//   axios
//     .get(url)
//     .then((data) => {
//       // console.log(data.data);
//       if (callback != null) {
//         callback(data.data);
//       }
//       // return data.data;
//     })
//     .catch((err) => {
//       if (errcallback != null) {
//         errcallback(err);
//       }
//     });
// };

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

export const getDetailsfromId = (id) => {
  return axios.get(detailsfromIdURL(id));
};
