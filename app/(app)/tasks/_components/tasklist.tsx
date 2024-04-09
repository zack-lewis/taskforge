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
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { task } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { NewTask } from "./taskforms";
import { MoreHorizontal } from "lucide-react";
import { Action } from "@radix-ui/react-alert-dialog";
import { startTask } from "../../_actions/tasks";
import { UserContext } from "@/lib/contexts";

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
      <div className={`w-full ${tableVis ? "block" : "hidden"}`}>
        <Table>
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
              <TableRow key={t.id}>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.projectId}</TableCell>
                <TableCell>{t.due_date}</TableCell>
                <TableCell>{t.userId}</TableCell>
                <TableCell>
                  <ActionMenu />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function ActionMenu() {
  const currentUser = useContext(UserContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => startTask(currentUser)}>
            Start Task
          </DropdownMenuItem>
          <DropdownMenuItem>Add Note</DropdownMenuItem>
          <DropdownMenuItem>Complete Task</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Edit</DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Reassign Task</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Owner</DropdownMenuItem>
                <DropdownMenuItem>Project</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
