"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { team, user } from "@prisma/client";
import { useFormState, useFormStatus } from "react-dom";
import { addTeam, updateTeam } from "@/app/(app)/_actions/teams";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TeamsTable(params: any) {
  const teamList = params.teams || null;
  const userList = params.users;

  const [modalOpen, setModalOpen] = useState(false);
  const modalVis = modalOpen ? "block" : "hidden";
  const modalMute = modalOpen ? "opacity-30" : "opacity-unset";
  const tableVis = teamList.length > 0 ? "block" : "hidden";
  const noTeams = teamList.length == 0 ? "block" : "hidden";

  function handleNewBtnClick() {
    setModalOpen(true);
  }

  return (
    <>
      <div className={`w-full h-10 ${modalMute}`}>
        <Button onClick={handleNewBtnClick} disabled={!modalMute}>
          New
        </Button>
      </div>
      <div className={`w-full ${modalMute} ${noTeams}`}>
        <h2>No teams found! Create a new one</h2>
      </div>
      <div className={`w-full ${modalMute} ${tableVis}`}>
        <Table>
          <TableHeader></TableHeader>
          <TableBody>
            {teamList.map((t: team) => (
              <TableRow key={t.id}>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.leadId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div
        className={`absolute z-0 w-1/3 h-1/2 top-1/4 left-1/3 bg-secondary rounded-xl border border-accent-foreground p-3 ${modalVis}`}
      >
        <TeamForm userList={userList} />
      </div>
    </>
  );
}

function TeamForm({
  team,
  userList,
}: {
  team?: team | null;
  userList: user[];
}) {
  const [error, action] = useFormState(
    team == null ? addTeam : updateTeam.bind(null, team.id),
    {}
  );

  const [leadId, setLeadId] = useState(team?.leadId);
  const [leadName, setLeadName] = useState("");

  useEffect(() => {
    if (leadId) {
      const leadName = userList.find((item) => item.id === leadId);
      console.log(leadName);
    }
  }, [leadId, userList]);

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={team?.name || ""}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="teamLead">Team Lead</Label>
        <Select name="leadId">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Team Lead" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {userList.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.full_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {error.leadId && <div className="text-destructive">{error.leadId}</div>}
      </div>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
