import axios from "axios";

export const searchSong = async (songName) => {
  const data = await axios
    .get(`${process.env.REACT_APP_URL}/search?query=${songName}`);
  return data.data.results;
};

// export const getAudio = (id)=>{
// let res =  axios.get(`http://jiosaavnapi-sk.vercel.app/song?id=${id}`)

//     .then()
//     console.log(res)
//     return res.data

// }

export const getDetails = (id) => {
  return axios.get(`${process.env.REACT_APP_URL}/song?id=${id}`);
};
