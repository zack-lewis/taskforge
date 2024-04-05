"use server";

import TeamsTable from "@/app/(app)/admin/teams/_components/teamstable";
import { getTeams } from "../../_actions/teams";
import { getUsers } from "../../_actions/users";

export default async function TeamsPage() {
  const teamList = await getTeams();
  const userList = await getUsers();
  return <>{<TeamsTable teams={teamList} users={userList} />}</>;
}