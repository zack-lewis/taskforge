import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFormState } from "react-dom";
import {
  addTask,
  assignOwner,
  assignProject,
  deleteTask,
  updateTask,
} from "@/app/_actions/tasks";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { SubmitButton } from "@/components/submitbutton";
import { project, task, user, team } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserContext } from "@/components/contextsprovider";
import { createNote } from "@/app/_actions/notes";

export function NewTask({ projectList }: { projectList: project[] }) {
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
                className="hidden"
                value={dueDate?.toLocaleDateString()}
                required
              />

              {error?.due_date && (
                <div className="text-destructive">required</div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Select name="projectId">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {projectList.map((p: project) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {error?.projectId && (
                <div className="text-destructive">required</div>
              )}
            </div>
            <SubmitButton />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function EditTask({
  task,
  userList,
  projectList,
  teamList,
}: {
  task: task;
  userList: user[];
  projectList: project[];
  teamList: team[];
}) {
  const [error, action] = useFormState(updateTask, {});
  const [dueDate, setDueDate] = useState<Date>(new Date(task.due_date!));
  const [changed, setChanged] = useState(false);
  const [project, setProject] = useState(task.projectId);
  const [owner, setOwner] = useState(task.userId);
  const [team, setTeam] = useState(task.teamId);

  return (
    <Dialog>
      <DialogTrigger>Edit</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          {/* <DialogDescription>Edit task</DialogDescription> */}
        </DialogHeader>
        <form action={action}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={task.name!}
              required
              onChange={() => setChanged(true)}
            />
            {error?.name && <div className="text-destructive">required</div>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              id="description"
              name="description"
              defaultValue={task.description!}
              required
              onChange={() => setChanged(true)}
            />
            {error?.description && (
              <div className="text-destructive">required</div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="due_date">Due Date</Label>
            <Calendar
              mode="single"
              selected={dueDate}
              onSelect={(event) => {
                setDueDate(new Date(event?.toLocaleDateString()!));
                setChanged(true);
              }}
              initialFocus
            />
            <Input
              type="text"
              id="due_date"
              name="due_date"
              className="hidden"
              value={dueDate?.toLocaleDateString()}
              onChange={() => setChanged(true)}
              required
            />
            {error?.due_date && (
              <div className="text-destructive">required</div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="teamId">Team</Label>
            <Select
              name="teamId"
              onValueChange={(newVal) => {
                setChanged(true);
                setTeam(newVal);
              }}
              defaultValue={team!}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {teamList.map((t: team) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error?.teamId && <div className="text-destructive">Error</div>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="owner">Owner</Label>
            <Select
              name="userId"
              onValueChange={(newVal) => {
                setChanged(true);
                setOwner(newVal);
              }}
              defaultValue={owner!}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {userList.map((u: user) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.full_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error?.userId && <div className="text-destructive">Error</div>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <Select
              name="projectId"
              onValueChange={(newVal) => {
                setChanged(true);
                setProject(newVal);
              }}
              defaultValue={project!}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {projectList.map((p: project) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {error?.projectId && (
              <div className="text-destructive">required</div>
            )}
          </div>
          <SubmitButton disabled={!changed} />
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteTask({ id }: { id: string }) {
  const [confirm, setConfirm] = useState(false);

  return (
    <Dialog>
      <DialogTrigger>Delete</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="full_name">
            Confirm deletion of task by typing DELETE below
          </Label>
          <Input
            onChange={(e) =>
              e.target.value == "DELETE" ? setConfirm(true) : setConfirm(false)
            }
          />
        </div>
        <Button onClick={() => deleteTask(id)} disabled={!confirm}>
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export function ChangeTaskOwner({
  task,
  userList,
}: {
  task: task;
  userList: user[];
}) {
  const [owner, setOwner] = useState(task.userId);
  const [changed, setChanged] = useState(false);

  return (
    <Dialog>
      <DialogTrigger>Owner</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reassign Owner</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="owner">Owner</Label>
          <Select
            name="ownerId"
            onValueChange={(newVal) => {
              setChanged(true);
              setOwner(newVal);
            }}
            defaultValue={owner!}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Owner" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {userList.map((u: user) => (
                  <SelectItem key={u.id} value={u.id}>
                    {u.full_name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogClose>
          <Button
            onClick={() => {
              assignOwner(task.id, owner!);
            }}
            disabled={!changed}
          >
            Change
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export function ChangeTaskProject({
  task,
  projectList,
}: {
  task: task;
  projectList: project[];
}) {
  const [project, setProject] = useState(task.projectId);
  const [changed, setChanged] = useState(false);

  return (
    <Dialog>
      <DialogTrigger>Project</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Project</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="project">Project</Label>
          <Select
            name="projectId"
            onValueChange={(newVal) => {
              setChanged(true);
              setProject(newVal);
            }}
            defaultValue={project!}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Project" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {projectList.map((p: project) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogClose>
          <Button
            onClick={() => {
              assignProject(task.id, project!);
            }}
            disabled={!changed}
          >
            Change
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export function AddNote({ task }: { task: task }) {
  const { userContext } = useUserContext();
  const timestamp = new Date().toISOString();
  const date = new Date().toLocaleDateString();
  const [note, setNote] = useState("");

  return (
    <Dialog>
      <DialogTrigger>Add Note</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="note">Note</Label>
          <textarea
            id="note"
            defaultValue={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </div>
        <DialogClose>
          <Button
            onClick={() => {
              createNote(task.id, userContext, timestamp, note, date);
            }}
          >
            Change
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
