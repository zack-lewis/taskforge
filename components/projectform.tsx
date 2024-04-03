import { project } from "@prisma/client";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { addProject, updateProject } from "@/app/(app)/_actions/projects";
import { Button } from "./ui/button";
import TeamSelectBox from "./teamSelectBox";

export default function ProjectForm({ project }: { project?: project | null }) {
  "use client";

  const [error, action] = useFormState(
    project == null ? addProject : updateProject.bind(null, project.id),
    {}
  );

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
        <TeamSelectBox />
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
