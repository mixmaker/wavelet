import React, { Suspense } from "react";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import Background from "../components/Background";

const Applayout = () => {
  return (
    <div className="w-screen flex overflow-x-clip">
      <Nav />
      <div className="fixed -z-50 w-full h-full top-0 left-0">
        <Suspense>
          <Background />
        </Suspense>
      </div>
      <section className="w-[calc(100vw-15.7rem)] ml-60">
        <Outlet />
      </section>
    </div>
  );
};

export default Applayout;
