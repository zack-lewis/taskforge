import ProjectCard from "@/components/projectcard";
import { db } from "@/lib/db";
import { getProjectsList } from "@/model/project";
import { project } from "@prisma/client";

export default async function projects() {
  const projectsList = await getProjectsList();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {projectsList?.map((p) => (
        <ProjectCard {...p}></ProjectCard>
      ))}
    </main>
  );
}
