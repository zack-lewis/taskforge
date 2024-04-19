"use server";

import { Suspense } from "react";
import TaskList from "./_components/tasklist";
import { getTasks } from "@/app/_actions/tasks";
import { getProjects } from "../_actions/projects";
import { getUsers } from "../_actions/users";
import { getTeams } from "../_actions/teams";

export default async function TasksPage() {
  const [tasks, users, projects, teams] = await Promise.all([
    getTasks(),
    getUsers(),
    getProjects(),
    getTeams(),
  ]);

  return (
    <Suspense>
      <TaskList
        tasklist={tasks}
        userList={users}
        projectList={projects}
        teamList={teams}
      />
    </Suspense>
  );
}
