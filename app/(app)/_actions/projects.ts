import db from "@/lib/database";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  primary_teamId: z.string().min(1),
});

export async function addProject(prevState: unknown, formData: FormData) {
  const result = schema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await db.project.create({
    data: {
      name: data.name,
      primary_teamId: data.primary_teamId,
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");

  redirect("/projects");
}

export async function updateProject(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = schema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const project = await db.project.findUnique({ where: { id } });

  if (project == null) return notFound();

  await db.project.update({
    where: { id },
    data: {
      name: data.name,
      primary_teamId: data.primary_teamId,
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");

  redirect("/projects");
}

export async function deleteProject(id: string) {
  const project = await db.project.delete({ where: { id } });

  if (project == null) return notFound();

  revalidatePath("/");
  revalidatePath("/projects");
}

export async function getProjects() {
  return db.project.findMany();
}
