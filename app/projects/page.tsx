import { getAllProjects } from "@/model/project";

const projectLists = getAllProjects()

export default function projects() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

    {
      projectLists.then()
    }

    </main>
  );
}
