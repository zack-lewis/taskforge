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
import { useState } from "react";
import { DeleteProject, EditProjectForm, NewProjectForm } from "./projectform";
import { project, team } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useFormStatus } from "react-dom";

export function ProjectsTable({
  projectList,
  teamList,
}: {
  projectList: project[];
  teamList: team[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalVis = modalOpen ? "block" : "hidden";
  const modalMute = modalOpen ? "opacity-30" : "opacity-unset";
  const tableVis = projectList.length > 0 ? "block" : "hidden";
  const noProjects = projectList.length == 0 ? "block" : "hidden";

  function getTeamName(teamId: string | null) {
    if (teamId == null) return "--No team--";

    const i = teamList.findIndex((t) => t.id == teamId);
    return teamList[i].name;
  }

  function handleNewBtnClick() {
    setModalOpen(true);
  }

  return (
    <>
      <div className={`w-full h-10 ${modalMute}`}>
        <NewProjectForm teamList={teamList} />
      </div>
      <div className={`w-full ${modalMute} ${noProjects}`}>
        <h2>No projects found! Create a new one</h2>
      </div>
      <div className={`w-full ${modalMute} ${tableVis}`}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Primary Team</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectList.map((p: project) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{getTeamName(p.primary_teamId)}</TableCell>
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
                      <EditProjectForm teamList={teamList} project={p} />
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <DeleteProject project={p} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div
        className={`absolute z-0 w-1/3 h-1/2 top-1/4 left-1/3 bg-secondary rounded-xl border border-accent-foreground p-3 ${modalVis}`}
      ></div>
    </>
  );
}
