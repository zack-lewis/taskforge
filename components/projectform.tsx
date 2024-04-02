"use client";

import { project } from "@prisma/client";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { addProject, updateProject } from "@/app/(app)/_actions/projects";
import { getTeams } from "@/app/(app)/_actions/teams";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function ProjectForm({ project }: { project?: project | null }) {
  const [error, action] = useFormState(
    project == null ? addProject : updateProject.bind(null, project.id),
    {}
  );

  const teamList = await getTeams();

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={project?.name || ""}
        />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>

      <div className="space-y-2">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Team" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Team</SelectLabel>
              {teamList.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {error.primary_teamId && (
          <div className="text-destructive">{error.primary_teamId}</div>
        )}
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
