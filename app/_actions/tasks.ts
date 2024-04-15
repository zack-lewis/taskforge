"use server";

import db from "@/lib/database";
import { task } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  projectId: z.string().optional(),
  userId: z.string().optional(),
  teamId: z.string().optional(),
  description: z.string().optional(),
  due_date: z.string().optional(),
  started_date: z.string().optional(),
  completed_date: z.string().optional(),
});

export async function addTask(prevState: unknown, formData: FormData) {
  const result = schema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await db.task.create({
    data: {
      projectId: data.projectId,
      userId: data.userId,
      teamId: data.teamId,
      name: data.name,
      description: data.description,
      due_date: data.due_date,
      started_date: data.started_date,
      completed_date: data.completed_date,
    },
  });

  revalidatePath("/");
  revalidatePath("/tasks");

  redirect("/tasks");
}

export async function updateTask(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = schema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const task = await db.task.findUnique({ where: { id } });

  if (task == null) return notFound();

  await db.task.update({
    where: { id },
    data: {
      projectId: data.projectId,
      userId: data.userId,
      teamId: data.teamId,
      name: data.name,
      description: data.description,
      due_date: data.due_date,
      started_date: data.started_date,
      completed_date: data.completed_date,
    },
  });

  revalidatePath("/");
  revalidatePath("/tasks");

  redirect("/tasks");
}

export async function deleteTask(id: string) {
  const task = await db.task.delete({ where: { id } });

  if (task == null) return notFound();

  revalidatePath("/");
  revalidatePath("/tasks");
}

export async function getTasks() {
  return db.task.findMany();
}

export async function startTask(user: string) {
  const now = Date.now();
}
