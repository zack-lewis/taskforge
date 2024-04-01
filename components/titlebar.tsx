"use client";

import Image from "next/image";
import { UserNav } from "./user-nav";
import { Hamburger } from "./ui/hamburger";
import { usePathname } from "next/navigation";
import SiteNav from "./sitenav";
import { useState } from "react";

export default function TitleBar() {
  const [navOpen, setNavOpen] = useState(false);
  const navVisClass = navOpen ? "block" : "hidden";

  const path = usePathname();
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

  return (
    <>
      <div className="flex flex-row relative">
        <div
          className="w-1/5 flex md:hidden justify-center align-middle"
          onClick={toggleSiteNav}
        >
          <Hamburger />
        </div>
        <div className="w-1/5 hidden md:flex">
          <Image
            src="taskforge.svg"
            alt="TaskForge Logo"
            width={100}
            height={100}
            className="align-middle"
          />
        </div>
        <div className="flex w-3/5 justify-center text-xl my-auto">
          {displayName}
        </div>
        <div className="w-1/5">
          <UserNav />
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
