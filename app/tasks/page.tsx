"use server";

import { Suspense } from "react";
import TaskList from "./_components/tasklist";
import { getTasks } from "@/app/_actions/tasks";

export default async function TasksPage() {
  const tasks = await getTasks();
  return (
    <Suspense>
      <TaskList tasklist={tasks} />
    </Suspense>
  );
}
