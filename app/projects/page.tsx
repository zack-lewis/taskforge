import ProjectCard from "@/components/projectcard";
import { getProjectsList } from "@/model/project";
import { project } from "@prisma/client";

export default function projects() {
  const projectsList = getProjectsList();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* {projectsList.then((project) => {
        <ProjectCard p={project} />;
      })} */}
    </main>
  );
}
