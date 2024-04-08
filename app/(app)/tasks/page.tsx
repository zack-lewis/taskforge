"use server";

import db from "@/lib/database";
import TaskList from "./_components/tasklist";
import { getTasks } from "../_actions/tasks";

export default async function TasksPage() {
  const tasks = await getTasks();
  return <TaskList tasklist={tasks} />;
}
