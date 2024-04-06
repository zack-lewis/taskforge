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
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { team, user } from "@prisma/client";
import { useFormState, useFormStatus } from "react-dom";
import { addTeam, deleteTeam, updateTeam } from "@/app/(app)/_actions/teams";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

  function handleNewBtnClick() {}

  function getUserName(userId: string | null) {
    if (userId == null) return "--No Lead--";

    const i = userList.findIndex((u) => u.id == userId);
    return userList[i].full_name;
  }
  //   const [error, action] = useFormState(
  //     team == null ? addTeam : updateTeam.bind(null, team.id),
  //     {}
  //   );

  //   const [leadId, setLeadId] = useState(team?.leadId);
  //   const [leadName, setLeadName] = useState("");

  //   useEffect(() => {
  //     if (leadId) {
  //       const leadName = userList.find((item) => item.id === leadId);
  //       console.log(leadName);
  //     }
  //   }, [leadId, userList]);

  return (
    <>
      <div className={`w-full h-10`}>
        <Button onClick={handleNewBtnClick}>New</Button>
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
                      <Dialog>
                        <DialogTrigger>Edit</DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Team</DialogTitle>
                            <DialogDescription>
                              Make changes to the team here.
                            </DialogDescription>
                          </DialogHeader>
                          {/* <form
                            action={() => updateTeam.bind(null, t.id)}
                            className="space-y-8"
                          >
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="name">Name</Label>
                                  <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    defaultValue={t?.name}
                                    onChange={(e) => {
                                      if (e.target.value.length == 0)
                                        setInvalidName(true);
                                      else setChanged(true);
                                    }}
                                  />
                                  {invalidName && (
                                    <div className="text-destructive">
                                      required
                                    </div>
                                  )}
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="teamLead">Team Lead</Label>
                                  <Select
                                    name="leadId"
                                    onValueChange={() => setChanged(true)}
                                  >
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder="Select Team Lead" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {userList.map((u) => (
                                          <SelectItem key={u.id} value={u.id}>
                                            {u.full_name}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit" disabled={pending}>
                                {pending ? "Saving..." : "Save"}
                              </Button>
                            </DialogFooter>
                          </form> */}
                          <TeamForm userList={userList} team={t} />
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Delete</DropdownMenuItem>
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
  const [invalidName, setInvalidName] = useState(false);

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
          onChange={(e) => {
            if (e.target.value.length == 0) setInvalidName(true);
            else setChanged(true);
          }}
        />
        {invalidName && <div className="text-destructive">required</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="teamLead">Team Lead</Label>
        <Select name="leadId" onValueChange={() => setChanged(true)}>
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
        {/* {error.leadId && <div className="text-destructive">{error.leadId}</div>} */}
      </div>

      <SubmitButton />
    </form>
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
