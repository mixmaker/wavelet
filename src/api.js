import axios from "axios";

export const searchSong = (songName) => {
  return axios
    .get(`https://jiosaavnapi-sk.vercel.app/search?query=${songName}`)
    .then((data) => {
      // console.log(data)
      return data.data.results;
    });
};

// export const getAudio = (id)=>{
// let res =  axios.get(`http://jiosaavnapi-sk.vercel.app/song?id=${id}`)

//     .then()
//     console.log(res)
//     return res.data

// }

export const getAudio = async (id) => {
  return axios.get(`http://jiosaavnapi-sk.vercel.app/song?id=${id}`);
};
