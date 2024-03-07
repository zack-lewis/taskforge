import React from "react";
import { project } from "@prisma/client";
import ProjectLogo from "./projectlogo";

export default function ProjectCard(p: project) {
  return (
    <div
      className="h-96 border-2 border-red-800 rounded-xl w-48 lg:w-64 overflow-hidden justify-center text-green-400 text-nowrap text-xl flex flex-col align-middle bg-slate-800"
      key={p.id}
    >
      <div className="w-full h-3/6">
        <ProjectLogo name={p.name} />
      </div>
      <div className="w-full h-1/6 text-center text-3xl">{p.name}</div>
      <div className="w-full h-2/6 text-xl text-gray-400 text-center">
        {/* {p.team.name} */}
      </div>
    </div>
  );
}
