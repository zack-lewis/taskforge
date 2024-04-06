"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../../../../components/ui/button";
import { ReactNode, useState } from "react";
import ProjectForm from "./projectform";
import { project, team } from "@prisma/client";

export function ProjectsTable(params: any) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalVis = modalOpen ? "block" : "hidden";
  const modalMute = modalOpen ? "opacity-30" : "opacity-unset";
  const tableVis = params.list.length > 0 ? "block" : "hidden";
  const noProjects = params.list.length == 0 ? "block" : "hidden";

  function handleNewBtnClick() {
    setModalOpen(true);
  }

  return (
    <>
      <div className={`w-full h-10 ${modalMute}`}>
        <Button onClick={handleNewBtnClick} disabled={!modalMute}>
          New
        </Button>
      </div>
      <div className={`w-full ${modalMute} ${noProjects}`}>
        <h2>No projects found! Create a new one</h2>
      </div>
      <div className={`w-full ${modalMute} ${tableVis}`}>
        <Table>
          <TableHeader></TableHeader>
          <TableBody>
            {params.list.map((p: project) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.primary_teamId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div
        className={`absolute z-0 w-1/3 h-1/2 top-1/4 left-1/3 bg-secondary rounded-xl border border-accent-foreground p-3 ${modalVis}`}
      >
        <ProjectForm project={null} teamList={params.teams} />
      </div>
    </>
  );
}
