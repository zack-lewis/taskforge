"use server";

import TaskList from "./_components/tasklist";
import { getTasks } from "@/app/_actions/tasks";

export default async function TasksPage() {
  const tasks = await getTasks();
  return <TaskList tasklist={tasks} />;
}
