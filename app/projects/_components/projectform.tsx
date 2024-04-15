"use client";

import { project, team, user } from "@prisma/client";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  addProject,
  deleteProject,
  updateProject,
} from "@/app/_actions/projects";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitButton } from "@/components/submitbutton";

export function NewProjectForm({ teamList }: { teamList: team[] }) {
  const [error, action] = useFormState(addProject, {});

  return (
    <Dialog>
      <DialogTrigger>
        <Button>New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Enter the details of the new project.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" required />
            {error?.name && <div className="text-destructive">required</div>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="teamLead">Primary Team</Label>
            <Select name="primary_teamId">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Team Lead" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {teamList.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error?.primary_teamId && (
              <div className="text-destructive">required</div>
            )}
          </div>
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function EditProjectForm({
  project,
  teamList,
}: {
  project: project;
  teamList: team[];
}) {
  const [error, action] = useFormState(
    updateProject.bind(null, project.id),
    {}
  );

  return (
    <Dialog>
      <DialogTrigger>Update</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Project</DialogTitle>
          <DialogDescription>
            Update the details of the project.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={project.name}
              required
            />
            {error?.name && <div className="text-destructive">required</div>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="primary_teamId">Primary Team</Label>
            <Select
              name="primary_teamId"
              defaultValue={project.primary_teamId || ""}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Primary Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {teamList.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error?.primary_teamId && (
              <div className="text-destructive">required</div>
            )}
          </div>
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteProject({ project }: { project: project }) {
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
            Confirm deletion of team {project.name} by typing DELETE below
          </Label>
          <Input
            onChange={(e) =>
              e.target.value == "DELETE" ? setConfirm(true) : setConfirm(false)
            }
          />
        </div>
        <Button onClick={() => deleteProject(project.id)} disabled={!confirm}>
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}
