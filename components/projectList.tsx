"use client";

import { getProjects } from "@/app/(app)/_actions/projects";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useState } from "react";
import ProjectForm from "./projectform";
import { project } from "@prisma/client";

export async function ProjectsTable(list: any) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalVis = modalOpen ? "block" : "hidden";
  const modalMute = modalOpen ? "opacity-30" : "opacity-unset";

  function handleNewBtnClick() {
    setModalOpen(true);
  }

  if (list.length === 0) {
    return <h3>No projects found</h3>;
  }

  return (
    <>
      <div className={`w-full h-10 ${modalMute}`}>
        <Button onClick={handleNewBtnClick} disabled={!modalMute}>
          New
        </Button>
      </div>
      <div className={`w-full ${modalMute}`}>
        <Table>
          <TableHeader></TableHeader>
          <TableBody>
            {list.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.primary_teamId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div
        className={`absolute z-0 w-1/3 h-1/2 top-1/4 left-1/3 bg-secondary rounded-xl border border-accent-foreground p-3 ${modalVis}`}
      >
        <ProjectForm />
      </div>
    </>
  );
}
