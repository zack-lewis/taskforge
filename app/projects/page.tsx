"use server";

import { ProjectsTable } from "@/app/projects/_components/projectList";
import { getProjects } from "@/app/_actions/projects";
import { project } from "@prisma/client";
import { getTeams } from "@/app/_actions/teams";

export default async function ProjectsPage() {
  const projectList = await getProjects();
  const teamList = await getTeams();
  return <>{<ProjectsTable projectList={projectList} teamList={teamList} />}</>;
}
