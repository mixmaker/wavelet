import React from "react";
import Card from "../components/Card";
import SkeletonCard from "../components/skeletons/SkeletonCard";
import { useGetHomeData } from "../api/queries";
import { Skeleton } from "@mui/material";

const Home = () => {
  document.title = "Wavelet | Home";
  const { data: homedata, isLoading, isError } = useGetHomeData();
  let modules;
  !isLoading &&
    !isError &&
    (modules = Object.keys(homedata?.modules).filter(
      (module) =>
        module !== "new_albums" &&
        module !== "top_playlists" &&
        module !== "promo:vx:data:116" &&
        module !== "radio" &&
        module !== "artist_recos" &&
        module !== "promo:vx:data:107"
    ));

  return (
    <>
      <div className="w-full h-full pl-10 pt-10 relative overflow-clip">
        <h1 className="text-3xl text-zinc-100">Discover</h1>
        {isLoading && (
          <div key={module} className="relative w-full mt-12 ml-8">
            <h2 className="text-lg text-zinc-300">
              <Skeleton
                variant="text"
                animation="wave"
                style={{ background: "#282828" }}
                width={140}
              />
            </h2>
            <div className="container-snap flex overflow-auto pr-10">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <SkeletonCard key={n} />
              ))}
            </div>
          </div>
        )}
        {!isLoading &&
          !isError &&
          modules?.map((module) => {
            if (homedata?.modules[module])
              return (
                <div key={module} className="relative w-full mt-12 ml-8">
                  <h2 className="text-lg text-zinc-300">
                    {homedata.modules[module].title}
                  </h2>
                  <div className="relative">
                    <div className="container-snap flex overflow-auto pr-10">
                      {homedata &&
                        homedata[module].map((element, index) => {
                          return <Card element={element} key={index} />;
                        })}
                    </div>
                  </div>
                </div>
              );
            else return null;
          })}
        {/* <div className="relative w-full mt-12 ml-8">
          <h2 className="text-lg text-zinc-300">
            {isLoading ? "Loading..." : homedata?.modules.city_mod?.title}
          </h2>
          <div className="relative">
            <div className="container-snap flex overflow-auto pr-10">
              {isLoading &&
                [1, 2, 3, 4, 5, 6].map((n) => <SkeletonCard key={n} />)}
              {homedata &&
                homedata.city_mod?.map((element, index) => {
                  return <Card element={element} key={index} />;
                })}
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Home;
