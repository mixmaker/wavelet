import React from "react";
import useAppContext from "../context/useAppContext";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { RiSearch2Line } from "react-icons/ri";
import { useGetSearchResults, useGetTopSearches } from "../api/queries";
import { IoTrendingUp } from "react-icons/io5";
import LoadingComponent from "../components/LoadingComponent";
import SongListItem from "../components/SongListItem";
import { motion } from "framer-motion";
import EmptyComponent from "../components/EmptyComponent";

const Search = () => {
  document.title = "Wavelet | Search";

  //import contexts
  const { inputVar, setInputVar } = useAppContext();

  const {
    data: searchResults,
    fetch: fetchSearchResults,
    isLoading: isLoadingSearchResults,
    isError: isErrorSearchResults,
  } = useGetSearchResults(inputVar);
  const {
    data: topSearches,
    isLoading: isLoadingTopSearches,
    isError: isErrorTopSearches,
  } = useGetTopSearches();

  const searchFromQuery = (e) => {
    e.preventDefault();
    // console.log(inputRef.current.value)
    fetchSearchResults();
    // setProgress(10);
    // const apiUrl = searchResultsURL(inputVar);
    // const run = async () => {
    //   try {
    //     const data = await getResponse(apiUrl);
    //     setProgress(60);
    //     setSearchedData(data.results);
    //     setProgress(100);
    //   } catch (error) {
    //     alert(error);
    //   }
    // };
    // run();
    // getResponse(
    //   searchResultsURL(inputVar),
    //   (data) => {
    //     // console.log(data);
    //     setProgress(60);
    //     setSearchedData(data.results);
    //     setProgress(100);
    //   },
    //   (err) => alert(err)
    // );
  };

  return (
    <div className="w-full h-full pl-10 pt-10 relative ">
      <h1 className="text-3xl text-zinc-100">Search</h1>
      <div className="flex w-[22rem] mt-4">
        <form className="flex w-full" onSubmit={searchFromQuery}>
          {/* //add trending song name as        placeholder */}
          <Input
            type="text"
            name="searchInput"
            placeholder="Search Songs by Title or Artist"
            value={inputVar}
            onChange={(e) => {
              setInputVar(e.target.value);
            }}
          />
          <Button variant="default" type="submit" className="p-3 ml-2">
            <RiSearch2Line size={22} />
          </Button>
        </form>
        {/* <input
          type="text"
          name="songname"
          onChange={getInput}
          value={inputVar}
          placeholder=" "
          onKeyDown={(e) => e.key === "Enter" && songInput()}
        />
        <label htmlFor="songname" className="content">
          <span className="contenttext">Search songs</span>
        </label> */}
      </div>
      {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
      <div className="flex items-start justify-between">
        <ul className="w-[35rem] mt-6">
          {!searchResults && !isLoadingSearchResults && (
            <EmptyComponent />
          )}
          {isLoadingSearchResults && !isErrorSearchResults && (
            <LoadingComponent text="Loading..." />
          )}
          {!isLoadingSearchResults &&
            !isErrorSearchResults &&
            searchResults && (
              <div>
                <h2 className="mb-2 text-xl text-zinc-200">Songs</h2>
                {searchResults?.songResults?.map((element, index) => {
                  return (
                    <li key={element.id}>
                      <SongListItem
                        song={element}
                        index={index}
                        key={element.id}
                      />
                    </li>
                  );
                })}
                <h2 className="mt-6 mb-2 text-xl text-zinc-200">Albums</h2>
                {searchResults?.albumResults?.map((element, index) => {
                  return (
                    <li key={element.id}>
                      <SongListItem
                        song={element}
                        index={index}
                        isAlbum
                        key={element.id}
                      />
                    </li>
                  );
                })}
              </div>
            )}
        </ul>
        <div className="sticky top-4 ml-10 mr-10 pl-5 w-2/6 bg-zinc-900/70 rounded-xl">
          <div className="flex items-center mt-8">
            <IoTrendingUp size={24} className="mr-2" />
            <h2>Trending</h2>
          </div>
          {isLoadingTopSearches && (
            <LoadingComponent
              text="Loading..."
              className="mt-4 mb-6 text-zinc-300"
              iconClassName="h-6 w-6"
            />
          )}
          {!isLoadingTopSearches &&
            !isErrorTopSearches &&
            topSearches?.map((item, index) => (
              <TopSearchCard item={item} index={index} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

const TopSearchCard = ({ item, index }) => {
  const scaleVariant = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.7, delay: index * 0.1 } },
  };
  return (
    <motion.div
      className="flex m-4 overflow-clip"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      <motion.img
        variants={scaleVariant}
        initial="hidden"
        animate="visible"
        src={item.image}
        alt={item.title}
        className="h-12 w-12 rounded-lg"
      />
      <motion.div
        className="ml-2"
        initial={{ y: 100 }}
        animate={{
          y: 0,
          transition: { duration: 0.7, delay: index * 0.1 },
        }}
      >
        <h3 className="text-zinc-200">{item.title}</h3>
        <h4 className="text-zinc-400 text-sm">{item.type}</h4>
      </motion.div>
    </motion.div>
  );
};

export default Search;
