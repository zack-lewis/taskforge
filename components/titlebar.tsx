"use client";

import Image from "next/image";
import { NavBar } from "./navbar";
import { usePathname } from "next/navigation";
import SiteNav from "./sitenav";
import { useEffect, useState } from "react";

export default function TitleBar() {
  const [navOpen, setNavOpen] = useState(false);
  const navVisClass = navOpen ? "block" : "hidden";

  const path = usePathname();

  useEffect(() => {
    setNavOpen(false);
    setIsOpen(false);
  }, [path]);

  let displayName = "TaskForge";
  switch (path) {
    case "/":
      displayName = "Dashboard";
      break;
    case "/projects":
      displayName = "Projects";
    default:
      break;
  }

  const toggleSiteNav = () => {
    setNavOpen(!navOpen);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex flex-row relative">
        <div
          className="w-1/5 flex md:hidden justify-center align-middle"
          onClick={toggleSiteNav}
        >
          <button
            onClick={handleClick}
            className="flex flex-col justify-center items-center"
          >
            <span
              className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
              }`}
            ></span>
            <span
              className={`bg-foreground block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`bg-foreground block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
                      isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                    }`}
            ></span>
          </button>
        </div>
        <div className="w-1/5 hidden md:flex">
          <Image
            src="/taskforge.svg"
            alt="TaskForge Logo"
            width={200}
            height={100}
            className="align-middle mx-auto"
          />
        </div>
        <div className="flex w-3/5 justify-center text-xl my-auto">
          {displayName}
        </div>
        <div className="w-1/5">
          <NavBar />
        </div>
      </div>
      <div
        className={`${navVisClass} absolute z-0 w-full h-full overflow-hidden py-2 left-0 mx-auto rounded-lg bg-secondary`}
      >
        <SiteNav />
      </div>
    </>
  );
}
