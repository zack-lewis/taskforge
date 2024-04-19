"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { team, user } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { addUser, deleteUser, updateUser } from "@/app/_actions/users";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserTable({
  userList,
  teamList,
}: {
  userList: user[];
  teamList: team[];
}) {
  const [error, action] = useFormState(addUser, {});
  const [teamName, setTeamName] = useState("");
  const [teamId, setTeamId] = useState("");

  useEffect(() => {
    if (teamId) {
      const teamname = teamList.find((item) => item.id === teamId)?.name;
      if (teamname) setTeamName(teamname);
    }
  }, [teamId, teamList]);

  function getTeamName(teamId: string | null) {
    if (teamId == null) return "--No team--";

    const i = teamList.findIndex((t) => t.id == teamId);
    return teamList[i].name;
  }

  useEffect(() => {});

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>New</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
          </DialogHeader>
          <form action={action} className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input type="text" id="full_name" name="full_name" required />
              {error?.full_name && (
                <div className="text-destructive">Name is required</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input type="text" id="username" name="username" required />
              {error?.username && (
                <div className="text-destructive">Username is required</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="text" id="email" name="email" required />
              {error?.email && (
                <div className="text-destructive">Email is required</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="teamId">Team</Label>
              <Select
                name="teamId"
                onValueChange={(newVal) => {
                  setTeamId(newVal);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {teamList.length > 0 &&
                      teamList.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.name}
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
          {userList.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.full_name}</TableCell>
              <TableCell>{u.username}</TableCell>
              <TableCell>{getTeamName(u.teamId)}</TableCell>
              <TableCell>{u.github_login}</TableCell>
              <TableCell>{u.google_login}</TableCell>
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
                    <DropdownMenuItem asChild>
                      <EditUser teamList={teamList} user={u} />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <DeleteUser user={u} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

function EditUser({ user, teamList }: { user: user; teamList: team[] }) {
  const [error, action] = useFormState(updateUser.bind(null, user.id), {});

  const [teamName, setTeamName] = useState("");
  const [teamId, setTeamId] = useState("");

  useEffect(() => {
    if (teamId) {
      const teamname = teamList.find((item) => item.id === teamId)?.name;
      if (teamname) setTeamName(teamname);
    }
  }, [teamId, teamList]);

  function getTeamName(teamId: string | null) {
    if (teamId == null) return "--No team--";

    const i = teamList.findIndex((t) => t.id == teamId);
    return teamList[i].name;
  }

  return (
    <Dialog>
      <DialogTrigger>Edit</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form action={action} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input type="text" id="full_name" name="full_name" required />
            {error?.full_name && (
              <div className="text-destructive">Name is required</div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" name="username" required />
            {error?.username && (
              <div className="text-destructive">Username is required</div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="text" id="email" name="email" required />
            {error?.email && (
              <div className="text-destructive">Email is required</div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="teamId">Team</Label>
            <Select
              name="teamId"
              onValueChange={(newVal) => {
                setTeamId(newVal);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {teamList.length > 0 &&
                    teamList.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.name}
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

function DeleteUser({ user }: { user: user }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <Dialog>
      <DialogTrigger>Delete</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="full_name">
            Confirm deletion of user {user.full_name} by typing DELETE below
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
        <Button onClick={() => deleteUser(user.id)} disabled={!confirm}>
          Delete
        </Button>
      </DialogContent>
    </Dialog>
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
