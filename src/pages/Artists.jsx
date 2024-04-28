import React from "react";
import { useGetHomeData } from "../api/queries";
import Card from "../components/Card";
import SkeletonCard from "../components/skeletons/SkeletonCard";

const Artists = () => {
  const { data: homedata, isLoading, isError } = useGetHomeData();

  return (
    <div className="w-full h-full pl-10 pt-10 relative overflow-clip">
      <h1 className="text-3xl text-zinc-100">Artists</h1>
      <div className="relative w-full mt-6 ml-8">
        <h2 className="text-lg text-zinc-300">Artist Recos</h2>
        <div className="">
          <div className="container-snap overflow-auto flex pr-10">
            {isLoading && [1, 2, 3, 4, 5].map((n) => <SkeletonCard key={n} />)}
            {isError && <h1>Something went wrong.</h1>}
            {homedata &&
              homedata.artist_recos.map((element, index) => {
                return <Card element={element} key={index} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artists;
