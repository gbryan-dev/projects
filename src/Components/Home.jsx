import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import projs from "../DB/Projs";
import Sparkle from "./Sparkle-YourName.mp3";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="h-auto w-screen sm:full sm:mt-10  max-w-[1200px] mb-[0px] p-10 sm:p-4 mt-24 mx-auto">
        <div class="block mb-2 text-[50px] sm:text-[30px] text-center font-medium text-white dark:text-white">
          MY PROJECTS
        </div>
        <div class="mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            class="bg-gray-50 border text-center text-[21px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
          />
        </div>
        <div class="flex flex-row flex-wrap sm:flex-col w-full p-5 pt-0 pb-0">
          <AnimatePresence>
            {projs
              ?.filter(
                (object) =>
                  object.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  object.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((proj) => (
                <motion.div
                  class="max-w-sm w-[330px] h-[380px] sm:h-auto sm:w-full mx-auto m-2 bg-[#19181a] rounded-2xl"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}>
                  <div
                    class="rounded-t-lg w-full h-[150px]"
                    style={{
                      backgroundImage: `url(${proj.img})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}></div>

                  <div class="p-5">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">
                      {proj.title}
                    </h5>
                    <p class="mb-3 font-normal text-gray-500 ">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Qui, assumenda vel in iste velit laudantium unde
                      reprehenderit ab
                    </p>

                    <div className="flex justify-between">
                      <div className="pt-2">
                        {proj.status && (
                          <span class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                            {proj.status}
                          </span>
                        )}
                      </div>

                      <Link
                        type="button"
                        target={proj.path[0] === "h" ? "_blank" : ""}
                        to={proj.path}
                        onClick={() => new Audio(Sparkle).play()}
                        class="text-white h-[40px] float-right flex w-[120px] bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Proceed
                        <div className="pt-[2px]">
                          <svg
                            aria-hidden="true"
                            class="w-4 h-4 ml-2 -mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              fill-rule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clip-rule="evenodd"></path>
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}{" "}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Home;
