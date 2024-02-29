import React from "react";
import { project } from "@prisma/client";

export default function ProjectCard(p: project) {
  return (
    <div className="h-full w-100 border border-red-800 w-48 lg:w-64 overflow-hidden justify-center">
      <div className="text-green-400 px-2 w-full text-nowrap mt-2 text-xl flex justify-center align-middle">
        {p.id}
        <img src="downarrow.svg" className="w-4 h-4 my-auto" />
      </div>
    </div>
  );
}
