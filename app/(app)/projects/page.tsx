"use server";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import ProjectForm from "@/components/projectform";
import { ProjectsTable } from "@/components/projectList";
import { getProjects } from "../_actions/projects";

export default async function ProjectsPage() {
  const list = await getProjects();

  return (
    <>
      {console.log(list)}
      {/* <ProjectsTable list={list} /> */}
    </>
  );
}
