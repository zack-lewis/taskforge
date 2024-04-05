"use server";

import db from "@/lib/database";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  leadId: z.string().min(1),
});

export async function addTeam(prevState: unknown, formData: FormData) {
  const result = schema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await db.team.create({
    data: {
      name: data.name,
      leadId: data.leadId,
    },
  });

  revalidatePath("/admin/teams");

  redirect("/admin/teams");
}

export async function updateTeam(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = schema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const team = await db.team.findUnique({ where: { id } });

  if (team == null) return notFound();

  await db.team.update({
    where: { id },
    data: {
      name: data.name,
      leadId: data.leadId,
    },
  });

  revalidatePath("/admin/teams");

  redirect("/admin/teams");
}

export async function deleteTeam(id: string) {
  const team = await db.team.delete({ where: { id } });

  if (team == null) return notFound();

  revalidatePath("/admin/teams");
}

export async function getTeams() {
  return db.team.findMany();
}
