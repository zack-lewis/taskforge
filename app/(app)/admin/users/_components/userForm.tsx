"use client";

import { Button } from "@/components/ui/button";
import { team, user } from "@prisma/client";
import { useFormState, useFormStatus } from "react-dom";
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
import { addUser, updateUser } from "@/app/(app)/_actions/users";
import { Checkbox } from "@/components/ui/checkbox";
import { FormEvent, useEffect, useState } from "react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export function UserForm({
  user,
  teamList,
}: {
  user?: user | null;
  teamList: team[];
}) {
  const [formState, formAction] = useFormState(
    user == null ? addUser : updateUser.bind(null, user.id),
    {}
  );

  const gh_bool = user?.github_login != null ? true : false;
  const goog_bool = user?.google_login != null ? true : false;

  const [teamId, setTeamId] = useState(user?.teamId || null);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    if (teamId) {
      const teamName = teamList.find((item) => item.id === teamId);
      console.log(teamName);
    }
  }, [teamId, teamList]);

  function changeTeam(value: string): void {
    setTeamId(value);
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="full_name">Name</Label>
        <Input
          type="text"
          id="full_name"
          name="full_name"
          required
          defaultValue={user?.full_name || ""}
        />
        {formState.full_name && (
          <div className="text-destructive">{formState.full_name}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          name="username"
          required
          defaultValue={user?.username || ""}
        />
        {formState.username && (
          <div className="text-destructive">{formState.username}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          id="email"
          name="email"
          required
          defaultValue={user?.email || ""}
        />
        {formState.email && (
          <div className="text-destructive">{formState.email}</div>
        )}
      </div>
      <div className="space-y-2">
        <Select
          name="teamId"
          value={user?.teamId || ""}
          onValueChange={changeTeam}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Team" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Teams:</SelectLabel>
              {teamList.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-row w-full">
        <div className="flex flex-col w-1/3 items-center">
          <Label htmlFor="github_login" className="py-2">
            Github Login
          </Label>
          <Checkbox id="github_login" checked={gh_bool} disabled />
        </div>
        <div className="flex flex-col w-1/3 items-center">
          <Label htmlFor="google_login" className="py-2">
            Google Login
          </Label>
          <Checkbox id="google_login" checked={goog_bool} disabled />
        </div>
      </div>
      {formState.teamId && (
        <div className="text-destructive">team: {formState.teamId}</div>
      )}
      {formState.github_login && (
        <div className="text-destructive">gh: {formState.github_login}</div>
      )}
      {formState.google_login && (
        <div className="text-destructive">google: {formState.google_login}</div>
      )}
      <SubmitButton />
    </form>
  );
}
