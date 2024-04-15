import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFormState } from "react-dom";
import { addTask } from "@/app/_actions/tasks";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { SubmitButton } from "@/components/submitbutton";

export function NewTask() {
  const [error, action] = useFormState(addTask, {});
  const [dueDate, setDueDate] = useState<Date>();

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>New</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Task</DialogTitle>
            <DialogDescription>Create task</DialogDescription>
          </DialogHeader>
          <form action={action}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" name="name" required />
              {error?.name && <div className="text-destructive">required</div>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input type="text" id="description" name="description" required />
              {error?.description && (
                <div className="text-destructive">required</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="due_date">Due Date</Label>
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
              />
              <Input
                type="text"
                id="due_date"
                name="due_date"
                // className="hidden"
                value={dueDate?.toLocaleDateString()}
                required
              />

              {error?.due_date && (
                <div className="text-destructive">required</div>
              )}
            </div>
            {/* 
      userId: data.userId;
      teamId: data.teamId; */}
            <SubmitButton />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
