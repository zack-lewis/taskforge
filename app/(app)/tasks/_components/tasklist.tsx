"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { task } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NewTask } from "./taskforms";

export default function TaskList({ tasklist }: { tasklist: task[] }) {
  const params = useSearchParams();
  const beginDate = params.get("beginDate") || 19000101;
  const endDate = params.get("endDate") || 20990101;
  const [tableVis, setTableVis] = useState(false);

  useEffect(
    () => (tasklist.length > 0 ? setTableVis(true) : setTableVis(false)),
    [tasklist]
  );

  return (
    <div className="w-full flex flex-col">
      <div className="w-full py-2">
        <NewTask />
      </div>
      <div className={tableVis ? "hidden" : "block"}>NO TASKS FOUND</div>
      <Table className={tableVis ? "block" : "hidden"}>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasklist.map((t) => (
            <TableRow key={t.id}></TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
