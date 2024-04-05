"use server";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "../../_actions/users";
import NewButton from "@/components/newButton";
import { FormType } from "@/lib/otherTypes";
import { getTeams } from "../../_actions/teams";

export default async function UsersPage() {
  const [userList, teamsList] = await Promise.all([getUsers(), getTeams()]);

  function getTeamName(teamId: string | null) {
    if (teamId == null) return "--No team--";

    const i = teamsList.findIndex((t) => t.id == teamId);
    return teamsList[i].name;
  }

  return (
    <>
      <NewButton formType={FormType.User} teams={teamsList} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Github Login</TableHead>
            <TableHead>Google Login</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(await userList).map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.full_name}</TableCell>
              <TableCell>{u.username}</TableCell>
              <TableCell>{getTeamName(u.teamId)}</TableCell>
              <TableCell>{u.github_login}</TableCell>
              <TableCell>{u.google_login}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
