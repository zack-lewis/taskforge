"use server";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { getTeams } from "@/app/(app)/_actions/teams";

export default async function TeamSelectBox() {
  const teamList = await getTeams();

  return (
    <>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Team" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Team</SelectLabel>
            {teamList.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
