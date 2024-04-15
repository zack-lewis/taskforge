"use server";

import { getUsers } from "@/app/_actions/users";
import { getTeams } from "@/app/_actions/teams";

import { UserTable } from "./_components/userForm";

export default async function UsersPage() {
  const [userList, teamsList] = await Promise.all([getUsers(), getTeams()]);
  return <UserTable userList={userList} teamList={teamsList} />;
}
