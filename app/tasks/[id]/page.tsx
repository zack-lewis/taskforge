"use server";

import { getTaskNotes } from "@/app/_actions/notes";
import { getProjectName } from "@/app/_actions/projects";
import { getTask } from "@/app/_actions/tasks";
import { getTeamName } from "@/app/_actions/teams";
import { getUsernameById } from "@/app/_actions/users";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function TaskViewPage({
  params,
}: {
  params: { id: string };
}) {
  const task = await getTask(params.id);
  const notes = await getTaskNotes(params.id);
  const projectName = await getProjectName(task.projectId!);
  const teamName = await getTeamName(task.teamId!);
  const userName = await getUsernameById(task.userId!);

  //   id: '859f987f-7245-485f-b87b-f6ad595ffa43',
  //   projectId: '813a1c4e-e433-4ea2-ab7e-9b31b2695faf',
  //   userId: '4a8dbeaf-8b6c-4cde-9da4-d29f8cb757f3',
  //   teamId: null,
  //   name: 'Test5',
  //   description: 'Test5',
  //   due_date: '4/26/2024',
  //   started_date: null,
  //   completed_date: null

  return (
    <>
      <div className="h-full w-3/4 grid grid-cols-2 grid-rows-3 mx-auto ">
        <div className="">Task: {task.name}</div>
        <div className="">Project: {projectName}</div>

        <div className="">Description: {task.description}</div>
        <div className="">Team: {teamName} </div>

        <div className=""></div>
        <div className="">User: {userName} </div>

        <div className="grid grid-cols-subgrid cols-span-2">
          <div className="">Due Date: {task.due_date}</div>
          <div className="">Started Date: {task.started_date}</div>
          <div className="">Completed Date: {task.completed_date}</div>
        </div>
      </div>
      <hr />
      <div className="w-3/4 h-full mx-auto">
        Notes:
        {notes.map((note) => (
          <Accordion type="single" collapsible key={note.id}>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                {note.timestamp.toLocaleTimeString()} -{" "}
                {getUsernameById(note.userId)}
              </AccordionTrigger>
              <AccordionContent>{note.data}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </>
  );
}
