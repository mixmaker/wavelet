import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { RiSearch2Line } from "react-icons/ri";
import { BiAlbum } from "react-icons/bi";
import { TbUserStar } from "react-icons/tb";

export default function Nav() {
  const applocation = useLocation();

  return applocation.pathname !== "/" ? (
    <nav className="w-60 bg-zinc-900/50 h-screen fixed pl-10">
      <NavLink to="/home">
        <div className="mt-12 mb-10">
          <img src="/images/logo.png" alt="logo" className="h-7 rounded-xl" />
        </div>
      </NavLink>
      <ul className="">
        <NavLink to="/home">
          {({ isActive }) => (
            <li
              className={`flex items-center text-lg ${
                isActive
                  ? "text-blue-400 border-r-2 border-blue-400"
                  : "text-gray-400"
              } mb-6 `}
            >
              <RiCompassDiscoverLine size={22} className="mr-4" />
              Explore
            </li>
          )}
        </NavLink>
        <NavLink to="/search">
          {({ isActive }) => (
            <li
              className={`flex items-center text-lg mb-6 ${
                isActive
                  ? "text-blue-400 border-r-2 border-blue-400"
                  : "text-gray-400"
              }`}
            >
              <RiSearch2Line size={22} className="mr-4" /> Search
            </li>
          )}
        </NavLink>
        <NavLink to="/albums">
          {({ isActive }) => (
            <li
              className={`flex items-center text-lg mb-6 ${
                isActive
                  ? "text-blue-400 border-r-2 border-blue-400"
                  : "text-gray-400"
              }`}
            >
              <BiAlbum size={22} className="mr-4" />
              Albums
            </li>
          )}
        </NavLink>
        <NavLink to="/artists">
          {({ isActive }) => (
            <li
              className={`flex items-center text-lg mb-6 ${
                isActive
                  ? "text-blue-400 border-r-2 border-blue-400"
                  : "text-gray-400"
              }`}
            >
              <TbUserStar size={22} className="mr-4" />
              Artists
            </li>
          )}
        </NavLink>
      </ul>
    </nav>
  ) : (
    ""
  );
}
