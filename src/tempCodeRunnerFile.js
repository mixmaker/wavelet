const getAudio = () =>{
axios.get(`http://jiosaavnapi-sk.vercel.app/song?id=zekEI3N6`)
.then((data)=>{
  console.log(data.data.results)
  return (data.data.results);
  })
};