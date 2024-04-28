import React, { useEffect } from "react";
import useAppContext from "../context/useAppContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TypewriterEffectSmooth } from "../components/ui/TypeWriterEffect";
import { TbBrandGithub } from "react-icons/tb";
import { MdOutlineNotInterested } from "react-icons/md";
import { IoTrendingUp } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { BsWindowStack } from "react-icons/bs";

const logoVariants = {
  hidden: {
    y: 50,
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};
const Home = () => {
  document.title = "Wavelet";

  //import contexts
  const { setProgress } = useAppContext();
  //set top-loading-bar progress to 100 when page is completely loaded
  useEffect(() => {
    setProgress(100);
  }, [setProgress]);

  //   return <LampContainer>
  //   <motion.h1
  //     initial={{ opacity: 0.5, y: 100 }}
  //     whileInView={{ opacity: 1, y: 0 }}
  //     transition={{
  //       delay: 0.3,
  //       duration: 0.8,
  //       ease: "easeInOut",
  //     }}
  //     className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
  //   >
  //     Build lamps <br /> the right way
  //   </motion.h1>
  // </LampContainer>
  return (
    <div className="w-screen overflow-x-clip z-50">
      <Hero />
      <About />
      <Downloads />
      <Footer />
    </div>
  );
};
const Footer = () => {
  return (
    <div className="p-12 h-80 flex flex-col justify-between bg-black">
      <div className="flex w-full justify-between  h-40 gap-20 pr-20">
        <div className="">
          <div className="w-max">
            <img src="/images/logo.png" alt="logo" className="h-8 rounded-xl" />
          </div>
          <p className="text-base mt-2 text-zinc-400">
            Wavelet - a multi-platform music application, made with react and
            react native.
          </p>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg">Navigation</h2>
          <a href="#home" className="text-zinc-400 text-sm">
            Home
          </a>
          <a href="#about" className="text-zinc-400 text-sm">
            About
          </a>
          <a href="#downloads" className="text-zinc-400 text-sm">
            Download
          </a>
        </div>
        <div className="flex-col flex">
          <h2 className="text-lg">Contact</h2>
          <a
            href="mailto: support@shoumik.in"
            className="text-zinc-400 text-sm"
          >
            support@shoumik.in
          </a>
          <Link
            target="_blank"
            to="https://github.com/mixmaker/wavelet/issues"
            className="text-zinc-400 text-sm"
          >
            github
          </Link>
          <Link
            target="_blank"
            to="https://shoumik.in"
            className="text-zinc-400 text-sm"
          >
            developer info
          </Link>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-zinc-500">
          &copy;{new Date().getFullYear()} Wavelet - All rights reserved
        </div>
        <div className="flex gap-4 text-zinc-300">
          <h3>Terms & conditions</h3>
          <h3>Privacy policy</h3>
          <h3>Cookie policy</h3>
        </div>
        <div className="flex gap-4">
          <Link
            to="https://github.com/mixmaker/wavelet"
            target="_blank"
            className="flex items-center justify-center p-2 rounded-full hover:bg-zinc-800 transition-all"
          >
            <TbBrandGithub className="text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};
const Downloads = () => {
  return (
    <div id="downloads" className="">
      <h1 className="text-3xl mx-24 mt-20 mb-6">Downloads</h1>
      <div className="flex">
        <div
          className="bg-violet-950/20 w-2/3 p-36"
          style={{ clipPath: "polygon(0 0, 100% 0, 92% 100%, 0% 100%)" }}
        >
          <h2 className="text-2xl">Download the app</h2>
          <p className="text-zinc-400">
            Start listening to your favourite songs.
          </p>
          <div className="flex gap-10 mt-8">
            <div className="text-sm text-zinc-400">
              Download from Github
              <Link
                target="_blank"
                to="https://github.com/mixmaker/wavelet-react-native/releases"
              >
                <div className="cursor-pointer mt-1 h-14 bg-white text-black w-max rounded-lg">
                  <img src="/images/github.png" alt="" className="h-full" />
                </div>
              </Link>
            </div>
            <div className="text-sm text-zinc-400">
              Download from Fdroid
              <div className="cursor-pointer mt-1 h-14 bg-white text-black w-max rounded-lg">
                <img src="/images/fdroid.png" alt="" className="h-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-1/2 p-10">
          <h2 className="text-2xl">Explore on the web</h2>
          <p className="text-zinc-400 mb-4">
            Want to explore before downloading?
          </p>
          <Link to="/home" className="">
            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 font-normal">
                <span>Click here</span>
                <svg
                  fill="none"
                  height="36"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
const About = () => {
  return (
    <div id="about" className="h-screen flex flex-col justify-evenly">
      <h1 className="text-3xl mb-8 p-24">About the app</h1>
      <div className="flex justify-between h-1/2">
        <div className="pl-48">
          <ul className="flex flex-col gap-6">
            <li className="">
              <div className="flex items-center">
                <MdOutlineNotInterested className="text-xl text-zinc-400" />
                <h2 className="text-xl pl-2">No Ads</h2>
              </div>
              <p className="pl-7 text-zinc-400">ads free listening</p>
            </li>
            <li className="">
              <div className="flex items-center">
                <IoTrendingUp className="text-xl text-zinc-400" />
                <h2 className="text-xl pl-2">Trending Tracks</h2>
              </div>
              <p className="pl-7 text-zinc-400">
                catch up on what's eveeryone listening
              </p>
            </li>
            <li className="">
              <div className="flex items-center">
                <BiSearchAlt className="text-xl text-zinc-400" />
                <h2 className="text-xl pl-2">Global Search</h2>
              </div>
              <p className="pl-7 text-zinc-400">
                search through millions of songs, albums & artists
              </p>
            </li>
            <li className="">
              <div className="flex items-center">
                <BsWindowStack className="text-xl text-zinc-400" />
                <h2 className="text-xl pl-2">Multi Platform Support</h2>
              </div>
              <p className="pl-7 text-zinc-400">
                use on the web or download for android or ios
              </p>
            </li>
          </ul>
        </div>
        <div className="w-1/2 h-full">
          <img
            src="/images/ss.png"
            alt=""
            className="w-full h-full object-cover scale-125"
          />
        </div>
      </div>
    </div>
  );
};
const Hero = () => {
  const words = [
    { text: "Let", className: "text-7xl" },
    { text: "the", className: "text-7xl" },
    {
      text: "music",
      // className: "text-orange-500 dark:text-orange-500 [text-shadow:_5_7px_30_rgb(255_255_255_/_40%)]",},
      className: "text-blue-500 dark:text-blue-500 text-7xl",
    },
    { text: "take", className: "text-7xl" },
    { text: "you", className: "text-7xl" },
    { text: "away", className: "text-7xl" },
  ];
  return (
    <div
      id="home"
      className="w-screen h-screen dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center"
    >
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      {/* <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
  Backgrounds
</p> */}
      <div className="logoDiv mt-6">
        <motion.div
          className="logo flex text-4xl leading-tight font-Quantify"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="letter1 flex items-center"
            variants={letterVariants}
          >
            <img
              src="/images/logo2.png"
              alt="logo"
              className="h-7 rounded-xl"
            />
          </motion.h1>
          <motion.h1 className="letter2" variants={letterVariants}>
            a
          </motion.h1>
          <motion.h1 className="letter3" variants={letterVariants}>
            v
          </motion.h1>
          <motion.h1 className="letter4" variants={letterVariants}>
            e
          </motion.h1>
          <motion.h1 className="letter5" variants={letterVariants}>
            l
          </motion.h1>
          <motion.h1 className="letter6" variants={letterVariants}>
            e
          </motion.h1>
          <motion.h1 className="letter7" variants={letterVariants}>
            t
          </motion.h1>
        </motion.div>
      </div>

      <div className="flex flex-col justify-center items-center w-full mt-16">
        <div className="mt-36 text-3xl flex flex-col min-w-max justify-center items-center text-center">
          <TypewriterEffectSmooth
            words={words}
            cursorClassName="h-4 sm:h-6 xl:h-20 w-[6px]"
          />
          <motion.h3 className="text-2xl text-slate-200 w-[50rem]">
            Escape with your favorite tunes! Personalized recommendations &
            ad-free listening await.
          </motion.h3>
        </div>
        <div className="flex items-center gap-4 mt-20">
          <Link to="/home" className="">
            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
                <span>Explore</span>
                <svg
                  fill="none"
                  height="36"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
          </Link>
          <a href="#downloads" variant="link">
            Download now
          </a>
        </div>
        {/* </LampContainer> */}
        {/* <HoverBorderGradient
      containerClassName="rounded-full"
      as="button"
      className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
    >
      <AceternityLogo />
      <span>Aceternity UI</span>
    </HoverBorderGradient> */}
      </div>

      <div className="flex -mb-px h-[2px] w-80 -scale-x-100 absolute bottom-0.5 left-[60%]">
        <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
        <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
      </div>
    </div>
  );
};
// const StyledHome = styled(motion.div)`
//   position: absolute;
//   height: 100vh;
//   width: 100%;
//   /* padding: 2rem; */
//   overflow: hidden;
//   /* background: linear-gradient(
//     118.91deg,
//     #241e3a 7.94%,
//     #181138 17.77%,
//     #020112 49.48%
//   ); */
//   .logoDiv {
//     height: max-content;
//     overflow: hidden;
//     .logo {
//       margin: auto;
//       display: flex;
//       font-size: 2.3rem;
//       font-family: "Shadows Into Light", cursive;
//       overflow: hidden;
//       height: max-content;
//       width: min-content;
//     }
//   }
//   .text {
//     /* padding-left: 2rem; */
//     /* height: 100%; */
//     width: 70%;
//     position: relative;
//     left: 50%;
//     top: 50%;
//     transform: translate(-50%, -80%);
//     text-align: center;

//     h2 {
//       font-size: 6rem;
//       line-height: 90%;

//       span {
//         color: #ee6c4d;
//         text-shadow: 5px 7px 30px #ee6c4d;
//       }
//     }
//     h3 {
//       font-size: 1.4rem;
//       margin: 2rem 0 2rem 0;
//       color: #bda49e;
//       font-weight: 400;
//     }
//     a {
//       text-decoration: none;
//       font-size: 1rem;
//       padding: 0.5rem 1rem;
//       border: 2px solid #ee6c4d;
//       border-radius: 14px;
//       cursor: pointer;
//       background: transparent;
//       color: #fff;
//       transition: 0.5s ease;
//       &:hover {
//         box-shadow: 5px 5px 30px 3px #ee6c4d;
//         background-color: #ee6c4d;
//       }
//       &:hover ~ span {
//         transform: translateX(20px);
//       }
//     }
//   }
//   .bg {
//     position: absolute;
//     right: -5%;
//     top: 0;
//     overflow: hidden;
//   }
// `;

export default Home;
