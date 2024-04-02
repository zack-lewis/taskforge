"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import db from "@/lib/database";
import { useState } from "react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
import ProjectForm from "@/components/projectform";

async function getProjects() {
  return db.project.findMany();
}

async function ProjectsTable() {
  const list = await getProjects();

  if (list.length === 0) {
    return <h3>No projects found</h3>;
  }

  return (
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
  );
}

export default function ProjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalVis = modalOpen ? "block" : "hidden";
  const modalMute = modalOpen ? "opacity-30" : "opacity-unset";

  function handleNewBtnClick() {
    setModalOpen(true);
  }

  return (
    <>
      <div className={`w-full h-10 ${modalMute}`}>
        {/* <Link
          href="/projects/new"
          className="rounded-xl p-3 bg-destructive m-4"
        >
          New
        </Link> */}
        <Button onClick={handleNewBtnClick} disabled={!modalMute}>
          New
        </Button>
      </div>
      <div className={`w-full ${modalMute}`}>
        <ProjectsTable />
      </div>
      <div
        className={`absolute z-0 w-1/3 h-1/2 top-1/4 left-1/3 bg-secondary rounded-xl border border-accent-foreground p-3 ${modalVis}`}
      >
        <ProjectForm />
      </div>
    </>
  );
}
