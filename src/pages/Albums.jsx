import React from "react";
import { useGetHomeData } from "../api/queries";
import Card from "../components/Card";
import SkeletonCard from "../components/skeletons/SkeletonCard";

const Albums = () => {
  const { data: homedata, isLoading } = useGetHomeData();

  return (
    <div className="w-full h-full pl-10 pt-10 relative overflow-clip">
      <h1 className="text-3xl text-zinc-100">Albums</h1>
      <div className="relative w-full mt-6 ml-8">
        <h2 className="text-lg text-zinc-300">New Albums</h2>
        {isLoading && (
          <div className="">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((n) => (
                <SkeletonCard key={n} />
              ))}
            </div>
          </div>
        )}
        <div className="">
          <div className="container-snap flex overflow-auto pr-10">
            {homedata &&
              homedata.new_albums.map((element, index) => {
                return <Card element={element} key={index} />;
              })}
          </div>
        </div>
      </div>
      <div className="relative w-full mt-6 ml-8">
        <h2 className="text-lg text-zinc-300">Top Playlists</h2>
        <div className="">
          <div className="container-snap overflow-auto flex pr-10">
            {!homedata && [1, 2, 3, 4, 5].map((n) => <SkeletonCard key={n} />)}
            {homedata &&
              homedata.top_playlists.map((element, index) => {
                return <Card element={element} key={index} />;
              })}
          </div>
        </div>
      </div>
      {homedata.modules["promo:vx:data:116"] && (
        <div className="relative w-full mt-6 ml-8">
          <h2 className="text-lg text-zinc-300">
            {homedata.modules["promo:vx:data:116"]?.title}
          </h2>
          <div className="">
            <div className="container-snap overflow-auto flex pr-10">
              {!homedata &&
                [1, 2, 3, 4, 5].map((n) => <SkeletonCard key={n} />)}
              {homedata &&
                homedata["promo:vx:data:116"].map((element, index) => {
                  return <Card element={element} key={index} />;
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Albums;
