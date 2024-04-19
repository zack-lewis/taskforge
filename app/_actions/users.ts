"use server";

import db from "@/lib/database";
import { ChangeEvent } from "react";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";
import { user } from "@prisma/client";

const schema = z.object({
  full_name: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
  teamId: z.any(),
  github_login: z.any(),
  google_login: z.any(),
});

export async function addUser(prevState: unknown, formData: FormData) {
  const result = schema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  await db.user.create({
    data: {
      full_name: data.full_name,
      username: data.username,
      email: data.email,
      teamId: data.teamId || null,
      github_login: null,
      google_login: null,
    },
  });

  revalidatePath("/admin/users");

  redirect("/admin/users");
}

export async function newUser(email: string, username: string) {
  await db.user.create({
    data: {
      full_name: username,
      username: username,
      email: email,
      teamId: null,
      github_login: null,
      google_login: null,
    },
  });

  revalidatePath("/admin/users");

  redirect("/admin/users");
}

export async function updateUser(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = schema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const user = await db.user.findUnique({ where: { id } });

  if (user == null) return notFound();

  await db.user.update({
    where: { id },
    data: {
      full_name: data.full_name,
      username: data.username,
      email: data.email,
      teamId: data.teamId,
      github_login: data.github_login,
      google_login: data.google_login,
    },
  });

  revalidatePath("/admin/users");

  redirect("/admin/users");
}

export async function deleteUser(id: string) {
  const user = await db.user.delete({ where: { id } });

  if (user == null) return notFound();

  revalidatePath("/");
  revalidatePath("/admin/users");
}

export async function searchUser(searchInput: string) {
  return db.user.findMany({
    where: { username: { contains: searchInput } },
    take: 5,
  });
}

export async function getUsernameById(id: string) {
  const user = await db.user.findFirstOrThrow({
    where: { id: id },
    select: { id: false, full_name: true },
  });

  return user.full_name || "";
}

export async function handleUserLookup(event: ChangeEvent<HTMLInputElement>) {
  const value = event.target.value;
  const userList = await searchUser(value);
}

export async function getUsers() {
  return await db.user.findMany();
}

export async function getUsersJson() {
  const data = await db.user.findMany();
  return JSON.stringify(data);
}

export async function getUserData(userId: string): Promise<user> {
  const user = await db.user.findFirstOrThrow({ where: { id: userId } });
  return user;
}

export async function getUserByEmail(email: string | null | undefined) {
  if (email == null || email == undefined) {
    throw new Error("Null User");
  }

  try {
    const user = await db.user.findFirstOrThrow({ where: { email: email } });
    return user;
  } catch (e) {
    throw new Error("User not found");
  }
}

export async function lookupAddUser(email: string, name: string) {
  try {
    const user = await getUserByEmail(email);
    return user;
  } catch (e) {
    const newU = await newUser(email, name);
    return lookupAddUser(email, name);
  }
}
