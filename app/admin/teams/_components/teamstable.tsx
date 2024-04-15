"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { team, user } from "@prisma/client";
import { useFormState, useFormStatus } from "react-dom";
import { addTeam, deleteTeam, updateTeam } from "@/app/_actions/teams";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";

export default function TeamsTable(params: any) {
  const teamList: team[] = params.teams || null;
  const userList: user[] = params.users;

  const tableVis = teamList.length > 0 ? "block" : "hidden";
  const noTeams = teamList.length == 0 ? "block" : "hidden";

  const [error, action] = useFormState(addTeam, {});
  const [leadName, setLeadName] = useState("");
  const [leadId, setLeadId] = useState("");

  useEffect(() => {
    if (leadId) {
      const username = userList.find((item) => item.id === leadId)?.full_name;
      if (username) setLeadName(username);
    }
  }, [leadId, userList]);

  function getUserName(userId: string | null) {
    if (userId == null) return "--No Lead--";

    const i = userList.findIndex((u) => u.id == userId);
    return userList[i].full_name;
  }

  return (
    <>
      <div className={`w-full h-10`}>
        {/* <TeamForm userList={userList} team={null} open={showNew} />; */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>New</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Team</DialogTitle>
              <DialogDescription>
                Make changes to the team here.
              </DialogDescription>
            </DialogHeader>
            <form action={action} className="space-y-8">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  required
                  defaultValue={""}
                />
                {error?.name && (
                  <div className="text-destructive">Name is required</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="teamLead">Team Lead</Label>
                <Select
                  name="leadId"
                  onValueChange={(newVal) => {
                    setLeadId(newVal);
                  }}
                >
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
              </div>
              <SubmitButton />
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className={`w-full ${noTeams}`}>
        <h2>No teams found! Create a new one</h2>
      </div>
      <div className={`w-full ${tableVis}`}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team</TableHead>
              <TableHead>Lead</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamList.map((t: team) => (
              <TableRow key={t.id}>
                <TableCell>{t.name}</TableCell>
                <TableCell>{getUserName(t.leadId)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="flex flex-col">
                      <DropdownMenuLabel className="text-center">
                        Actions
                      </DropdownMenuLabel>
                      <TeamForm userList={userList} team={t} />
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <DeleteTeam team={t} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (leadId) {
      const username = userList.find((item) => item.id === leadId)?.full_name;
      if (username) setLeadName(username);
    }
  }, [leadId, userList]);

  console.log("Dialog here");

  return (
    <Dialog>
      <DialogTrigger>Edit</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Team</DialogTitle>
          <DialogDescription>Make changes to the team here.</DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={team?.name || ""}
              onChange={(e) => {
                setChanged(true);
              }}
            />
            {error?.name && <div className="text-destructive">required</div>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="teamLead">Team Lead</Label>
            <Select
              name="leadId"
              onValueChange={(newVal) => {
                setChanged(true);
                setLeadId(newVal);
              }}
            >
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
          </div>
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteTeam({ team }: { team: team }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <Dialog>
      <DialogTrigger>Delete</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Team</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="full_name">
            Confirm deletion of team {team.name} by typing DELETE below
          </Label>
          <Input
            type="text"
            id="full_name"
            name="full_name"
            onChange={(e) =>
              e.target.value == "DELETE" ? setConfirm(true) : setConfirm(false)
            }
          />
        </div>
        <Button onClick={() => deleteTeam(team.id)} disabled={!confirm}>
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  console.log("Submitting Form");

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
