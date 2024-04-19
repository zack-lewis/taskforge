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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { project, task, team, user } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AddNote,
  ChangeTaskOwner,
  ChangeTaskProject,
  DeleteTask,
  EditTask,
  NewTask,
} from "./taskforms";
import { MoreHorizontal } from "lucide-react";
import { completeTask, startTask } from "@/app/_actions/tasks";
import { useUserContext } from "@/components/contextsprovider";
import { getUsersJson } from "@/app/_actions/users";
import { getProjectsJson } from "@/app/_actions/projects";
import Link from "next/link";

export default function TaskList({
  tasklist,
  userList,
  projectList,
  teamList,
}: {
  tasklist: task[];
  userList: user[];
  projectList: project[];
  teamList: team[];
}) {
  // const params = useSearchParams();
  // const beginDate = params.get("beginDate") || 19000101;
  // const endDate = params.get("endDate") || 20990101;
  const [tableVis, setTableVis] = useState(false);
  const { userContext } = useUserContext();

  useEffect(
    () => (tasklist.length > 0 ? setTableVis(true) : setTableVis(false)),
    [tasklist]
  );

  function getUsername(id: string | null) {
    if (id == null || id == undefined) return;
    return userList.find((u) => u.id == id)?.full_name;
  }

  function getProjectName(id: string | null) {
    if (id == null || id == undefined) return;
    return projectList.find((p) => p.id == id)?.name;
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full py-2">
        <NewTask projectList={projectList} />
      </div>
      <div className={tableVis ? "hidden" : "block"}>NO TASKS FOUND</div>
      <div className={`w-full ${tableVis ? "block" : "hidden"}`}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Started</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasklist.map((t) => (
              <TableRow key={t.id}>
                <TableCell>
                  <Link href={`/tasks/${t.id}`}>{t.name}</Link>
                </TableCell>
                <TableCell>{getProjectName(t.projectId)}</TableCell>
                <TableCell>{t.due_date}</TableCell>
                <TableCell>{getUsername(t.userId)}</TableCell>
                <TableCell>{t.started_date}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          disabled={
                            !(Date.parse(t.started_date!) <= Date.now())
                          }
                          onClick={() => startTask(userContext, t.id)}
                        >
                          Start Task
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <AddNote task={t} />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={Date.parse(t.started_date!) <= Date.now()}
                          onClick={() => completeTask(t.id)}
                        >
                          Complete Task
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <EditTask
                            task={t}
                            userList={userList}
                            projectList={projectList}
                            teamList={teamList}
                          />
                        </DropdownMenuItem>

                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            Reassign Task
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem asChild>
                                <ChangeTaskOwner
                                  task={t}
                                  userList={userList!}
                                />
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <ChangeTaskProject
                                  task={t}
                                  projectList={projectList!}
                                />
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <DeleteTask id={t.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
