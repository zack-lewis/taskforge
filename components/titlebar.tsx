"use client";

import Image from "next/image";
import { UserNav } from "./user-nav";
import { Hamburger } from "./ui/hamburger";
import { usePathname } from "next/navigation";

export default function TitleBar() {
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
  return (
    <>
      <div className="flex flex-row">
        <div className="w-1/5 flex md:hidden justify-center align-middle">
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
    </>
  );
}
