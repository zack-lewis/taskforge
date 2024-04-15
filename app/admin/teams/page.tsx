"use server";

import TeamsTable from "./_components/teamstable";
import { getTeams } from "@/app/_actions/teams";
import { getUsers } from "@/app/_actions/users";

export default async function TeamsPage() {
  const [teamList, userList] = await Promise.all([getTeams(), getUsers()]);
  return <>{<TeamsTable teams={teamList} users={userList} />}</>;
}
